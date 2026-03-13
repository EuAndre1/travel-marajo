'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FlightCard from '@/components/FlightCard'
import SearchForm from '@/components/SearchForm'

interface Flight {
  id: string
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  price: number
  currency: string
  stops: number
  duration: string
}

export default function FlightsPage() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams(searchParams.toString())
        const response = await fetch(`/api/flights/search?${params.toString()}`)
        const data = await response.json()
        
        if (response.ok) {
          setFlights(data.flights)
        } else {
          setError(data.error || 'Erro ao buscar voos')
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlights()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Buscar Voos
          </h1>
          <SearchForm />
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : flights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Nenhum voo encontrado para os critÃ©rios selecionados.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-neutral-600">
                {flights.length} {flights.length === 1 ? 'voo encontrado' : 'voos encontrados'}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={{
                    ...flight,
                    departureAirport: flight.origin,
                    arrivalAirport: flight.destination,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
