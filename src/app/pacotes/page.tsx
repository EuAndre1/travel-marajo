"use client"

import SectionHeader from "@/components/home/SectionHeader"
import Link from "next/link"
import { packages } from "@/data/pacotes"
import PackageCheckoutButton from "@/components/checkout/PackageCheckoutButton"
import { useSiteLanguage } from "@/lib/use-site-language"
import { siteContent } from "@/config/site-content"

const localeMap: Record<"pt" | "en" | "es" | "fr", string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
}

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function PackagesPage() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const locale = localeMap[lang] ?? "pt-BR"

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow={content.pages.packages.eyebrow}
              title={content.pages.packages.title}
              subtitle={content.pages.packages.subtitle}
            />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {packages.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex flex-col gap-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.duration}</p>
                    <h3 className="text-xl font-semibold text-[#0B1C2C] mt-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mt-3">{item.summary}</p>
                  </div>
                  <div className="rounded-2xl bg-[#FFF1E8] p-4">
                    <p className="text-xs text-slate-500">{content.pages.packages.priceFrom}</p>
                    <p className="text-xl font-bold text-[#FF6600]">{formatPrice(item.startingPrice, locale)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366] mb-2">{content.pages.packages.includes}</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {item.included.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-[#FF6600]">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366] mb-2">{content.pages.packages.itinerary}</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {item.itinerary.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-[#FF6600]">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <PackageCheckoutButton
                      slug={item.slug}
                      label={content.pages.packages.reserveCta}
                      className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                    />
                    <Link
                      href="/planejar-viagem"
                      className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition"
                    >
                      {content.pages.packages.consultCta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
