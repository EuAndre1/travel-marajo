import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import SectionHeader from "@/components/home/SectionHeader"
import { destinations, getDestinationBySlug } from "@/data/destinos"
import { getExperienceBySlug } from "@/data/experiencias"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export default function DestinationDetailPage({ params }: Props) {
  const destination = getDestinationBySlug(params.slug)

  if (!destination) {
    notFound()
  }

  const related = destination.relatedExperiences
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean)

  return (
    <main className="bg-white min-h-screen">
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/85" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-16">
          <div className="max-w-6xl mx-auto text-white">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white mb-4 backdrop-blur-sm">
              {destination.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {destination.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">
              {destination.overview}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Destaques"
              title="O que vocÃª encontra aqui"
              subtitle="SeleÃ§Ã£o de pontos fortes e experiÃªncias conectadas a este destino."
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            {related.length > 0 ? (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-[#003366] mb-4">ExperiÃªncias relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((experience) => (
                    <article
                      key={experience!.slug}
                      className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5"
                    >
                      <h4 className="text-lg font-semibold text-[#0B1C2C]">
                        {experience!.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-2">
                        {experience!.shortDescription}
                      </p>
                      <Link
                        href={`/experiencias/${experience!.slug}`}
                        className="mt-3 inline-flex text-sm font-semibold text-primary"
                      >
                        Ver experiÃªncia
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}
