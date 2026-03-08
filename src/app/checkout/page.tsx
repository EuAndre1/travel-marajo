'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import type { CheckoutProduct, LeadSource } from '@/types'

type CheckoutProductResponse = {
  product: CheckoutProduct
}

type CheckoutSource = LeadSource

const VALID_SOURCES: CheckoutSource[] = [
  'HOME_NEWSLETTER',
  'HERO_SEARCH',
  'PACKAGES_PAGE',
  'ACTIVITIES_PAGE',
  'CHECKOUT_PAGE',
  'UNKNOWN',
]

function getSafeSource(raw: string | null): CheckoutSource {
  if (raw && VALID_SOURCES.includes(raw as CheckoutSource)) {
    return raw as CheckoutSource
  }

  return 'CHECKOUT_PAGE'
}

export default function CheckoutPage() {
  const [product, setProduct] = useState<CheckoutProduct | null>(null)
  const [source, setSource] = useState<CheckoutSource>('CHECKOUT_PAGE')
  const [quantity, setQuantity] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerWebsite, setCustomerWebsite] = useState('')
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      const params = new URLSearchParams(window.location.search)
      const type = params.get('type')
      const id = params.get('id')
      const requestSource = getSafeSource(params.get('source'))

      setSource(requestSource)

      if (!type || !id) {
        setError('Produto invalido para checkout')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/checkout/product?type=${type}&id=${id}`, { cache: 'no-store' })
        const data = (await response.json()) as CheckoutProductResponse | { error: string }

        if (!response.ok) {
          setError('error' in data ? data.error : 'Falha ao carregar produto')
          return
        }

        setProduct((data as CheckoutProductResponse).product)
      } catch {
        setError('Falha ao carregar produto')
      } finally {
        setIsLoading(false)
      }
    }

    void loadProduct()
  }, [])

  const handleCheckout = async () => {
    if (!product) {
      return
    }

    setIsSubmitting(true)
    setError('')
    setStatusMessage('Gerando sua reserva e preparando pagamento...')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: product.type,
          id: product.referenceId,
          quantity,
          startDate: startDate || undefined,
          source,
          customer: {
            name: customerName || undefined,
            email: customerEmail || undefined,
            phone: customerPhone || undefined,
            website: customerWebsite || undefined,
          },
        }),
      })

      const data = (await response.json()) as { checkoutUrl?: string; error?: string }

      if (!response.ok || !data.checkoutUrl) {
        setStatusMessage('')
        setError(data.error ?? 'Falha ao iniciar checkout')
        return
      }

      setStatusMessage('Redirecionando para pagamento seguro...')
      window.location.href = data.checkoutUrl
    } catch {
      setStatusMessage('')
      setError('Falha ao iniciar checkout')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-50 flex items-center justify-center">Carregando checkout...</div>
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center">
          <p className="text-red-600 mb-4">{error || 'Produto nao encontrado'}</p>
          <Link href="/packages" className="text-[#003366] underline">Voltar para pacotes</Link>
        </div>
      </div>
    )
  }

  const total = product.unitPrice * quantity

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-[#003366] mb-6">Checkout</h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-5">
          <div>
            <p className="text-sm text-neutral-500">Produto</p>
            <h2 className="text-xl font-semibold text-[#003366]">{product.name}</h2>
            <p className="text-sm text-neutral-600 mt-1">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Quantidade</label>
              <input
                type="number"
                min={1}
                max={20}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Data desejada (opcional)</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Nome (opcional)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail para confirmacao</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="voce@exemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Telefone (opcional)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="hidden" aria-hidden="true">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Website</label>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={customerWebsite}
                onChange={(e) => setCustomerWebsite(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-neutral-500">Total</p>
            <p className="text-3xl font-bold text-[#003366]">{formatPrice(total, product.currency, 'pt')}</p>
          </div>

          {statusMessage && <p className="text-sm text-[#003366]">{statusMessage}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Processando...' : 'Ir para pagamento'}
          </button>
        </div>
      </div>
    </div>
  )
}
