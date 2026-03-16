import type { AssistantLocale } from "@/data/assistant-copy"
import { getRouteContext, resolveWhatsAppTemplate } from "@/lib/assistant-rules"

interface WhatsAppContext {
  lang: AssistantLocale
  pathname: string
  intent?: "experiences" | "packages" | "planning" | "international"
}

export function buildWhatsAppMessage(context: WhatsAppContext): string {
  const route = getRouteContext(context.pathname)

  if (route.section === "experiences" && route.slug) {
    return resolveWhatsAppTemplate(context.lang, "experience").replace("{item}", humanizeSlug(route.slug))
  }

  if (route.section === "packages" && route.slug) {
    return resolveWhatsAppTemplate(context.lang, "package").replace("{item}", humanizeSlug(route.slug))
  }

  return resolveWhatsAppTemplate(context.lang, "default")
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = phone.replace(/\D/g, "")
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${normalized}?text=${encoded}`
}

function humanizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}