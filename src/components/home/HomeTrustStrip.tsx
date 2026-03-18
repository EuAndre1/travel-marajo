"use client"

import { getHomeContent } from "@/data/homepage"
import { homeAuthorityContent } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function HomeTrustStrip() {
  const { lang } = useSiteLanguage()
  const { hero } = getHomeContent(lang)
  const authority = homeAuthorityContent[lang]

  return (
    <section className="border-b border-slate-200/70 bg-white">
      <div className="tm-shell py-6">
        <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary/80">
              {authority.trustStripLabel}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {hero.trustItems.map((item) => (
              <div
                key={item}
                className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/70 px-4 py-4 text-sm leading-6 text-slate-600"
              >
                <span className="mb-3 block h-1.5 w-12 rounded-full bg-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
