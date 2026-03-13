import type { MetadataRoute } from "next"
import { destinations } from "@/data/destinos"
import { experiences } from "@/data/experiencias"
import { guides } from "@/data/guides"
import { packages } from "@/data/pacotes"
import { buildAbsoluteUrl } from "@/lib/env"
import { SUPPORTED_LOCALES } from "@/config/i18n"
import { getLocalizedPath } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes = [
    "home",
    "experiences",
    "packages",
    "destinations",
    "guides",
    "planTrip",
    "offers",
    "partners",
    "services",
    "serviceBrazilVisa",
    "hotels",
    "flights",
    "activities",
    "login",
    "register",
  ] as const

  const localizedStaticRoutes = SUPPORTED_LOCALES.flatMap((locale) =>
    staticRoutes.map((routeKey) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, routeKey)),
      lastModified,
      changeFrequency: routeKey === "home" ? ("daily" as const) : ("weekly" as const),
      priority: routeKey === "home" ? 1 : 0.72,
    })),
  )

  const localizedExperienceRoutes = SUPPORTED_LOCALES.flatMap((locale) =>
    experiences.map((experience) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, "experienceDetail", { slug: experience.slug })),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  )

  const localizedDestinationRoutes = SUPPORTED_LOCALES.flatMap((locale) =>
    destinations.map((destination) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, "destinationDetail", { slug: destination.slug })),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.76,
    })),
  )

  const localizedGuideRoutes = SUPPORTED_LOCALES.flatMap((locale) =>
    guides.map((guide) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, "guideDetail", { slug: guide.slug })),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.84,
    })),
  )

  const packageRoutes = SUPPORTED_LOCALES.flatMap((locale) =>
    packages.map((item) => ({
      url: buildAbsoluteUrl(`${getLocalizedPath(locale, "packages")}#${item.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.68,
    })),
  )

  return [
    ...localizedStaticRoutes,
    ...localizedExperienceRoutes,
    ...localizedDestinationRoutes,
    ...localizedGuideRoutes,
    ...packageRoutes,
  ]
}
