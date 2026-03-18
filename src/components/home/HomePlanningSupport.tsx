"use client"

import Link from "next/link"
import { homeAuthorityContent } from "@/data/site"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

function resolvePlanningHref(
  lang: "pt" | "en" | "es" | "fr",
  route: "guideDetail" | Parameters<typeof getLocalizedPath>[1],
  slug?: string,
) {
  if (route === "guideDetail" && slug) {
    return getLocalizedPath(lang, "guideDetail", { slug })
  }

  return getLocalizedPath(lang, route)
}

export default function HomePlanningSupport() {
  const { lang } = useSiteLanguage()
  const authority = homeAuthorityContent[lang]
  const content = siteContent[lang]

  return (
    <section id="planejar-viagem" className="tm-section bg-[linear-gradient(180deg,#f2efe8_0%,#ffffff_100%)]">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <div className="space-y-6">
            <SectionHeader
              eyebrow={authority.planningEyebrow}
              title={authority.planningTitle}
              subtitle={authority.planningSubtitle}
            />

            <div className="tm-card bg-[linear-gradient(140deg,#0b1c2c,#10283d)] p-6 text-white sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-light/78">
                {content.pages.planTrip.deliverTitle}
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-white/78">
                {content.pages.planTrip.deliverItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/7 px-4 py-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  {authority.planningPrimaryLabel}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "guides")}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {authority.planningSecondaryLabel}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {authority.planningCards.map((card) => (
              <Link
                key={card.title}
                href={resolvePlanningHref(lang, card.route, card.slug)}
                className="tm-card group flex h-full flex-col justify-between bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-4 text-xl font-display leading-tight text-[#0B1C2C]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {content.home.topExperiencesDetailsLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
