import { EventProcessingStatus, Prisma, type EventProcessingLock } from '@prisma/client'
import { db } from '@/database/client'

export async function findEventProcessingLock(scope: string, eventKey: string) {
  return db.eventProcessingLock.findUnique({
    where: {
      scope_eventKey: {
        scope,
        eventKey,
      },
    },
  })
}

export async function createEventProcessingLock(data: {
  scope: string
  eventKey: string
  metadata?: Prisma.InputJsonValue
}): Promise<EventProcessingLock> {
  return db.eventProcessingLock.create({
    data: {
      scope: data.scope,
      eventKey: data.eventKey,
      status: EventProcessingStatus.PROCESSING,
      metadata: data.metadata,
    },
  })
}

export async function updateEventProcessingLock(data: {
  scope: string
  eventKey: string
  status: EventProcessingStatus
  lastError?: string
  metadata?: Prisma.InputJsonValue
  incrementAttempts?: boolean
}) {
  const current = await findEventProcessingLock(data.scope, data.eventKey)
  if (!current) {
    return null
  }

  return db.eventProcessingLock.update({
    where: {
      scope_eventKey: {
        scope: data.scope,
        eventKey: data.eventKey,
      },
    },
    data: {
      status: data.status,
      lastError: data.lastError,
      metadata: data.metadata,
      attempts: data.incrementAttempts ? { increment: 1 } : undefined,
    },
  })
}
