"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function HomeHero() {
  const { hero } = homeContent
  const [activeTab, setActiveTab] = useState(0)
  const active = hero.tabs[activeTab]
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt={content.home.homeHeroImageAlt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00182d]/80 via-[#003366]/60 to-[#00182d]/85" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                {content.home.heroKicker}
              </p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight">
                {hero.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/90">
                {hero.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={hero.tabs[0].ctaHref}
                  className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold transition hover:bg-accent-dark"
                >
                  {hero.ctas.primary}
                </Link>
                <Link
                  href="#roteiros"
                  className="border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold transition hover:border-white"
                >
                  {hero.ctas.secondary}
                </Link>
              </div>
            </div>

            <div className="bg-white/95 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
              {/* Tabs de busca para orientar o fluxo de descoberta */}
              <div className="flex overflow-x-auto border-b border-slate-200" role="tablist" aria-label={content.home.heroSearchAria}>
                {hero.tabs.map((tab, index) => (
                  <button
                    key={tab.label}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === index}
                    className={`px-5 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all relative ${
                      activeTab === index
                        ? "text-primary bg-blue-50"
                        : "text-slate-500 hover:text-primary hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.label}
                    {activeTab === index ? (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {active.fields.map((field) => (
                    <label key={field.label} className="flex flex-col gap-2 text-xs font-semibold text-slate-500">
                      {field.label}
                      <input
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-primary focus:ring-primary"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    {hero.trustItems.map((item) => (
                      <span key={item} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={active.ctaHref}
                    className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold transition hover:bg-primary-dark"
                  >
                    {active.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl px-4 py-4 backdrop-blur">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}