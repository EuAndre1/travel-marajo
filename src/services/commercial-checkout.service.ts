import { BookingItemType } from '@prisma/client'
import { getStripe } from '@/lib/stripe'
import { createPendingStripePayment } from '@/repositories/booking.repository'
import { createCommercialBooking } from '@/repositories/commercial-booking.repository'
import { getCheckoutProduct } from '@/services/catalog.service'
import { appendCommercialEvent } from '@/services/commercial-event.service'
import { captureLeadIntent } from '@/services/lead.service'
import type { CheckoutItemType, LeadSource } from '@/types'

export async function createCommercialCheckout(input: {
  userId?: string
  userEmail: string
  userName?: string
  userPhone?: string
  source?: LeadSource
  type: CheckoutItemType
  idOrSlug: string
  quantity: number
  startDate?: string
  appUrl: string
  requestContext?: {
    requestId: string
    ip: string
    metadata?: Record<string, string | number | boolean | null>
  }
}) {
  const product = await getCheckoutProduct({ type: input.type, idOrSlug: input.idOrSlug })
  const quantity = Math.max(1, input.quantity)
  const totalPrice = product.unitPrice * quantity

  const lead = await captureLeadIntent({
    userId: input.userId,
    email: input.userEmail,
    name: input.userName,
    phone: input.userPhone,
    source: input.source ?? 'CHECKOUT_PAGE',
    intentType: 'CHECKOUT',
    packageId: product.type === 'PACKAGE' ? product.referenceId : undefined,
    activityId: product.type === 'ACTIVITY' ? product.referenceId : undefined,
    currency: product.currency,
    metadata: {
      origin: 'checkout',
      checkoutType: product.type,
      referenceId: product.referenceId,
      slug: product.slug,
      quantity,
      unitPrice: product.unitPrice,
      totalPrice,
      ...(input.requestContext?.metadata ?? {}),
      requestId: input.requestContext?.requestId,
      ip: input.requestContext?.ip,
    },
  })

  const booking = await createCommercialBooking({
    userId: input.userId,
    leadId: lead.id,
    customerName: input.userName,
    customerEmail: input.userEmail,
    customerPhone: input.userPhone,
    startDate: input.startDate ? new Date(input.startDate) : new Date(),
    totalPrice,
    currency: product.currency,
    item: {
      type: product.type === 'PACKAGE' ? BookingItemType.PACKAGE : BookingItemType.ACTIVITY,
      referenceId: product.referenceId,
      slugSnapshot: product.slug,
      titleSnapshot: product.name,
      descriptionSnapshot: product.description,
      imageSnapshot: product.image ?? undefined,
      quantity,
      unitPrice: product.unitPrice,
      totalPrice,
      currency: product.currency,
      metadata: {
        source: input.source ?? 'CHECKOUT_PAGE',
        slug: product.slug,
        requestId: input.requestContext?.requestId,
      },
    },
  })

  const metadata: Record<string, string> = {
    bookingId: booking.id,
    leadId: lead.id,
    bookingItemType: product.type,
    referenceId: product.referenceId,
    source: input.source ?? 'CHECKOUT_PAGE',
    customerEmail: input.userEmail,
    requestId: input.requestContext?.requestId ?? '',
  }

  if (input.userId) {
    metadata.userId = input.userId
  }

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity,
        price_data: {
          currency: product.currency.toLowerCase(),
          unit_amount: Math.round(product.unitPrice * 100),
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
      },
    ],
    success_url: `${input.appUrl}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.appUrl}/checkout?type=${product.type}&id=${product.referenceId}&source=${input.source ?? 'CHECKOUT_PAGE'}`,
    customer_email: input.userEmail,
    metadata,
  })

  await createPendingStripePayment({
    bookingId: booking.id,
    amount: totalPrice,
    currency: product.currency,
    checkoutSessionId: session.id,
    transactionId: `pending_${session.id}`,
  })

  await appendCommercialEvent({
    eventName: 'checkout_started',
    leadId: lead.id,
    bookingId: booking.id,
    userId: input.userId,
    source: input.source ?? 'CHECKOUT_PAGE',
    intentType: 'CHECKOUT',
    currency: product.currency,
    amount: totalPrice,
    idempotencyKey: `checkout_started:${booking.id}`,
    metadata: {
      stripeSessionId: session.id,
      itemType: product.type,
      referenceId: product.referenceId,
      quantity,
      requestId: input.requestContext?.requestId,
      ip: input.requestContext?.ip,
    },
  })

  return { booking, session, product, lead }
}
