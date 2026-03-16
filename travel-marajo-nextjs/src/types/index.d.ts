import { User as NextAuthUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends NextAuthUser {
    id: string
  }
  
  interface Session {
    user: User
  }
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departureAirport: string
  arrivalAirport: string
  departureTime: string
  arrivalTime: string
  price: number
  currency: string
  stops?: number
  duration?: string
}

export interface Hotel {
  id: string
  name: string
  type: string
  description: string
  city: string
  country: string
  pricePerNight: number
  currency: string
  rating?: number
  images: string[]
  amenities: string[]
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  currency: string
  durationDays: number
  includes: string[]
  destinations: string[]
  images: string[]
}

export interface Destination {
  id: string
  name: string
  description: string
  images: string[]
  country: string
  state: string
}
