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
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={content.home.topExperiencesEyebrow}
            title={topExperiences.title}
            subtitle={topExperiences.subtitle}
          />

          <Link
            href={topExperiences.ctaHref}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {topExperiences.ctaLabel}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((experience) => (
            <article
              key={experience.title}
              className="overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="group relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-3 p-4 sm:p-5">
                <h3 className="text-lg font-semibold leading-snug text-[#0B1C2C] sm:text-[1.1rem]">
                  {experience.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>{experience.location}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-primary">{experience.price}</span>
                  <Link
                    href={experience.href}
                    className="inline-flex items-center justify-center rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    {content.pages.experiences.detailsCta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
