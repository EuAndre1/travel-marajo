'use client'

import Link from 'next/link'

interface DestinationCardProps {
  destination: {
    id: string
    name: string
    description: string
    images: string[]
    country: string
    state: string
  }
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-neutral-800">
            {destination.state}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{destination.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{destination.description}</p>
        
        <Link 
          href={`/destinations/${destination.id}`}
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Saiba Mais
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
