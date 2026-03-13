import type { Lead, Prisma } from '@prisma/client'
import { db } from '@/database/client'

export async function createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
  return db.lead.create({ data })
}
