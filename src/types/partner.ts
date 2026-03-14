import type { ExperienceLocale } from "./experience"

export type PartnerType =
  | "hotel"
  | "pousada"
  | "tour_operator"
  | "local_guide"
  | "transport"
  | "restaurant"
  | "service_provider"

export type ContactMode = "platform_request" | "email" | "phone" | "website"

export type CommissionModel = "manual_contract" | "percentage" | "fixed_referral" | "lead_fee" | "none"

export type VerificationStatus = "unverified" | "pending_review" | "verified"

export type OnboardingStatus = "prospect" | "invited" | "active" | "paused"

export interface PartnerMedia {
  logoImage?: string
  coverImage?: string
}

export interface Partner {
  id: string
  slug: string
  name: string
  type: PartnerType
  destinationSlug: string
  locationLabel: string
  shortDescription: string
  active: boolean
  featured: boolean
  contactMode: ContactMode
  contactEmail?: string
  contactPhone?: string
  websiteUrl?: string
  commissionModel: CommissionModel
  commissionValue?: number
  payoutNotes?: string
  commercialNotes?: string
  supportedLanguages: ExperienceLocale[]
  experienceSlugs: string[]
  serviceSlugs: string[]
  tags: string[]
  verificationStatus: VerificationStatus
  onboardingStatus: OnboardingStatus
  media: PartnerMedia
}

export interface PartnerCatalogEntry {
  slug: string
  name: string
  type: PartnerType
  destinationSlug: string
  active: boolean
  featured: boolean
  verificationStatus: VerificationStatus
  onboardingStatus: OnboardingStatus
}
