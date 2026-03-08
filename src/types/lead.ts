export type LeadSource =
  | 'HOME_NEWSLETTER'
  | 'HERO_SEARCH'
  | 'PACKAGES_PAGE'
  | 'ACTIVITIES_PAGE'
  | 'CHECKOUT_PAGE'
  | 'UNKNOWN'

export type LeadIntentType =
  | 'NEWSLETTER'
  | 'DESTINATION'
  | 'PACKAGE'
  | 'ACTIVITY'
  | 'CHECKOUT'
  | 'GENERAL'

export type CaptureLeadInput = {
  source: LeadSource
  intentType: LeadIntentType
  email?: string
  name?: string
  phone?: string
  language?: string
  currency?: 'BRL' | 'USD' | 'EUR' | 'GBP' | 'AOA'
  country?: string
  userId?: string
  destinationId?: string
  packageId?: string
  activityId?: string
  metadata?: Record<string, unknown>
}
