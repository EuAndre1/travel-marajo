'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SUPPORTED_CURRENCIES } from '@/config/currency'

export default function FlightSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [origin, setOrigin] = useState(searchParams.get('origin') ?? '')
  const [destination, setDestination] = useState(searchParams.get('destination') ?? '')
  const [departureDate, setDepartureDate] = useState(searchParams.get('departureDate') ?? '')
  const [adults, setAdults] = useState(searchParams.get('adults') ?? '1')
  const [currency, setCurrency] = useState(searchParams.get('currency') ?? 'BRL')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const params = new URLSearchParams({
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departureDate,
      adults,
      currency,
    })

    router.push(`/flights?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origem (IATA)"
        className="px-3 py-2 border rounded-lg"
        maxLength={3}
        required
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destino (IATA)"
        className="px-3 py-2 border rounded-lg"
        maxLength={3}
        required
      />
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        required
      />
      <input
        type="number"
        min={1}
        max={9}
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        {SUPPORTED_CURRENCIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-primary text-white rounded-lg px-4 py-2 font-semibold">
        Buscar voos
      </button>
    </form>
  )
}