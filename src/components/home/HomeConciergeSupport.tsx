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
        <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr] xl:items-center">
          <SectionHeader
            eyebrow={authority.conciergeEyebrow}
            title={authority.conciergeTitle}
            subtitle={authority.conciergeSubtitle}
            tone="light"
          />

          <div className="grid gap-3 md:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.7rem] border border-white/10 bg-white/8 p-5 text-white sm:rounded-[2rem] sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light/82 sm:text-[11px] sm:tracking-[0.26em]">
                {content.pages.planTrip.responseTitle}
              </p>
              <p className="mt-3 text-[1.9rem] font-display sm:text-3xl">{content.pages.planTrip.responseText}</p>
              <p className="mt-3 text-sm leading-6 text-white/74 sm:leading-7">
                {content.pages.planTrip.nextStepLabel}
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-5 text-white sm:rounded-[2rem] sm:p-6">
              <ul className="grid gap-3 text-sm text-white/80">
                {authority.conciergeHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3.5">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                <p className="mt-4 text-sm leading-6 text-white/60 sm:leading-7">
                  {content.pages.planTrip.whatsappFallback}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
