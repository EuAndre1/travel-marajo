import {
  DEFAULT_CURRENCY,
  EXCHANGE_RATES_FROM_BRL,
  SUPPORTED_CURRENCIES,
  type SupportedCurrency,
} from '@/config/currency'
import { DEFAULT_LOCALE, LOCALE_TO_BCP47, type AppLocale } from '@/config/i18n'

export function isSupportedCurrency(currency: string): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency)
}

export function normalizeCurrency(currency?: string): SupportedCurrency {
  const normalized = (currency ?? '').trim().toUpperCase()
  return isSupportedCurrency(normalized) ? normalized : DEFAULT_CURRENCY
}

export function convertCurrency(
  amount: number,
  from: SupportedCurrency,
  to: SupportedCurrency
): number {
  if (from === to) {
    return amount
  }

  const amountInBrl = amount / EXCHANGE_RATES_FROM_BRL[from]
  const convertedAmount = amountInBrl * EXCHANGE_RATES_FROM_BRL[to]

  return Number(convertedAmount.toFixed(2))
}

export function resolveBCP47Locale(locale?: string): string {
  const normalized = (locale ?? '').trim().toLowerCase() as AppLocale
  const appLocale = LOCALE_TO_BCP47[normalized] ? normalized : DEFAULT_LOCALE
  return LOCALE_TO_BCP47[appLocale]
}