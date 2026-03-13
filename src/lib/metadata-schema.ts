import type { Metadata } from "next"
import { z } from "zod"
import { buildAbsoluteUrl } from "@/lib/env"
import { getLocalizedAlternates } from "@/i18n/routing"

const metadataValueSchema = z.union([
  z.string().max(300),
  z.number().finite(),
  z.boolean(),
  z.null(),
])

export const metadataSchema = z
  .record(metadataValueSchema)
  .superRefine((value, ctx) => {
    const keys = Object.keys(value)
    if (keys.length > 25) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Metadata has too many keys",
      })
    }
  })

export type JsonLdNode = Record<string, unknown>

interface GuideMetadataInput {
  title: string
  description: string
  path: string
  keywords?: string[]
}

interface GuideStructuredDataInput {
  title: string
  description: string
  path: string
  keywords?: string[]
  faq?: Array<{
    question: string
    answer: string
  }>
}

interface ServiceMetadataInput {
  title: string
  description: string
  path: string
  keywords?: string[]
}

interface ServiceStructuredDataInput {
  title: string
  description: string
  path: string
  serviceType: string
  faq?: Array<{
    question: string
    answer: string
  }>
}

function getAlternatesForPath(path: string) {
  if (path === "/guides") {
    return getLocalizedAlternates("guides")
  }

  if (path.startsWith("/guides/")) {
    return getLocalizedAlternates("guideDetail", { slug: path.split("/").at(-1) ?? "" })
  }

  if (path === "/services") {
    return getLocalizedAlternates("services")
  }

  if (path === "/services/brazil-visa-consulting") {
    return getLocalizedAlternates("serviceBrazilVisa")
  }

  return undefined
}

export function buildGuideMetadata(input: GuideMetadataInput): Metadata {
  const url = buildAbsoluteUrl(input.path)
  const languages = getAlternatesForPath(input.path)

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: languages?.en ?? input.path,
      languages,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Travel Marajo",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  }
}

export function buildGuideStructuredData(input: GuideStructuredDataInput): JsonLdNode[] {
  const url = buildAbsoluteUrl(input.path)

  const guideNode: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: input.title,
    description: input.description,
    url,
    inLanguage: ["en", "pt", "es", "fr"],
    keywords: input.keywords,
    about: {
      "@type": "TouristDestination",
      name: "Marajo Island",
      description:
        "Marajo Island in Brazil blends beaches, buffalo culture, Amazonian nature, and curated tourism experiences.",
    },
  }

  const destinationNode: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Marajo Island",
    description:
      "A tourism destination in northern Brazil known for beaches, river landscapes, buffalo culture, and curated travel experiences.",
    url: buildAbsoluteUrl("/en"),
    touristType: ["Leisure travelers", "International visitors", "Nature travelers", "Cultural travelers"],
  }

  const attractionNode: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Marajo Island Experiences",
    description:
      "Curated attractions and experiences across Soure, Salvaterra, beaches, mangroves, and buffalo culture routes.",
    url: buildAbsoluteUrl("/en/experiences"),
  }

  const nodes: JsonLdNode[] = [guideNode, destinationNode, attractionNode]

  if (input.faq?.length) {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: input.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    })
  }

  return nodes
}

export function buildServiceMetadata(input: ServiceMetadataInput): Metadata {
  const url = buildAbsoluteUrl(input.path)
  const languages = getAlternatesForPath(input.path)

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: languages?.en ?? input.path,
      languages,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Travel Marajo",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  }
}

export function buildServiceStructuredData(input: ServiceStructuredDataInput): JsonLdNode[] {
  const url = buildAbsoluteUrl(input.path)

  const serviceNode: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.title,
    description: input.description,
    url,
    serviceType: input.serviceType,
    provider: {
      "@type": "Organization",
      name: "Travel Marajo",
      url: buildAbsoluteUrl("/en"),
    },
    areaServed: ["Brazil", "United States", "Europe", "Latin America"],
  }

  const nodes: JsonLdNode[] = [serviceNode]

  if (input.faq?.length) {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: input.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    })
  }

  return nodes
}
