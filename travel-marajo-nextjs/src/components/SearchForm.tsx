'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const searchTypes = [
  { value: 'flights', label: 'Voos' },
  { value: 'hotels', label: 'Hotéis' },
  { value: 'packages', label: 'Pacotes' },
]

export default function SearchForm() {
  const router = useRouter()
  const [searchType, setSearchType] = useState('flights')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [guests, setGuests] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    
    if (searchType === 'flights') {
      if (origin) params.append('origin', origin)
      if (destination) params.append('destination', destination)
      if (departureDate) params.append('departureDate', departureDate)
      if (returnDate) params.append('returnDate', returnDate)
      params.append('adults', guests.toString())
      router.push(`/flights?${params.toString()}`)
    } else if (searchType === 'hotels') {
      if (destination) params.append('destination', destination)
      if (departureDate) params.append('checkIn', departureDate)
      if (returnDate) params.append('checkOut', returnDate)
      params.append('guests', guests.toString())
      router.push(`/hotels?${params.toString()}`)
    } else if (searchType === 'packages') {
      if (destination) params.append('destination', destination)
      if (departureDate) params.append('startDate', departureDate)
      params.append('travelers', guests.toString())
      router.push(`/packages?${params.toString()}`)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100">
        {searchTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSearchType(type.value)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 relative ${
              searchType === type.value
                ? 'text-primary bg-green-50'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            {type.label}
            {searchType === type.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSearch} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase">Destino</label>
            <input
              type="text"
              placeholder="Marajó ou cidade"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Origin (only for flights) */}
          {searchType === 'flights' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">Origem</label>
              <input
                type="text"
                placeholder="Cidade ou aeroporto"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Dates */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase">
              {searchType === 'hotels' ? 'Check-in' : 'Data de Partida'}
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase">
              {searchType === 'hotels' ? 'Check-out' : 'Data de Retorno'}
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase">
              {searchType === 'flights' ? 'Adultos' : 'Hóspedes'}
            </label>
            <input
              type="number"
              min="1"
              max="9"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}
