import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { DEFAULT_CURRENCY } from '@/config/currency'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession } from '@/services/stripe-checkout.service'
import { normalizeCurrency } from '@/lib/money'

const checkoutSchema = z.object({
  bookingType: z.enum(['FLIGHT', 'HOTEL', 'PACKAGE']),
  title: z.string().min(3),
  description: z.string().min(3),
  unitAmount: z.number().positive(),
  quantity: z.number().int().min(1).max(10).optional(),
  currency: z.string().length(3).toUpperCase().default(DEFAULT_CURRENCY),
  metadata: z.record(z.string()).optional(),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = checkoutSchema.parse(body)
    const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin

    const { session: stripeSession, booking } = await createCheckoutSession(session.user.id, { ...parsed, currency: normalizeCurrency(parsed.currency) }, appUrl)

    return NextResponse.json(
      {
        checkoutUrl: stripeSession.url,
        sessionId: stripeSession.id,
        bookingId: booking.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : 'Failed to create checkout session'
    const status = message.includes('Missing required environment variable') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
