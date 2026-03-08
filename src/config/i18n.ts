export const SUPPORTED_LOCALES = ['pt', 'en', 'fr', 'es'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'pt'

export const LOCALE_TO_BCP47: Record<AppLocale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
}