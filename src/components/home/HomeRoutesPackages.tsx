"use client"

import Image from "next/image"
import Link from "next/link"
import { useResolvedSiteContent } from "@/components/content/ContentOverridesProvider"
import { getHomeContent } from "@/data/homepage"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeRoutesPackages() {
  const { lang } = useSiteLanguage()
  const { routes } = getHomeContent(lang)
  const content = useResolvedSiteContent()

  return (
    <section id="roteiros" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
          <SectionHeader
            eyebrow={content.home.routesEyebrow}
            title={routes.title}
            subtitle={routes.subtitle}
          />

          <div className="tm-card bg-[linear-gradient(135deg,#fff8f1,#f7fafc)] p-6 sm:p-7">
            <p className="tm-chip">{content.pages.packages.eyebrow}</p>
            <p className="mt-5 text-sm leading-7 text-slate-600">{content.pages.packages.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(lang, "packages")}
                className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
              >
                {content.pages.packages.reserveCta}
              </Link>
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary"
              >
                {content.pages.packages.consultCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {routes.items.map((route) => (
            <article
              key={route.title}
              className="tm-card overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.15)]"
            >
              <div className="relative h-48">
                <Image src={route.image} alt={route.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/60 to-transparent" />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                  <span>{route.days}</span>
                  <span className="font-semibold text-primary">{route.price}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#0B1C2C]">{route.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{route.description}</p>
                <ul className="grid gap-2 text-xs text-slate-500">
                  {route.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={route.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {content.home.routesViewPackage}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
