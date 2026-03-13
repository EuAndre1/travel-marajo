import { DEFAULT_CURRENCY } from '@/config/currency'
import { getOptionalEnv } from '@/lib/env'
import { normalizeCurrency } from '@/lib/money'
import type { HotelResult, HotelSearchParams, PaginatedHotelsResponse } from '@/types/hotel'

type BookingDestination = {
  dest_id: string
  name: string
  region?: string
  country?: string
}

type BookingHotel = {
  hotel_id?: string | number
  id?: string | number
  hotel_name?: string
  name?: string
  city?: string
  country?: string
  review_score?: number
  review_nr?: number
  price_breakdown?: {
    gross_price?: number
  }
  min_total_price?: number
  max_photo_url?: string
}

type RapidApiConfig = {
  baseUrl: string
  apiKey: string
  host: string
  mockMode: boolean
}

const MOCK_DESTINATIONS: BookingDestination[] = [
  { dest_id: 'marajo', name: 'Ilha de Marajo', region: 'Para', country: 'Brazil' },
  { dest_id: 'belem', name: 'Belem', region: 'Para', country: 'Brazil' },
  { dest_id: 'salvaterra', name: 'Salvaterra', region: 'Para', country: 'Brazil' },
]

const MOCK_HOTELS: Omit<HotelResult, 'currency'>[] = [
  {
    id: 'mock-hotel-1',
    name: 'Hotel Encanto do Marajo',
    city: 'Soure',
    country: 'Brazil',
    rating: 8.9,
    pricePerNight: 320,
    imageUrl: '/oferta-hotel.jpg',
    reviewCount: 128,
  },
  {
    id: 'mock-hotel-2',
    name: 'Pousada Manguezais',
    city: 'Salvaterra',
    country: 'Brazil',
    rating: 8.2,
    pricePerNight: 240,
    imageUrl: '/destino-manguezais.jpg',
    reviewCount: 84,
  },
  {
    id: 'mock-hotel-3',
    name: 'Marajo Eco Lodge',
    city: 'Soure',
    country: 'Brazil',
    rating: 9.1,
    pricePerNight: 410,
    imageUrl: '/newsletter-traveler.jpg',
    reviewCount: 203,
  },
  {
    id: 'mock-hotel-4',
    name: 'Pousada Praia do Marajo',
    city: 'Soure',
    country: 'Brazil',
    rating: 7.9,
    pricePerNight: 190,
    imageUrl: '/hero-bg.jpg',
    reviewCount: 47,
  },
]

function isInvalidDemoKey(apiKey?: string): boolean {
  if (!apiKey) {
    return true
  }

  const normalized = apiKey.trim().toLowerCase()
  return normalized.length < 10 || normalized === 'demo_key' || normalized.includes('your_')
}

function getRapidApiConfig(): RapidApiConfig {
  const baseUrl = getOptionalEnv('BOOKING_COM_API_URL', 'https://booking-com15.p.rapidapi.com/api/v1')
  const apiKey = getOptionalEnv('BOOKING_COM_API_KEY', '')
  const host = getOptionalEnv('BOOKING_COM_API_HOST', 'booking-com15.p.rapidapi.com')

  return {
    baseUrl,
    apiKey,
    host,
    mockMode: isInvalidDemoKey(apiKey),
  }
}

function mapHotel(hotel: BookingHotel, currency: string): HotelResult {
  return {
    id: String(hotel.hotel_id ?? hotel.id ?? ''),
    name: hotel.hotel_name ?? hotel.name ?? 'Hotel',
    city: hotel.city ?? '',
    country: hotel.country ?? '',
    rating: Number(hotel.review_score ?? 0),
    pricePerNight: Number(hotel.price_breakdown?.gross_price ?? hotel.min_total_price ?? 0),
    currency: normalizeCurrency(currency),
    imageUrl: hotel.max_photo_url,
    reviewCount: Number(hotel.review_nr ?? 0),
  }
}

function getMockDestinations(query: string): BookingDestination[] {
  const normalizedQuery = query.trim().toLowerCase()
  return MOCK_DESTINATIONS.filter((item) => item.name.toLowerCase().includes(normalizedQuery))
}

function getMockHotels(params: HotelSearchParams): PaginatedHotelsResponse {
  const page = Math.max(params.page ?? 1, 1)
  const pageSize = Math.min(Math.max(params.pageSize ?? 10, 1), 50)
  const currency = normalizeCurrency(params.currency ?? DEFAULT_CURRENCY)

  const filtered = MOCK_HOTELS
    .map((hotel) => ({ ...hotel, currency }))
    .filter((hotel) => {
      if (params.minRating && hotel.rating < params.minRating) {
        return false
      }

      if (params.minPrice && hotel.pricePerNight < params.minPrice) {
        return false
      }

      if (params.maxPrice && hotel.pricePerNight > params.maxPrice) {
        return false
      }

      return true
    })

  const total = filtered.length
  const totalPages = Math.max(Math.ceil(total / pageSize), 1)
  const start = (page - 1) * pageSize
  const hotels = filtered.slice(start, start + pageSize)

  return {
    hotels,
    page,
    pageSize,
    total,
    totalPages,
    destination: params.destination,
    filters: {
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      minRating: params.minRating,
    },
    currency,
  }
}

async function fetchWithRapidApi(url: string, config: RapidApiConfig): Promise<Response> {
  return fetch(url, {
    headers: {
      'x-rapidapi-key': config.apiKey,
      'x-rapidapi-host': config.host,
    },
    cache: 'no-store',
  })
}

export async function searchBookingDestinations(query: string): Promise<BookingDestination[]> {
  const config = getRapidApiConfig()

  if (config.mockMode) {
    console.warn('[booking-hotel] using mock destinations (missing/invalid BOOKING_COM_API_KEY)')
    return getMockDestinations(query)
  }

  try {
    const response = await fetchWithRapidApi(
      `${config.baseUrl}/hotels/searchDestination?query=${encodeURIComponent(query)}`,
      config
    )

    if (!response.ok) {
      console.warn('[booking-hotel] destination API failed, using mock data', {
        status: response.status,
      })
      return getMockDestinations(query)
    }

    const payload = (await response.json()) as { data?: BookingDestination[] }
    return payload.data ?? []
  } catch (error) {
    console.warn('[booking-hotel] destination API error, using mock data', {
      message: error instanceof Error ? error.message : 'unknown',
    })
    return getMockDestinations(query)
  }
}

export async function searchHotels(params: HotelSearchParams): Promise<PaginatedHotelsResponse> {
  const config = getRapidApiConfig()

  if (config.mockMode) {
    console.warn('[booking-hotel] using mock hotels (missing/invalid BOOKING_COM_API_KEY)')
    return getMockHotels(params)
  }

  const page = Math.max(params.page ?? 1, 1)
  const pageSize = Math.min(Math.max(params.pageSize ?? 10, 1), 50)
  const currency = normalizeCurrency(params.currency ?? DEFAULT_CURRENCY)

  try {
    const response = await fetchWithRapidApi(
      `${config.baseUrl}/hotels/searchHotels?dest_id=${encodeURIComponent(
        params.destination
      )}&search_type=CITY&adults=1&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=${currency}`,
      config
    )

    if (!response.ok) {
      console.warn('[booking-hotel] hotel API failed, using mock data', {
        status: response.status,
      })
      return getMockHotels(params)
    }

    const payload = (await response.json()) as {
      data?: {
        hotels?: BookingHotel[]
        result?: BookingHotel[]
      }
    }

    const rawHotels = payload.data?.hotels ?? payload.data?.result ?? []

    const filteredHotels = rawHotels
      .map((hotel) => mapHotel(hotel, currency))
      .filter((hotel) => {
        if (params.minRating && hotel.rating < params.minRating) {
          return false
        }

        if (params.minPrice && hotel.pricePerNight < params.minPrice) {
          return false
        }

        if (params.maxPrice && hotel.pricePerNight > params.maxPrice) {
          return false
        }

        return true
      })

    const total = filteredHotels.length
    const totalPages = Math.max(Math.ceil(total / pageSize), 1)
    const start = (page - 1) * pageSize
    const hotels = filteredHotels.slice(start, start + pageSize)

    return {
      hotels,
      page,
      pageSize,
      total,
      totalPages,
      destination: params.destination,
      filters: {
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minRating: params.minRating,
      },
      currency,
    }
  } catch (error) {
    console.warn('[booking-hotel] hotel API error, using mock data', {
      message: error instanceof Error ? error.message : 'unknown',
    })
    return getMockHotels(params)
  }
}
