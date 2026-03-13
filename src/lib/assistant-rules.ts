import type { AssistantLocale } from "@/data/assistant-copy"
import { assistantCopy } from "@/data/assistant-copy"

export type AssistantIntent =
  | "experiences"
  | "packages"
  | "planning"
  | "international"
  | "whatsapp"
  | "compare"
  | "support"

export interface AssistantContext {
  lang: AssistantLocale
  currency: string
  pathname: string
  secondsOnPage: number
}

export interface AssistantRouteContext {
  section: "home" | "experiences" | "packages" | "destinations" | "guide" | "offers" | "other"
  slug?: string
}

export interface QuickReply {
  label: string
  intent: AssistantIntent
}

export function getRouteContext(pathname: string): AssistantRouteContext {
  if (pathname === "/") return { section: "home" }
  if (pathname.startsWith("/experiencias")) {
    const slug = pathname.split("/")[2]
    return { section: "experiences", slug }
  }
  if (pathname.startsWith("/pacotes")) {
    const slug = pathname.split("/")[2]
    return { section: "packages", slug }
  }
  if (pathname.startsWith("/destinos")) {
    const slug = pathname.split("/")[2]
    return { section: "destinations", slug }
  }
  if (pathname.startsWith("/guia")) return { section: "guide" }
  if (pathname.startsWith("/ofertas")) return { section: "offers" }
  return { section: "other" }
}

export function getQuickReplies(locale: AssistantLocale): QuickReply[] {
  const copy = assistantCopy[locale]
  return [
    { label: copy.quickReplies.experiences, intent: "experiences" },
    { label: copy.quickReplies.packages, intent: "packages" },
    { label: copy.quickReplies.planning, intent: "planning" },
    { label: copy.quickReplies.international, intent: "international" },
    { label: copy.quickReplies.whatsapp, intent: "whatsapp" },
  ]
}

export function getProactiveMessage(context: AssistantContext): string | null {
  const copy = assistantCopy[context.lang]
  const route = getRouteContext(context.pathname)

  if (route.section === "packages" && context.secondsOnPage >= 25) {
    return copy.proactive.packages
  }

  if (route.section === "experiences" && context.secondsOnPage >= 18) {
    return copy.proactive.experiences
  }

  const isInternational = context.lang !== "pt" || context.currency !== "BRL"
  if (isInternational && context.secondsOnPage >= 12) {
    return copy.proactive.international
  }

  return null
}

export function getIntentResponse(intent: AssistantIntent, context: AssistantContext): string {
  const copy = assistantCopy[context.lang]
  const route = getRouteContext(context.pathname)
  const itemLabel = route.slug ? humanizeSlug(route.slug) : ""

  switch (intent) {
    case "experiences":
      return copy.intents.experiences
    case "packages":
      return copy.intents.packages
    case "planning":
      return copy.intents.planning
    case "international":
      return copy.intents.international
    case "compare":
      if (itemLabel) {
        return `${copy.intents.compare} (${itemLabel})`
      }
      return copy.intents.compare
    case "support":
      return copy.intents.support
    default:
      return copy.intents.support
  }
}

export function resolveAssistantTitle(locale: AssistantLocale): string {
  return assistantCopy[locale].title
}

export function resolveWhatsAppTemplate(locale: AssistantLocale, type: "default" | "experience" | "package"): string {
  return assistantCopy[locale].whatsappTemplates[type]
}

function humanizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}