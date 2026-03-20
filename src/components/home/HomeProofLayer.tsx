"use client"

import {
  useResolvedHomeContent,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import SectionHeader from "./SectionHeader"

export default function HomeProofLayer() {
  const { hero } = useResolvedHomeContent()
  const content = useResolvedSiteContent()

  return (
    <section className="tm-section bg-[linear-gradient(180deg,#fffaf4_0%,#ffffff_100%)] py-10 sm:py-12">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.proofEyebrow}
            title={content.home.proofTitle}
            subtitle={content.home.proofSubtitle}
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.55rem] border border-slate-200/80 bg-white px-4 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="text-[1.8rem] font-semibold text-[#0B1C2C] sm:text-3xl">{stat.value}</div>
                <div className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:text-[11px] sm:tracking-[0.24em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {content.home.proofHighlights.map((item) => (
            <div
              key={item}
              className="rounded-[1.55rem] border border-slate-200/80 bg-slate-50/75 px-4 py-4 text-[15px] leading-6 text-slate-600 sm:leading-7"
            >
              <span className="mb-3 block h-1.5 w-10 rounded-full bg-accent sm:w-12" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
