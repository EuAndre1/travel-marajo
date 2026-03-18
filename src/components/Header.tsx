"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { siteChrome } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"
import {
  detectLocaleFromPathname,
  getLocalizedPath,
  stripLocalePrefix,
} from "@/i18n/routing"

const HEADER_HEIGHT_CLASS = "h-[108px]"

function isLocalizedHomeRoute(pathname: string | null) {
  if (!pathname || pathname === "/") {
    return true
  }

  const detectedLocale = detectLocaleFromPathname(pathname)
  if (!detectedLocale) {
    return false
  }

  return stripLocalePrefix(pathname).segments.length === 0
}

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { lang, setLang } = useSiteLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const chrome = siteChrome[lang]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isHomeRoute = useMemo(() => isLocalizedHomeRoute(pathname), [pathname])
  const usesOverlayHeader = isHomeRoute && !isScrolled && !isMobileMenuOpen
  const shellClass = usesOverlayHeader
    ? "border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] text-white shadow-[0_24px_60px_rgba(2,8,23,0.18)] backdrop-blur-xl"
    : "border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,250,252,0.9))] text-slate-900 shadow-[0_22px_60px_rgba(15,23,42,0.10)]"

  const brandTitleClass = usesOverlayHeader ? "text-white" : "text-[#0B1C2C]"
  const brandMetaClass = usesOverlayHeader ? "text-white/72" : "text-slate-500"
  const navClass = usesOverlayHeader
    ? "text-white/90 hover:bg-white/10 hover:text-white"
    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
  const utilitySurfaceClass = usesOverlayHeader ? "bg-white/10" : "bg-slate-100"
  const utilityTextClass = usesOverlayHeader ? "text-white/85" : "text-slate-700"
  const authorityChipClass = usesOverlayHeader
    ? "border-white/14 bg-white/8 text-white/85"
    : "border-slate-200/80 bg-slate-50 text-slate-600"
  const secondaryButtonClass = usesOverlayHeader
    ? "border-white/28 text-white hover:border-white hover:bg-white/10"
    : "border-primary/20 text-primary hover:border-primary hover:bg-primary/5"

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-5">
        <div className="tm-shell px-0">
          <div className={`rounded-[30px] border ${shellClass}`}>
            <div className="flex min-h-[88px] items-center gap-4 px-4 sm:px-5 lg:px-6 xl:px-7">
              <Link
                href={getLocalizedPath(lang, "home")}
                className="flex min-w-0 shrink-0 items-center gap-3 lg:gap-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] ${
                    usesOverlayHeader ? "bg-white/14" : "bg-primary"
                  }`}
                >
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className={`truncate text-lg font-display leading-tight ${brandTitleClass}`}>{chrome.brandName}</div>
                  <div className={`truncate text-[11px] uppercase tracking-[0.28em] ${brandMetaClass}`}>{chrome.brandTagline}</div>
                </div>
              </Link>

              <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex">
                <div className={`hidden xl:inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] ${authorityChipClass}`}>
                  {chrome.authorityLabel}
                </div>

                <nav className="min-w-0 flex-1" aria-label="Primary navigation">
                  <div className="flex flex-wrap items-center justify-center gap-1 xl:gap-2">
                    {chrome.mainNav.map((item) => (
                      <Link
                        key={item.label}
                        href={getLocalizedPath(lang, item.route)}
                        className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${navClass}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="hidden shrink-0 items-center gap-3 whitespace-nowrap lg:flex">
                <div className={`flex items-center gap-3 rounded-full px-3 py-2 ${utilitySurfaceClass}`}>
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${utilityTextClass}`}>
                    {chrome.languageLabel}
                  </span>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                    className={`appearance-none bg-transparent pr-1 text-xs font-semibold outline-none ${utilityTextClass}`}
                    aria-label={chrome.languageLabel}
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="fr">FR</option>
                  </select>
                </div>

                {session ? (
                  <>
                    <Link
                      href={getLocalizedPath(lang, "profile")}
                      className={`inline-flex min-w-[118px] items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}
                    >
                      {chrome.profileLabel}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, "home") })}
                      className="inline-flex min-w-[110px] items-center justify-center rounded-full bg-[#E57A1F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                    >
                      {chrome.signOutLabel}
                    </button>
                  </>
                ) : (
                  <Link
                    href={getLocalizedPath(lang, "login")}
                    className="inline-flex min-w-[110px] items-center justify-center rounded-full bg-[#E57A1F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                  >
                    {chrome.signInLabel}
                  </Link>
                )}

                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}
                >
                  {chrome.planTripLabel}
                </Link>
              </div>

              <div className="ml-auto lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className={`rounded-full p-2 transition ${usesOverlayHeader ? "text-white hover:bg-white/10" : "text-primary hover:bg-slate-100"}`}
                  aria-label="Open menu"
                >
                  {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                </button>
              </div>
            </div>

            {isMobileMenuOpen ? (
              <div className="border-t border-current/10 px-4 pb-5 pt-2 lg:hidden">
                <div className={`mb-4 rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] ${authorityChipClass}`}>
                  {chrome.authorityLabel}
                </div>

                <nav className="flex flex-col gap-3" aria-label="Mobile menu">
                  {chrome.mainNav.map((item) => (
                    <Link
                      key={item.label}
                      href={getLocalizedPath(lang, item.route)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="mt-1 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {chrome.languageLabel}
                    </span>
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                      className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                      aria-label={chrome.languageLabel}
                    >
                      <option value="pt">PT</option>
                      <option value="en">EN</option>
                      <option value="es">ES</option>
                      <option value="fr">FR</option>
                    </select>
                  </div>

                  <Link
                    href={getLocalizedPath(lang, "planTrip")}
                    className="inline-flex items-center justify-center rounded-full border border-primary/20 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
                  >
                    {chrome.planTripLabel}
                  </Link>

                  {session ? (
                    <>
                      <Link
                        href={getLocalizedPath(lang, "profile")}
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                      >
                        {chrome.profileLabel}
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, "home") })}
                        className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                      >
                        {chrome.signOutLabel}
                      </button>
                    </>
                  ) : (
                    <Link
                      href={getLocalizedPath(lang, "login")}
                      className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                    >
                      {chrome.signInLabel}
                    </Link>
                  )}
                </nav>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {isHomeRoute ? null : <div aria-hidden="true" className={HEADER_HEIGHT_CLASS} />}
    </>
  )
}
