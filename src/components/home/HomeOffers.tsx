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

  return (
    <section id="ofertas" className="py-20 bg-[#F7F7F8]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.offersEyebrow}
            title={offers.title}
            subtitle={offers.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {offers.items.map((offer) => (
              <article
                key={offer.title}
                className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
              >
                <div className="relative h-44">
                  <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                  <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                    {offer.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-[#0B1C2C]">{offer.title}</h3>
                  <p className="text-sm text-slate-600">{offer.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary">{offer.price}</span>
                    <Link href={offer.href} className="text-primary font-semibold">
                      {content.home.offersConditions}
                    </Link>
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
