"use client"

import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { siteChrome } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeWhyMarajo() {
  const { lang } = useSiteLanguage()
  const { whyMarajo } = getHomeContent(lang)
  const content = siteContent[lang]
  const chrome = siteChrome[lang]

  return (
    <section id="por-que" className="tm-section bg-[linear-gradient(180deg,#f6f3ee_0%,#ffffff_100%)]">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div className="tm-card p-7 sm:p-8 lg:p-10">
            <SectionHeader
              eyebrow={content.home.whyEyebrow}
              title={whyMarajo.title}
              subtitle={whyMarajo.subtitle}
            />

            <div className="mt-8 space-y-4">
              <div className="tm-chip">{chrome.brandTagline}</div>
              <p className="max-w-xl text-sm leading-7 text-slate-600">
                {chrome.authorityLabel}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {whyMarajo.items.slice(0, 2).map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-slate-200/80 bg-slate-50/80 px-5 py-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {whyMarajo.items.map((item, index) => (
              <article
                key={item.title}
                className={`tm-card p-6 sm:p-7 ${
                  index === 0 ? "md:col-span-2 bg-[linear-gradient(145deg,#0B1C2C,#10283d)] text-white" : ""
                }`}
              >
                <div className={`tm-chip ${index === 0 ? "!border-white/12 !bg-white/10 !text-white/70" : ""}`}>
                  {content.home.whyEyebrow}
                </div>
                <h3 className={`mt-5 text-xl font-display leading-tight ${index === 0 ? "text-white" : "text-[#0B1C2C]"}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-white/76" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
