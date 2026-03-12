"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

const pesqueiroImages = [
  "/pesqueiro-1.png",
  "/pesqueiro-2.png",
  "/pesqueiro-3.png",
  "/pesqueiro-4.png",
  "/pesqueiro-5.jpg",
  "/soure-bufalo.png",
]

export default function PesqueiroPremium() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = useMemo(() => pesqueiroImages.length, [])
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [total])

  return (
    <section id="pesqueiro-premium" className="py-16 md:py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#FFF1E8] px-3 py-1 text-sm font-medium text-[#FF6600] mb-4">
                {content.premiumBadge}
              </span>

              <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight mb-4">
                {content.premiumTitle1} <span className="text-[#FF6600]">{content.premiumTitle2}</span>
              </h2>

              <p className="text-gray-600 text-lg mb-4 max-w-2xl">
                {content.premiumText}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {content.premiumHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-[#003366]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <a href="/experiences/pesqueiro" className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition">
                  {content.premiumCta1}
                </a>
                <a href="/activities" className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-6 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition">
                  {content.premiumCta2}
                </a>
              </div>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 aspect-[4/3]">
                <Image
                  src={pesqueiroImages[currentIndex]}
                  alt={`Pesqueiro Premium ${currentIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-700"
                  priority
                />

                <button type="button" onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#003366] w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-xl font-bold transition" aria-label="Imagem anterior">‹</button>
                <button type="button" onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#003366] w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-xl font-bold transition" aria-label="Próxima imagem">›</button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {pesqueiroImages.map((_, index) => (
                    <button key={index} type="button" onClick={() => setCurrentIndex(index)} className={`h-2.5 rounded-full transition-all ${currentIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/60"}`} aria-label={`Ir para imagem ${index + 1}`} />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{content.premiumFooter1}</span>
                <span>{content.premiumFooter2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


