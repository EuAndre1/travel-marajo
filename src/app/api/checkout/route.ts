import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { metadataSchema } from '@/lib/metadata-schema'
import { checkRateLimit } from '@/lib/rate-limit'
import { createRequestContext, parseJsonBodyWithLimit, RequestValidationError } from '@/lib/request-security'
import { createCommercialCheckout } from '@/services/commercial-checkout.service'

const checkoutSchema = z.object({
  type: z.enum(['PACKAGE', 'ACTIVITY']),
  id: z.string().min(1).max(100),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
  startDate: z.string().optional(),
  source: z.enum(['HOME_NEWSLETTER', 'HERO_SEARCH', 'PACKAGES_PAGE', 'ACTIVITIES_PAGE', 'CHECKOUT_PAGE', 'UNKNOWN']).optional(),
  customer: z.object({
    name: z.string().min(2).max(120).optional(),
    email: z.string().email().max(160).optional(),
    phone: z.string().min(6).max(30).optional(),
    website: z.string().max(0).optional(), // honeypot
  }).optional(),
  metadata: metadataSchema.optional(),
})

const CHECKOUT_PAYLOAD_LIMIT_BYTES = 12 * 1024

function normalizeEmail(email?: string | null): string | undefined {
  const normalized = email?.trim().toLowerCase()
  return normalized || undefined
}

function ensureValidStartDate(date?: string) {
  if (!date) {
    return
  }

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid start date')
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (parsed < today) {
    throw new Error('Start date cannot be in the past')
  }
}

export async function POST(request: Request) {
  const context = createRequestContext(request)
  const session = await getServerSession(authOptions)

  const ipLimit = checkRateLimit({
    scope: 'api_checkout_ip',
    key: context.ip,
    limit: 15,
    windowMs: 15 * 60 * 1000,
  })

  if (!ipLimit.allowed) {
    console.warn('[api/checkout] rate limit exceeded', { requestId: context.requestId, ip: context.ip })
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } }
    )
  }

  try {
    const body = await parseJsonBodyWithLimit<unknown>(request, CHECKOUT_PAYLOAD_LIMIT_BYTES)
    const parsed = checkoutSchema.parse(body)

    if (parsed.customer?.website) {
      return NextResponse.json({ error: 'Invalid checkout payload' }, { status: 400 })
    }

    ensureValidStartDate(parsed.startDate)

    const email = normalizeEmail(parsed.customer?.email ?? session?.user?.email)
    if (!email) {
      return NextResponse.json({ error: 'Customer email is required for checkout' }, { status: 400 })
    }

    const emailLimit = checkRateLimit({
      scope: 'api_checkout_email',
      key: email,
      limit: 8,
      windowMs: 30 * 60 * 1000,
    })

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many checkout attempts for this email. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(emailLimit.retryAfterSeconds) } }
      )
    }

    const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin
    const result = await createCommercialCheckout({
      userId: session?.user?.id,
      userEmail: email,
      userName: parsed.customer?.name ?? session?.user?.name ?? undefined,
      userPhone: parsed.customer?.phone,
      source: parsed.source,
      type: parsed.type,
      idOrSlug: parsed.id,
      quantity: parsed.quantity,
      startDate: parsed.startDate,
      appUrl,
      requestContext: {
        requestId: context.requestId,
        ip: context.ip,
        metadata: parsed.metadata,
      },
    })

    console.info('[api/checkout] checkout started', {
      requestId: context.requestId,
      bookingId: result.booking.id,
      leadId: result.lead.id,
      stripeSessionId: result.session.id,
    })

    return NextResponse.json(
      {
        bookingId: result.booking.id,
        checkoutUrl: result.session.url,
        sessionId: result.session.id,
        leadId: result.lead.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid checkout payload', details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : 'Failed to create checkout'
    const status = message.includes('Start date cannot be in the past') || message.includes('Invalid start date') ? 400 : 500
    console.error('[api/checkout] failed', { requestId: context.requestId, message })
    return NextResponse.json({ error: message }, { status })
  }
}
