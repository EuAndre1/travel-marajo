export type CommercialCurrency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'AOA'

export type DestinationModel = {
  id: string
  slug: string
  name: string
  shortDescription: string | null
  heroImage: string | null
  country: string
  state: string
  city: string | null
}

export type PackageItemModel = {
  id: string
  type: 'ACCOMMODATION' | 'TRANSFER' | 'ACTIVITY' | 'SERVICE' | 'MEAL' | 'OTHER'
  title: string
  description: string | null
  quantity: number
  order: number
  isOptional: boolean
}

export type PackageModel = {
  id: string
  slug: string
  destinationId: string | null
  name: string
  description: string
  price: number
  currency: CommercialCurrency
  durationDays: number
  maxTravelers: number | null
  packageItems: PackageItemModel[]
  images: string[]
  isActive: boolean
}

export type ActivityModel = {
  id: string
  slug: string
  destinationId: string
  name: string
  shortDescription: string | null
  description: string
  price: number
  currency: CommercialCurrency
  durationMinutes: number | null
  maxParticipants: number | null
  category: string | null
  images: string[]
  isActive: boolean
}

export type CheckoutItemType = 'PACKAGE' | 'ACTIVITY'

export type CheckoutProduct = {
  type: CheckoutItemType
  referenceId: string
  slug: string
  name: string
  description: string
  unitPrice: number
  currency: CommercialCurrency
  image: string | null
}
