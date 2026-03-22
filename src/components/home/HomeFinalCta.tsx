"use client"

import { type MouseEvent } from "react"
import Link from "next/link"
import Editable from "@/components/admin/Editable"
import {
  useResolvedContentLocale,
  useResolvedHomeAuthorityContent,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"

export interface HomeFinalCtaInlineEditing {
  enabled: boolean
  canEdit: boolean
  onTitleChange: (value: string) => void
  onSubtitleChange: (value: string) => void
  onPrimaryLabelChange: (value: string) => void
  onSecondaryLabelChange: (value: string) => void
}

export default function HomeFinalCta({
  inlineEditing,
}: {
  inlineEditing?: HomeFinalCtaInlineEditing
}) {
  const lang = useResolvedContentLocale()
  const authority = useResolvedHomeAuthorityContent()
  const content = useResolvedSiteContent()
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const specialistHref = phone ? buildWhatsAppUrl(phone, content.pages.planTrip.whatsappMessage) : getLocalizedPath(lang, "planTrip")
  const canInlineEdit = Boolean(inlineEditing?.enabled && inlineEditing.canEdit)

  const preventPreviewNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canInlineEdit) {
      return
    }

    event.preventDefault()
  }

  return (
    <section className="pb-16 pt-8 lg:pb-20">
      <div className="tm-shell">
        <div className="overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.24),transparent_26%),linear-gradient(140deg,#071521_0%,#0b1c2c_55%,#10283d_100%)] px-6 py-8 text-white shadow-[0_32px_80px_rgba(11,28,44,0.28)] sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-light/82 sm:text-[11px] sm:tracking-[0.34em]">
                {authority.finalEyebrow}
              </p>
              <Editable
                type="textarea"
                value={authority.finalTitle}
                onChange={inlineEditing?.onTitleChange}
                disabled={!canInlineEdit}
                label="Titulo do fechamento da homepage"
              >
                <h2 className="mt-3 max-w-3xl text-[2rem] font-display leading-tight sm:text-4xl">
                  {authority.finalTitle}
                </h2>
              </Editable>
              <Editable
                type="textarea"
                value={authority.finalSubtitle}
                onChange={inlineEditing?.onSubtitleChange}
                disabled={!canInlineEdit}
                label="Texto de apoio do fechamento da homepage"
              >
                <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/78 sm:text-base sm:leading-8">
                  {authority.finalSubtitle}
                </p>
              </Editable>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:justify-end">
              <Editable
                value={authority.finalPrimaryLabel}
                onChange={inlineEditing?.onPrimaryLabelChange}
                disabled={!canInlineEdit}
                label="Texto do botao principal do fechamento"
              >
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  onClick={preventPreviewNavigation}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  {authority.finalPrimaryLabel}
                </Link>
              </Editable>
              <Editable
                value={authority.finalSecondaryLabel}
                onChange={inlineEditing?.onSecondaryLabelChange}
                disabled={!canInlineEdit}
                label="Texto do botao secundario do fechamento"
              >
                <Link
                  href={specialistHref}
                  onClick={preventPreviewNavigation}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  target={phone && !canInlineEdit ? "_blank" : undefined}
                  rel={phone && !canInlineEdit ? "noreferrer" : undefined}
                >
                  {authority.finalSecondaryLabel}
                </Link>
              </Editable>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
