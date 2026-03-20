"use client"

import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeSocialProof() {
  const { lang } = useSiteLanguage()
  const { socialProof } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="prova" className="tm-section bg-[linear-gradient(180deg,#071521_0%,#0B1C2C_100%)]">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.socialEyebrow}
            title={socialProof.title}
            subtitle={socialProof.subtitle}
            tone="light"
          />

          <div className="grid gap-3 sm:grid-cols-3">
            {socialProof.stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.55rem] border border-white/10 bg-white/8 px-4 py-5 text-white">
                <div className="text-[1.8rem] font-semibold sm:text-3xl">{stat.value}</div>
                <div className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-white/60 sm:text-[11px] sm:tracking-[0.24em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {socialProof.testimonials.map((item, index) => (
            <article
              key={item.name}
              className={`rounded-[2rem] border p-6 ${
                index === 1
                  ? "border-accent/30 bg-[linear-gradient(160deg,rgba(229,122,31,0.18),rgba(255,255,255,0.06))] text-white"
                  : "border-white/10 bg-white/8 text-white"
              }`}
            >
              <div className="text-sm text-white/60">{item.role}</div>
              <h3 className="mt-2 text-lg font-display sm:text-xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/78 sm:leading-7">
                {content.home.socialQuoteOpen}
                {item.quote}
                {content.home.socialQuoteClose}
              </p>
              <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white/60">
                {content.home.socialRatingLabel} {item.rating}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
