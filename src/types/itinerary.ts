import type { ExperienceLocale, ExperienceMedia, TravelerFit } from "./experience"

export type ItineraryCategory =
  | "classic"
  | "nature"
  | "wildlife"
  | "beach"
  | "culture"
  | "fishing"
  | "family"
  | "premium"

export type BudgetLevel = "entry" | "midrange" | "premium"

export type ItineraryDifficulty = "easy" | "moderate" | "active"

export type ItineraryTravelerFit = TravelerFit

export type BookingReadiness = "inquiry_ready" | "concierge_ready" | "package_ready"

export interface ItineraryStop {
  title: string
  description: string
  destinationSlug?: string
  experienceSlug?: string
  partnerSlug?: string
}

export interface ItineraryDay {
  day: number
  title: string
  summary: string
  stops: ItineraryStop[]
}

export interface ItineraryTranslation {
  title: string
  shortDescription: string
  seasonalNotes: string
}

export interface Itinerary {
  id: string
  slug: string
  title: string
  shortDescription: string
  durationDays: number
  category: ItineraryCategory
  destinationSlugs: string[]
  travelerFit: ItineraryTravelerFit[]
  budgetLevel: BudgetLevel
  active: boolean
  featured: boolean
  difficulty: ItineraryDifficulty
  seoTitle: string
  seoDescription: string
  guideSlugs: string[]
  experienceSlugs: string[]
  partnerSlugs: string[]
  tags: string[]
  seasonalNotes: string
  bookingReadiness: BookingReadiness
  media: Pick<ExperienceMedia, "heroImage" | "altByLocale">
  days: ItineraryDay[]
  translations: Record<ExperienceLocale, ItineraryTranslation>
}
