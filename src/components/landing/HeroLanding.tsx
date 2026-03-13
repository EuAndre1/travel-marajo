"use client"

import { useState } from "react"
import Link from "next/link"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function HeroLanding() {
  const [activeTab, setActiveTab] = useState(0)
  const { lang, setLang } = useSiteLanguage()
  const content = siteContent[lang]
  const tabs = content.tabs

  const ctaHref =
    activeTab === 0 ? "/flights" :
    activeTab === 1 ? "/hotels" :
    activeTab === 2 ? "/packages" :
    activeTab === 3 ? "/activities" :
    "/flights"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-ken-burns">
          <img src="/hero-bg.jpg" alt={content.heroImageAlt} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/80" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-4">
            <div className="bg-white/90 rounded-lg px-3 py-2 flex items-center gap-3">
              <span className="text-sm font-medium text-[#003366]">{content.langLabel}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "pt" | "en" | "fr" | "es")}
                className="bg-transparent text-sm font-medium text-[#003366] outline-none"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="es">ES</option>
                <option value="pt">PT</option>
              </select>
            </div>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              <span className="block">{content.heroTitle1}</span>
              <span className="block">
                <span className="text-[#FF6600]">{content.heroTitle2}</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {content.heroSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto animate-float" style={{ animationDuration: "6s" }}>
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 relative ${
                    activeTab === index ? "text-[#003366] bg-blue-50" : "text-gray-600 hover:text-[#003366] hover:bg-gray-50"
                  }`}
                >
                  {tab}
                  {activeTab === index && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6600]" />}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input placeholder={content.heroFieldOrigin} className="h-12 border border-gray-200 rounded-lg px-4" />
                <input placeholder={content.heroFieldDestination} className="h-12 border border-gray-200 rounded-lg px-4" />
                <input placeholder={content.heroFieldDates} className="h-12 border border-gray-200 rounded-lg px-4" />
                <input placeholder={content.heroFieldPassengers} className="h-12 border border-gray-200 rounded-lg px-4" />
              </div>
              <div className="mt-4 flex justify-end">
                <Link href={ctaHref} className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-8 h-12 inline-flex items-center rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105">
                  {content.heroButton}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8">
            <div className="text-center text-white"><div className="text-2xl font-bold">500+</div><div className="text-sm text-white/80">{content.stats[0]}</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">50+</div><div className="text-sm text-white/80">{content.stats[1]}</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">100k+</div><div className="text-sm text-white/80">{content.stats[2]}</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">4.9</div><div className="text-sm text-white/80">{content.stats[3]}</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}