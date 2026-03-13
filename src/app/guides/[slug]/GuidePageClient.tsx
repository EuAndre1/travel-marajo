"use client"

import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import GuideInternalLinks from "@/components/seo/GuideInternalLinks"
import { getExperienceBySlug } from "@/data/experiencias"
import { getPackageBySlug } from "@/data/pacotes"
import type { GuideContentItem } from "@/data/guides"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

interface GuidePageClientProps {
  guide: GuideContentItem
}

const guideLabels = {
  pt: {
    intro: "Introducao",
    recommendations: "Experiencias recomendadas",
    packages: "Pacotes relacionados",
    faq: "Perguntas frequentes",
    keyTakeaways: "Principais destaques",
    planTrip: "Planejar viagem",
  },
  en: {
    intro: "Introduction",
    recommendations: "Recommended experiences",
    packages: "Related packages",
    faq: "Frequently asked questions",
    keyTakeaways: "Key highlights",
    planTrip: "Plan trip",
  },
  es: {
    intro: "Introduccion",
    recommendations: "Experiencias recomendadas",
    packages: "Paquetes relacionados",
    faq: "Preguntas frecuentes",
    keyTakeaways: "Puntos clave",
    planTrip: "Planear viaje",
  },
  fr: {
    intro: "Introduction",
    recommendations: "Experiences recommandees",
    packages: "Forfaits associes",
    faq: "Questions frequentes",
    keyTakeaways: "Points cles",
    planTrip: "Planifier le voyage",
  },
} as const

export default function GuidePageClient({ guide }: GuidePageClientProps) {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const labels = guideLabels[lang]

  const relatedExperiences = guide.relatedExperiences
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean)

  const relatedPackages = guide.relatedPackages
    .map((slug) => getPackageBySlug(slug))
    .filter(Boolean)

  const shouldShowVisaService = guide.slug === "how-to-visit-marajo-island"

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Global Travel Guide</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {guide.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85">{guide.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/experiencias"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
              >
                {content.pages.experiences.detailsCta}
              </Link>
              <Link
                href="/pacotes"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.pages.packages.reserveCta}
              </Link>
              <Link
                href="/planejar-viagem"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {labels.planTrip}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeader eyebrow={labels.intro} title={guide.title} subtitle={guide.intro} />

            <div className="mt-10 grid gap-6">
              {guide.sections.map((section) => (
                <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold text-[#0B1C2C]">{section.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">{section.body}</p>
                  {section.bullets?.length ? (
                    <div className="mt-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#003366]">
                        {labels.keyTakeaways}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>- {bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            {relatedExperiences.length > 0 ? (
              <div className="mt-14">
                <SectionHeader
                  eyebrow={labels.recommendations}
                  title="Bookable experiences connected to this guide"
                  subtitle="Move from inspiration to action with curated activities already aligned to the themes of this page."
                />
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {relatedExperiences.map((experience) => (
                    <Link
                      key={experience!.slug}
                      href={`/experiencias/${experience!.slug}`}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{experience!.category}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[#0B1C2C]">{experience!.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{experience!.shortDescription}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                        <span>{experience!.location}</span>
                        <span>{experience!.duration}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedPackages.length > 0 ? (
              <div className="mt-14">
                <SectionHeader
                  eyebrow={labels.packages}
                  title="Package options for deeper planning"
                  subtitle="For visitors who need a complete itinerary, these package formats reduce friction and support international trip design."
                />
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {relatedPackages.map((item) => (
                    <Link
                      key={item!.slug}
                      href="/pacotes"
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item!.duration}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[#0B1C2C]">{item!.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item!.summary}</p>
                      <p className="mt-4 text-sm font-semibold text-[#FF6600]">
                        {content.pages.packages.priceFrom} R$ {item!.startingPrice}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <section className="mt-14 rounded-3xl bg-[#FFF1E8] p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#FF6600]">Conversion CTA</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#0B1C2C]">
                    Turn this guide into a real itinerary
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Use the concierge planning flow when you need help aligning season, transfers, experiences,
                    and package options into one booking-ready trip.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/planejar-viagem"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    {content.pages.planTrip.whatsappCta}
                  </Link>
                  <Link
                    href="/pacotes"
                    className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    {content.pages.packages.consultCta}
                  </Link>
                </div>
              </div>
            </section>

            {shouldShowVisaService ? (
              <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Travel service</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#0B1C2C]">
                      Need help understanding Brazil visa requirements first?
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      For international visitors, visa clarity can be the missing step before flights,
                      packages, or concierge planning start to make sense.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/services/brazil-visa-consulting"
                      className="inline-flex items-center justify-center rounded-xl bg-[#003366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1C2C]"
                    >
                      Explore visa consulting
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                    >
                      View all services
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}

            {guide.faq.length > 0 ? (
              <div className="mt-14">
                <SectionHeader
                  eyebrow={labels.faq}
                  title="Helpful questions for trip planning"
                  subtitle="Quick answers that support international discovery, itinerary research, and conversion readiness."
                />
                <div className="mt-8 grid gap-4">
                  {guide.faq.map((item) => (
                    <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-semibold text-[#0B1C2C]">{item.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <GuideInternalLinks guide={guide} />
          </div>
        </div>
      </section>
    </main>
  )
}
