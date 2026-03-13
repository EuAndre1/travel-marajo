"use client"

import Link from "next/link"
import { footerContact, siteChrome } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

export default function Footer() {
  const { lang } = useSiteLanguage()
  const chrome = siteChrome[lang]

  return (
    <footer className="relative bg-[#0B1C2C]">
      <div className="absolute left-0 right-0 top-0 overflow-hidden">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="h-16 w-full">
          <path d="M0,32 C200,60 400,10 600,32 C800,60 1000,10 1200,32 L1200,0 L0,0 Z" fill="#F7F7F8" />
        </svg>
      </div>

      <div className="pb-10 pt-24">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
              <div>
                <Link href={getLocalizedPath(lang, "home")} className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <span className="text-xl font-display text-white">{chrome.brandName}</span>
                </Link>
                <p className="max-w-xs text-sm text-white/70">{chrome.footerDescription}</p>
              </div>

              {chrome.footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-4 font-semibold text-white">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={getLocalizedPath(lang, link.route)}
                          className="text-sm text-white/70 transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="mb-4 font-semibold text-white">{chrome.footerContactTitle}</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  {footerContact.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-white/60">
                  © {new Date().getFullYear()} {chrome.brandName}. {chrome.footerLegalLabel}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>CNPJ: {footerContact.legal.cnpj}</span>
                  <span>Cadastur: {footerContact.legal.cadastur}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
