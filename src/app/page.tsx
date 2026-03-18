import type { Metadata } from "next"
import HomeHero from "@/components/home/HomeHero"
import HomeTrustStrip from "@/components/home/HomeTrustStrip"
import HomeWhyMarajo from "@/components/home/HomeWhyMarajo"
import HomeFeatureExperience from "@/components/home/HomeFeatureExperience"
import HomeTopExperiences from "@/components/home/HomeTopExperiences"
import HomeDestinations from "@/components/home/HomeDestinations"
import HomeRoutesPackages from "@/components/home/HomeRoutesPackages"
import HomePlanningSupport from "@/components/home/HomePlanningSupport"
import HomeTravelGuide from "@/components/home/HomeTravelGuide"
import HomeSocialProof from "@/components/home/HomeSocialProof"
import HomePartners from "@/components/home/HomePartners"
import HomeConciergeSupport from "@/components/home/HomeConciergeSupport"
import HomeFinalCta from "@/components/home/HomeFinalCta"

export const metadata: Metadata = {
  title: "Travel Marajo | Global gateway to Marajo Island",
  description:
    "Discover, plan, and book Marajo through premium experiences, curated journeys, travel intelligence, and trusted local support.",
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel Marajo",
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
      <HomeWhyMarajo />
      <HomeTopExperiences />
      <HomeFeatureExperience />
      <HomeRoutesPackages />
      <HomePlanningSupport />
      <HomeDestinations />
      <HomeTravelGuide />
      <HomeSocialProof />
      <HomePartners />
      <HomeConciergeSupport />
      <HomeFinalCta />
    </main>
  )
}
