'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FlightCard from '@/components/FlightCard'
import type { FlightOffer } from '@/types'

type FlightResponse = {
  flights: FlightOffer[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export default function FlightSearchModule() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<FlightOffer[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const origin = searchParams.get('origin') ?? ''
  const destination = searchParams.get('destination') ?? ''
  const departureDate = searchParams.get('departureDate') ?? ''
  const adults = searchParams.get('adults') ?? '1'
  const currency = searchParams.get('currency') ?? 'BRL'

  useEffect(() => {
    setPage(1)
  }, [origin, destination, departureDate, adults, currency])

  useEffect(() => {
    if (!origin || !destination || !departureDate) {
      setFlights([])
      setError('Selecione origem, destino e data para pesquisar voos.')
      return
    }

    const controller = new AbortController()

    const fetchFlights = async () => {
      setIsLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          origin,
          destination,
          departureDate,
          adults,
          currency,
          page: String(page),
          pageSize: '6',
        })

        const response = await fetch(`/api/flights/search?${params.toString()}`, {
          signal: controller.signal,
        })

        const data = (await response.json()) as FlightResponse | { error: string }

        if (!response.ok) {
          const apiError = 'error' in data ? data.error : 'Erro ao buscar voos'
          setError(apiError)
          setFlights([])
          return
        }

        const payload = data as FlightResponse
        setFlights(payload.flights)
        setTotalPages(payload.totalPages)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Falha de conexao ao buscar voos.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void fetchFlights()

    return () => controller.abort()
  }, [origin, destination, departureDate, adults, currency, page])

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

      {!error && flights.length === 0 && (
        <p className="text-neutral-600">Nenhum voo encontrado para os filtros selecionados.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={{
              id: flight.id,
              airline: flight.airline,
              flightNumber: flight.flightNumber,
              departureAirport: flight.departureAirport,
              arrivalAirport: flight.arrivalAirport,
              departureTime: flight.departureTime,
              arrivalTime: flight.arrivalTime,
              price: flight.price,
              currency: flight.currency,
              stops: flight.stops,
              duration: flight.duration,
            }}
          />
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