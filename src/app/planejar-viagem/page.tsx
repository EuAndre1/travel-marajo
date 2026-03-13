import type { Metadata } from "next"
import PlanTripPageClient from "./PlanTripPageClient"

const title = "Planejar Viagem para Marajo: Concierge, Pacotes e Experiencias"
const description =
  "Compare concierge planning, travel packages, and curated experiences for Marajo Island. A premium decision page for first-time and international visitors."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/planejar-viagem",
  },
  openGraph: {
    title,
    description,
    url: "/planejar-viagem",
    siteName: "Travel Marajo",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function PlanTripPage() {
  const siteUrl = process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.travelmarajo.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Travel Marajo Concierge Planning",
    description,
    url: `${siteUrl}/planejar-viagem`,
    provider: {
      "@type": "Organization",
      name: "Travel Marajo",
      url: siteUrl,
    },
    areaServed: ["Brazil", "United States", "Europe", "Latin America"],
    audience: {
      "@type": "Audience",
      audienceType: [
        "First-time visitors",
        "International visitors",
        "Short-trip travelers",
        "Comfort-focused travelers",
      ],
    },
    offers: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trip planning concierge",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlanTripPageClient />
    </>
  )
}
