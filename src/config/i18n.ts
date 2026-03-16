export const SUPPORTED_LOCALES = ["pt", "en", "es", "fr"] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = "pt"

export const LOCALE_TO_BCP47: Record<AppLocale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
}

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value != null && SUPPORTED_LOCALES.includes(value as AppLocale)
}
