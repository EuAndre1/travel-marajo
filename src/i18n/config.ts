export const i18nConfig = {
  locales: ['pt', 'en', 'fr', 'es'],
  defaultLocale: 'pt',
} as const

export type Locale = (typeof i18nConfig.locales)[number]

export function isLocale(value: string): value is Locale {
  return i18nConfig.locales.includes(value as Locale)
}
