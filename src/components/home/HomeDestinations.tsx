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
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={content.home.destinationsEyebrow}
            title={destinations.title}
            subtitle={destinations.subtitle}
          />

          <Link
            href={getLocalizedPath(lang, "destinations")}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {content.home.destinationsEyebrow}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {destinations.items.slice(0, 3).map((destination) => (
            <article key={destination.name} className="overflow-hidden rounded-[1.7rem] border border-white/20 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <div className="relative h-56 sm:h-60">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <span className="inline-flex rounded-full bg-[#fff4ea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b25d18]">
                  {destination.tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{destination.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{destination.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
