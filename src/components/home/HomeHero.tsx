"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getHomeContent } from "@/data/homepage"
import { siteChrome } from "@/data/site"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

export default function HomeHero() {
  const [activeTab, setActiveTab] = useState(0)
  const { lang } = useSiteLanguage()
  const { hero } = getHomeContent(lang)
  const content = siteContent[lang]
  const chrome = siteChrome[lang]

  useEffect(() => {
    setActiveTab(0)
  }, [lang])

  const active = hero.tabs[activeTab] ?? hero.tabs[0]

  return (
    <section id="hero" className="relative overflow-hidden bg-[#04101b]">
      <div className="absolute inset-0">
        <Image src="/hero-bg.jpg" alt={content.home.homeHeroImageAlt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,27,0.28)_0%,rgba(4,16,27,0.54)_18%,rgba(4,16,27,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.26),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
      </div>

      <div className="relative z-10 tm-shell pb-14 pt-28 lg:pb-18 lg:pt-36">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
          <div className="space-y-8 text-white">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/78">
                {content.home.heroKicker}
              </div>
              <h1 className="max-w-4xl text-4xl font-display leading-[1.02] sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
                {hero.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
                {hero.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.tabs[0]?.ctaHref ?? getLocalizedPath(lang, "experiences")}
                className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
              >
                {hero.ctas.primary}
              </Link>
              <Link
                href={getLocalizedPath(lang, "packages")}
                className="inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {hero.ctas.secondary}
              </Link>
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {content.pages.planTrip.title}
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:max-w-3xl">
              {hero.trustItems.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/82 backdrop-blur-sm">
                  <span className="mb-2 block h-1.5 w-10 rounded-full bg-[#E57A1F]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="tm-card-dark overflow-hidden border-white/12 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-6 sm:p-7 xl:ml-auto xl:w-full">
            <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/76">
              {chrome.authorityLabel}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.4rem] border border-white/10 bg-white/7 px-4 py-5">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/58">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {hero.tabs.slice(0, 3).map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.ctaHref}
                  className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/82 transition hover:bg-white/10"
                >
                  <span className="font-semibold text-white">{tab.label}</span>
                  <span className="text-white/55">{tab.ctaLabel}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/12 bg-white/95 shadow-[0_28px_90px_rgba(2,8,23,0.24)] backdrop-blur">
          <div className="flex overflow-x-auto border-b border-slate-200" role="tablist" aria-label={content.home.heroSearchAria}>
            {hero.tabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={`relative px-5 py-4 text-sm font-semibold whitespace-nowrap transition ${
                  activeTab === index
                    ? "bg-slate-100 text-[#0B1C2C]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
                {activeTab === index ? <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E57A1F]" /> : null}
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-5 sm:p-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {active.fields.map((field) => (
                  <label key={field.label} className="flex flex-col gap-2 text-xs font-semibold text-slate-500">
                    {field.label}
                    <input
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  {hero.trustItems.slice(0, 3).map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#E57A1F]" />
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href={active.ctaHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0B1C2C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                >
                  {active.ctaLabel}
                </Link>
              </div>
            </div>

            <div className="rounded-[1.7rem] bg-[linear-gradient(135deg,#f8efe4,#fffaf4)] p-5 text-[#0B1C2C]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a65f1a]">
                {content.pages.guides.heroEyebrow}
              </div>
              <h2 className="mt-3 text-2xl font-display leading-tight">{content.pages.guides.heroTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{content.pages.guides.heroSubtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "guides")}
                  className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                >
                  {content.home.travelGuideReadCta}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "services")}
                  className="inline-flex items-center justify-center rounded-full border border-[#0B1C2C]/12 px-4 py-2 text-sm font-semibold text-[#0B1C2C] transition hover:bg-white"
                >
                  {content.pages.services.heroPrimaryCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
