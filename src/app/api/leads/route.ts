import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { metadataSchema } from '@/lib/metadata-schema'
import { checkRateLimit } from '@/lib/rate-limit'
import { createRequestContext, parseJsonBodyWithLimit, RequestValidationError } from '@/lib/request-security'
import { captureLeadIntent } from '@/services/lead.service'

export const dynamic = 'force-dynamic'

const leadSchema = z.object({
  source: z.enum(['HOME_NEWSLETTER', 'HERO_SEARCH', 'PACKAGES_PAGE', 'ACTIVITIES_PAGE', 'CHECKOUT_PAGE', 'UNKNOWN']),
  intentType: z.enum(['NEWSLETTER', 'DESTINATION', 'PACKAGE', 'ACTIVITY', 'CHECKOUT', 'GENERAL']),
  email: z.string().email().max(160).optional(),
  name: z.string().min(2).max(120).optional(),
  phone: z.string().min(6).max(30).optional(),
  website: z.string().max(0).optional(), // honeypot
  language: z.string().min(2).max(8).optional(),
  currency: z.enum(['BRL', 'USD', 'EUR', 'GBP', 'AOA']).optional(),
  country: z.string().min(2).max(80).optional(),
  destinationId: z.string().min(1).max(100).optional(),
  packageId: z.string().min(1).max(100).optional(),
  activityId: z.string().min(1).max(100).optional(),
  metadata: metadataSchema.optional(),
}).superRefine((value, ctx) => {
  if (value.intentType === 'NEWSLETTER' && !value.email) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Email is required for newsletter', path: ['email'] })
  }
})

const LEADS_PAYLOAD_LIMIT_BYTES = 8 * 1024

export async function POST(request: Request) {
  const context = createRequestContext(request)
  const session = await getServerSession(authOptions)

  const ipLimit = checkRateLimit({
    scope: 'api_leads_ip',
    key: context.ip,
    limit: 20,
    windowMs: 15 * 60 * 1000,
  })

  if (!ipLimit.allowed) {
    console.warn('[api/leads] rate limit exceeded', { requestId: context.requestId, ip: context.ip })
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } }
    )
  }

  try {
    const body = await parseJsonBodyWithLimit<unknown>(request, LEADS_PAYLOAD_LIMIT_BYTES)
    const parsed = leadSchema.parse(body)

    if (parsed.website) {
      return NextResponse.json({ error: 'Invalid lead payload' }, { status: 400 })
    }

    const normalizedEmail = (parsed.email ?? session?.user?.email ?? undefined)?.trim().toLowerCase()
    if (normalizedEmail) {
      const emailLimit = checkRateLimit({
        scope: 'api_leads_email',
        key: normalizedEmail,
        limit: 12,
        windowMs: 60 * 60 * 1000,
      })

      if (!emailLimit.allowed) {
        return NextResponse.json(
          { error: 'Too many lead attempts for this email. Try again later.' },
          { status: 429, headers: { 'Retry-After': String(emailLimit.retryAfterSeconds) } }
        )
      }
    }

    const lead = await captureLeadIntent({
      ...parsed,
      userId: session?.user?.id,
      email: normalizedEmail,
      name: parsed.name ?? session?.user?.name ?? undefined,
      metadata: {
        ...(parsed.metadata ?? {}),
        requestId: context.requestId,
        ip: context.ip,
      },
    })

    console.info('[api/leads] lead captured', {
      requestId: context.requestId,
      leadId: lead.id,
      source: lead.source,
      intentType: lead.intentType,
    })

    return NextResponse.json({ leadId: lead.id }, { status: 201 })
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid lead payload', details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : 'Failed to capture lead'
    console.error('[api/leads] failed', { requestId: context.requestId, message })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
