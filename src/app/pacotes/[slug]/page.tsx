import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PremiumPackageLanding from "@/components/packages/PremiumPackageLanding"
import { getPackageBySlug, packages } from "@/data/pacotes"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const pkg = getPackageBySlug(params.slug)

  if (!pkg) {
    return { title: "Package | Travel Marajó" }
  }

  const translated = pkg.translations.pt

  return {
    title: translated.title,
    description: translated.summary,
  }
}

export default function PackageDetailPage({ params }: Props) {
  const pkg = getPackageBySlug(params.slug)

  if (!pkg) {
    notFound()
  }

  const translated = pkg.translations.pt
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: translated.title,
      description: translated.summary,
      url: `https://www.travelmarajo.com/pacotes/${pkg.slug}`,
      itinerary: translated.itinerary.map((step) => ({
        "@type": "ListItem",
        name: step,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      price: pkg.startingPrice,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `https://www.travelmarajo.com/pacotes/${pkg.slug}`,
      category: "travel-package",
    },
  ]

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${pkg.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PremiumPackageLanding pkg={pkg} />
    </>
  )
}
