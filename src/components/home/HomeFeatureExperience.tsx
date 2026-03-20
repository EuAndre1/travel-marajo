"use client"

import Image from "next/image"
import Link from "next/link"
import { useResolvedSiteContent } from "@/components/content/ContentOverridesProvider"
import { getHomeContent } from "@/data/homepage"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeFeatureExperience() {
  const { lang } = useSiteLanguage()
  const { featureExperience } = getHomeContent(lang)
  const content = useResolvedSiteContent()

  return (
    <section id="destaque" className="tm-section bg-[linear-gradient(180deg,#0b1c2c_0%,#10283d_100%)]">
      <div className="tm-shell">
        <div className="grid gap-6 lg:gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="text-white">
            <SectionHeader
              eyebrow={content.home.featureEyebrow}
              title={featureExperience.title}
              subtitle={featureExperience.description}
              tone="light"
            />

            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent-light sm:text-[11px] sm:tracking-[0.28em]">
              {featureExperience.badge}
            </span>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.45rem] border border-white/10 bg-white/8 px-4 py-4">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-[11px] sm:tracking-[0.2em]">{content.home.featureLocationLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.location}</strong>
              </div>
              <div className="rounded-[1.45rem] border border-white/10 bg-white/8 px-4 py-4">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-[11px] sm:tracking-[0.2em]">{content.home.featureDurationLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.duration}</strong>
              </div>
              <div className="rounded-[1.45rem] border border-white/10 bg-white/8 px-4 py-4">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-[11px] sm:tracking-[0.2em]">{content.home.featureInvestmentLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.price}</strong>
              </div>
            </div>

            <ul className="mt-6 grid gap-2.5 text-sm text-white/76">
              {featureExperience.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-3.5">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={getLocalizedPath(lang, "experienceDetail", { slug: "pesqueiro" })}
                className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
              >
                {featureExperience.ctas.primary}
              </Link>
              <Link
                href={getLocalizedPath(lang, "experienceDetail", { slug: "pesqueiro" })}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {featureExperience.ctas.secondary}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="tm-card overflow-hidden border-white/10 bg-white/8 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-3">
              <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] sm:h-[420px] sm:rounded-[1.7rem]">
                <Image
                  src={featureExperience.image}
                  alt={featureExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:mt-3 sm:gap-3">
                {featureExperience.gallery.map((image) => (
                  <div key={image} className="relative h-20 overflow-hidden rounded-[1.1rem] sm:h-24 sm:rounded-2xl">
                    <Image src={image} alt={content.home.featureGalleryAlt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-[1.35rem] border border-white/10 bg-[#fff7ef] px-4 py-3.5 text-[#0B1C2C] shadow-[0_20px_40px_rgba(2,8,23,0.18)] sm:-bottom-5 sm:left-6 sm:right-6 sm:rounded-[1.6rem] sm:px-5 sm:py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a65f1a] sm:text-[11px] sm:tracking-[0.28em]">
                {content.pages.planTrip.eyebrow}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {content.pages.planTrip.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
