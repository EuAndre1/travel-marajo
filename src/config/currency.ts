export const SUPPORTED_CURRENCIES = ['BRL', 'USD', 'EUR', 'GBP', 'AOA'] as const

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

export const DEFAULT_CURRENCY: SupportedCurrency = 'BRL'

// Base: 1 BRL
export const EXCHANGE_RATES_FROM_BRL: Record<SupportedCurrency, number> = {
  BRL: 1,
  USD: 0.2,
  EUR: 0.18,
  GBP: 0.15,
  AOA: 166.75,
}