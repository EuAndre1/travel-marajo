import { DEFAULT_CURRENCY, type SupportedCurrency } from '@/config/currency'
import { DEFAULT_LOCALE, type AppLocale } from '@/config/i18n'
import { getOptionalEnv, getRequiredEnv } from '@/lib/env'
import { normalizeCurrency } from '@/lib/money'
import type { FlightOffer, FlightSearchParams, PaginatedFlightsResponse } from '@/types/flight'

type AmadeusFlightOffer = {
  id: string
  itineraries: Array<{
    duration: string
    segments: Array<{
      departure: { iataCode: string; at: string }
      arrival: { iataCode: string; at: string }
      carrierCode: string
      number: string
    }>
  }>
  price: { total: string; currency: string }
  validatingAirlineCodes?: string[]
}

type AmadeusTokenResponse = {
  access_token: string
  expires_in: number
}

type TokenCache = {
  token: string
  expiresAt: number
}

let tokenCache: TokenCache | null = null

function formatDuration(duration: string): string {
  const hours = duration.match(/(\d+)H/)?.[1] ?? '0'
  const minutes = duration.match(/(\d+)M/)?.[1] ?? '0'
  return `${hours}h${minutes.padStart(2, '0')}m`
}

async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.token
  }

  const clientId = getRequiredEnv('AMADEUS_API_KEY')
  const clientSecret = getRequiredEnv('AMADEUS_API_SECRET')
  const baseUrl = getOptionalEnv('AMADEUS_BASE_URL', 'https://test.api.amadeus.com')

  const response = await fetch(`${baseUrl}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    cache: 'no-store',
  })

  if (!response.ok) {
    const payload = await response.text()
    throw new Error(`Amadeus auth failed: ${payload}`)
  }

  const data = (await response.json()) as AmadeusTokenResponse

  tokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in - 30) * 1000,
  }

  return data.access_token
}

function mapFlight(offer: AmadeusFlightOffer, fallbackCurrency: SupportedCurrency): FlightOffer {
  const firstItinerary = offer.itineraries[0]
  const firstSegment = firstItinerary?.segments[0]
  const lastSegment = firstItinerary?.segments[firstItinerary.segments.length - 1]
  const currency = normalizeCurrency(offer.price?.currency ?? fallbackCurrency)

  return {
    id: offer.id,
    airline: offer.validatingAirlineCodes?.[0] ?? firstSegment?.carrierCode ?? 'N/A',
    flightNumber: `${firstSegment?.carrierCode ?? ''}${firstSegment?.number ?? ''}`,
    departureAirport: firstSegment?.departure.iataCode ?? 'N/A',
    arrivalAirport: lastSegment?.arrival.iataCode ?? 'N/A',
    departureTime: firstSegment?.departure.at ?? '',
    arrivalTime: lastSegment?.arrival.at ?? '',
    price: Number(offer.price.total),
    currency,
    stops: Math.max((firstItinerary?.segments.length ?? 1) - 1, 0),
    duration: formatDuration(firstItinerary?.duration ?? 'PT0H0M'),
  }
}

export async function searchFlights(
  params: FlightSearchParams,
  locale: AppLocale = DEFAULT_LOCALE
): Promise<PaginatedFlightsResponse> {
  const token = await getAccessToken()
  const baseUrl = getOptionalEnv('AMADEUS_BASE_URL', 'https://test.api.amadeus.com')

  const page = Math.max(params.page ?? 1, 1)
  const pageSize = Math.min(Math.max(params.pageSize ?? 10, 1), 50)
  const currency = normalizeCurrency(params.currency ?? DEFAULT_CURRENCY)

  const query = new URLSearchParams({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    adults: String(params.adults ?? 1),
    currencyCode: currency,
    max: '100',
  })

  const response = await fetch(`${baseUrl}/v2/shopping/flight-offers?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  const payload = (await response.json()) as {
    data?: AmadeusFlightOffer[]
    errors?: Array<{ detail?: string }>
  }

  if (!response.ok) {
    const detail = payload.errors?.[0]?.detail ?? 'Amadeus flight search failed'
    throw new Error(detail)
  }

  const allFlights = (payload.data ?? []).map((offer) => mapFlight(offer, currency))
  const total = allFlights.length
  const totalPages = Math.max(Math.ceil(total / pageSize), 1)
  const start = (page - 1) * pageSize
  const flights = allFlights.slice(start, start + pageSize)

  return {
    flights,
    page,
    pageSize,
    total,
    totalPages,
    locale,
    currency,
  }
}