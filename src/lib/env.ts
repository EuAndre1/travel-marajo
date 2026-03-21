import { DEFAULT_LOCALE, LOCALE_TO_BCP47, isAppLocale, type AppLocale } from "@/config/i18n"
import {
  detectLocaleFromPathname,
  getLocalizedPath,
  resolveCanonicalRoute,
  resolveLegacyRoute,
  stripLocalePrefix,
  type AppRouteKey,
} from "@/i18n/routing"
export { ADMIN_EMAILS, getAdminEmails, isAdminEmail } from "@/lib/admin-studio/admin-config"

const FALLBACK_SITE_URL = "https://www.travelmarajo.com"

const CRITICAL_ENV_VARS = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXT_PUBLIC_SITE_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
] as const

const RECOMMENDED_ENV_VARS = [
  "NEXTAUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
] as const

export interface EnvReadinessReport {
  critical: {
    present: string[]
    missing: string[]
  }
  recommended: {
    present: string[]
    missing: string[]
  }
}

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

export function getEnvReadinessReport(): EnvReadinessReport {
  return {
    critical: {
      present: CRITICAL_ENV_VARS.filter((name) => Boolean(process.env[name])),
      missing: CRITICAL_ENV_VARS.filter((name) => !process.env[name]),
    },
    recommended: {
      present: RECOMMENDED_ENV_VARS.filter((name) => Boolean(process.env[name])),
      missing: RECOMMENDED_ENV_VARS.filter((name) => !process.env[name]),
    },
  }
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

export function resolveRequestLocale(input?: string | null): AppLocale {
  if (isAppLocale(input)) {
    return input
  }

  if (input) {
    try {
      const pathname = input.startsWith("http") ? new URL(input).pathname : input
      const detected = detectLocaleFromPathname(pathname)
      if (detected) {
        return detected
      }
    } catch {
      return DEFAULT_LOCALE
    }
  }

  return DEFAULT_LOCALE
}

export function buildLocalizedAbsoluteUrl(
  locale: AppLocale,
  routeKey: AppRouteKey,
  params?: { slug?: string },
  query?: Record<string, string | undefined>,
): string {
  const url = new URL(buildAbsoluteUrl(getLocalizedPath(locale, routeKey, params)))

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        url.searchParams.set(key, value)
      }
    }
  }

  return url.toString()
}

export function normalizeLocalizedAppPath(input: string | null | undefined, fallbackLocale: AppLocale = DEFAULT_LOCALE): string {
  if (!input) {
    return getLocalizedPath(fallbackLocale, "home")
  }

  let pathname = input
  let search = ""

  try {
    const parsed = new URL(input, "http://local.test")
    pathname = parsed.pathname
    search = parsed.search
  } catch {
    return getLocalizedPath(fallbackLocale, "home")
  }

  const detectedLocale = detectLocaleFromPathname(pathname)
  if (detectedLocale) {
    const { segments } = stripLocalePrefix(pathname)
    const matched = resolveCanonicalRoute(detectedLocale, segments)
    if (matched) {
      return `${getLocalizedPath(detectedLocale, matched.key, matched.params)}${search}`
    }
    return getLocalizedPath(fallbackLocale, "home")
  }

  const legacyMatch = resolveLegacyRoute(pathname)
  if (legacyMatch) {
    const locale = legacyMatch.locale ?? fallbackLocale
    return `${getLocalizedPath(locale, legacyMatch.key, legacyMatch.params)}${search}`
  }

  return getLocalizedPath(fallbackLocale, "home")
}
