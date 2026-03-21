"use client"

import Image from "next/image"
import Link from "next/link"
import { useResolvedHotelCards } from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

const copyByLocale = {
  pt: {
    eyebrow: "Partner Hotels",
    title: "Hospedagens parceiras para complementar a viagem",
    subtitle: "Sugestoes leves de estadia para quem quer comparar base, perfil e faixa de valor.",
  },
  en: {
    eyebrow: "Partner Hotels",
    title: "Partner stays to complete the trip",
    subtitle: "A lightweight stay selection for travelers comparing base, style, and price range.",
  },
  es: {
    eyebrow: "Partner Hotels",
    title: "Hospedajes aliados para completar el viaje",
    subtitle: "Una seleccion ligera para comparar base, estilo y rango de precio.",
  },
  fr: {
    eyebrow: "Partner Hotels",
    title: "Hebergements partenaires pour completer le voyage",
    subtitle: "Une selection legere pour comparer base, style et gamme de prix.",
  },
} as const

export default function HomePartnerHotels() {
  const { lang } = useSiteLanguage()
  const cards = useResolvedHotelCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )

  if (cards.length === 0) {
    return null
  }

  const copy = copyByLocale[lang]

  return (
    <section className="tm-section bg-[#f8f7f3]">
      <div className="tm-shell">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-48">
                <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                {card.metaPrimary ? (
                  <p className="mt-3 text-sm font-semibold text-primary">{card.metaPrimary}</p>
                ) : null}
                <Link
                  href={card.ctaTarget === "/hotels" || card.ctaTarget === "/hoteis" ? getLocalizedPath(lang, "hotels") : card.ctaTarget}
                  className="mt-4 inline-flex text-sm font-semibold text-primary"
                >
                  {card.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
