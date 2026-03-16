'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
import StripeCheckoutButton from '@/components/StripeCheckoutButton'
import { normalizeCurrency } from '@/lib/money'

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
      currency,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-neutral-600">{pkg.destinations.join(', ')}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-neutral-800">
            {pkg.durationDays} dias
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{pkg.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

        <div className="mb-4">
          <p className="text-xs font-medium text-neutral-500 uppercase mb-2">Inclui:</p>
          <div className="flex flex-wrap gap-2">
            {pkg.includes.slice(0, 3).map((item, index) => (
              <span key={index} className="inline-flex items-center gap-1 text-xs text-neutral-600 bg-gray-100 px-2 py-1 rounded">
                <CheckIcon className="w-3 h-3 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-neutral-500">A partir de</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(pkg.price, pkg.currency)}</p>
          </div>
          <StripeCheckoutButton
            bookingType="PACKAGE"
            title={pkg.name}
            description={pkg.description}
            unitAmount={pkg.price}
            currency={normalizeCurrency(pkg.currency)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Reservar
          </StripeCheckoutButton>
        </div>
      </div>
    </div>
  )
}
