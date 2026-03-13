'use client'

import { useState } from 'react'
import SearchForm from '@/components/SearchForm'
import PackageCard from '@/components/PackageCard'

// Pacotes simulados
const mockPackages = [
  {
    id: 'P001',
    name: 'Aventura Marajoara 5 Dias',
    description: 'Explore bÃºfalos, praias e a cultura local em uma experiÃªncia Ãºnica.',
    price: 1500,
    currency: 'BRL',
    durationDays: 5,
    includes: ['Hospedagem', 'Passeios', 'RefeiÃ§Ãµes', 'Transfer'],
    destinations: ['Soure', 'Salvaterra'],
    images: ['/images/package-1.jpg'],
  },
  {
    id: 'P002',
    name: 'ExpediÃ§Ã£o EcolÃ³gica MarajÃ³',
    description: 'ImersÃ£o na natureza e vida selvagem do maior arquipÃ©lago fluviomarinho.',
    price: 2200,
    currency: 'BRL',
    durationDays: 7,
    includes: ['Hospedagem', 'Guias', 'Equipamento', 'RefeiÃ§Ãµes'],
    destinations: ['Soure', 'Cachoeira do Arari'],
    images: ['/images/package-2.jpg'],
  },
  {
    id: 'P003',
    name: 'Fim de Semana RomÃ¢ntico',
    description: 'Praias paradisÃ­acas e pÃ´r do sol inesquecÃ­vel para casais.',
    price: 800,
    currency: 'BRL',
    durationDays: 3,
    includes: ['Hospedagem', 'Jantar RomÃ¢ntico', 'Passeio de Barco'],
    destinations: ['Praia do Pesqueiro'],
    images: ['/images/package-3.jpg'],
  },
  {
    id: 'P004',
    name: 'Tour Cultural Marajoara',
    description: 'ConheÃ§a a histÃ³ria, arte e tradiÃ§Ãµes do povo marajoara.',
    price: 1200,
    currency: 'BRL',
    durationDays: 4,
    includes: ['Hospedagem', 'Museus', 'Artesanato', 'Gastronomia'],
    destinations: ['Soure', 'Salvaterra', 'Santa Cruz'],
    images: ['/images/package-4.jpg'],
  },
  {
    id: 'P005',
    name: 'Pesca Esportiva no MarajÃ³',
    description: 'Aventure-se na pesca de tucunarÃ© e outras espÃ©cies amazÃ´nicas.',
    price: 2800,
    currency: 'BRL',
    durationDays: 6,
    includes: ['Hospedagem', 'Equipamento', 'Guias', 'RefeiÃ§Ãµes'],
    destinations: ['Rios do MarajÃ³'],
    images: ['/images/package-5.jpg'],
  },
  {
    id: 'P006',
    name: 'FÃ©rias em FamÃ­lia',
    description: 'DiversÃ£o para todas as idades com atividades educativas e recreativas.',
    price: 1800,
    currency: 'BRL',
    durationDays: 5,
    includes: ['Hospedagem', 'Atividades Kids', 'Passeios', 'RefeiÃ§Ãµes'],
    destinations: ['Soure', 'Praias'],
    images: ['/images/package-6.jpg'],
  },
]

export default function PackagesPage() {
  const [packages] = useState(mockPackages)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Pacotes de Viagem
          </h1>
          <p className="text-white/80 mb-6">
            ExperiÃªncias completas para aproveitar ao mÃ¡ximo sua viagem ao MarajÃ³
          </p>
          <SearchForm />
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-neutral-600">
            {packages.length} {packages.length === 1 ? 'pacote encontrado' : 'pacotes encontrados'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  )
}
