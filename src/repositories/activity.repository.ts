import { db } from '@/database/client'

export async function listActiveActivities() {
  return db.activity.findMany({
    where: { isActive: true },
    include: { destination: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function findActivityById(id: string) {
  return db.activity.findUnique({ where: { id }, include: { destination: true } })
}

export async function findActivityBySlug(slug: string) {
  return db.activity.findUnique({ where: { slug }, include: { destination: true } })
}
