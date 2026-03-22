"use client"

import { type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import Editable from "@/components/admin/Editable"
import {
  useResolvedContentLocale,
  useResolvedRouteCards,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { getHomeContent } from "@/data/homepage"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export interface HomeRoutesPackagesInlineEditing {
  enabled: boolean
  canEdit: boolean
  onCardImageChange: (id: string, imageUrl: string) => void
  onCardTitleChange: (id: string, value: string) => void
  onCardEyebrowChange: (id: string, value: string) => void
  onCardMetaPrimaryChange: (id: string, value: string) => void
  onCardMetaSecondaryChange: (id: string, value: string) => void
  onCardCtaLabelChange: (id: string, value: string) => void
}

export default function HomeRoutesPackages({
  inlineEditing,
}: {
  inlineEditing?: HomeRoutesPackagesInlineEditing
}) {
  const lang = useResolvedContentLocale()
  const { routes } = getHomeContent(lang)
  const content = useResolvedSiteContent()
  const routeCards = useResolvedRouteCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

  if (routeCards.length === 0) {
    return null
  }

  const resolveRouteHref = (linkedSlug: string, ctaTarget: string) => {
    if (
      ctaTarget &&
      !ctaTarget.startsWith("/pacotes/") &&
      !ctaTarget.startsWith("/packages/") &&
      !ctaTarget.startsWith("/paquetes/") &&
      !ctaTarget.startsWith("/forfaits/")
    ) {
      return ctaTarget
    }

    return linkedSlug ? getLocalizedPath(lang, "packageDetail", { slug: linkedSlug }) : ctaTarget
  }

  const preventPreviewNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canInlineEdit) {
      return
    }

    event.preventDefault()
  }

  return (
    <section id="roteiros" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={content.home.routesEyebrow}
            title={routes.title}
            subtitle={routes.subtitle}
          />

          <Link
            href={getLocalizedPath(lang, "packages")}
            onClick={preventPreviewNavigation}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {content.pages.packages.detailsCta}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {routeCards.map((route) => (
            <article
              key={route.id}
              className="overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
            >
              <Editable
                type="image"
                value={route.imageUrl}
                onChange={(value) => inlineEditing?.onCardImageChange(route.id, value)}
                onMediaSelect={(item) => inlineEditing?.onCardImageChange(route.id, item.url)}
                disabled={!canInlineEdit}
                acceptedTypes={["image"]}
                label={`Imagem do roteiro: ${route.title}`}
              >
                <div className="relative h-44 sm:h-48">
                  <Image src={route.imageUrl} alt={route.title} fill className="object-cover" />
                </div>
              </Editable>
              <div className="flex flex-col gap-3 p-4 sm:p-5">
                <Editable
                  type="textarea"
                  value={route.title}
                  onChange={(value) => inlineEditing?.onCardTitleChange(route.id, value)}
                  disabled={!canInlineEdit}
                  label={`Titulo do roteiro: ${route.title}`}
                >
                  <h3 className="text-lg font-semibold leading-snug text-[#0B1C2C]">{route.title}</h3>
                </Editable>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <Editable
                    value={route.eyebrow}
                    onChange={(value) => inlineEditing?.onCardEyebrowChange(route.id, value)}
                    disabled={!canInlineEdit}
                    label={`Duracao ou label do roteiro: ${route.title}`}
                  >
                    <span>{route.eyebrow}</span>
                  </Editable>
                  {route.metaSecondary ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <Editable
                        value={route.metaSecondary}
                        onChange={(value) => inlineEditing?.onCardMetaSecondaryChange(route.id, value)}
                        disabled={!canInlineEdit}
                        label={`Preco ou destaque do roteiro: ${route.title}`}
                      >
                        <span className="font-semibold text-primary">{route.metaSecondary}</span>
                      </Editable>
                    </>
                  ) : null}
                </div>
                <Editable
                  type="textarea"
                  value={route.metaPrimary || route.description}
                  onChange={(value) => inlineEditing?.onCardMetaPrimaryChange(route.id, value)}
                  disabled={!canInlineEdit}
                  label={`Linha curta de inclusoes: ${route.title}`}
                >
                  <p className="text-sm leading-6 text-slate-600">
                    <span className="font-semibold text-[#0B1C2C]">{content.pages.packages.includes}:</span>{" "}
                    {route.metaPrimary || route.description}
                  </p>
                </Editable>
                <Editable
                  value={route.ctaLabel || content.home.routesViewPackage}
                  onChange={(value) => inlineEditing?.onCardCtaLabelChange(route.id, value)}
                  disabled={!canInlineEdit}
                  label={`CTA do roteiro: ${route.title}`}
                >
                  <Link
                    href={resolveRouteHref(route.linkedSlug, route.ctaTarget)}
                    onClick={preventPreviewNavigation}
                    className="inline-flex items-center justify-center rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    {route.ctaLabel || content.home.routesViewPackage}
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
