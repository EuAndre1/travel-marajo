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

const HEADER_HEIGHT_CLASS = "h-[88px]"

function isLocalizedHomeRoute(pathname: string | null) {
  if (!pathname) {
    return true
  }

  if (pathname === "/") {
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
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isHomeRoute = useMemo(() => isLocalizedHomeRoute(pathname), [pathname])
  const usesOverlayHeader = isHomeRoute && !isScrolled && !isMobileMenuOpen

  const headerSurfaceClass = usesOverlayHeader
    ? "bg-transparent"
    : "glassmorphism border-b border-slate-200/70 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"

  const brandTextClass = usesOverlayHeader ? "text-white" : "text-primary"
  const supportingTextClass = usesOverlayHeader ? "text-white/70" : "text-slate-500"
  const navLinkClass = usesOverlayHeader
    ? "text-white/90 hover:bg-white/10 hover:text-white"
    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
  const utilityTextClass = usesOverlayHeader ? "text-white/90" : "text-slate-700"
  const utilityMutedClass = usesOverlayHeader ? "text-white/75" : "text-slate-600"
  const utilitySurfaceClass = usesOverlayHeader ? "bg-white/12 backdrop-blur-sm" : "bg-slate-100"
  const secondaryButtonClass = usesOverlayHeader
    ? "border border-white/40 text-white hover:border-white hover:bg-white/10"
    : "border border-primary/20 text-primary hover:border-primary hover:bg-primary/5"

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerSurfaceClass}`}>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className={`flex ${HEADER_HEIGHT_CLASS} items-center gap-4 lg:gap-6`}>
            <Link
              href={getLocalizedPath(lang, "home")}
              className="flex min-w-0 shrink-0 items-center gap-3 pr-2"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  usesOverlayHeader ? "bg-white/15 backdrop-blur-sm" : "bg-primary"
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
              <div className="min-w-0 leading-tight">
                <span className={`block truncate text-lg font-display ${brandTextClass}`}>{chrome.brandName}</span>
                <span className={`block truncate text-[11px] uppercase tracking-[0.28em] ${supportingTextClass}`}>
                  {chrome.brandTagline}
                </span>
              </div>
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:gap-2 lg:flex"
              aria-label="Primary navigation"
            >
              {chrome.mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={getLocalizedPath(lang, item.route)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${navLinkClass}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-3 whitespace-nowrap lg:flex">
              <div className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 ${utilitySurfaceClass}`}>
                <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${utilityMutedClass}`}>
                  {chrome.languageLabel}
                </span>
                <div className="relative min-w-[72px]">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                    className={`w-full appearance-none bg-transparent pr-5 text-xs font-semibold outline-none ${utilityTextClass}`}
                    aria-label={chrome.languageLabel}
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="fr">FR</option>
                  </select>
                  <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center text-[10px] ${utilityMutedClass}`}>
                    ▼
                  </span>
                </div>
              </div>

              {session ? (
                <>
                  <Link
                    href={getLocalizedPath(lang, "profile")}
                    className={`inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}
                  >
                    {chrome.profileLabel}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, "home") })}
                    className="inline-flex min-w-[116px] items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                  >
                    {chrome.signOutLabel}
                  </button>
                </>
              ) : (
                <Link
                  href={getLocalizedPath(lang, "login")}
                  className="inline-flex min-w-[116px] items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  {chrome.signInLabel}
                </Link>
              )}

              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}
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
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-slate-200/70 bg-white/95 shadow-lg backdrop-blur lg:hidden">
            <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 pt-4 sm:px-6">
              <nav className="flex flex-col gap-3" aria-label="Mobile menu">
                {chrome.mainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={getLocalizedPath(lang, item.route)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-2 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
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
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-primary/20 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {chrome.planTripLabel}
                </Link>

                {session ? (
                  <>
                    <Link
                      href={getLocalizedPath(lang, "profile")}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {chrome.profileLabel}
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: getLocalizedPath(lang, "home") })
                        setIsMobileMenuOpen(false)
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                    >
                      {chrome.signOutLabel}
                    </button>
                  </>
                ) : (
                  <Link
                    href={getLocalizedPath(lang, "login")}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {chrome.signInLabel}
                  </Link>
                )}
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      {isHomeRoute ? null : <div aria-hidden="true" className={HEADER_HEIGHT_CLASS} />}
    </>
  )
}
