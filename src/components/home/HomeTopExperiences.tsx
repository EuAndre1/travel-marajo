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

  // Filtro simples para comparar experiencias com rapidez.
  const filtered = useMemo(() => {
    if (activeFilter === topExperiences.filters[0]) return topExperiences.items
    return topExperiences.items.filter((item) => item.category === activeFilter)
  }, [activeFilter, topExperiences.items])

  return (
    <section id="experiencias" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "border border-slate-200 text-slate-500 hover:border-primary/40"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((experience) => (
              <article
                key={experience.title}
                className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition"
              >
                <div className="relative h-52 rounded-2xl overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                    {experience.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{experience.location}</span>
                    <span>{experience.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B1C2C]">
                    {experience.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary">{experience.price}</span>
                    <span className="text-slate-500">{experience.rating} / 5</span>
                  </div>
                  <Link
                    href={experience.href}
                    className="text-sm font-semibold text-primary inline-flex items-center gap-2"
                  >
                    {content.home.topExperiencesDetailsLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={topExperiences.ctaHref}
              className="border border-primary/30 text-primary px-6 py-3 rounded-full text-sm font-semibold transition hover:border-primary"
            >
              {topExperiences.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
