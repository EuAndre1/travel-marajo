import { normalizeCurrency } from '@/lib/money'
import {
  findPackageById,
  findPackageBySlug,
  listActivePackages,
} from '@/repositories/package.repository'
import {
  findActivityById,
  findActivityBySlug,
  listActiveActivities,
} from '@/repositories/activity.repository'
import type { ActivityModel, CheckoutItemType, CheckoutProduct, PackageModel } from '@/types'

function mapPackage(pkg: Awaited<ReturnType<typeof findPackageById>>): PackageModel {
  if (!pkg) {
    throw new Error('Package not found')
  }

  return {
    id: pkg.id,
    slug: pkg.slug,
    destinationId: pkg.destinationId,
    name: pkg.name,
    description: pkg.description,
    price: pkg.price,
    currency: normalizeCurrency(pkg.currency),
    durationDays: pkg.durationDays,
    maxTravelers: pkg.maxTravelers,
    packageItems: pkg.packageItems.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      order: item.order,
      isOptional: item.isOptional,
    })),
    images: pkg.images,
    isActive: pkg.isActive,
  }
}

function mapActivity(activity: Awaited<ReturnType<typeof findActivityById>>): ActivityModel {
  if (!activity) {
    throw new Error('Activity not found')
  }

  return {
    id: activity.id,
    slug: activity.slug,
    destinationId: activity.destinationId,
    name: activity.name,
    shortDescription: activity.shortDescription,
    description: activity.description,
    price: activity.price,
    currency: normalizeCurrency(activity.currency),
    durationMinutes: activity.durationMinutes,
    maxParticipants: activity.maxParticipants,
    category: activity.category,
    images: activity.images,
    isActive: activity.isActive,
  }
}

export async function getPackagesCatalog(): Promise<PackageModel[]> {
  const packages = await listActivePackages()
  return packages.map((item) => mapPackage(item))
}

export async function getActivitiesCatalog(): Promise<ActivityModel[]> {
  const activities = await listActiveActivities()
  return activities.map((item) => mapActivity(item))
}

export async function getPackageById(id: string): Promise<PackageModel> {
  return mapPackage(await findPackageById(id))
}

export async function getActivityById(id: string): Promise<ActivityModel> {
  return mapActivity(await findActivityById(id))
}

export async function getCheckoutProduct(input: {
  type: CheckoutItemType
  idOrSlug: string
}): Promise<CheckoutProduct> {
  if (input.type === 'PACKAGE') {
    const pkg = (await findPackageById(input.idOrSlug)) ?? (await findPackageBySlug(input.idOrSlug))

    if (!pkg) {
      throw new Error('Package not found')
    }

    return {
      type: 'PACKAGE',
      referenceId: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      description: pkg.description,
      unitPrice: pkg.price,
      currency: normalizeCurrency(pkg.currency),
      image: pkg.images[0] ?? null,
    }
  }

  const activity =
    (await findActivityById(input.idOrSlug)) ?? (await findActivityBySlug(input.idOrSlug))

  if (!activity) {
    throw new Error('Activity not found')
  }

  return {
    type: 'ACTIVITY',
    referenceId: activity.id,
    slug: activity.slug,
    name: activity.name,
    description: activity.shortDescription ?? activity.description,
    unitPrice: activity.price,
    currency: normalizeCurrency(activity.currency),
    image: activity.images[0] ?? null,
  }
}
