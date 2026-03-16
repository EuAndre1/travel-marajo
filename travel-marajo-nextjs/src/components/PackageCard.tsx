'use client'

import { CheckIcon } from '@heroicons/react/24/outline'

interface PackageCardProps {
  package: {
    id: string
    name: string
    description: string
    price: number
    currency: string
    durationDays: number
    includes: string[]
    destinations: string[]
    images: string[]
  }
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-neutral-600">{pkg.destinations.join(', ')}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-neutral-800">
            {pkg.durationDays} dias
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{pkg.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

        {/* Includes */}
        <div className="mb-4">
          <p className="text-xs font-medium text-neutral-500 uppercase mb-2">Inclui:</p>
          <div className="flex flex-wrap gap-2">
            {pkg.includes.slice(0, 3).map((item, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 text-xs text-neutral-600 bg-gray-100 px-2 py-1 rounded"
              >
                <CheckIcon className="w-3 h-3 text-primary" />
                {item}
              </span>
            ))}
            {pkg.includes.length > 3 && (
              <span className="text-xs text-neutral-500">+{pkg.includes.length - 3}</span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-neutral-500">A partir de</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(pkg.price, pkg.currency)}</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}
