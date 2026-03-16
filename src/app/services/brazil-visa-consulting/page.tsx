import { notFound } from "next/navigation"
import BrazilVisaConsultingClient from "./BrazilVisaConsultingClient"
import { getServiceBySlug } from "@/data/services"
import { buildServiceMetadata, buildServiceStructuredData, type JsonLdNode } from "@/lib/metadata-schema"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"

const slug = "brazil-visa-consulting"

export function generateMetadata() {
  const service = getServiceBySlug(slug)

  if (!service) {
    return {}
  }

  return buildServiceMetadata({
    title: "Brazil Visa Consulting for Marajo Travelers",
    description:
      "Understand who may need a Brazil visa, how visa consulting works, and the typical preparation steps before booking a Marajo trip.",
    path: `/services/${slug}`,
    keywords: ["brazil visa help", "brazil visa consulting", "brazil travel visa support"],
  })
}

export default function BrazilVisaConsultingPage() {
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappLink = phone
    ? buildWhatsAppUrl(
        phone,
        "Hello! I want help understanding Brazil visa requirements before planning a Marajo trip.",
      )
    : null

  const jsonLd = buildServiceStructuredData({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    serviceType: "Brazil visa consulting",
    faq: service.faq,
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${service.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <BrazilVisaConsultingClient service={service} whatsappLink={whatsappLink} />
    </>
  )
}
