import type { Metadata } from 'next'
import { Suspense } from 'react'
import FlightSearchForm from '@/components/flights/FlightSearchForm'
import FlightSearchModule from '@/components/flights/FlightSearchModule'

export const metadata: Metadata = {
  title: 'Travel Maraj? Flights Search',
  description: 'Search available flights to Maraj? Island by origin, destination and departure date.',
}

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4 space-y-4">
          <h1 className="text-3xl font-display font-bold text-white">Buscar Voos</h1>
          <Suspense fallback={<div className="h-16 bg-white/80 rounded-xl" />}>
            <FlightSearchForm />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-12 text-center text-neutral-500">Carregando voos...</div>}>
          <FlightSearchModule />
        </Suspense>
      </div>
    </div>
  )
}
