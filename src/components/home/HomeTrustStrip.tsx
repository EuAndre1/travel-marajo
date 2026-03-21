"use client"

import {
  useResolvedHomeAuthorityContent,
  useResolvedHomeContent,
} from "@/components/content/ContentOverridesProvider"

export default function HomeTrustStrip() {
  const { hero } = useResolvedHomeContent()
  const authority = useResolvedHomeAuthorityContent()

  return (
    <section className="border-b border-slate-200/70 bg-white">
      <div className="tm-shell py-4 sm:py-5">
        <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-[11px] sm:tracking-[0.32em]">
              {authority.trustStripLabel}
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {hero.trustItems.map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-[1rem] bg-slate-50/80 px-3.5 py-3 text-sm leading-6 text-slate-600">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
