"use client"

import Link from "next/link"
import { useResolvedServiceCards } from "@/components/content/ContentOverridesProvider"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function ServicesPageClient() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang].pages.services
  const serviceCards = useResolvedServiceCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )

  const resolveServiceHref = (linkedSlug: string, ctaTarget: string) => {
    if (
      ctaTarget &&
      (ctaTarget.startsWith("http") ||
        ctaTarget.startsWith("mailto:") ||
        ctaTarget.startsWith("tel:") ||
        ctaTarget.includes("wa.me"))
    ) {
      return ctaTarget
    }

    if (linkedSlug === "brazil-visa-consulting") {
      return getLocalizedPath(lang, "serviceBrazilVisa")
    }

    if (linkedSlug === "custom-travel-planning" || linkedSlug === "concierge-assistance") {
      return getLocalizedPath(lang, "planTrip")
    }

    return ctaTarget
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">{content.heroEyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
              >
                {content.heroPrimaryCta}
              </Link>
              <Link
                href={getLocalizedPath(lang, "serviceBrazilVisa")}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.heroSecondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {serviceCards.map((service) => (
                <Link
                  key={service.id}
                  href={resolveServiceHref(service.linkedSlug, service.ctaTarget)}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{service.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">{service.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
                  <div className="mt-6 text-sm font-semibold text-[#003366]">
                    {service.ctaLabel || content.cardCta}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-3xl bg-[#FFF1E8] p-8">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.clarityTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{content.clarityBody}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
