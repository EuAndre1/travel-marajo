"use client"

import Link from "next/link"
import { homeAuthorityContent } from "@/data/site"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"
import SectionHeader from "./SectionHeader"

export default function HomeConciergeSupport() {
  const { lang } = useSiteLanguage()
  const authority = homeAuthorityContent[lang]
  const content = siteContent[lang]
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappHref = phone ? buildWhatsAppUrl(phone, content.pages.planTrip.whatsappMessage) : null

  return (
    <section id="concierge" className="tm-section bg-[linear-gradient(180deg,#071521_0%,#0B1C2C_100%)]">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.94fr_1.06fr] xl:items-center">
          <SectionHeader
            eyebrow={authority.conciergeEyebrow}
            title={authority.conciergeTitle}
            subtitle={authority.conciergeSubtitle}
            tone="light"
          />

          <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-light/82">
                {content.pages.planTrip.responseTitle}
              </p>
              <p className="mt-4 text-3xl font-display">{content.pages.planTrip.responseText}</p>
              <p className="mt-4 text-sm leading-7 text-white/74">
                {content.pages.planTrip.nextStepLabel}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 text-white">
              <ul className="grid gap-3 text-sm text-white/80">
                {authority.conciergeHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
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
                <p className="mt-4 text-sm leading-7 text-white/60">
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
