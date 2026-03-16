"use client"

import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomePartners() {
  const { lang } = useSiteLanguage()
  const { partners } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="parceiros" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.partnersEyebrow}
            title={partners.title}
            subtitle={partners.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.items.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4"
              >
                <div>
                  <div className="text-sm font-semibold text-[#0B1C2C]">
                    {partner.name}
                  </div>
                  <div className="text-xs text-slate-500">{partner.type}</div>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{content.home.partnersBadge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
