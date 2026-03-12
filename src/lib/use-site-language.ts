"use client"

import { useEffect, useState } from "react"

export type SiteLang = "pt" | "en" | "fr" | "es"

export function useSiteLanguage() {
  const [lang, setLangState] = useState<SiteLang>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("site-language") as SiteLang | null
    if (saved === "pt" || saved === "en" || saved === "fr" || saved === "es") {
      setLangState(saved)
    }
  }, [])

  const setLang = (value: SiteLang) => {
    localStorage.setItem("site-language", value)
    setLangState(value)
    window.dispatchEvent(new Event("site-language-changed"))
  }

  return { lang, setLang }
}
