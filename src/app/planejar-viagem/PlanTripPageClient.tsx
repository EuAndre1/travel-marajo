"use client"

import Link from "next/link"
import {
  useResolvedExperiences,
  useResolvedPackages,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import SectionHeader from "@/components/home/SectionHeader"
import { planTripEditorialContent } from "@/config/site-content"
import { experiences as baseExperiences, getLocalizedExperience } from "@/data/experiencias"
import { getGuidesBySlugs } from "@/data/guides"
import { getLocalizedPackage, packages as basePackages } from "@/data/pacotes"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"

function buildWhatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  return buildWhatsAppUrl(number, message)
}

export default function PlanTripPageClient() {
  const { lang } = useSiteLanguage()
  const content = useResolvedSiteContent()
  const experiences = useResolvedExperiences()
  const packages = useResolvedPackages()
  const copy = planTripEditorialContent[lang]
  const planTripContent = content.pages.planTrip
  const whatsappLink = buildWhatsappLink(content.pages.planTrip.whatsappMessage)
  const planningGuides = getGuidesBySlugs([
    "marajo-island-travel-guide",
    "how-to-visit-marajo-island",
    "marajo-itinerary-guide",
  ])
  const recommendedExperiences = (experiences.length > 0 ? experiences : baseExperiences).filter((item) =>
    ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"].includes(item.slug),
  )
  const recommendedPackages = (packages.length > 0 ? packages : basePackages).filter((item) =>
    ["marajo-essencial", "marajo-slow"].includes(item.slug),
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,102,0,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.10),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.heroKicker}</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
                  {copy.heroSubtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                    >
                      {copy.heroPrimary}
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/70">
                      {content.pages.planTrip.whatsappFallback}
                    </span>
                  )}
                  <Link
                    href={getLocalizedPath(lang, "packages")}
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {copy.heroSecondary}
                  </Link>
                  <Link
                    href={getLocalizedPath(lang, "experiences")}
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {copy.finalSecondary}
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{content.pages.planTrip.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{content.pages.planTrip.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/85">
                  {copy.stats.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.howItWorksEyebrow} title={copy.howItWorksTitle} subtitle={copy.howItWorksSubtitle} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.steps.map((step) => (
                <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#0B1C2C]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_0.92fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.guidanceEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.guidanceTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{copy.guidanceBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {copy.guidancePoints.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-[#FFF1E8] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A3412]">{planTripContent.internationalSupportEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.intlTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{copy.intlBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {copy.intlPoints.map((item) => (
                  <li key={item} className="rounded-2xl bg-white/80 px-4 py-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.segmentsEyebrow} title={copy.segmentsTitle} subtitle={content.pages.planTrip.subtitle} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.segments.map((segment) => (
                <article key={segment.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#0B1C2C]">{segment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{segment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.experiencesTitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.experiencesBody}</p>
              <div className="mt-6 grid gap-4">
                {recommendedExperiences.map((experience) => (
                  (() => {
                    const localizedExperience = getLocalizedExperience(experience, lang)

                    return (
                      <Link
                        key={experience.slug}
                        href={getLocalizedPath(lang, "experienceDetail", { slug: experience.slug })}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#003366] hover:bg-white"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#0B1C2C]">
                              {localizedExperience.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {localizedExperience.shortDescription}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#003366]">
                            {copy.experienceLabel}
                          </span>
                        </div>
                      </Link>
                    )
                  })()
                ))}
              </div>
              <Link href={getLocalizedPath(lang, "experiences")} className="mt-5 inline-flex text-sm font-semibold text-[#003366]">{copy.finalSecondary}</Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.packagesTitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.packagesBody}</p>
              <div className="mt-6 grid gap-4">
                {recommendedPackages.map((item) => (
                  (() => {
                    const localizedPackage = getLocalizedPackage(item, lang)

                    return (
                      <Link
                        key={item.slug}
                        href={getLocalizedPath(lang, "packages")}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#003366] hover:bg-white"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#0B1C2C]">
                              {localizedPackage.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {localizedPackage.summary}
                            </p>
                            <p className="mt-3 text-sm font-medium text-[#003366]">
                              {localizedPackage.duration}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#003366]">
                            {copy.packageLabel}
                          </span>
                        </div>
                      </Link>
                    )
                  })()
                ))}
              </div>
              <Link href={getLocalizedPath(lang, "packages")} className="mt-5 inline-flex text-sm font-semibold text-[#003366]">{copy.heroSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.proofEyebrow} title={copy.proofTitle} subtitle={copy.proofBody} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.proofCards.map((item) => (
                <article key={`${item.name}-${item.destination}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E8] px-2 text-[10px] font-semibold text-[#9A3412]">
                      {item.imageLabel}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0B1C2C]">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.origin} | {item.destination}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">"{item.quote}"</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">{copy.trustLabel}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_0.92fr]">
            <div className="rounded-3xl bg-[#0B1C2C] p-8 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">{planTripContent.whatsappConversionEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold">{copy.whatsappTitle}</h2>
              <p className="mt-4 text-base leading-7 text-white/80">{copy.whatsappBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {copy.whatsappBullets.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</li>
                ))}
              </ul>
              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                >
                  {content.pages.planTrip.whatsappCta}
                </a>
              ) : (
                <p className="mt-6 text-sm text-white/65">{content.pages.planTrip.whatsappFallback}</p>
              )}
              <Link
                href={getLocalizedPath(lang, "serviceBrazilVisa")}
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {planTripContent.visaConsultingCta}
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{planTripContent.planningGuidesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{planTripContent.planningGuidesTitle}</h2>
              <div className="mt-6 grid gap-4">
                {planningGuides.map((guide) => (
                  <Link
                    key={guide!.slug}
                    href={getLocalizedPath(lang, "guideDetail", { slug: guide!.slug })}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#003366] hover:bg-white"
                  >
                    <span className="text-base font-semibold text-[#0B1C2C]">{guide!.title}</span>
                    <span className="mt-2 block text-sm text-slate-500">{guide!.seoDescription}</span>
                  </Link>
                ))}
              </div>
              <Link href={getLocalizedPath(lang, "guides")} className="mt-5 inline-flex text-sm font-semibold text-[#003366]">
                {planTripContent.planningGuidesCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-[#F7F7F8] p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{planTripContent.finalEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.finalTitle}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{copy.finalBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    {copy.finalPrimary}
                  </a>
                ) : null}
                <Link
                  href={getLocalizedPath(lang, "packages")}
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                >
                  {copy.heroSecondary}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {copy.finalSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
