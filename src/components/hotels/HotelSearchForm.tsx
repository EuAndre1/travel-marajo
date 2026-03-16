'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SUPPORTED_CURRENCIES } from '@/config/currency'

type DestinationOption = {
  dest_id: string
  name: string
  country?: string
}

export default function HotelSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [destination, setDestination] = useState(searchParams.get('destination') ?? '')
  const [destinationId, setDestinationId] = useState(searchParams.get('destinationId') ?? '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '')
  const [minRating, setMinRating] = useState(searchParams.get('minRating') ?? '')
  const [currency, setCurrency] = useState(searchParams.get('currency') ?? 'BRL')
  const [suggestions, setSuggestions] = useState<DestinationOption[]>([])

  const handleDestinationSearch = async (value: string) => {
    setDestination(value)

    if (value.length < 2) {
      setSuggestions([])
      return
    }

    const response = await fetch(`/api/hotels/destinations?query=${encodeURIComponent(value)}`)
    if (!response.ok) {
      return
    }

    const data = (await response.json()) as { destinations: DestinationOption[] }
    setSuggestions(data.destinations.slice(0, 5))
  }

  const handleSelectSuggestion = (item: DestinationOption) => {
    setDestination(item.name)
    setDestinationId(item.dest_id)
    setSuggestions([])
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const params = new URLSearchParams({
      destination: destinationId || destination,
      currency,
    })

    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minRating) params.set('minRating', minRating)

    router.push(`/hotels?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 grid grid-cols-1 md:grid-cols-6 gap-3 relative">
      <div className="md:col-span-2 relative">
        <input
          type="text"
          value={destination}
          onChange={(e) => handleDestinationSearch(e.target.value)}
          placeholder="Destino"
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        {suggestions.length > 0 && (
          <div className="absolute z-20 bg-white border rounded-lg mt-1 w-full shadow">
            {suggestions.map((item) => (
              <button
                key={item.dest_id}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="block w-full text-left px-3 py-2 hover:bg-neutral-50"
              >
                {item.name}
                {item.country ? `, ${item.country}` : ''}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="number"
        placeholder="Preco min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        min={0}
      />
      <input
        type="number"
        placeholder="Preco max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        min={0}
      />
      <input
        type="number"
        placeholder="Rating min"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        min={0}
        max={10}
        step="0.1"
      />
      <div className="flex gap-2">
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
          Buscar
        </button>
      </div>
    </form>
  )
}