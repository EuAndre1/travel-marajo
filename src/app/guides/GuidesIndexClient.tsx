"use client"

import Link from "next/link"
import GuideCard from "@/components/seo/GuideCard"
import { siteContent } from "@/config/site-content"
import { destinations } from "@/data/destinos"
import { experiences } from "@/data/experiencias"
import { guides } from "@/data/guides"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

const GUIDE_CLUSTER_SLUGS = [
  ["how-to-visit-marajo-island", "how-many-days-in-marajo", "marajo-itinerary-guide", "is-marajo-worth-visiting"],
  ["marajo-beaches-guide", "marajo-mangroves-and-rivers", "marajo-wildlife-guide", "marajo-birdwatching-guide"],
  ["marajo-buffalo-culture", "marajo-buffalo-farm-experience", "marajo-food-guide", "marajo-local-culture"],
] as const

export default function GuidesIndexClient() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang].pages.guides

  const guideClusters = [
    {
      title: content.planningClusterTitle,
      description: content.planningClusterDescription,
      guides: GUIDE_CLUSTER_SLUGS[0],
    },
    {
      title: content.natureClusterTitle,
      description: content.natureClusterDescription,
      guides: GUIDE_CLUSTER_SLUGS[1],
    },
    {
      title: content.cultureClusterTitle,
      description: content.cultureClusterDescription,
      guides: GUIDE_CLUSTER_SLUGS[2],
    },
  ]

  const featuredDestinations = destinations.filter((destination) =>
    ["soure", "salvaterra", "pesqueiro"].includes(destination.slug),
  )
  const flagshipExperiences = experiences.filter((experience) =>
    ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"].includes(experience.slug),
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">{content.heroEyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{content.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(lang, "experiences")}
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
              >
                {content.commercialExperiencesTitle}
              </Link>
              <Link
                href={getLocalizedPath(lang, "packages")}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.commercialPackagesTitle}
              </Link>
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.commercialPlanTitle}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{content.hubEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{content.hubTitle}</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{content.hubSubtitle}</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">{content.commercialPathsEyebrow}</p>
                <div className="mt-4 grid gap-3">
                  <Link href={getLocalizedPath(lang, "experiences")} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100">
                    <span className="font-semibold text-[#0B1C2C]">{content.commercialExperiencesTitle}</span>
                    <span className="mt-1 block text-slate-500">{content.commercialExperiencesSubtitle}</span>
                  </Link>
                  <Link href={getLocalizedPath(lang, "packages")} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100">
                    <span className="font-semibold text-[#0B1C2C]">{content.commercialPackagesTitle}</span>
                    <span className="mt-1 block text-slate-500">{content.commercialPackagesSubtitle}</span>
                  </Link>
                  <Link href={getLocalizedPath(lang, "planTrip")} className="rounded-2xl bg-[#FFF1E8] p-4 text-sm text-slate-700 transition hover:bg-[#ffe5d6]">
                    <span className="font-semibold text-[#0B1C2C]">{content.commercialPlanTitle}</span>
                    <span className="mt-1 block text-slate-500">{content.commercialPlanSubtitle}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            <div className="mt-16 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{content.clustersEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{content.clustersTitle}</h2>
                <div className="mt-8 grid gap-5">
                  {guideClusters.map((cluster) => (
                    <section key={cluster.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-[#0B1C2C]">{cluster.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{cluster.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cluster.guides.map((slug) => {
                          const guide = guides.find((item) => item.slug === slug)

                          if (!guide) {
                            return null
                          }

                          return (
                            <Link
                              key={guide.slug}
                              href={getLocalizedPath(lang, "guideDetail", { slug: guide.slug })}
                              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#003366] transition hover:border-[#003366] hover:bg-white"
                            >
                              {guide.title}
                            </Link>
                          )
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">{content.destinationsEyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">{content.destinationsTitle}</h3>
                  <div className="mt-5 grid gap-3">
                    {featuredDestinations.map((destination) => (
                      <Link
                        key={destination.slug}
                        href={getLocalizedPath(lang, "destinationDetail", { slug: destination.slug })}
                        className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100"
                      >
                        <span className="font-semibold text-[#0B1C2C]">{destination.name}</span>
                        <span className="mt-1 block text-slate-500">{destination.tagline}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">{content.experiencesEyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">{content.experiencesTitle}</h3>
                  <div className="mt-5 grid gap-3">
                    {flagshipExperiences.map((experience) => (
                      <Link
                        key={experience.slug}
                        href={getLocalizedPath(lang, "experienceDetail", { slug: experience.slug })}
                        className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100"
                      >
                        <span className="font-semibold text-[#0B1C2C]">{experience.title}</span>
                        <span className="mt-1 block text-slate-500">{experience.shortDescription}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl bg-[#FFF1E8] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A3412]">{content.customRouteEyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">{content.customRouteTitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{content.customRouteSubtitle}</p>
                  <Link
                    href={getLocalizedPath(lang, "planTrip")}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    {content.customRouteCta}
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
