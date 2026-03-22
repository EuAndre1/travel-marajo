"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  useResolvedHomeAuthorityContent,
  useResolvedHomeContent,
  useResolvedHomepageStudioContent,
  useResolvedSiteChrome,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import { getVideoMimeTypeFromPath } from "@/lib/media-library/shared"

export default function HomeHero() {
  const [videoFailed, setVideoFailed] = useState(false)
  const { lang } = useSiteLanguage()
  const { hero } = useResolvedHomeContent()
  const homepageStudio = useResolvedHomepageStudioContent()
  const chrome = useResolvedSiteChrome()
  const authority = useResolvedHomeAuthorityContent()
  const content = useResolvedSiteContent()
  const heroFallbackImageUrl = homepageStudio.heroImageUrl || "/hero-bg.jpg"
  const heroMediaUrl = homepageStudio.heroMediaUrl || heroFallbackImageUrl
  const heroMediaType = homepageStudio.heroMediaType
  const shouldRenderHeroVideo =
    heroMediaType === "video" && Boolean(heroMediaUrl) && !videoFailed
  const arrivalNote = {
    pt: "De Belém - ferry + transfer disponíveis",
    en: "From Belém - ferry + transfer available",
    es: "Desde Belém - ferry + transfer disponibles",
    fr: "Depuis Belém - ferry + transfert disponibles",
  }[lang]
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
    <section id="hero" className="relative min-h-[70vh] overflow-hidden bg-[#04101b] sm:min-h-[76vh] lg:min-h-[84vh]">
      <div className="absolute inset-0">
        {heroFallbackImageUrl ? (
          <Image
            src={heroFallbackImageUrl}
            alt={content.home.homeHeroImageAlt}
            fill
            priority
            className="object-cover"
          />
        ) : null}
        {shouldRenderHeroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setVideoFailed(true)}
          >
            <source src={heroMediaUrl} type={getVideoMimeTypeFromPath(heroMediaUrl)} />
          </video>
        ) : heroMediaType === "image" && heroMediaUrl && heroMediaUrl !== heroFallbackImageUrl ? (
          <Image
            src={heroMediaUrl}
            alt={content.home.homeHeroImageAlt}
            fill
            priority
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.28),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />
      </div>

      <div className="relative z-10 flex min-h-[70vh] items-center sm:min-h-[76vh] lg:min-h-[84vh]">
        <div className="tm-shell py-8 pt-[82px] sm:py-10 sm:pt-[90px] lg:py-12 lg:pt-[104px]">
          <div className="grid gap-5 lg:gap-8 xl:grid-cols-[minmax(0,540px)_minmax(300px,380px)] xl:items-center xl:justify-between">
            <div className="max-w-[540px] space-y-5 text-white">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/78 sm:text-[11px] sm:tracking-[0.3em]">
                  {content.home.heroKicker}
                </div>
                <h1 className="text-[2.2rem] font-display leading-[0.98] sm:text-[3rem] lg:text-[3.7rem] xl:text-[4rem]">
                  {hero.title}
                </h1>
                <p className="max-w-[500px] text-[15px] leading-7 text-white/80 sm:text-[17px] sm:leading-8">
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

              <div className="flex flex-wrap items-center gap-2 text-sm text-white/74">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                <span>{arrivalNote}</span>
              </div>
            </div>

            <div className="tm-card-dark w-full overflow-hidden border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-4 sm:p-5 xl:justify-self-end">
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/76 sm:text-[11px] sm:tracking-[0.28em]">
                {authority.heroPlannerEyebrow}
              </div>

              <h2 className="mt-4 text-[1.45rem] font-display leading-tight text-white sm:text-[1.7rem]">
                {authority.heroPlannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/72">
                {authority.heroPlannerBody}
              </p>

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

              <p className="mt-4 text-sm leading-6 text-white/62">{hero.trustItems[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
