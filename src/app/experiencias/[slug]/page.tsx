import { notFound } from "next/navigation"
import { experiences, getExperienceBySlug } from "@/data/experiencias"
import ExperienceDetailContent from "@/components/experiences/ExperienceDetailContent"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }))
}

export default function ExperienceDetailPage({ params }: Props) {
  const experience = getExperienceBySlug(params.slug)

  if (!experience) {
    notFound()
  }

  return <ExperienceDetailContent experience={experience} />
}