import type { AppLocale } from '@/config/i18n'
import type { SupportedCurrency } from '@/config/currency'

export type FlightSearchParams = {
  origin: string
  destination: string
  departureDate: string
  adults?: number
  currency?: SupportedCurrency
  page?: number
  pageSize?: number
}

export type FlightOffer = {
  id: string
  airline: string
  flightNumber: string
  departureAirport: string
  arrivalAirport: string
  departureTime: string
  arrivalTime: string
  price: number
  currency: SupportedCurrency
  stops: number
  duration: string
}

export type PaginatedFlightsResponse = {
  flights: FlightOffer[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  locale: AppLocale
  currency: SupportedCurrency
}