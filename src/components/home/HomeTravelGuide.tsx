"use client"

import Link from "next/link"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeTravelGuide() {
  const { lang } = useSiteLanguage()
  const { travelGuide } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="guia" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.travelGuideEyebrow}
            title={travelGuide.title}
            subtitle={travelGuide.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelGuide.items.map((item) => (
              <article
                key={item.title}
                className="border border-slate-100 rounded-2xl p-6 bg-slate-50/70 hover:border-primary/30 transition"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {item.tag}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.readTime} {content.home.travelGuideReadTimeSuffix}</span>
                  <Link href={item.href} className="text-primary font-semibold">
                    {content.home.travelGuideReadCta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
