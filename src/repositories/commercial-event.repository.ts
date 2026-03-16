import type { CommercialEvent, Prisma } from '@prisma/client'
import { db } from '@/database/client'

export async function findCommercialEventByIdempotencyKey(idempotencyKey: string) {
  return db.commercialEvent.findUnique({ where: { idempotencyKey } })
}

export async function createCommercialEvent(data: Prisma.CommercialEventCreateInput): Promise<CommercialEvent> {
  return db.commercialEvent.create({ data })
}
