"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getHomeContent, ExperienceFilter } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeTopExperiences() {
  const { lang } = useSiteLanguage()
  const { topExperiences } = getHomeContent(lang)
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>(topExperiences.filters[0] ?? "")
  const content = siteContent[lang]

  useEffect(() => {
    setActiveFilter(topExperiences.filters[0] ?? "")
  }, [topExperiences.filters])

  const filtered = useMemo(() => {
    if (activeFilter === topExperiences.filters[0]) return topExperiences.items
    return topExperiences.items.filter((item) => item.category === activeFilter)
  }, [activeFilter, topExperiences.filters, topExperiences.items])

  return (
    <section id="experiencias" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div className="space-y-5">
            <SectionHeader
              eyebrow={content.home.topExperiencesEyebrow}
              title={topExperiences.title}
              subtitle={topExperiences.subtitle}
            />

            <div className="flex flex-wrap gap-2">
              {topExperiences.filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-3.5 py-2 text-[11px] font-semibold transition sm:px-4 sm:text-xs ${
                    activeFilter === filter
                      ? "bg-[#0B1C2C] text-white shadow-lg"
                      : "border border-slate-200 text-slate-500 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {topExperiences.items.slice(0, 3).map((experience) => (
                <div key={`${experience.title}-snapshot`} className="rounded-[1.45rem] border border-slate-200/70 bg-slate-50/80 px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[11px] sm:tracking-[0.24em]">
                    {experience.category}
                  </p>
                  <h3 className="mt-2.5 text-[15px] font-semibold leading-6 text-[#0B1C2C] sm:text-base">{experience.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500">{experience.location}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tm-card overflow-hidden bg-[linear-gradient(135deg,#fff8f1,#f8fafc)] p-5 sm:p-6">
            <div className="tm-chip">{content.pages.experiences.eyebrow}</div>
            <h3 className="mt-4 text-[1.7rem] font-display leading-tight text-[#0B1C2C] sm:text-2xl">
              {content.pages.experiences.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
              {content.pages.experiences.subtitle}
            </p>
            <div className="mt-5 grid gap-2.5">
              {content.pages.experiences.trustHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-slate-200/80 bg-white/85 px-4 py-3.5 text-sm leading-6 text-slate-600"
                >
                  <span className="mb-3 block h-1.5 w-10 rounded-full bg-accent" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href={topExperiences.ctaHref}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
            >
              {topExperiences.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((experience) => (
            <article
              key={experience.title}
              className="tm-card group flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.15)]"
            >
              <div className="relative h-48 overflow-hidden rounded-t-[1.7rem] sm:h-52 sm:rounded-t-[2rem]">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#0B1C2C]">
                  {experience.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.2em]">
                  <span>{experience.location}</span>
                  <span>{experience.duration}</span>
                </div>
                <h3 className="text-lg font-display leading-snug text-[#0B1C2C] sm:text-xl">{experience.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary">{experience.price}</span>
                  <span className="rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-semibold text-[#b25d18]">
                    {experience.rating} / 5
                  </span>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50/80 px-4 py-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[11px] sm:tracking-[0.24em]">
                    {content.pages.experiences.cardTrustLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {content.pages.experiences.cardTrustBody}
                  </p>
                </div>
                <Link href={experience.href} className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
                  {content.home.topExperiencesDetailsLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
