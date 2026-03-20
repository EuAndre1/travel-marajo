"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useResolvedSiteChrome } from "@/components/content/ContentOverridesProvider"
import { useSiteLanguage } from "@/lib/use-site-language"
import { detectLocaleFromPathname, getLocalizedPath, stripLocalePrefix } from "@/i18n/routing"

const HEADER_HEIGHT_CLASS = "h-[72px] lg:h-[78px]"

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
  const { data: session, status } = useSession()
  const { lang, setLang } = useSiteLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const chrome = useResolvedSiteChrome()

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
    : "glassmorphism border-b border-slate-200/70 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"

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
  const utilityGhostClass = usesOverlayHeader
    ? "text-white/82 hover:bg-white/10 hover:text-white"
    : "text-slate-600 hover:bg-slate-100 hover:text-primary"
  const accountFirstName = session?.user?.name?.trim().split(/\s+/)[0]

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerSurfaceClass}`}>
        <div className="tm-shell">
          <div
            className={`grid ${HEADER_HEIGHT_CLASS} grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 xl:grid-cols-[minmax(228px,272px)_minmax(0,1fr)_auto] xl:gap-6`}
          >
            <Link
              href={getLocalizedPath(lang, "home")}
              className="flex min-w-0 items-center gap-3 pr-2 sm:pr-4 xl:max-w-[272px] xl:pr-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[16px] sm:h-10 sm:w-10 sm:rounded-[18px] ${
                  usesOverlayHeader ? "bg-white/15 backdrop-blur-sm" : "bg-primary"
                }`}
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <div className="min-w-0 max-w-[190px] leading-tight sm:max-w-[220px]">
                <span
                  className={`block truncate text-[0.98rem] font-display leading-none sm:text-[1.05rem] ${brandTextClass}`}
                >
                  {chrome.brandName}
                </span>
                <span
                  className={`mt-0.5 block truncate text-[9px] uppercase tracking-[0.18em] sm:mt-1 sm:text-[10px] sm:tracking-[0.24em] ${supportingTextClass}`}
                >
                  {chrome.brandTagline}
                </span>
              </div>
            </Link>

            <nav
              className="hidden min-w-0 items-center justify-center gap-0.5 2xl:flex 2xl:justify-self-center"
              aria-label="Primary navigation"
            >
              {chrome.mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={getLocalizedPath(lang, item.route)}
                  className={`rounded-full px-3 py-2 text-[12.5px] font-medium whitespace-nowrap transition-all duration-200 2xl:px-3.5 2xl:text-[13px] ${navLinkClass}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-1.5 whitespace-nowrap xl:flex 2xl:gap-2">
              <div className={`flex h-9 shrink-0 items-center gap-2 rounded-full px-3 ${utilitySurfaceClass}`}>
                <span
                  className={`hidden text-[10px] font-semibold uppercase tracking-[0.18em] 2xl:inline ${utilityMutedClass}`}
                >
                  {chrome.languageLabel}
                </span>
                <div className="relative min-w-[50px]">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                    className={`w-full appearance-none border-0 bg-transparent px-0 py-0 pr-5 text-[13px] font-semibold leading-none outline-none ring-0 focus:outline-none focus:ring-0 ${utilityTextClass}`}
                    aria-label={chrome.languageLabel}
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="fr">FR</option>
                  </select>
                  <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center text-[10px] ${utilityMutedClass}`}>
                    v
                  </span>
                </div>
              </div>

              {status === "loading" ? (
                <span
                  className={`inline-flex h-9 min-w-[84px] items-center justify-center rounded-full px-3.5 text-sm font-semibold opacity-70 ${secondaryButtonClass}`}
                >
                  ...
                </span>
              ) : session ? (
                <>
                  <Link
                    href={getLocalizedPath(lang, "profile")}
                    className={`inline-flex h-9 min-w-0 max-w-[156px] items-center justify-center rounded-full px-3.5 text-sm font-semibold transition ${secondaryButtonClass}`}
                  >
                    <span className="truncate 2xl:hidden">{accountFirstName ?? chrome.profileLabel}</span>
                    <span className="hidden truncate 2xl:inline">{chrome.profileLabel}</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, "home") })}
                    className={`hidden h-9 min-w-[76px] items-center justify-center rounded-full px-3.5 text-sm font-semibold transition 2xl:inline-flex ${utilityGhostClass}`}
                  >
                    {chrome.signOutLabel}
                  </button>
                </>
              ) : (
                <Link
                  href={getLocalizedPath(lang, "login")}
                  className={`inline-flex h-9 min-w-[88px] items-center justify-center rounded-full px-3.5 text-sm font-semibold transition ${secondaryButtonClass}`}
                >
                  {chrome.signInLabel}
                </Link>
              )}

              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex h-9 min-w-[118px] items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-dark 2xl:min-w-[132px]"
              >
                {chrome.planTripLabel}
              </Link>
            </div>

            <div className="ml-1 shrink-0 2xl:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className={`rounded-full p-2 transition ${
                  usesOverlayHeader ? "text-white hover:bg-white/10" : "text-primary hover:bg-slate-100"
                }`}
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-slate-200/70 bg-white/95 shadow-lg backdrop-blur xl:hidden">
            <div className="tm-shell pb-5 pt-3">
              <nav className="flex flex-col gap-2.5" aria-label="Mobile menu">
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
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {chrome.planTripLabel}
                </Link>

                {status === "loading" ? (
                  <span className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500">
                    ...
                  </span>
                ) : session ? (
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
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      {chrome.signOutLabel}
                    </button>
                  </>
                ) : (
                  <Link
                    href={getLocalizedPath(lang, "login")}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
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
