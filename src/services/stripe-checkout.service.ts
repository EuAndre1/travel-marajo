import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { normalizeCurrency } from '@/lib/money'
import {
  createPendingBooking,
  createPendingStripePayment,
  finalizeStripePaymentAndBooking,
  findBookingWithPayment,
} from '@/repositories/booking.repository'
import { appendCommercialEvent, hasProcessedIdempotencyKey } from '@/services/commercial-event.service'
import type { CreateCheckoutInput } from '@/types/booking'
import type { LeadIntentType, LeadSource } from '@/types/lead'

const LEAD_SOURCES: LeadSource[] = [
  'HOME_NEWSLETTER',
  'HERO_SEARCH',
  'PACKAGES_PAGE',
  'ACTIVITIES_PAGE',
  'CHECKOUT_PAGE',
  'UNKNOWN',
]

const LEAD_INTENTS: LeadIntentType[] = ['NEWSLETTER', 'DESTINATION', 'PACKAGE', 'ACTIVITY', 'CHECKOUT', 'GENERAL']

function isLeadSource(value?: string): value is LeadSource {
  return Boolean(value && LEAD_SOURCES.includes(value as LeadSource))
}

function isLeadIntent(value?: string): value is LeadIntentType {
  return Boolean(value && LEAD_INTENTS.includes(value as LeadIntentType))
}

export async function createCheckoutSession(
  userId: string,
  input: CreateCheckoutInput,
  appUrl: string
) {
  const currency = normalizeCurrency(input.currency)
  const quantity = input.quantity ?? 1
  const totalAmount = input.unitAmount * quantity

  const booking = await createPendingBooking({
    userId,
    totalPrice: totalAmount,
    currency,
  })

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: Math.round(input.unitAmount * 100),
          product_data: {
            name: input.title,
            description: input.description,
          },
        },
      },
    ],
    success_url: `${appUrl}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/booking-cancelled`,
    metadata: {
      bookingId: booking.id,
      bookingType: input.bookingType,
      userId,
      ...input.metadata,
    },
  })

  await createPendingStripePayment({
    bookingId: booking.id,
    amount: totalAmount,
    currency,
    checkoutSessionId: session.id,
    transactionId: `pending_${session.id}`,
  })

  await appendCommercialEvent({
    eventName: 'checkout_started',
    bookingId: booking.id,
    userId,
    source: 'CHECKOUT_PAGE',
    intentType: 'CHECKOUT',
    currency,
    amount: totalAmount,
    idempotencyKey: `checkout_started:${booking.id}`,
    metadata: {
      stripeSessionId: session.id,
      bookingType: input.bookingType,
    },
  })

  return { session, booking }
}

export async function confirmCheckoutFromWebhook(
  session: Stripe.Checkout.Session,
  stripeEventId: string
) {
  const bookingId = session.metadata?.bookingId
  if (!bookingId) {
    throw new Error('Missing bookingId in Stripe metadata')
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id
  if (!paymentIntentId) {
    throw new Error('Missing payment intent id')
  }

  if (session.payment_status !== 'paid') {
    console.warn('[stripe-webhook] checkout session not paid, skipping confirmation', {
      stripeEventId,
      stripeSessionId: session.id,
      bookingId,
      paymentStatus: session.payment_status,
    })
    return { processed: false, reason: 'payment_not_paid' as const }
  }

  const paymentIdempotencyKey = `payment_completed:${paymentIntentId}`
  const bookingIdempotencyKey = `booking_confirmed:${bookingId}`

  const [paymentAlreadyLogged, bookingAlreadyLogged] = await Promise.all([
    hasProcessedIdempotencyKey(paymentIdempotencyKey),
    hasProcessedIdempotencyKey(bookingIdempotencyKey),
  ])

  if (paymentAlreadyLogged && bookingAlreadyLogged) {
    console.info('[stripe-webhook] duplicate event ignored', {
      stripeEventId,
      stripeSessionId: session.id,
      bookingId,
      paymentIntentId,
    })
    return { processed: false, reason: 'duplicate_event' as const }
  }

  const amount = (session.amount_total ?? 0) / 100
  const currency = normalizeCurrency((session.currency ?? 'BRL').toUpperCase())

  const current = await findBookingWithPayment(bookingId)
  const source = isLeadSource(session.metadata?.source) ? session.metadata?.source : current?.lead?.source ?? 'CHECKOUT_PAGE'
  const intentType = isLeadIntent(current?.lead?.intentType) ? current?.lead?.intentType : 'CHECKOUT'

  const finalizeResult = await finalizeStripePaymentAndBooking({
    bookingId,
    amount,
    currency,
    transactionId: paymentIntentId,
    paymentIntentId,
    checkoutSessionId: session.id,
    rawStatus: session.payment_status ?? undefined,
  })

  await appendCommercialEvent({
    eventName: 'payment_completed',
    leadId: current?.leadId ?? undefined,
    bookingId,
    userId: current?.userId ?? undefined,
    source,
    intentType,
    currency,
    amount,
    idempotencyKey: paymentIdempotencyKey,
    metadata: {
      stripeEventId,
      stripeSessionId: session.id,
      paymentIntentId,
      paymentStatus: finalizeResult.payment.status,
      paymentAlreadyCompleted: finalizeResult.paymentAlreadyCompleted,
    },
  })

  await appendCommercialEvent({
    eventName: 'booking_confirmed',
    leadId: current?.leadId ?? undefined,
    bookingId,
    userId: current?.userId ?? undefined,
    source,
    intentType,
    currency,
    amount,
    idempotencyKey: bookingIdempotencyKey,
    metadata: {
      stripeEventId,
      stripeSessionId: session.id,
      bookingStatus: finalizeResult.booking.status,
      bookingAlreadyConfirmed: finalizeResult.bookingAlreadyConfirmed,
    },
  })

  console.info('[stripe-webhook] checkout processed', {
    stripeEventId,
    stripeSessionId: session.id,
    bookingId,
    paymentIntentId,
    bookingAlreadyConfirmed: finalizeResult.bookingAlreadyConfirmed,
    paymentAlreadyCompleted: finalizeResult.paymentAlreadyCompleted,
  })

  return {
    processed: true,
    reason:
      finalizeResult.bookingAlreadyConfirmed && finalizeResult.paymentAlreadyCompleted
        ? ('already_completed' as const)
        : ('updated' as const),
  }
}
