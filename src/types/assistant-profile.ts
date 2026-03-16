export type AssistantIntentType = "experiences" | "packages" | "planning" | "international" | "support" | "compare"

export type TravelerType = "brasil" | "international" | "unknown"

export type InterestFocus = "nature" | "culture" | "comfort" | "value" | "unspecified"

export interface AssistantProfile {
  language: "pt" | "en" | "es" | "fr"
  currency: string
  travelerType: TravelerType
  intent: AssistantIntentType | null
  interestFocus: InterestFocus
  currentRoute: string
  selectedItemSlug?: string
  checkoutIntent: boolean
  whatsappIntent: boolean
  lastInteractionAt?: string
}

export interface AssistantLeadCapture {
  name?: string
  email?: string
  whatsapp?: string
  travelerType?: TravelerType
  interestFocus?: InterestFocus
}

export interface AssistantSessionState {
  profile: AssistantProfile
  lead?: AssistantLeadCapture
  conversation: {
    stage: "intro" | "qualify" | "recommend" | "lead" | "support"
    openedCount: number
    lastIntent?: AssistantIntentType
  }
}