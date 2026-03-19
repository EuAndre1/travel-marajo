"use client"

import Image from "next/image"
import Link from "next/link"
import PackageCheckoutButton from "@/components/checkout/PackageCheckoutButton"
import SectionHeader from "@/components/home/SectionHeader"
import { premiumPackageLandingContent } from "@/data/package-landing"
import { getHomeContent } from "@/data/homepage"
import type { PackageItem } from "@/data/pacotes"
import { getLocalizedPackage } from "@/data/pacotes"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

type PremiumPackageLandingProps = {
  pkg: PackageItem
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

export default function PremiumPackageLanding({ pkg }: PremiumPackageLandingProps) {
  const { lang } = useSiteLanguage()
  const locale = localeMap[lang] ?? "pt-BR"
  const localizedPackage = getLocalizedPackage(pkg, lang)
  const pageCopy = premiumPackageLandingContent[lang]
  const content = siteContent[lang]
  const { hero, socialProof } = getHomeContent(lang)

  return (
    <main className="bg-[linear-gradient(180deg,#f7f3ee_0%,#ffffff_100%)]">
      <section className="relative overflow-hidden bg-[#071521] text-white">
        <div className="absolute inset-0">
          <Image src={pkg.heroImage} alt={localizedPackage.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,21,33,0.38)_0%,rgba(7,21,33,0.62)_26%,rgba(7,21,33,0.94)_100%)]" />
        </div>

        <div className="relative z-10 tm-shell py-16 pt-[124px] sm:py-20 sm:pt-[132px]">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,420px)] xl:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/78">
                {pageCopy.heroEyebrow}
              </div>
              <h1 className="mt-6 text-4xl font-display leading-[1.02] sm:text-[3.35rem] xl:text-[4.45rem]">
                {localizedPackage.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                {pageCopy.heroTitle}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                {pageCopy.heroBody}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/78">
                <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                  {localizedPackage.duration}
                </span>
                <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                  {pageCopy.audienceItems[0]}
                </span>
                <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                  {formatPrice(pkg.startingPrice, locale)}
                </span>
              </div>
            </div>

            <div className="tm-card-dark border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-6 sm:p-7">
              <p className="tm-chip !border-white/14 !bg-white/10 !text-white/72">
                {content.pages.packages.eyebrow}
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/56">
                    {content.pages.packages.priceFrom}
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-[#E57A1F]">
                    {formatPrice(pkg.startingPrice, locale)}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-3 text-right">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/54">
                    {content.pages.packages.itinerary}
                  </p>
                  <p className="mt-2 text-sm text-white/82">{localizedPackage.duration}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <PackageCheckoutButton
                  slug={pkg.slug}
                  label={content.pages.packages.reserveCta}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                />
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {content.pages.packages.consultCta}
                </Link>
              </div>

              <div className="mt-6 grid gap-3">
                {pageCopy.heroTrustNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/78"
                  >
                    <span className="mb-3 block h-1.5 w-10 rounded-full bg-accent" />
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tm-section bg-white">
        <div className="tm-shell grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <SectionHeader
            eyebrow={content.home.whyEyebrow}
            title={pageCopy.whyTitle}
            subtitle={pageCopy.whyBody}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="tm-card p-6 sm:p-7">
              <p className="tm-chip">{pageCopy.audienceTitle}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                {pageCopy.audienceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="tm-card bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)] p-6 sm:p-7">
              <p className="tm-chip">{content.pages.packages.eyebrow}</p>
              <h2 className="mt-5 text-2xl font-display text-[#0B1C2C]">{localizedPackage.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{localizedPackage.summary}</p>
              <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/75 px-5 py-5">
                <div className="text-2xl font-semibold text-primary">{formatPrice(pkg.startingPrice, locale)}</div>
                <div className="mt-2 text-sm text-slate-500">{localizedPackage.duration}</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tm-section bg-[linear-gradient(180deg,#fffaf4_0%,#ffffff_100%)]">
        <div className="tm-shell grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <SectionHeader
            eyebrow={content.pages.packages.includes}
            title={content.pages.packages.title}
            subtitle={content.pages.packages.subtitle}
          />

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="tm-card p-6 sm:p-7">
              <p className="tm-chip">{content.pages.packages.includes}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                {localizedPackage.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="tm-card-dark bg-[linear-gradient(135deg,#0B1C2C,#10283d)] p-6 sm:p-7 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-light/70">
                {pageCopy.trustEyebrow}
              </p>
              <h2 className="mt-5 text-2xl font-display">{pageCopy.trustTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/76">{pageCopy.trustSubtitle}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {hero.trustItems.map((item) => (
                  <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/76">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tm-section bg-white">
        <div className="tm-shell">
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
            <SectionHeader
              eyebrow={content.pages.packages.itinerary}
              title={pageCopy.journeyTitle}
              subtitle={pageCopy.journeySubtitle}
            />

            <div className="grid gap-4">
              {localizedPackage.itinerary.map((step, index) => (
                <article
                  key={step}
                  className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfd_100%)] px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-3xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="mt-3 text-lg font-display leading-snug text-[#0B1C2C]">{step}</p>
                    </div>
                    <span className="rounded-full bg-[#FFF1E8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b25d18]">
                      {localizedPackage.duration}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tm-section bg-[linear-gradient(180deg,#071521_0%,#0B1C2C_100%)] text-white">
        <div className="tm-shell">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <SectionHeader
            eyebrow={pageCopy.trustEyebrow}
            title={pageCopy.whyBookTitle}
            subtitle={pageCopy.whyBookSubtitle}
            tone="light"
          />

            <div className="grid gap-4 sm:grid-cols-2">
              {pageCopy.whyBookItems.map((item) => (
                <div key={item} className="rounded-[1.8rem] border border-white/10 bg-white/8 px-5 py-6 text-sm leading-7 text-white/80">
                  <span className="mb-4 block h-1.5 w-10 rounded-full bg-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-4 sm:grid-cols-3">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.8rem] border border-white/10 bg-white/8 px-5 py-6">
                  <div className="text-3xl font-semibold">{stat.value}</div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/58">{stat.label}</div>
                </div>
              ))}
            </div>

            <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(229,122,31,0.18),rgba(255,255,255,0.06))] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/58">{socialProof.testimonials[0]?.role}</p>
              <h3 className="mt-3 text-2xl font-display">{socialProof.testimonials[0]?.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/78">{socialProof.testimonials[0]?.quote}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/58">
                {content.home.socialRatingLabel} {socialProof.testimonials[0]?.rating}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="tm-section bg-white">
        <div className="tm-shell grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
          <SectionHeader
            eyebrow={content.pages.packages.eyebrow}
            title={pageCopy.faqTitle}
            subtitle={pageCopy.faqSubtitle}
          />

          <div className="grid gap-4">
            {pageCopy.faqItems.map((item) => (
              <article key={item.question} className="tm-card p-6 sm:p-7">
                <h3 className="text-lg font-display text-[#0B1C2C]">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tm-section bg-[linear-gradient(135deg,#fff8f1,#f8fbfd)]">
        <div className="tm-shell">
          <div className="tm-card overflow-hidden bg-[linear-gradient(135deg,#fffaf4,#ffffff)] p-8 sm:p-10">
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
              <SectionHeader
                eyebrow={pageCopy.finalEyebrow}
                title={pageCopy.finalTitle}
                subtitle={pageCopy.finalSubtitle}
              />

              <div className="flex flex-wrap gap-3 xl:justify-end">
                <PackageCheckoutButton
                  slug={pkg.slug}
                  label={content.pages.packages.reserveCta}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                />
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary"
                >
                  {content.pages.packages.consultCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
