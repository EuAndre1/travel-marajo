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
    <section className="tm-section bg-[linear-gradient(180deg,#fffaf4_0%,#ffffff_100%)] py-12 sm:py-14">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.proofEyebrow}
            title={content.home.proofTitle}
            subtitle={content.home.proofSubtitle}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.8rem] border border-slate-200/80 bg-white px-5 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="text-3xl font-semibold text-[#0B1C2C]">{stat.value}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {content.home.proofHighlights.map((item) => (
            <div
              key={item}
              className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/75 px-5 py-5 text-sm leading-7 text-slate-600"
            >
              <span className="mb-4 block h-1.5 w-12 rounded-full bg-accent" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
