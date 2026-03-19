"use client"

import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { FLAGSHIP_PACKAGE_SLUG, premiumPackageLandingContent } from "@/data/package-landing"
import { getLocalizedPackage, packages } from "@/data/pacotes"
import PackageCheckoutButton from "@/components/checkout/PackageCheckoutButton"
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

export default function PackagesPage() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const locale = localeMap[lang] ?? "pt-BR"
  const flagshipPackage = packages.find((item) => item.slug === FLAGSHIP_PACKAGE_SLUG) ?? packages[0]
  const localizedFlagship = flagshipPackage ? getLocalizedPackage(flagshipPackage, lang) : null
  const landingCopy = premiumPackageLandingContent[lang]

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]">
      <section className="tm-section pb-10">
        <div className="tm-shell">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
            <SectionHeader
              eyebrow={content.pages.packages.eyebrow}
              title={content.pages.packages.title}
              subtitle={content.pages.packages.subtitle}
            />

            <div className="tm-card bg-[linear-gradient(135deg,#fff8f1,#f9fbfd)] p-6 sm:p-7">
              <div className="tm-chip">{content.pages.guides.internalPackagesTitle}</div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {content.pages.guides.internalPackagesSubtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                >
                  {content.pages.packages.consultCta}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex items-center justify-center rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary"
                >
                  {content.pages.experiences.title}
                </Link>
              </div>
            </div>
          </div>

          {localizedFlagship ? (
            <div className="mt-10 tm-card overflow-hidden bg-[linear-gradient(135deg,#fff8f1,#f8fbfd)] p-6 sm:p-7">
              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
                <div>
                  <p className="tm-chip">{landingCopy.listingFeatureEyebrow}</p>
                  <h2 className="mt-5 text-3xl font-display leading-tight text-[#0B1C2C]">
                    {landingCopy.listingFeatureTitle}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    {landingCopy.listingFeatureBody}
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>{localizedFlagship.duration}</span>
                    <span className="font-semibold text-primary">
                      {formatPrice(flagshipPackage.startingPrice, locale)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-display text-[#0B1C2C]">
                    {localizedFlagship.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{localizedFlagship.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={getLocalizedPath(lang, "packageDetail", { slug: flagshipPackage.slug })}
                      className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                    >
                      {content.pages.packages.detailsCta}
                    </Link>
                    <PackageCheckoutButton
                      slug={flagshipPackage.slug}
                      label={content.pages.packages.reserveCta}
                      className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 font-semibold text-white transition hover:bg-[#c96815]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {packages.map((item) => (
              (() => {
                const localizedPackage = getLocalizedPackage(item, lang)

                return (
                  <article
                    key={item.slug}
                    className="tm-card overflow-hidden bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.88fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{localizedPackage.duration}</p>
                    <h3 className="mt-3 text-2xl font-display leading-tight text-[#0B1C2C]">{localizedPackage.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{localizedPackage.summary}</p>

                    <div className="mt-6 rounded-[1.6rem] bg-[#FFF1E8] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{content.pages.packages.priceFrom}</p>
                      <p className="mt-2 text-2xl font-semibold text-[#E57A1F]">{formatPrice(item.startingPrice, locale)}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-[#003366]">{content.pages.packages.includes}</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {localizedPackage.included.map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#003366]">{content.pages.packages.itinerary}</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {localizedPackage.itinerary.map((step) => (
                          <li key={step} className="flex items-start gap-2">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <PackageCheckoutButton
                        slug={item.slug}
                        label={content.pages.packages.reserveCta}
                        className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 font-semibold text-white transition hover:bg-[#c96815]"
                      />
                      <Link
                        href={getLocalizedPath(lang, "packageDetail", { slug: item.slug })}
                        className="inline-flex items-center justify-center rounded-full border border-[#003366] px-5 py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                      >
                        {content.pages.packages.detailsCta}
                      </Link>
                      <Link
                        href={getLocalizedPath(lang, "planTrip")}
                        className="inline-flex items-center justify-center rounded-full border border-primary/20 px-5 py-3 font-semibold text-primary transition hover:border-primary"
                      >
                        {content.pages.packages.consultCta}
                      </Link>
                    </div>
                  </article>
                )
              })()
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
