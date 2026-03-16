import type { Metadata } from "next"
import HomeHero from "@/components/home/HomeHero"
import HomeWhyMarajo from "@/components/home/HomeWhyMarajo"
import HomeFeatureExperience from "@/components/home/HomeFeatureExperience"
import HomeTopExperiences from "@/components/home/HomeTopExperiences"
import HomeDestinations from "@/components/home/HomeDestinations"
import HomeRoutesPackages from "@/components/home/HomeRoutesPackages"
import HomeOffers from "@/components/home/HomeOffers"
import HomeTravelGuide from "@/components/home/HomeTravelGuide"
import HomeSocialProof from "@/components/home/HomeSocialProof"
import HomePartners from "@/components/home/HomePartners"
import HomeNewsletter from "@/components/home/HomeNewsletter"

export const metadata: Metadata = {
  title: "Travel Marajó | Plataforma de destino",
  description:
    "Plataforma premium para descobrir experiências, roteiros e parceiros locais na Ilha de Marajó. Curadoria internacional com foco em confiança e reserva.",
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel Marajó",
    url: "https://www.travelmarajo.com",
    description:
      "Plataforma de destino para experiências e roteiros na Ilha de Marajó com curadoria local.",
    areaServed: ["Brazil", "Europe", "Latin America"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.travelmarajo.com/experiences",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <HomeWhyMarajo />
      <HomeFeatureExperience />
      <HomeTopExperiences />
      <HomeDestinations />
      <HomeRoutesPackages />
      <HomeOffers />
      <HomeTravelGuide />
      <HomeSocialProof />
      <HomePartners />
      <HomeNewsletter />
    </>
  )
}
