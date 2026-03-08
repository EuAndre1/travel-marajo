import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getRequiredEnv } from '@/lib/env'
import { readBodyWithLimit } from '@/lib/request-security'
import {
  beginEventProcessing,
  markEventFailed,
  markEventProcessed,
} from '@/services/event-processing-lock.service'
import { confirmCheckoutFromWebhook } from '@/services/stripe-checkout.service'

export const dynamic = 'force-dynamic'

const WEBHOOK_BODY_LIMIT_BYTES = 512 * 1024
const WEBHOOK_SCOPE = 'stripe_webhook'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.warn('[stripe-webhook] rejected request without signature')
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  let event: Stripe.Event | null = null

  try {
    const body = await readBodyWithLimit(request, WEBHOOK_BODY_LIMIT_BYTES)
    event = getStripe().webhooks.constructEvent(body, signature, getRequiredEnv('STRIPE_WEBHOOK_SECRET'))

    const processing = await beginEventProcessing({
      scope: WEBHOOK_SCOPE,
      eventKey: event.id,
      metadata: { type: event.type },
    })

    if (!processing.shouldProcess) {
      console.info('[stripe-webhook] duplicate/processing event ignored', {
        stripeEventId: event.id,
        reason: processing.reason,
      })
      return NextResponse.json({ received: true, processed: false, reason: processing.reason })
    }

    console.info('[stripe-webhook] event received', { stripeEventId: event.id, type: event.type })

    if (event.type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as Stripe.Checkout.Session
      const result = await confirmCheckoutFromWebhook(checkoutSession, event.id)

      await markEventProcessed({
        scope: WEBHOOK_SCOPE,
        eventKey: event.id,
        metadata: {
          type: event.type,
          bookingId: checkoutSession.metadata?.bookingId,
          result,
        },
      })

      return NextResponse.json({ received: true, processed: result.processed, reason: result.reason })
    }

    await markEventProcessed({
      scope: WEBHOOK_SCOPE,
      eventKey: event.id,
      metadata: { type: event.type, ignored: true },
    })

    console.info('[stripe-webhook] event ignored', { stripeEventId: event.id, type: event.type })
    return NextResponse.json({ received: true, ignored: true, type: event.type })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handler failed'

    if (event?.id) {
      await markEventFailed({
        scope: WEBHOOK_SCOPE,
        eventKey: event.id,
        error: message,
        metadata: { type: event.type },
      })
    }

    console.error('[stripe-webhook] failed', {
      stripeEventId: event?.id,
      type: event?.type,
      message,
    })

    return NextResponse.json({ error: message }, { status: 400 })
  }
}
