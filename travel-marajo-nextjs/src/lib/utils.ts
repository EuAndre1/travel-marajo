import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string, locale: string = 'pt-BR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function formatDate(date: string | Date, locale: string = 'pt-BR') {
  return new Date(date).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
