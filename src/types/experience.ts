export type ExperienceLocale = "pt" | "en" | "es" | "fr"

export type ExperienceCategory =
  | "beach"
  | "culture"
  | "wildlife"
  | "boat"
  | "fishing"
  | "horseback"
  | "food"

export type BookingMode = "direct_checkout" | "manual_request" | "concierge"

export type AvailabilityMode = "on_request" | "seasonal" | "scheduled"

export type ExperienceDifficulty = "easy" | "moderate" | "active"

export type TravelerFit =
  | "first_time"
  | "families"
  | "photographers"
  | "nature_lovers"
  | "culture_seekers"
  | "soft_adventure"
  | "wildlife_seekers"
  | "premium_travelers"

export interface ExperienceTranslation {
  title: string
  shortDescription: string
  fullDescription: string
  locationLabel: string
  durationLabel: string
  highlights: string[]
  included: string[]
}

export interface ExperienceMedia {
  heroImage: string
  galleryImages: string[]
  altByLocale?: Partial<Record<ExperienceLocale, string>>
}

export interface Experience {
  id: string
  slug: string
  title: string
  shortDescription: string
  category: ExperienceCategory
  destinationSlug: string
  locationLabel: string
  duration: string
  priceFrom: number
  currency: string
  bookingMode: BookingMode
  availabilityMode: AvailabilityMode
  partnerSlug?: string
  featured: boolean
  active: boolean
  seoTitle: string
  seoDescription: string
  guideSlugs: string[]
  itinerarySlugs: string[]
  relatedExperienceSlugs: string[]
  tags: string[]
  difficulty: ExperienceDifficulty
  travelerFit: TravelerFit[]
  media: ExperienceMedia
  translations: Record<ExperienceLocale, ExperienceTranslation>
  ratingValue?: number
}

export interface ExperienceCatalogEntry {
  slug: string
  title: string
  category: ExperienceCategory
  destinationSlug: string
  priceFrom: number
  currency: string
  bookingMode: BookingMode
  availabilityMode: AvailabilityMode
  featured: boolean
  active: boolean
}
