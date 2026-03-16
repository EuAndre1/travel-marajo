'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface FlightCardProps {
  flight: {
    id: string
    airline: string
    flightNumber: string
    departureAirport: string
    arrivalAirport: string
    departureTime: string
    arrivalTime: string
    price: number
    currency: string
    stops?: number
    duration?: string
  }
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short' 
    })
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Airline Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">{flight.airline}</h3>
          <p className="text-sm text-neutral-500">{flight.flightNumber}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {flight.stops === 0 ? 'Direto' : `${flight.stops} escala(s)`}
          </span>
        </div>
      </div>

      {/* Flight Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-neutral-800">{flight.departureAirport}</p>
          <p className="text-sm text-neutral-600">{formatTime(flight.departureTime)}</p>
          <p className="text-xs text-neutral-400">{formatDate(flight.departureTime)}</p>
        </div>
        
        <div className="flex flex-col items-center px-4">
          <ArrowRightIcon className="w-6 h-6 text-primary" />
          <p className="text-xs text-neutral-500 mt-1">{flight.duration}</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-neutral-800">{flight.arrivalAirport}</p>
          <p className="text-sm text-neutral-600">{formatTime(flight.arrivalTime)}</p>
          <p className="text-xs text-neutral-400">{formatDate(flight.arrivalTime)}</p>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-neutral-500">A partir de</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(flight.price, flight.currency)}</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Reservar
        </button>
      </div>
    </div>
  )
}
