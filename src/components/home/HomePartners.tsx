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
    <section id="parceiros" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.partnersEyebrow}
            title={partners.title}
            subtitle={partners.subtitle}
          />

          <div className="tm-card bg-[linear-gradient(135deg,#f8fbfd,#fff8f1)] p-6 sm:p-7">
            <p className="tm-chip">{content.home.partnersEyebrow}</p>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {content.pages.planTrip.deliverItems[2]}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.items.map((partner, index) => (
            <div
              key={partner.name}
              className={`rounded-[1.75rem] border px-5 py-5 ${
                index === 0
                  ? "border-[#0B1C2C] bg-[#0B1C2C] text-white"
                  : "border-slate-200/80 bg-slate-50/70 text-[#0B1C2C]"
              }`}
            >
              <div className={`text-xs uppercase tracking-[0.2em] ${index === 0 ? "text-white/55" : "text-slate-400"}`}>
                {content.home.partnersBadge}
              </div>
              <div className="mt-3 text-lg font-semibold">{partner.name}</div>
              <div className={`mt-2 text-sm ${index === 0 ? "text-white/76" : "text-slate-500"}`}>{partner.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
