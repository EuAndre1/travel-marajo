import GuidesIndexClient from "./GuidesIndexClient"
import { buildGuideMetadata, buildGuideStructuredData, type JsonLdNode } from "@/lib/metadata-schema"

export const metadata = buildGuideMetadata({
  title: "Marajo Travel Guides: Planning, Culture, Wildlife and Experiences",
  description:
    "Explore Marajo travel guides covering things to do, logistics, seasonality, buffalo culture, wildlife, and booking-ready itinerary planning.",
  path: "/guides",
  keywords: [
    "marajo travel guides",
    "marajo island guide",
    "things to do in marajo",
    "how to visit marajo island",
  ],
})

export default function GuidesIndexPage() {
  const jsonLd = buildGuideStructuredData({
    title: "Marajo Travel Guides",
    description:
      "A crawlable SEO hub for Marajo Island travel guides covering attractions, logistics, seasonality, culture, and itinerary planning.",
    path: "/guides",
    keywords: ["marajo travel guides", "marajo island planning", "marajo destination authority"],
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`guides-index-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <GuidesIndexClient />
    </>
  )
}
