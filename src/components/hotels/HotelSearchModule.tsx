'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import StripeCheckoutButton from '@/components/StripeCheckoutButton'
import { normalizeCurrency } from '@/lib/money'
import { formatPrice } from '@/lib/utils'
import type { HotelResult } from '@/types'

type HotelSearchResponse = {
  hotels: HotelResult[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  currency: string
}

export default function HotelSearchModule() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<HotelResult[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currency, setCurrency] = useState('BRL')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const destination = searchParams.get('destination') ?? ''
  const minPrice = searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const minRating = searchParams.get('minRating') ?? ''
  const queryCurrency = searchParams.get('currency') ?? 'BRL'

  useEffect(() => {
    setPage(1)
  }, [destination, minPrice, maxPrice, minRating, queryCurrency])

  useEffect(() => {
    if (!destination) {
      setError('Informe um destino para buscar hoteis.')
      setHotels([])
      return
    }

    const controller = new AbortController()

    const fetchHotels = async () => {
      setIsLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          destination,
          currency: queryCurrency,
          page: String(page),
          pageSize: '9',
        })

        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (minRating) params.set('minRating', minRating)

        const response = await fetch(`/api/hotels/search?${params.toString()}`, {
          signal: controller.signal,
        })

        const data = (await response.json()) as HotelSearchResponse | { error: string }

        if (!response.ok) {
          const apiError = 'error' in data ? data.error : 'Erro ao buscar hoteis'
          setError(apiError)
          setHotels([])
          return
        }

        const payload = data as HotelSearchResponse
        setHotels(payload.hotels)
        setTotalPages(payload.totalPages)
        setCurrency(payload.currency)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Falha de conexao ao buscar hoteis.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void fetchHotels()

    return () => controller.abort()
  }, [destination, minPrice, maxPrice, minRating, queryCurrency, page])

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && hotels.length === 0 && <p className="text-neutral-600">Nenhum hotel encontrado.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <article key={hotel.id} className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <h3 className="text-lg font-semibold text-neutral-800">{hotel.name}</h3>
            <p className="text-sm text-neutral-500">
              {hotel.city}, {hotel.country}
            </p>
            <p className="text-sm text-neutral-600 mt-2">Rating: {hotel.rating.toFixed(1)}</p>
            <p className="text-xl font-bold text-primary mt-2">
              {formatPrice(hotel.pricePerNight, currency, 'pt')}
            </p>
            <div className="mt-4">
              <StripeCheckoutButton
                bookingType="HOTEL"
                title={hotel.name}
                description={`${hotel.city}, ${hotel.country}`}
                unitAmount={hotel.pricePerNight}
                currency={normalizeCurrency(currency)}
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Reservar
              </StripeCheckoutButton>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-neutral-600">
            Pagina {page} de {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50"
          >
            Proxima
          </button>
        </div>
      )}
    </div>
  )
}
