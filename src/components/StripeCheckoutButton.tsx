'use client'

import { useState } from 'react'
import type { SupportedCurrency } from '@/config/currency'

type StripeCheckoutButtonProps = {
  bookingType: 'FLIGHT' | 'HOTEL' | 'PACKAGE'
  title: string
  description: string
  unitAmount: number
  currency: SupportedCurrency
  quantity?: number
  className?: string
  children: React.ReactNode
}

export default function StripeCheckoutButton({
  bookingType,
  title,
  description,
  unitAmount,
  currency,
  quantity = 1,
  className,
  children,
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingType,
          title,
          description,
          unitAmount,
          currency,
          quantity,
        }),
      })

      const data = (await response.json()) as { checkoutUrl?: string; error?: string }

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? 'Nao foi possivel iniciar o checkout')
      }

      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error(error)
      alert('Falha ao iniciar checkout. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button type="button" onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? 'Processando...' : children}
    </button>
  )
}
