"use client"

import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeSocialProof() {
  const { socialProof } = homeContent
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="prova" className="py-20 bg-[#0B1C2C]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto text-white">
          <SectionHeader
            eyebrow={content.home.socialEyebrow}
            title={socialProof.title}
            subtitle={socialProof.subtitle}
            tone="light"
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialProof.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 p-6">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialProof.testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl bg-white/10 p-6">
                <div className="text-sm text-white/70">{item.role}</div>
                <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                <p className="mt-3 text-sm text-white/80">{content.home.socialQuoteOpen}{item.quote}{content.home.socialQuoteClose}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-white/70">
                  {content.home.socialRatingLabel} {item.rating}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}