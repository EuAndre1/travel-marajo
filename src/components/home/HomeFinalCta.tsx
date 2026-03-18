"use client"

import Link from "next/link"
import { homeAuthorityContent } from "@/data/site"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"

export default function HomeFinalCta() {
  const { lang } = useSiteLanguage()
  const authority = homeAuthorityContent[lang]
  const content = siteContent[lang]
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const specialistHref = phone ? buildWhatsAppUrl(phone, content.pages.planTrip.whatsappMessage) : getLocalizedPath(lang, "planTrip")

  return (
    <section className="pb-20 pt-10 lg:pb-24">
      <div className="tm-shell">
        <div className="overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.24),transparent_26%),linear-gradient(140deg,#071521_0%,#0b1c2c_55%,#10283d_100%)] px-6 py-10 text-white shadow-[0_32px_80px_rgba(11,28,44,0.28)] sm:px-8 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent-light/82">
                {authority.finalEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-display leading-tight sm:text-4xl">
                {authority.finalTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
                {authority.finalSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row xl:justify-end">
              <Link
                href={getLocalizedPath(lang, "experiences")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                {authority.finalPrimaryLabel}
              </Link>
              <Link
                href={specialistHref}
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                target={phone ? "_blank" : undefined}
                rel={phone ? "noreferrer" : undefined}
              >
                {authority.finalSecondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
