"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { siteChrome } from "@/data/site"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

export default function Header() {
  const { data: session } = useSession()
  const { lang, setLang } = useSiteLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const chrome = siteChrome[lang]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "glassmorphism shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between py-4">
          <Link href={getLocalizedPath(lang, "home")} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isScrolled ? "bg-primary" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className={`block text-lg font-display ${isScrolled ? "text-primary" : "text-white"}`}>
                {chrome.brandName}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.3em] ${isScrolled ? "text-slate-400" : "text-white/70"}`}>
                {chrome.brandTagline}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
            {chrome.mainNav.map((item) => (
              <Link
                key={item.label}
                href={getLocalizedPath(lang, item.route)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100 hover:text-primary"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${isScrolled ? "bg-slate-100" : "bg-white/15"}`}>
              <span className={`text-xs font-semibold ${isScrolled ? "text-slate-600" : "text-white/80"}`}>
                {chrome.languageLabel}
              </span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                className={`bg-transparent text-xs font-semibold outline-none ${isScrolled ? "text-slate-700" : "text-white"}`}
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
                  className={`${isScrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"} text-sm font-medium transition-colors`}
                >
                  {chrome.profileLabel}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, "home") })}
                  className="rounded-full bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  {chrome.signOutLabel}
                </button>
              </>
            ) : (
              <Link href={getLocalizedPath(lang, "login")} className="rounded-full bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent-dark">
                {chrome.signInLabel}
              </Link>
            )}
            <Link
              href={getLocalizedPath(lang, "planTrip")}
              className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition xl:inline-flex ${
                isScrolled
                  ? "border border-primary/30 text-primary hover:border-primary"
                  : "border border-white/50 text-white hover:border-white"
              }`}
            >
              {chrome.planTripLabel}
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={isScrolled ? "text-primary" : "text-white"}
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="bg-white pb-6 shadow-lg lg:hidden">
          <nav className="flex flex-col items-center space-y-4 pt-4" aria-label="Mobile menu">
            {chrome.mainNav.map((item) => (
              <Link
                key={item.label}
                href={getLocalizedPath(lang, item.route)}
                className="text-slate-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">{chrome.languageLabel}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "pt" | "en" | "es" | "fr")}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
              </select>
            </div>
            <Link
              href={getLocalizedPath(lang, "planTrip")}
              className="rounded-full border border-primary/30 px-4 py-2 text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {chrome.planTripLabel}
            </Link>
            {session ? (
              <>
                <Link
                  href={getLocalizedPath(lang, "profile")}
                  className="text-slate-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {chrome.profileLabel}
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: getLocalizedPath(lang, "home") })
                    setIsMobileMenuOpen(false)
                  }}
                  className="text-red-600"
                >
                  {chrome.signOutLabel}
                </button>
              </>
            ) : (
              <Link
                href={getLocalizedPath(lang, "login")}
                className="rounded-full bg-accent px-4 py-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {chrome.signInLabel}
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
