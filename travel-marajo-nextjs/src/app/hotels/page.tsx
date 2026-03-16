'use client'

import { useState } from 'react'
import SearchForm from '@/components/SearchForm'

// HotÃ©is simulados
const mockHotels = [
  {
    id: 'H001',
    name: 'Pousada dos GuarÃ¡s',
    type: 'Pousada',
    city: 'Soure',
    pricePerNight: 250,
    currency: 'BRL',
    rating: 4.5,
    amenities: ['Wi-Fi', 'CafÃ© da manhÃ£', 'Piscina'],
  },
  {
    id: 'H002',
    name: 'Hotel MarajÃ³',
    type: 'Hotel',
    city: 'Salvaterra',
    pricePerNight: 350,
    currency: 'BRL',
    rating: 4.2,
    amenities: ['Wi-Fi', 'Restaurante', 'Estacionamento'],
  },
  {
    id: 'H003',
    name: 'Eco Lodge Marajoara',
    type: 'Eco Lodge',
    city: 'Cachoeira do Arari',
    pricePerNight: 450,
    currency: 'BRL',
    rating: 4.8,
    amenities: ['Wi-Fi', 'Trilhas', 'Passeios'],
  },
]

export default function HotelsPage() {
  const [hotels] = useState(mockHotels)

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Buscar HotÃ©is
          </h1>
          <SearchForm />
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-neutral-600">
            {hotels.length} {hotels.length === 1 ? 'hotel encontrado' : 'hotÃ©is encontrados'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {hotel.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-neutral-800">{hotel.name}</h3>
                  <span className="text-xs text-neutral-500 bg-gray-100 px-2 py-1 rounded">
                    {hotel.type}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">{hotel.city}</p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs text-neutral-600 bg-gray-100 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-neutral-500">DiÃ¡ria a partir de</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(hotel.pricePerNight, hotel.currency)}
                    </p>
                  </div>
                  <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
