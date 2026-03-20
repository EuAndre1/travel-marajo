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
  const plannerQuickLinks = [
    {
      label: content.tabs[0] ?? "Voos",
      hint: content.heroFieldDestination,
      href: getLocalizedPath(lang, "flights"),
    },
    {
      label: content.tabs[1] ?? "Hotéis",
      hint: content.heroFieldDates,
      href: getLocalizedPath(lang, "hotels"),
    },
    {
      label: chrome.mainNav[1]?.label ?? hero.tabs[0]?.label ?? "Experiências",
      hint: hero.tabs[0]?.fields[0]?.label ?? content.heroFieldOrigin,
      href: getLocalizedPath(lang, "experiences"),
    },
    {
      label: chrome.mainNav[2]?.label ?? hero.tabs[2]?.label ?? "Pacotes",
      hint: hero.tabs[2]?.fields[0]?.label ?? content.heroFieldPassengers,
      href: getLocalizedPath(lang, "packages"),
    },
  ]

  return (
    <section id="hero" className="relative min-h-[78vh] overflow-hidden bg-[#04101b] sm:min-h-[84vh] lg:min-h-[90vh]">
      <div className="absolute inset-0">
        <Image src="/hero-bg.jpg" alt={content.home.homeHeroImageAlt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,27,0.38)_0%,rgba(4,16,27,0.58)_18%,rgba(4,16,27,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.28),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />
      </div>

      <div className="relative z-10 flex min-h-[78vh] items-center sm:min-h-[84vh] lg:min-h-[90vh]">
        <div className="tm-shell py-10 pt-[88px] sm:py-12 sm:pt-[96px] lg:py-16 lg:pt-[112px]">
          <div className="grid gap-6 lg:gap-8 xl:grid-cols-[minmax(0,540px)_minmax(320px,400px)] xl:items-center xl:justify-between">
            <div className="max-w-[540px] space-y-6 text-white">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/78 sm:text-[11px] sm:tracking-[0.3em]">
                  {content.home.heroKicker}
                </div>
                <h1 className="text-[2.45rem] font-display leading-[0.98] sm:text-[3.35rem] lg:text-[4rem] xl:text-[4.35rem]">
                  {hero.title}
                </h1>
                <p className="max-w-[520px] text-[15px] leading-7 text-white/80 sm:text-lg sm:leading-8">
                  {hero.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815] sm:w-auto"
                >
                  {hero.ctas.primary}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
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

            <div className="tm-card-dark w-full overflow-hidden border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-5 sm:p-6 xl:justify-self-end">
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/76 sm:text-[11px] sm:tracking-[0.28em]">
                {authority.heroPlannerEyebrow}
              </div>

              <h2 className="mt-4 text-[1.65rem] font-display leading-tight text-white sm:text-2xl">
                {authority.heroPlannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72 sm:leading-7">
                {authority.heroPlannerBody}
              </p>

              <ul className="mt-5 grid gap-2.5 text-sm text-white/78">
                {authority.heroPlannerHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3.5">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4">
                    <div className="text-xl font-semibold text-white sm:text-2xl">{stat.value}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/58 sm:text-[11px] sm:tracking-[0.24em]">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/58 sm:text-[11px]">
                  {content.home.heroSearchAria}
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {plannerQuickLinks.map((tab) => (
                    <Link
                      key={tab.label}
                      href={tab.href}
                      className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3.5 text-sm text-white/84 transition hover:bg-white/10"
                    >
                      <div>
                        <span className="block font-semibold text-white">{tab.label}</span>
                        <span className="block text-xs uppercase tracking-[0.16em] text-white/52">
                          {tab.hint}
                        </span>
                      </div>
                      <span aria-hidden="true" className="text-white/60">
                        &gt;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
