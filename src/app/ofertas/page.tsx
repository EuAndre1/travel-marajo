"use client"

import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { homeContent } from "@/data/homepage"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function OffersPage() {
  const { offers } = homeContent
  const { lang } = useSiteLanguage()

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Ofertas"
              title={offers.title}
              subtitle={offers.subtitle}
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.items.map((offer) => (
                <article
                  key={offer.title}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition"
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
                      <Link href={getLocalizedPath(lang, "planTrip")} className="text-primary font-semibold">
                        Consultar disponibilidade
                      </Link>
                    </div>
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
