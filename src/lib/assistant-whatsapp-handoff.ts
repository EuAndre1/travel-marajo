import type { AssistantProfile } from "@/types/assistant-profile"
import { assistantCopy } from "@/data/assistant-copy"
import { getRouteContext } from "@/lib/assistant-rules"

interface WhatsAppHandoffContext {
  lang: "pt" | "en" | "es" | "fr"
  pathname: string
  profile: AssistantProfile
}

export function buildWhatsAppHandoffMessage(context: WhatsAppHandoffContext): string {
  const copy = assistantCopy[context.lang]
  const route = getRouteContext(context.pathname)

  const base = resolveBaseTemplate(context.lang, route.section, route.slug)
  const summary = buildProfileSummary(context.lang, context.profile)

  if (!summary) return base
  return `${base} ${summary}`
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = phone.replace(/\D/g, "")
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${normalized}?text=${encoded}`
}

function resolveBaseTemplate(
  lang: "pt" | "en" | "es" | "fr",
  section: string,
  slug?: string
): string {
  const copy = assistantCopy[lang]
  if (section === "experiences" && slug) {
    return copy.whatsappTemplates.experience.replace("{item}", humanizeSlug(slug))
  }
  if (section === "packages" && slug) {
    return copy.whatsappTemplates.package.replace("{item}", humanizeSlug(slug))
  }
  return copy.whatsappTemplates.default
}

function buildProfileSummary(lang: "pt" | "en" | "es" | "fr", profile: AssistantProfile): string {
  const summaryPieces: string[] = []
  const copy = assistantCopy[lang].handoff

  if (profile.travelerType === "international") {
    summaryPieces.push(copy.travelerInternational)
  }

  if (profile.travelerType === "brasil") {
    summaryPieces.push(copy.travelerBrasil)
  }

  if (profile.intent) {
    summaryPieces.push(copy.intentLabel.replace("{intent}", mapIntentLabel(lang, profile.intent)))
  }

  if (profile.interestFocus && profile.interestFocus !== "unspecified") {
    summaryPieces.push(copy.focusLabel.replace("{focus}", mapFocusLabel(lang, profile.interestFocus)))
  }

  if (summaryPieces.length === 0) return ""
  return copy.summaryPrefix + " " + summaryPieces.join(", ") + "."
}

function mapIntentLabel(lang: "pt" | "en" | "es" | "fr", intent: string): string {
  const labels = assistantCopy[lang].handoff.intentOptions
  return labels[intent as keyof typeof labels] ?? intent
}

function mapFocusLabel(lang: "pt" | "en" | "es" | "fr", focus: string): string {
  const labels = assistantCopy[lang].handoff.focusOptions
  return labels[focus as keyof typeof labels] ?? focus
}

function humanizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}