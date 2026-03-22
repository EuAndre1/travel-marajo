"use client"

import { type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import Editable from "@/components/admin/Editable"
import {
  useResolvedContentLocale,
  useResolvedDestinationCards,
} from "@/components/content/ContentOverridesProvider"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export interface HomeDestinationsInlineEditing {
  enabled: boolean
  canEdit: boolean
  onCardImageChange: (id: string, imageUrl: string) => void
  onCardEyebrowChange: (id: string, value: string) => void
  onCardTitleChange: (id: string, value: string) => void
  onCardDescriptionChange: (id: string, value: string) => void
  onCardCtaLabelChange: (id: string, value: string) => void
}

export default function HomeDestinations({
  inlineEditing,
}: {
  inlineEditing?: HomeDestinationsInlineEditing
}) {
  const lang = useResolvedContentLocale()
  const { destinations } = getHomeContent(lang)
  const content = siteContent[lang]
  const destinationCards = useResolvedDestinationCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

  if (destinationCards.length === 0) {
    return null
  }

  const resolveDestinationHref = (linkedSlug: string, ctaTarget: string) => {
    if (ctaTarget && !ctaTarget.startsWith("/destinos/")) {
      return ctaTarget
    }

    return linkedSlug
      ? getLocalizedPath(lang, "destinationDetail", { slug: linkedSlug })
      : ctaTarget
  }

  const preventPreviewNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canInlineEdit) {
      return
    }

    event.preventDefault()
  }

  return (
    <section id="destinos" className="tm-section bg-[linear-gradient(180deg,#f7f7f8_0%,#eef4f8_100%)]">
      <div className="tm-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={content.home.destinationsEyebrow}
            title={destinations.title}
            subtitle={destinations.subtitle}
          />

          <Link
            href={getLocalizedPath(lang, "destinations")}
            onClick={preventPreviewNavigation}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {content.home.destinationsEyebrow}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {destinationCards.map((destination) => (
            <article key={destination.id} className="overflow-hidden rounded-[1.7rem] border border-white/20 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <Editable
                type="image"
                value={destination.imageUrl}
                onChange={(value) => inlineEditing?.onCardImageChange(destination.id, value)}
                onMediaSelect={(item) => inlineEditing?.onCardImageChange(destination.id, item.url)}
                disabled={!canInlineEdit}
                acceptedTypes={["image"]}
                label={`Imagem do card de destino: ${destination.title}`}
              >
                <div className="relative h-56 sm:h-60">
                  <Image
                    src={destination.imageUrl}
                    alt={destination.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Editable>
              <div className="p-4 sm:p-5">
                <Editable
                  value={destination.eyebrow || content.home.destinationsEyebrow}
                  onChange={(value) => inlineEditing?.onCardEyebrowChange(destination.id, value)}
                  disabled={!canInlineEdit}
                  label={`Eyebrow do destino: ${destination.title}`}
                >
                  <span className="inline-flex rounded-full bg-[#fff4ea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b25d18]">
                    {destination.eyebrow || content.home.destinationsEyebrow}
                  </span>
                </Editable>
                <Editable
                  type="textarea"
                  value={destination.title}
                  onChange={(value) => inlineEditing?.onCardTitleChange(destination.id, value)}
                  disabled={!canInlineEdit}
                  label={`Titulo do destino: ${destination.title}`}
                >
                  <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{destination.title}</h3>
                </Editable>
                <Editable
                  type="textarea"
                  value={destination.description}
                  onChange={(value) => inlineEditing?.onCardDescriptionChange(destination.id, value)}
                  disabled={!canInlineEdit}
                  label={`Descricao do destino: ${destination.title}`}
                >
                  <p className="mt-2 text-sm leading-6 text-slate-600">{destination.description}</p>
                </Editable>
                <Editable
                  value={destination.ctaLabel}
                  onChange={(value) => inlineEditing?.onCardCtaLabelChange(destination.id, value)}
                  disabled={!canInlineEdit}
                  label={`CTA do destino: ${destination.title}`}
                >
                  <Link
                    href={resolveDestinationHref(destination.linkedSlug, destination.ctaTarget)}
                    onClick={preventPreviewNavigation}
                    className="mt-4 inline-flex text-sm font-semibold text-primary"
                  >
                    {destination.ctaLabel}
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
