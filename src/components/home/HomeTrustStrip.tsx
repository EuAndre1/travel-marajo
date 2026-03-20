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

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {hero.trustItems.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 px-4 py-3.5 text-[15px] leading-6 text-slate-600"
              >
                <span className="mb-2.5 block h-1.5 w-10 rounded-full bg-accent sm:w-12" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
