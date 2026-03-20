"use client"

import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeHowItWorks() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section className="tm-section border-y border-slate-200/70 bg-white py-10 sm:py-12">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <SectionHeader
            eyebrow={content.home.howItWorksEyebrow}
            title={content.home.howItWorksTitle}
            subtitle={content.home.howItWorksSubtitle}
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {content.home.howItWorksSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.6rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfd_100%)] px-4 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70 sm:text-[11px] sm:tracking-[0.28em]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-[1.05rem] font-display leading-snug text-[#0B1C2C] sm:text-lg">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-6 text-slate-600 sm:text-sm sm:leading-7">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
