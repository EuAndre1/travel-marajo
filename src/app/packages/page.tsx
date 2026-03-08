'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { PackageModel } from '@/types'
import { formatPrice } from '@/lib/utils'

type PackagesResponse = {
  packages: PackageModel[]
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages')
        const data = (await response.json()) as PackagesResponse | { error: string }

        if (!response.ok) {
          setError('error' in data ? data.error : 'Falha ao carregar pacotes')
          return
        }

        setPackages((data as PackagesResponse).packages)
      } catch {
        setError('Falha ao carregar pacotes')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchPackages()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-[#003366] mb-6">Pacotes de Viagem</h1>

        {isLoading && <p className="text-neutral-600">Carregando pacotes...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && !error && packages.length === 0 && (
          <p className="text-neutral-600">Nenhum pacote ativo no momento.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <article key={pkg.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#003366]/10 to-[#FF6600]/10">
                {pkg.images[0] ? (
                  <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#003366]">Travel Marajo</div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#003366] mb-2">{pkg.name}</h2>
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{pkg.description}</p>
                <p className="text-sm text-neutral-500 mb-4">Duracao: {pkg.durationDays} dias</p>
                <p className="text-2xl font-bold text-[#003366] mb-4">
                  {formatPrice(pkg.price, pkg.currency, 'pt')}
                </p>
                <Link
                  href={`/checkout?type=PACKAGE&id=${pkg.id}&source=PACKAGES_PAGE`}
                  className="inline-flex items-center justify-center w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Reservar pacote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
