"use client"

import { type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import Editable from "@/components/admin/Editable"
import {
  useResolvedContentLocale,
  useResolvedServiceCards,
} from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
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

export interface HomeServicesInlineEditing {
  enabled: boolean
  canEdit: boolean
  onCardImageChange: (id: string, imageUrl: string) => void
  onCardEyebrowChange: (id: string, value: string) => void
  onCardTitleChange: (id: string, value: string) => void
  onCardDescriptionChange: (id: string, value: string) => void
  onCardCtaLabelChange: (id: string, value: string) => void
}

export default function HomeServices({
  inlineEditing,
}: {
  inlineEditing?: HomeServicesInlineEditing
}) {
  const lang = useResolvedContentLocale()
  const cards = useResolvedServiceCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

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

  const preventPreviewNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canInlineEdit) {
      return
    }

    event.preventDefault()
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
              <Editable
                type="image"
                value={card.imageUrl}
                onChange={(value) => inlineEditing?.onCardImageChange(card.id, value)}
                onMediaSelect={(item) => inlineEditing?.onCardImageChange(card.id, item.url)}
                disabled={!canInlineEdit}
                acceptedTypes={["image"]}
                label={`Imagem do servico: ${card.title}`}
              >
                <div className="relative h-48">
                  <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
                </div>
              </Editable>
              <div className="p-5">
                {card.eyebrow ? (
                  <Editable
                    value={card.eyebrow}
                    onChange={(value) => inlineEditing?.onCardEyebrowChange(card.id, value)}
                    disabled={!canInlineEdit}
                    label={`Eyebrow do servico: ${card.title}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {card.eyebrow}
                    </p>
                  </Editable>
                ) : null}
                <Editable
                  type="textarea"
                  value={card.title}
                  onChange={(value) => inlineEditing?.onCardTitleChange(card.id, value)}
                  disabled={!canInlineEdit}
                  label={`Titulo do servico: ${card.title}`}
                >
                  <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{card.title}</h3>
                </Editable>
                <Editable
                  type="textarea"
                  value={card.description}
                  onChange={(value) => inlineEditing?.onCardDescriptionChange(card.id, value)}
                  disabled={!canInlineEdit}
                  label={`Descricao do servico: ${card.title}`}
                >
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                </Editable>
                <Editable
                  value={card.ctaLabel}
                  onChange={(value) => inlineEditing?.onCardCtaLabelChange(card.id, value)}
                  disabled={!canInlineEdit}
                  label={`CTA do servico: ${card.title}`}
                >
                  <Link
                    href={resolveServiceHref(card.linkedSlug, card.ctaTarget)}
                    onClick={preventPreviewNavigation}
                    className="mt-4 inline-flex text-sm font-semibold text-primary"
                  >
                    {card.ctaLabel}
                  </Link>
                </Editable>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
