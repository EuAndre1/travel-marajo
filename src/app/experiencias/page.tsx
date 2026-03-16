"use client"

import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { experiences } from "@/data/experiencias"
import { useSiteLanguage } from "@/lib/use-site-language"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"

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

export default function ExperiencesPage() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const locale = localeMap[lang] ?? "pt-BR"

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow={content.pages.experiences.eyebrow}
              title={content.pages.experiences.title}
              subtitle={content.pages.experiences.subtitle}
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <article
                  key={experience.slug}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition"
                >
                  <div className="relative h-52 rounded-2xl overflow-hidden">
                    <Image
                      src={experience.heroImage}
                      alt={experience.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                      {experience.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{experience.location}</span>
                      <span>{experience.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0B1C2C]">
                      {experience.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {experience.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-primary">{formatPrice(experience.priceFrom, locale)}</span>
                      <span className="text-slate-500">{experience.rating} / 5</span>
                    </div>
                    <Link
                      href={getLocalizedPath(lang, "experienceDetail", { slug: experience.slug })}
                      className="text-sm font-semibold text-primary inline-flex items-center gap-2"
                    >
                      {content.pages.experiences.detailsCta}
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
