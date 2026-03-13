"use client"

import { useEffect, useState } from "react"

export type SiteLang = "pt" | "en" | "fr" | "es"

const STORAGE_KEY = "site-language"

function isValidLang(value: string | null): value is SiteLang {
  return value === "pt" || value === "en" || value === "fr" || value === "es"
}

export function getStoredSiteLanguage(): SiteLang {
  if (typeof window === "undefined") return "pt"
  const saved = localStorage.getItem(STORAGE_KEY)
  return isValidLang(saved) ? saved : "pt"
}

export function useSiteLanguage() {
  const [lang, setLangState] = useState<SiteLang>("pt")

  useEffect(() => {
    const syncLanguage = () => {
      setLangState(getStoredSiteLanguage())
    }

    syncLanguage()

    window.addEventListener("site-language-changed", syncLanguage)
    window.addEventListener("storage", syncLanguage)

    return () => {
      window.removeEventListener("site-language-changed", syncLanguage)
      window.removeEventListener("storage", syncLanguage)
    }
  }, [])

  const setLang = (value: SiteLang) => {
    localStorage.setItem(STORAGE_KEY, value)
    setLangState(value)
    window.dispatchEvent(new Event("site-language-changed"))
  }

  return { lang, setLang }
}
