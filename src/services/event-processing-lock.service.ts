import { EventProcessingStatus, Prisma } from '@prisma/client'
import {
  createEventProcessingLock,
  findEventProcessingLock,
  updateEventProcessingLock,
} from '@/repositories/event-processing-lock.repository'

const PROCESSING_STALE_MS = 2 * 60 * 1000

async function resolveExisting(scope: string, eventKey: string) {
  const existing = await findEventProcessingLock(scope, eventKey)
  if (!existing) {
    return { shouldProcess: true as const, reason: 'created' as const }
  }

  if (existing.status === EventProcessingStatus.PROCESSED) {
    return { shouldProcess: false as const, reason: 'already_processed' as const }
  }

  if (existing.status === EventProcessingStatus.PROCESSING) {
    const stale = Date.now() - existing.updatedAt.getTime() > PROCESSING_STALE_MS
    if (!stale) {
      return { shouldProcess: false as const, reason: 'already_processing' as const }
    }
  }

  await updateEventProcessingLock({
    scope,
    eventKey,
    status: EventProcessingStatus.PROCESSING,
    incrementAttempts: true,
  })

  return { shouldProcess: true as const, reason: 'reprocessing' as const }
}

export async function beginEventProcessing(params: {
  scope: string
  eventKey: string
  metadata?: Prisma.InputJsonValue
}) {
  try {
    await createEventProcessingLock(params)
    return { shouldProcess: true as const, reason: 'created' as const }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return resolveExisting(params.scope, params.eventKey)
    }

    throw error
  }
}

export async function markEventProcessed(params: {
  scope: string
  eventKey: string
  metadata?: Prisma.InputJsonValue
}) {
  await updateEventProcessingLock({
    scope: params.scope,
    eventKey: params.eventKey,
    status: EventProcessingStatus.PROCESSED,
    metadata: params.metadata,
  })
}

export async function markEventFailed(params: {
  scope: string
  eventKey: string
  error: string
  metadata?: Prisma.InputJsonValue
}) {
  await updateEventProcessingLock({
    scope: params.scope,
    eventKey: params.eventKey,
    status: EventProcessingStatus.FAILED,
    lastError: params.error,
    metadata: params.metadata,
    incrementAttempts: true,
  })
}
