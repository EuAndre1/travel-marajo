import { DEFAULT_LOCALE, LOCALE_TO_BCP47, type AppLocale } from "@/config/i18n"

const FALLBACK_SITE_URL = "https://www.travelmarajo.com"

export function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getOptionalEnv(name: string, defaultValue = ""): string {
  return process.env[name] ?? defaultValue
}

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL ?? FALLBACK_SITE_URL

  try {
    return new URL(siteUrl).toString().replace(/\/$/, "")
  } catch {
    return FALLBACK_SITE_URL
  }
}

export function buildAbsoluteUrl(pathname: string): string {
  return new URL(pathname, `${getSiteUrl()}/`).toString()
}

export function getSafeAuthSecret(): string | undefined {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing required environment variable: NEXTAUTH_SECRET")
  }

  return "dev-only-nextauth-secret-change-me"
}

export function getResolvedLocale(value?: string | null): AppLocale {
  return value && value in LOCALE_TO_BCP47 ? (value as AppLocale) : DEFAULT_LOCALE
}

export function resolveBCP47Locale(locale?: string | null): string {
  return LOCALE_TO_BCP47[getResolvedLocale(locale)]
}
