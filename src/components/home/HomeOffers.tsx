"use client"

import Image from "next/image"
import Link from "next/link"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeOffers() {
  const { lang } = useSiteLanguage()
  const { offers } = getHomeContent(lang)
  const content = siteContent[lang]
  const featuredOffer = offers.items[0]
  const secondaryOffers = offers.items.slice(1)

  return (
    <section id="ofertas" className="tm-section bg-[linear-gradient(180deg,#eef4f8_0%,#f7f7f8_100%)]">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.offersEyebrow}
            title={offers.title}
            subtitle={offers.subtitle}
          />

          <div className="tm-card bg-white/80 p-6 sm:p-7">
            <p className="tm-chip">{content.pages.planTrip.whatsappConversionEyebrow}</p>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {content.pages.planTrip.responseText}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          {featuredOffer ? (
            <article className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[300px]">
                  <Image src={featuredOffer.image} alt={featuredOffer.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,44,0.05),rgba(11,28,44,0.68))]" />
                  <span className="absolute left-6 top-6 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#0B1C2C]">
                    {featuredOffer.badge}
                  </span>
                </div>
                <div className="flex flex-col justify-between p-7 sm:p-8">
                  <div>
                    <p className="tm-chip">{content.home.offersEyebrow}</p>
                    <h3 className="mt-5 text-3xl font-display leading-tight text-[#0B1C2C]">
                      {featuredOffer.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{featuredOffer.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-primary">{featuredOffer.price}</span>
                    <Link
                      href={featuredOffer.href}
                      className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                    >
                      {content.home.offersConditions}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-6">
            {secondaryOffers.map((offer) => (
              <article
                key={offer.title}
                className="tm-card overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="grid sm:grid-cols-[0.42fr_0.58fr]">
                  <div className="relative min-h-[210px]">
                    <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <span className="tm-chip">{offer.badge}</span>
                      <h3 className="mt-4 text-xl font-display text-[#0B1C2C]">{offer.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{offer.description}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="font-semibold text-primary">{offer.price}</span>
                      <Link href={offer.href} className="text-sm font-semibold text-primary">
                        {content.home.offersConditions}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
