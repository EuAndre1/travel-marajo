"use client"

import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeHowItWorks() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section className="tm-section border-y border-slate-200/70 bg-white py-12 sm:py-14">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <SectionHeader
            eyebrow={content.home.howItWorksEyebrow}
            title={content.home.howItWorksTitle}
            subtitle={content.home.howItWorksSubtitle}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.home.howItWorksSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.9rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfd_100%)] px-5 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-lg font-display leading-snug text-[#0B1C2C]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
