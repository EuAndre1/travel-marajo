"use client"

import Image from "next/image"
import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeDestinations() {
  const { destinations } = homeContent
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="destinos" className="py-20 bg-[#F7F7F8]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.destinationsEyebrow}
            title={destinations.title}
            subtitle={destinations.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.items.map((destination) => (
              <article
                key={destination.name}
                className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="relative h-56 sm:h-64">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/70 via-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {destination.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0B1C2C]">
                    {destination.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {destination.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}