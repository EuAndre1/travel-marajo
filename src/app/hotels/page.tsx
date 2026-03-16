import type { Metadata } from 'next'
import { Suspense } from 'react'
import HotelSearchForm from '@/components/hotels/HotelSearchForm'
import HotelSearchModule from '@/components/hotels/HotelSearchModule'

export const metadata: Metadata = {
  title: 'Marajo Hotels Search',
  description: 'Find hotels in Marajo with destination, price and rating filters.',
}

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4 space-y-4">
          <h1 className="text-3xl font-display font-bold text-white">Buscar Hoteis</h1>
          <Suspense fallback={<div className="h-16 bg-white/80 rounded-xl" />}>
            <HotelSearchForm />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-12 text-center text-neutral-500">Carregando hoteis...</div>}>
          <HotelSearchModule />
        </Suspense>
      </div>
    </div>
  )
}
