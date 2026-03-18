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
  title: "Travel Marajo | Global gateway to Marajo Island",
  description:
    "Discover what Marajo is, why it matters, and how to explore it through curated experiences, destination-led storytelling, travel planning, and direct booking support.",
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
      <HomeWhyMarajo />
      <HomeTopExperiences />
      <HomeRoutesPackages />
      <HomeFeatureExperience />
      <HomeDestinations />
      <HomeTravelGuide />
      <HomeSocialProof />
      <HomePartners />
      <HomeOffers />
      <HomeNewsletter />
    </main>
  )
}
