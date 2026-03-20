"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useResolvedExperiences,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import SectionHeader from "@/components/home/SectionHeader"
import { getLocalizedExperience } from "@/data/experiencias"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

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
  const content = useResolvedSiteContent()
  const experiences = useResolvedExperiences()
  const locale = localeMap[lang] ?? "pt-BR"

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f7f8_0%,#ffffff_100%)]">
      <section className="tm-section pb-10">
        <div className="tm-shell">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
            <SectionHeader
              eyebrow={content.pages.experiences.eyebrow}
              title={content.pages.experiences.title}
              subtitle={content.pages.experiences.subtitle}
            />

            <div className="tm-card bg-[linear-gradient(135deg,#fff8f1,#f9fbfd)] p-6 sm:p-7">
              <div className="tm-chip">{content.pages.guides.internalExperiencesTitle}</div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {content.pages.guides.internalExperiencesSubtitle}
              </p>
              <div className="mt-6 grid gap-3">
                {content.pages.experiences.trustHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.35rem] border border-slate-200/80 bg-white/85 px-4 py-4 text-sm leading-6 text-slate-600"
                  >
                    <span className="mb-3 block h-1.5 w-10 rounded-full bg-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                >
                  {content.pages.planTrip.title}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "packages")}
                  className="inline-flex items-center justify-center rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary"
                >
                  {content.pages.packages.title}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((experience) => {
              const localizedExperience = getLocalizedExperience(experience, lang)

              return (
                <article
                  key={experience.slug}
                  className="tm-card group overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.15)]"
                >
                  <div className="relative h-56 overflow-hidden rounded-t-[2rem]">
                    <Image
                      src={experience.heroImage}
                      alt={localizedExperience.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,44,0.08),rgba(11,28,44,0.62))]" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#0B1C2C]">
                      {localizedExperience.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                      <span>{localizedExperience.location}</span>
                      <span>{localizedExperience.duration}</span>
                    </div>
                    <h3 className="text-xl font-display leading-snug text-[#0B1C2C]">
                      {localizedExperience.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">
                      {localizedExperience.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-primary">
                        {formatPrice(experience.priceFrom, locale)}
                      </span>
                      <span className="rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-semibold text-[#b25d18]">
                        {experience.rating} / 5
                      </span>
                    </div>
                    <div className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/80 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {content.pages.experiences.cardTrustLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {content.pages.experiences.cardTrustBody}
                      </p>
                    </div>
                    <Link
                      href={getLocalizedPath(lang, "experienceDetail", { slug: experience.slug })}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      {content.pages.experiences.detailsCta}
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
