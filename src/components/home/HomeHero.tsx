"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useResolvedHomeAuthorityContent,
  useResolvedHomeContent,
  useResolvedSiteChrome,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

export default function HomeHero() {
  const { lang } = useSiteLanguage()
  const { hero } = useResolvedHomeContent()
  const chrome = useResolvedSiteChrome()
  const authority = useResolvedHomeAuthorityContent()
  const content = useResolvedSiteContent()

  return (
    <section id="hero" className="relative min-h-[85vh] overflow-hidden bg-[#04101b] lg:min-h-[92vh]">
      <div className="absolute inset-0">
        <Image src="/hero-bg.jpg" alt={content.home.homeHeroImageAlt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,27,0.38)_0%,rgba(4,16,27,0.58)_18%,rgba(4,16,27,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.28),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />
      </div>

      <div className="relative z-10 flex min-h-[85vh] items-center lg:min-h-[92vh]">
        <div className="tm-shell py-12 pt-[104px] sm:py-14 sm:pt-[112px] lg:py-16 lg:pt-[124px]">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,540px)_minmax(360px,420px)] xl:justify-between xl:items-center">
            <div className="max-w-[540px] space-y-7 text-white">
              <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/78">
                {content.home.heroKicker}
              </div>
              <h1 className="text-4xl font-display leading-[1.02] sm:text-[3.35rem] lg:text-[4.15rem] xl:text-[4.55rem]">
                {hero.title}
              </h1>
              <p className="max-w-[520px] text-base leading-8 text-white/80 sm:text-lg">
                {hero.subtitle}
              </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                >
                  {hero.ctas.primary}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {chrome.planTripLabel}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2.5 text-sm text-white/72">
                <Link
                  href={getLocalizedPath(lang, "packages")}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 transition hover:bg-white/10"
                >
                  {hero.ctas.secondary}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "guides")}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 transition hover:bg-white/10"
                >
                  {chrome.mainNav[4]?.label}
                </Link>
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                  {chrome.authorityLabel}
                </span>
              </div>
            </div>

            <div className="tm-card-dark w-full overflow-hidden border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-6 sm:p-7 xl:justify-self-end">
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/76">
                {authority.heroPlannerEyebrow}
              </div>

              <h2 className="mt-5 text-2xl font-display leading-tight text-white">
                {authority.heroPlannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                {authority.heroPlannerBody}
              </p>

              <ul className="mt-6 grid gap-3 text-sm text-white/78">
                {authority.heroPlannerHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.45rem] border border-white/10 bg-white/6 px-4 py-5">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/58">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                {hero.tabs.slice(0, 4).map((tab) => (
                  <Link
                    key={tab.label}
                    href={tab.ctaHref}
                    className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/84 transition hover:bg-white/10"
                  >
                    <div>
                      <span className="block font-semibold text-white">{tab.label}</span>
                      <span className="block text-xs uppercase tracking-[0.16em] text-white/52">
                        {tab.fields[0]?.label}
                      </span>
                    </div>
                    <span className="text-white/60">{tab.ctaLabel}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
