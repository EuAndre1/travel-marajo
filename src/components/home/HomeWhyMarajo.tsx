"use client"

import {
  useResolvedHomeContent,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import SectionHeader from "./SectionHeader"

export default function HomeWhyMarajo() {
  const { whyMarajo } = useResolvedHomeContent()
  const content = useResolvedSiteContent()

  return (
    <section id="por-que" className="tm-section bg-[linear-gradient(180deg,#f6f3ee_0%,#ffffff_100%)]">
      <div className="tm-shell">
        <SectionHeader
          eyebrow={content.home.whyEyebrow}
          title={whyMarajo.title}
          subtitle={whyMarajo.subtitle}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {whyMarajo.items.map((item, index) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200/80 bg-white px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70 sm:text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-[#0B1C2C]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
