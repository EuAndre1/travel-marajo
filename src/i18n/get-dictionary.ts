import { i18nConfig, type Locale } from './config'

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  pt: () => import('./messages/pt.json').then((module) => module.default),
  en: () => import('./messages/en.json').then((module) => module.default),
  fr: () => import('./messages/fr.json').then((module) => module.default),
  es: () => import('./messages/es.json').then((module) => module.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export function resolveLocale(input?: string): Locale {
  if (input && i18nConfig.locales.includes(input as Locale)) {
    return input as Locale
  }

  return i18nConfig.defaultLocale
}
