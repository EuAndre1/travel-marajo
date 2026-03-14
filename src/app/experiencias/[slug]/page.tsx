import { notFound } from "next/navigation"
import ExperienceDetailContent from "@/components/experiences/ExperienceDetailContent"
import { getExperienceBySlug as getLocalizedExperienceItem } from "@/data/experiencias"
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

export function generateMetadata({ params }: Props) {
  const experience = getExperienceBySlug(params.slug)

  if (!experience) {
    return {}
  }

  return buildExperienceMetadata({
    title: experience.seoTitle,
    description: experience.seoDescription,
    path: `/experiencias/${experience.slug}`,
    keywords: experience.tags,
  })
}

export default function ExperienceDetailPage({ params }: Props) {
  const experience = getLocalizedExperienceItem(params.slug)

  if (!experience) {
    notFound()
  }

  const jsonLd = buildExperienceStructuredData({
    title: experience.title,
    description: experience.seoDescription,
    path: `/experiencias/${experience.slug}`,
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
      <ExperienceDetailContent experience={experience} />
    </>
  )
}
