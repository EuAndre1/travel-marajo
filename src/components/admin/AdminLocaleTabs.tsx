"use client"

import type { AppLocale } from "@/config/i18n"
import { adminLocaleLabels, adminStudioLocales } from "@/lib/admin-studio/defaults"

export default function AdminLocaleTabs({
  activeLocale,
  onChange,
}: {
  activeLocale: AppLocale
  onChange: (locale: AppLocale) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {adminStudioLocales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeLocale === locale
              ? "bg-[#0B1C2C] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          {adminLocaleLabels[locale]}
        </button>
      ))}
    </div>
  )
}
