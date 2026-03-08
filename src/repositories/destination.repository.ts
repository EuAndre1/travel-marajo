import { db } from '@/database/client'

export async function listActiveDestinations() {
  return db.destination.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })
}

export async function findDestinationBySlug(slug: string) {
  return db.destination.findUnique({ where: { slug } })
}
