"use client"

import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeHowItWorks() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="tm-shell">
        <div className="py-10 sm:py-12">
          <SectionHeader
            eyebrow={content.home.howItWorksEyebrow}
            title={content.home.howItWorksTitle}
            subtitle={content.home.howItWorksSubtitle}
          />

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75">
            <div className="grid divide-y divide-slate-200/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
              {content.home.howItWorksSteps.map((step, index) => (
                <article key={step.title} className="px-4 py-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/70 sm:text-[11px] sm:tracking-[0.28em]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-[#0B1C2C]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
