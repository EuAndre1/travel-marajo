"use client"

import Link from "next/link"
import {
  useResolvedHomeAuthorityContent,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"
import SectionHeader from "./SectionHeader"

export default function HomeConciergeSupport() {
  const { lang } = useSiteLanguage()
  const authority = useResolvedHomeAuthorityContent()
  const content = useResolvedSiteContent()
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappHref = phone ? buildWhatsAppUrl(phone, content.pages.planTrip.whatsappMessage) : null

  return (
    <section id="concierge" className="tm-section bg-[linear-gradient(180deg,#071521_0%,#0B1C2C_100%)]">
      <div className="tm-shell">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
          <SectionHeader
            eyebrow={authority.conciergeEyebrow}
            title={authority.conciergeTitle}
            subtitle={authority.conciergeSubtitle}
            tone="light"
          />

          <div className="rounded-[1.7rem] border border-white/10 bg-white/7 p-5 text-white sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light/82 sm:text-[11px] sm:tracking-[0.26em]">
              {content.pages.planTrip.responseTitle}
            </p>
            <p className="mt-2 text-[1.8rem] font-display sm:text-[2rem]">{content.pages.planTrip.responseText}</p>

            <div className="mt-4 grid gap-2">
              {authority.conciergeHighlights.slice(0, 3).map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-white/78">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {whatsappHref ? (
                <Link
                  href={whatsappHref}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  {authority.conciergePrimaryLabel}
                </Link>
              ) : (
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  {authority.conciergeSecondaryLabel}
                </Link>
              )}

              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {authority.conciergeSecondaryLabel}
              </Link>
            </div>

            {!whatsappHref ? (
              <p className="mt-4 text-sm leading-6 text-white/60">
                {content.pages.planTrip.whatsappFallback}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
