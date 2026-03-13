"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DEFAULT_LOCALE, isAppLocale, type AppLocale } from "@/config/i18n"
import {
  detectLocaleFromPathname,
  getLocalizedPath,
  resolveCanonicalRoute,
  resolveLegacyRoute,
  stripLocalePrefix,
} from "@/i18n/routing"

export type SiteLang = AppLocale

function buildLocalizedCurrentPath(pathname: string, targetLocale: AppLocale) {
  const currentLocale = detectLocaleFromPathname(pathname)

  if (currentLocale) {
    const { segments } = stripLocalePrefix(pathname)
    const matched = resolveCanonicalRoute(currentLocale, segments)
    if (matched) {
      return getLocalizedPath(targetLocale, matched.key, matched.params)
    }
  }

  const legacyMatch = resolveLegacyRoute(pathname)
  if (legacyMatch) {
    return getLocalizedPath(targetLocale, legacyMatch.key, legacyMatch.params)
  }

  return getLocalizedPath(targetLocale, "home")
}

export function useSiteLanguage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const lang = useMemo<SiteLang>(() => {
    const detected = detectLocaleFromPathname(pathname)
    return detected ?? DEFAULT_LOCALE
  }, [pathname])

  const setLang = (value: SiteLang) => {
    if (!isAppLocale(value)) {
      return
    }

    const nextPath = buildLocalizedCurrentPath(pathname, value)
    const query = searchParams.toString()
    router.push(query ? `${nextPath}?${query}` : nextPath)
  }

  return { lang, setLang }
}
