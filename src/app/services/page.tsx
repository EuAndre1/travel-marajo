import ServicesPageClient from "./ServicesPageClient"
import { buildServiceMetadata, buildServiceStructuredData, type JsonLdNode } from "@/lib/metadata-schema"

export const metadata = buildServiceMetadata({
  title: "Travel Services for Marajo: Visa Consulting, Planning and Concierge",
  description:
    "Explore premium travel services from Travel Maraj? including Brazil visa consulting, custom travel planning, and concierge assistance.",
  path: "/services",
  keywords: ["brazil visa consulting", "marajo travel planning", "travel concierge brazil"],
})

export default function ServicesPage() {
  const jsonLd = buildServiceStructuredData({
    title: "Travel Maraj? Services",
    description:
      "Premium travel support services for Brazil trip preparation, Marajo planning, and concierge guidance.",
    path: "/services",
    serviceType: "Travel support services",
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`services-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <ServicesPageClient />
    </>
  )
}
