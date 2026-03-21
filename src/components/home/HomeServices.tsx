"use client"

import Image from "next/image"
import Link from "next/link"
import { useResolvedServiceCards } from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

const copyByLocale = {
  pt: {
    eyebrow: "Services",
    title: "Servicos para destravar a proxima decisao",
    subtitle: "Consultoria, planejamento e apoio humano para quem ainda esta comparando caminhos.",
  },
  en: {
    eyebrow: "Services",
    title: "Services that unlock the next decision",
    subtitle: "Consulting, planning, and human guidance for travelers still comparing options.",
  },
  es: {
    eyebrow: "Services",
    title: "Servicios para destrabar la siguiente decision",
    subtitle: "Consultoria, planificacion y apoyo humano para quienes aun comparan caminos.",
  },
  fr: {
    eyebrow: "Services",
    title: "Services pour debloquer la prochaine decision",
    subtitle: "Conseil, planification et accompagnement humain pour les voyageurs encore en comparaison.",
  },
} as const

export default function HomeServices() {
  const { lang } = useSiteLanguage()
  const cards = useResolvedServiceCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )

  if (cards.length === 0) {
    return null
  }

  const copy = copyByLocale[lang]

  const resolveServiceHref = (linkedSlug: string, ctaTarget: string) => {
    if (
      ctaTarget &&
      (ctaTarget.startsWith("http") ||
        ctaTarget.startsWith("mailto:") ||
        ctaTarget.startsWith("tel:") ||
        ctaTarget.includes("wa.me"))
    ) {
      return ctaTarget
    }

    if (linkedSlug === "brazil-visa-consulting") {
      return getLocalizedPath(lang, "serviceBrazilVisa")
    }

    if (linkedSlug === "custom-travel-planning" || linkedSlug === "concierge-assistance") {
      return getLocalizedPath(lang, "planTrip")
    }

    return ctaTarget
  }

  return (
    <section className="tm-section bg-white">
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
                {card.eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {card.eyebrow}
                  </p>
                ) : null}
                <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                <Link
                  href={resolveServiceHref(card.linkedSlug, card.ctaTarget)}
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
