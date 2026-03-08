import { CommercialEventName, LeadIntentType, LeadSource, Prisma } from '@prisma/client'
import { createCommercialEvent, findCommercialEventByIdempotencyKey } from '@/repositories/commercial-event.repository'
import type { SupportedCurrency } from '@/config/currency'
import type { LeadIntentType as LeadIntentTypeInput, LeadSource as LeadSourceInput } from '@/types/lead'

export type CommercialEventKey =
  | 'lead_captured'
  | 'checkout_started'
  | 'payment_completed'
  | 'booking_confirmed'

const EVENT_NAME_MAP: Record<CommercialEventKey, CommercialEventName> = {
  lead_captured: CommercialEventName.LEAD_CAPTURED,
  checkout_started: CommercialEventName.CHECKOUT_STARTED,
  payment_completed: CommercialEventName.PAYMENT_COMPLETED,
  booking_confirmed: CommercialEventName.BOOKING_CONFIRMED,
}

type AppendCommercialEventInput = {
  eventName: CommercialEventKey
  occurredAt?: Date
  leadId?: string
  bookingId?: string
  userId?: string
  source?: LeadSourceInput
  intentType?: LeadIntentTypeInput
  currency?: SupportedCurrency
  amount?: number
  idempotencyKey?: string
  metadata?: Record<string, unknown>
}

export async function hasProcessedIdempotencyKey(idempotencyKey: string): Promise<boolean> {
  const event = await findCommercialEventByIdempotencyKey(idempotencyKey)
  return Boolean(event)
}

export async function appendCommercialEvent(input: AppendCommercialEventInput) {
  try {
    return await createCommercialEvent({
      eventName: EVENT_NAME_MAP[input.eventName],
      occurredAt: input.occurredAt,
      lead: input.leadId ? { connect: { id: input.leadId } } : undefined,
      booking: input.bookingId ? { connect: { id: input.bookingId } } : undefined,
      user: input.userId ? { connect: { id: input.userId } } : undefined,
      source: input.source ? LeadSource[input.source] : undefined,
      intentType: input.intentType ? LeadIntentType[input.intentType] : undefined,
      currency: input.currency,
      amount: input.amount,
      idempotencyKey: input.idempotencyKey,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError
      && error.code === 'P2002'
      && input.idempotencyKey
    ) {
      return null
    }

    throw error
  }
}
