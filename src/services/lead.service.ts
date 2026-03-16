import { LeadIntentType, LeadSource, Prisma } from '@prisma/client'
import { createLead } from '@/repositories/lead.repository'
import { appendCommercialEvent } from '@/services/commercial-event.service'
import type { CaptureLeadInput } from '@/types'

function normalizeEmail(email?: string): string | undefined {
  const normalized = email?.trim().toLowerCase()
  return normalized ? normalized : undefined
}

function normalizePhone(phone?: string): string | undefined {
  const normalized = phone?.trim()
  return normalized ? normalized : undefined
}

export async function captureLeadIntent(input: CaptureLeadInput) {
  const lead = await createLead({
    source: LeadSource[input.source],
    intentType: LeadIntentType[input.intentType],
    email: normalizeEmail(input.email),
    name: input.name?.trim() || null,
    phone: normalizePhone(input.phone),
    language: input.language?.trim() || 'pt',
    currency: input.currency,
    country: input.country?.trim() || null,
    metadata: input.metadata as Prisma.InputJsonValue | undefined,
    lastIntentAt: new Date(),
    user: input.userId ? { connect: { id: input.userId } } : undefined,
    destination: input.destinationId ? { connect: { id: input.destinationId } } : undefined,
    package: input.packageId ? { connect: { id: input.packageId } } : undefined,
    activity: input.activityId ? { connect: { id: input.activityId } } : undefined,
  })

  await appendCommercialEvent({
    eventName: 'lead_captured',
    leadId: lead.id,
    userId: input.userId,
    source: input.source,
    intentType: input.intentType,
    currency: input.currency,
    metadata: {
      email: lead.email,
      origin: 'lead_capture',
      hasPhone: Boolean(lead.phone),
      ...input.metadata,
    },
  })

  return lead
}
