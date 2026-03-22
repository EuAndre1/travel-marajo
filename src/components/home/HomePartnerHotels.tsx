"use client"

import { type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import Editable from "@/components/admin/Editable"
import {
  useResolvedContentLocale,
  useResolvedHotelCards,
} from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
import {
  getVideoMimeTypeFromPath,
  type MediaAssetType,
} from "@/lib/media-library/shared"
import SectionHeader from "./SectionHeader"

const copyByLocale = {
  pt: {
    eyebrow: "Partner Hotels",
    title: "Hospedagens parceiras para complementar a viagem",
    subtitle: "Sugestoes leves de estadia para quem quer comparar base, perfil e faixa de valor.",
    fallbackCta: "Ver busca de hoteis",
  },
  en: {
    eyebrow: "Partner Hotels",
    title: "Partner stays to complete the trip",
    subtitle: "A lightweight stay selection for travelers comparing base, style, and price range.",
    fallbackCta: "View hotel search",
  },
  es: {
    eyebrow: "Partner Hotels",
    title: "Hospedajes aliados para completar el viaje",
    subtitle: "Una seleccion ligera para comparar base, estilo y rango de precio.",
    fallbackCta: "Ver busqueda de hoteles",
  },
  fr: {
    eyebrow: "Partner Hotels",
    title: "Hebergements partenaires pour completer le voyage",
    subtitle: "Une selection legere pour comparer base, style et gamme de prix.",
    fallbackCta: "Voir la recherche d'hotels",
  },
} as const

export interface HomePartnerHotelsInlineEditing {
  enabled: boolean
  canEdit: boolean
  onCardMediaChange: (id: string, media: { url: string; type: MediaAssetType }) => void
  onCardEyebrowChange: (id: string, value: string) => void
  onCardTitleChange: (id: string, value: string) => void
  onCardDescriptionChange: (id: string, value: string) => void
  onCardMetaPrimaryChange: (id: string, value: string) => void
  onCardCtaLabelChange: (id: string, value: string) => void
}

export default function HomePartnerHotels({
  inlineEditing,
}: {
  inlineEditing?: HomePartnerHotelsInlineEditing
}) {
  const lang = useResolvedContentLocale()
  const cards = useResolvedHotelCards().filter(
    (item) =>
      item.visible &&
      item.title.trim() &&
      (item.linkedSlug || item.ctaTarget),
  )
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

  if (cards.length === 0) {
    return null
  }

  const copy = copyByLocale[lang]

  const resolveHotelHref = (linkedSlug: string, ctaTarget: string) => {
    if (linkedSlug) {
      return getLocalizedPath(lang, "hotelDetail", { slug: linkedSlug })
    }

    if (ctaTarget === "/hotels" || ctaTarget === "/hoteis") {
      return getLocalizedPath(lang, "hotels")
    }

    return ctaTarget
  }

  const resolveHotelLabel = (linkedSlug: string, ctaTarget: string, ctaLabel: string) => {
    if (!linkedSlug && (ctaTarget === "/hotels" || ctaTarget === "/hoteis")) {
      return copy.fallbackCta
    }

    return ctaLabel
  }

  const preventPreviewNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canInlineEdit) {
      return
    }

    event.preventDefault()
  }

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
              <Editable
                type="image"
                value={card.mediaUrl || card.imageUrl}
                onMediaSelect={(item) =>
                  inlineEditing?.onCardMediaChange(card.id, { url: item.url, type: item.type })
                }
                disabled={!canInlineEdit}
                acceptedTypes={["image", "video"]}
                label={`Midia do hotel: ${card.title}`}
              >
                <div className="relative h-48">
                  {card.mediaType === "video" && card.mediaUrl ? (
                    <video
                      className="h-full w-full object-cover bg-black"
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={card.mediaUrl} type={getVideoMimeTypeFromPath(card.mediaUrl)} />
                    </video>
                  ) : card.mediaUrl || card.imageUrl ? (
                    <Image
                      src={card.mediaUrl || card.imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#0B1C2C,#14324a)] px-6 text-center text-sm font-semibold text-white/78">
                      {card.title}
                    </div>
                  )}
                </div>
              </Editable>
              <div className="p-5">
                {card.eyebrow ? (
                  <Editable
                    value={card.eyebrow}
                    onChange={(value) => inlineEditing?.onCardEyebrowChange(card.id, value)}
                    disabled={!canInlineEdit}
                    label={`Localizacao do hotel: ${card.title}`}
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
                  label={`Titulo do hotel: ${card.title}`}
                >
                  <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{card.title}</h3>
                </Editable>
                {card.description ? (
                  <Editable
                    type="textarea"
                    value={card.description}
                    onChange={(value) => inlineEditing?.onCardDescriptionChange(card.id, value)}
                    disabled={!canInlineEdit}
                    label={`Descricao curta do hotel: ${card.title}`}
                  >
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  </Editable>
                ) : null}
                {card.metaPrimary ? (
                  <Editable
                    value={card.metaPrimary}
                    onChange={(value) => inlineEditing?.onCardMetaPrimaryChange(card.id, value)}
                    disabled={!canInlineEdit}
                    label={`Faixa de valor do hotel: ${card.title}`}
                  >
                    <p className="mt-3 text-sm font-semibold text-primary">{card.metaPrimary}</p>
                  </Editable>
                ) : null}
                <Editable
                  value={resolveHotelLabel(card.linkedSlug, card.ctaTarget, card.ctaLabel)}
                  onChange={(value) => inlineEditing?.onCardCtaLabelChange(card.id, value)}
                  disabled={!canInlineEdit}
                  label={`CTA do hotel: ${card.title}`}
                >
                  <Link
                    href={resolveHotelHref(card.linkedSlug, card.ctaTarget)}
                    onClick={preventPreviewNavigation}
                    className="mt-4 inline-flex text-sm font-semibold text-primary"
                  >
                    {resolveHotelLabel(card.linkedSlug, card.ctaTarget, card.ctaLabel)}
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
