import PesqueiroPremium from "@/components/landing/PesqueiroPremium"
import type { Metadata } from 'next'
import HeroLanding from '@/components/landing/HeroLanding'
import DestinosLanding from '@/components/landing/DestinosLanding'
import OfertasLanding from '@/components/landing/OfertasLanding'
import AtividadesLanding from '@/components/landing/AtividadesLanding'
import NewsletterLanding from '@/components/landing/NewsletterLanding'

export const metadata: Metadata = {
  title: 'Travel Marajo | Turismo na Ilha de Marajo',
  description: 'Plataforma internacional de turismo para a Ilha de Marajo com voos, hoteis, pacotes e experiencias.',
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Travel Marajo',
    url: 'https://www.travelmarajo.com',
    description: 'Plataforma de turismo para experiencias na Ilha de Marajo',
    areaServed: ['Brazil', 'Angola', 'Europe', 'Latin America'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroLanding />
      <DestinosLanding />
      <PesqueiroPremium />
      <OfertasLanding />
      <AtividadesLanding />
      <NewsletterLanding />
    </>
  )
}

