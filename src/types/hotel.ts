import type { SupportedCurrency } from '@/config/currency'

export type HotelSearchParams = {
  destination: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  page?: number
  pageSize?: number
  currency?: SupportedCurrency
}

export type HotelResult = {
  id: string
  name: string
  city: string
  country: string
  rating: number
  pricePerNight: number
  currency: SupportedCurrency
  imageUrl?: string
  reviewCount?: number
}

export type PaginatedHotelsResponse = {
  hotels: HotelResult[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  destination: string
  filters: {
    minPrice?: number
    maxPrice?: number
    minRating?: number
  }
  currency: SupportedCurrency
}