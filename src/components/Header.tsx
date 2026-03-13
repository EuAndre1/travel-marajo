"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { headerNavigation } from "@/data/site"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function Header() {
  const { data: session } = useSession()
  const { lang, setLang } = useSiteLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const languageLabel = siteContent[lang]?.langLabel ?? "Idioma"

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glassmorphism shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? "bg-primary" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className={`block text-lg font-display ${isScrolled ? "text-primary" : "text-white"}`}>
                Travel MarajÃ³
              </span>
              <span className={`text-[11px] uppercase tracking-[0.3em] ${isScrolled ? "text-slate-400" : "text-white/70"}`}>
                Plataforma de destino
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2" aria-label="NavegaÃ§Ã£o principal">
            {headerNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-slate-700 hover:text-primary hover:bg-slate-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${isScrolled ? "bg-slate-100" : "bg-white/15"}`}>
              <span className={`text-xs font-semibold ${isScrolled ? "text-slate-600" : "text-white/80"}`}>
                {languageLabel}
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
                  href="/profile"
                  className={`${isScrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"} text-sm font-medium transition-colors`}
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded-full transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded-full transition-colors">
                Entrar
              </Link>
            )}
            <Link
              href="#experiencias"
              className={`hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                isScrolled
                  ? "border border-primary/30 text-primary hover:border-primary"
                  : "border border-white/50 text-white hover:border-white"
              }`}
            >
              Planejar viagem
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={isScrolled ? "text-primary" : "text-white"}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="lg:hidden bg-white shadow-lg pb-6">
          <nav className="flex flex-col items-center space-y-4 pt-4" aria-label="Menu mobile">
            {headerNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">{languageLabel}</span>
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
              href="#experiencias"
              className="border border-primary/30 text-primary px-4 py-2 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planejar viagem
            </Link>
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-slate-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="text-red-600"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-accent text-white px-4 py-2 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
