import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageClient from "./GuidePageClient"
import { getGuideBySlug, guides } from "@/data/guides"
import {
  buildGuideMetadata,
  buildGuideStructuredData,
  type JsonLdNode,
} from "@/lib/metadata-schema"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    return {}
  }

  return buildGuideMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
  })
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const jsonLd = buildGuideStructuredData({
    title: guide.title,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    faq: guide.faq,
    keywords: guide.keywords,
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${guide.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}
      <GuidePageClient guide={guide} />
    </>
  )
}
