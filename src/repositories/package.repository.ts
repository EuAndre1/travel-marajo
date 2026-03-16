import { db } from '@/database/client'

export async function listActivePackages() {
  return db.package.findMany({
    where: { isActive: true },
    include: { destination: true, packageItems: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function findPackageById(id: string) {
  return db.package.findUnique({ where: { id }, include: { destination: true, packageItems: true } })
}

export async function findPackageBySlug(slug: string) {
  return db.package.findUnique({ where: { slug }, include: { destination: true, packageItems: true } })
}
