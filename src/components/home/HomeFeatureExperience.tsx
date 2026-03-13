"use client"

import Image from "next/image"
import Link from "next/link"
import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeFeatureExperience() {
  const { featureExperience } = homeContent
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="destaque" className="py-20 bg-[#F7F7F8]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <SectionHeader
              eyebrow={content.home.featureEyebrow}
              title={featureExperience.title}
              subtitle={featureExperience.description}
            />

            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
              {featureExperience.badge}
            </span>

            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{content.home.featureLocationLabel}</span>
                <strong className="text-slate-800 font-semibold">{featureExperience.location}</strong>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{content.home.featureDurationLabel}</span>
                <strong className="text-slate-800 font-semibold">{featureExperience.duration}</strong>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{content.home.featureInvestmentLabel}</span>
                <strong className="text-slate-800 font-semibold">{featureExperience.price}</strong>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-slate-600">
              {featureExperience.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/experiencias/pesqueiro"
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold transition hover:bg-primary-dark"
              >
                {featureExperience.ctas.primary}
              </Link>
              <Link
                href="/experiencias/pesqueiro"
                className="border border-primary/30 text-primary px-6 py-3 rounded-full text-sm font-semibold transition hover:border-primary"
              >
                {featureExperience.ctas.secondary}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={featureExperience.image}
                alt={featureExperience.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {featureExperience.gallery.map((image) => (
                <div key={image} className="relative h-24 rounded-2xl overflow-hidden">
                  <Image src={image} alt={content.home.featureGalleryAlt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}