"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useResolvedRouteCards,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
import { getHomeContent } from "@/data/homepage"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"
import SectionHeader from "./SectionHeader"

export default function HomeRoutesPackages() {
  const { lang } = useSiteLanguage()
  const { routes } = getHomeContent(lang)
  const content = useResolvedSiteContent()
  const routeCards = useResolvedRouteCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )

  if (routeCards.length === 0) {
    return null
  }

  const resolveRouteHref = (linkedSlug: string, ctaTarget: string) => {
    if (
      ctaTarget &&
      !ctaTarget.startsWith("/pacotes/") &&
      !ctaTarget.startsWith("/packages/") &&
      !ctaTarget.startsWith("/paquetes/") &&
      !ctaTarget.startsWith("/forfaits/")
    ) {
      return ctaTarget
    }

    return linkedSlug ? getLocalizedPath(lang, "packageDetail", { slug: linkedSlug }) : ctaTarget
  }

  return (
    <section id="roteiros" className="tm-section bg-white">
      <div className="tm-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={content.home.routesEyebrow}
            title={routes.title}
            subtitle={routes.subtitle}
          />

          <Link
            href={getLocalizedPath(lang, "packages")}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {content.pages.packages.detailsCta}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {routeCards.map((route) => (
            <article
              key={route.id}
              className="overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-44 sm:h-48">
                <Image src={route.imageUrl} alt={route.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-3 p-4 sm:p-5">
                <h3 className="text-lg font-semibold leading-snug text-[#0B1C2C]">{route.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>{route.eyebrow}</span>
                  {route.metaSecondary ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="font-semibold text-primary">{route.metaSecondary}</span>
                    </>
                  ) : null}
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-[#0B1C2C]">{content.pages.packages.includes}:</span>{" "}
                  {route.metaPrimary || route.description}
                </p>
                <Link
                  href={resolveRouteHref(route.linkedSlug, route.ctaTarget)}
                  className="inline-flex items-center justify-center rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
                >
                  {route.ctaLabel || content.home.routesViewPackage}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
