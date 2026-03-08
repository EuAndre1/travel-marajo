import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { normalizeCurrency, resolveBCP47Locale } from './money'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string, locale: string = 'pt') {
  return new Intl.NumberFormat(resolveBCP47Locale(locale), {
    style: 'currency',
    currency: normalizeCurrency(currency),
  }).format(price)
}

export function formatDate(date: string | Date, locale: string = 'pt') {
  return new Date(date).toLocaleDateString(resolveBCP47Locale(locale), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}