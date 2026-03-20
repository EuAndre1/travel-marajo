"use client"

import Image from "next/image"
import Link from "next/link"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeDestinations() {
  const { lang } = useSiteLanguage()
  const { destinations } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="destinos" className="tm-section bg-[linear-gradient(180deg,#f7f7f8_0%,#eef4f8_100%)]">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.destinationsEyebrow}
            title={destinations.title}
            subtitle={destinations.subtitle}
          />

          <div className="tm-card bg-white/75 p-5 sm:p-6">
            <p className="tm-chip">{content.pages.guides.destinationsEyebrow}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:leading-7">
              {content.pages.guides.destinationsTitle}
            </p>
            <Link
              href={getLocalizedPath(lang, "destinations")}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
            >
              {content.home.destinationsEyebrow}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {destinations.items.map((destination, index) => (
            <article
              key={destination.name}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_24px_60px_rgba(15,23,42,0.12)] ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "h-[300px] sm:h-[360px]" : "h-64 sm:h-72"}`}>
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,44,0.1),rgba(11,28,44,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/78 sm:text-[11px] sm:tracking-[0.24em]">
                    {destination.tag}
                  </span>
                  <h3 className="mt-3 text-[1.65rem] font-display text-white sm:text-3xl">{destination.name}</h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-6 text-white/78 sm:leading-7">{destination.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
