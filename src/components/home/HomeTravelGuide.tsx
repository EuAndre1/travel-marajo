"use client"

import Link from "next/link"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeTravelGuide() {
  const { lang } = useSiteLanguage()
  const { travelGuide } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="guia" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.travelGuideEyebrow}
            title={travelGuide.title}
            subtitle={travelGuide.subtitle}
          />

          <div className="tm-card bg-[linear-gradient(135deg,#fff8f1,#f9fbfd)] p-6 sm:p-7">
            <p className="tm-chip">{content.pages.guides.heroEyebrow}</p>
            <h3 className="mt-5 text-2xl font-display text-[#0B1C2C]">{content.pages.guides.heroTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{content.pages.guides.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(lang, "guides")}
                className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
              >
                {content.home.travelGuideReadCta}
              </Link>
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary"
              >
                {content.pages.guides.customRouteCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {travelGuide.items.map((item, index) => (
            <article
              key={item.title}
              className={`tm-card p-6 transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)] ${
                index === 0 ? "bg-[linear-gradient(145deg,#0B1C2C,#10283d)] text-white" : "bg-white"
              }`}
            >
              <div className={`text-xs uppercase tracking-[0.2em] ${index === 0 ? "text-accent-light/80" : "text-slate-400"}`}>
                {item.tag}
              </div>
              <h3 className={`mt-4 text-xl font-display leading-tight ${index === 0 ? "text-white" : "text-[#0B1C2C]"}`}>
                {item.title}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-white/74" : "text-slate-600"}`}>
                {item.description}
              </p>
              <div className={`mt-6 flex items-center justify-between text-xs ${index === 0 ? "text-white/60" : "text-slate-500"}`}>
                <span>
                  {item.readTime} {content.home.travelGuideReadTimeSuffix}
                </span>
                <Link href={item.href} className={`font-semibold ${index === 0 ? "text-accent-light" : "text-primary"}`}>
                  {content.home.travelGuideReadCta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
