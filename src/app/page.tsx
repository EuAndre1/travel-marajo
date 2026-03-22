import type { Metadata } from "next"
import HomeHero from "@/components/home/HomeHero"
import HomeTrustStrip from "@/components/home/HomeTrustStrip"
import HomeHowToGetThere from "@/components/home/HomeHowToGetThere"
import HomeHowItWorks from "@/components/home/HomeHowItWorks"
import HomeWhyMarajo from "@/components/home/HomeWhyMarajo"
import HomeTopExperiences from "@/components/home/HomeTopExperiences"
import HomeDestinations from "@/components/home/HomeDestinations"
import HomeRoutesPackages from "@/components/home/HomeRoutesPackages"
import HomePartnerHotels from "@/components/home/HomePartnerHotels"
import HomeServices from "@/components/home/HomeServices"
import HomeConciergeSupport from "@/components/home/HomeConciergeSupport"
import HomeFinalCta from "@/components/home/HomeFinalCta"

export const metadata: Metadata = {
  title: "Travel Marajó | Global gateway to Marajó Island",
  description:
    "Discover, plan, and book Marajo through premium experiences, curated journeys, travel intelligence, and trusted local support.",
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel Marajó",
    url: "https://www.travelmarajo.com",
    description:
      "Destination platform for discovering, planning, and booking Marajo with local curation and international-facing support.",
    areaServed: ["Brazil", "Europe", "Latin America"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.travelmarajo.com/experiences",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <main className="overflow-hidden bg-[#f6f3ee]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <HomeTrustStrip />
      <HomeHowToGetThere />
      <HomeTopExperiences />
      <HomeRoutesPackages />
      <HomePartnerHotels />
      <HomeServices />
      <HomeHowItWorks />
      <HomeWhyMarajo />
      <HomeDestinations />
      <HomeConciergeSupport />
      <HomeFinalCta />
    </main>
  )
}
