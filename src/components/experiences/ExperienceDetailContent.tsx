"use client"

import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import ExperienceCheckoutButton from "@/components/checkout/ExperienceCheckoutButton"
import { useSiteLanguage } from "@/lib/use-site-language"
import { siteContent } from "@/config/site-content"
import type { ExperienceItem } from "@/data/experiencias"

interface ExperienceDetailContentProps {
  experience: ExperienceItem
}

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

export default function ExperienceDetailContent({ experience }: ExperienceDetailContentProps) {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const locale = localeMap[lang] ?? "pt-BR"

  return (
    <main className="bg-white min-h-screen">
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={experience.heroImage}
            alt={experience.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/85" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-20">
          <div className="max-w-6xl mx-auto text-white">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white mb-4 backdrop-blur-sm">
              {experience.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {experience.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              {experience.fullDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
              <span className="rounded-full bg-white/10 px-4 py-2">{experience.location}</span>
              <span className="rounded-full bg-[#FF6600] px-4 py-2 text-white">{formatPrice(experience.priceFrom, locale)}</span>
              <span className="rounded-full bg-white/10 px-4 py-2">{experience.duration}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <ExperienceCheckoutButton
                slug={experience.slug}
                label={content.pages.experienceDetail.reserveNow}
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              />
              <Link
                href="/planejar-viagem"
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-[#003366] transition"
              >
                {content.pages.experienceDetail.planWithConcierge}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <SectionHeader
                eyebrow={content.pages.experienceDetail.eyebrow}
                title={content.pages.experienceDetail.title}
                subtitle={experience.shortDescription}
              />
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experience.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#003366] mb-4">{content.pages.experienceDetail.includedTitle}</h3>
                <ul className="space-y-2 text-slate-600">
                  {experience.included.map((item) => (
                    <li key={item}>â€¢ {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="rounded-3xl border border-gray-200 shadow-xl p-6 bg-white h-fit">
              <p className="text-sm text-gray-500 mb-2">{content.pages.experienceDetail.priceLabel}</p>
              <p className="text-3xl font-bold text-[#FF6600] mb-4">{formatPrice(experience.priceFrom, locale)}</p>
              <p className="text-sm text-gray-500 mb-6">{content.pages.experienceDetail.perPersonLabel} {experience.rating}</p>
              <ExperienceCheckoutButton
                slug={experience.slug}
                label={content.pages.experienceDetail.reserveExperience}
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              />
              <Link
                href="/planejar-viagem"
                className="mt-4 w-full inline-flex items-center justify-center rounded-xl border border-[#003366] px-6 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition"
              >
                {content.pages.experienceDetail.talkToConsultant}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}