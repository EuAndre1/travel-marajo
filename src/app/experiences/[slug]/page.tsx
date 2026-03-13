import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { experiences } from "@/data/experiences"
import ExperienceClient from "@/components/experiences/ExperienceClient"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(experiences).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const experience = experiences[params.slug as keyof typeof experiences]
  if (!experience) {
    return { title: "Experiência | Travel Marajó" }
  }

  return {
    title: `${experience.title} | Travel Marajó`,
    description: experience.description
  }
}

export default function ExperiencePage({ params }: Props) {
  const slug = params.slug as keyof typeof experiences
  const experience = experiences[slug]

  if (!experience) {
    notFound()
  }

  return <ExperienceClient slug={slug} />
}
