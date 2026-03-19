import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { experiences } from "@/data/experiences"
import ExperienceClient from "@/components/experiences/ExperienceClient"
import {
  buildExperienceMetadata,
  buildExperienceStructuredData,
  type JsonLdNode,
} from "@/lib/metadata-schema"
import { getActiveExperiences, getExperienceBySlug } from "@/lib/experiences"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getActiveExperiences().map((experience) => ({ slug: experience.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const experience = getExperienceBySlug(params.slug)

  if (!experience) {
    return { title: "Experience | Travel Maraj?" }
  }

  return buildExperienceMetadata({
    title: experience.seoTitle,
    description: experience.seoDescription,
    path: `/experiences/${experience.slug}`,
    keywords: experience.tags,
  })
}

export default function ExperiencePage({ params }: Props) {
  const experience = getExperienceBySlug(params.slug)

  if (!experience) {
    notFound()
  }

  const jsonLd = buildExperienceStructuredData({
    title: experience.title,
    description: experience.seoDescription,
    path: `/experiences/${experience.slug}`,
    locationLabel: experience.locationLabel,
    duration: experience.duration,
    priceFrom: experience.priceFrom,
    currency: experience.currency,
    keywords: experience.tags,
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${experience.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <ExperienceClient slug={experience.slug as keyof typeof experiences} />
    </>
  )
}
