"use client"

import Link from "next/link"
import { siteContent } from "@/config/site-content"
import type { GuideContentItem } from "@/data/guides"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

interface GuideCardProps {
  guide: GuideContentItem
}

export default function GuideCard({ guide }: GuideCardProps) {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang].pages.guides

  return (
    <Link
      href={getLocalizedPath(lang, "guideDetail", { slug: guide.slug })}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {content.cardBadge}
        </span>
        {guide.marketIntent ? (
          <span className="rounded-full bg-[#FFF1E8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF6600]">
            {guide.marketIntent}
          </span>
        ) : null}
      </div>

      <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#0B1C2C] transition group-hover:text-[#003366]">
        {guide.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">{guide.seoDescription}</p>

      <div className="mt-5 grid gap-2 text-sm text-slate-500">
        <span>{guide.sections.length} {content.cardKeySections}</span>
        <span>{guide.faq.length} {content.cardFaq}</span>
        <span>{guide.relatedExperiences.length} {content.cardLinkedExperiences}</span>
      </div>

      {guide.keywords?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {guide.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-500"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : null}

      <span className="mt-6 inline-flex text-sm font-semibold text-[#003366]">{content.cardReadCta}</span>
    </Link>
  )
}
