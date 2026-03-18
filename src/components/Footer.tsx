"use client"

import Link from "next/link"
import { footerContact, siteChrome } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

export default function Footer() {
  const { lang } = useSiteLanguage()
  const chrome = siteChrome[lang]

  return (
    <footer className="bg-[#06111d] text-white">
      <div className="tm-shell -translate-y-12">
        <div className="tm-card-dark overflow-hidden border-[#163049] bg-[radial-gradient(circle_at_top_right,rgba(229,122,31,0.22),transparent_26%),linear-gradient(135deg,#071521_0%,#0B1C2C_55%,#10283d_100%)] px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent-light/85">
                {chrome.brandTagline}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-display leading-tight sm:text-4xl">{chrome.footerHeadline}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">{chrome.footerDescription}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {chrome.footerHighlights.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-2 pb-10">
        <div className="tm-shell">
          <div className="grid gap-10 rounded-[2rem] border border-white/6 bg-white/[0.03] px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <Link href={getLocalizedPath(lang, "home")} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-white">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-display">{chrome.brandName}</div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-white/55">{chrome.brandTagline}</div>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">{chrome.authorityLabel}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                >
                  {chrome.planTripLabel}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  {chrome.bookDirectLabel}
                </Link>
              </div>
            </div>

            {chrome.footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/58">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={getLocalizedPath(lang, link.route)}
                        className="text-sm text-white/72 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/58">{chrome.footerContactTitle}</h3>
              <ul className="mt-5 space-y-3 text-sm text-white/72">
                {footerContact.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
            <p>
              Copyright {new Date().getFullYear()} {chrome.brandName}. {chrome.footerLegalLabel}
            </p>
            <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.18em] text-white/45 md:flex-row md:items-center md:gap-5">
              <span>CNPJ {footerContact.legal.cnpj}</span>
              <span>Cadastur {footerContact.legal.cadastur}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
