import type { SupportedCurrency } from '@/config/currency'

export type CreateCheckoutInput = {
  bookingType: 'FLIGHT' | 'HOTEL' | 'PACKAGE'
  title: string
  description: string
  unitAmount: number
  quantity?: number
  currency: SupportedCurrency
  metadata?: Record<string, string>
}