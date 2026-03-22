import PlanTripPageClient from "./PlanTripPageClient"
import { buildServiceMetadata, buildServiceStructuredData, type JsonLdNode } from "@/lib/metadata-schema"

const title = "Planejar Viagem para Marajó: Concierge, Pacotes e Experiências"
const description =
  "Compare concierge planning, travel packages, and curated experiences for Marajó Island. A premium decision page for first-time and international visitors."

export const metadata = buildServiceMetadata({
  title,
  description,
  path: "/planejar-viagem",
  keywords: [
    "marajo trip planning",
    "marajo concierge",
    "marajo travel packages",
    "marajo experiences",
  ],
})

export default function PlanTripPage() {
  const jsonLd = buildServiceStructuredData({
    title: "Travel Marajó Concierge Planning",
    description,
    path: "/planejar-viagem",
    serviceType: "Travel planning concierge",
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`plan-trip-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <PlanTripPageClient />
    </>
  )
}
