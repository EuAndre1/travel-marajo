"use client"

import Image from "next/image"
import Link from "next/link"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeFeatureExperience() {
  const { lang } = useSiteLanguage()
  const { featureExperience } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="destaque" className="tm-section bg-[linear-gradient(180deg,#0b1c2c_0%,#10283d_100%)]">
      <div className="tm-shell">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="text-white">
            <SectionHeader
              eyebrow={content.home.featureEyebrow}
              title={featureExperience.title}
              subtitle={featureExperience.description}
              tone="light"
            />

            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-light">
              {featureExperience.badge}
            </span>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 px-4 py-5">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/55">{content.home.featureLocationLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.location}</strong>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 px-4 py-5">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/55">{content.home.featureDurationLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.duration}</strong>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 px-4 py-5">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/55">{content.home.featureInvestmentLabel}</span>
                <strong className="mt-2 block text-sm font-semibold text-white">{featureExperience.price}</strong>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-white/76">
              {featureExperience.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
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
            <div className="tm-card overflow-hidden border-white/10 bg-white/8 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
              <div className="relative h-[380px] overflow-hidden rounded-[1.7rem] sm:h-[460px]">
                <Image
                  src={featureExperience.image}
                  alt={featureExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {featureExperience.gallery.map((image) => (
                  <div key={image} className="relative h-24 overflow-hidden rounded-2xl">
                    <Image src={image} alt={content.home.featureGalleryAlt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 left-6 right-6 rounded-[1.6rem] border border-white/10 bg-[#fff7ef] px-5 py-4 text-[#0B1C2C] shadow-[0_20px_40px_rgba(2,8,23,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a65f1a]">
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
