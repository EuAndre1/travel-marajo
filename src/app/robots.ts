import type { MetadataRoute } from "next"
import { SUPPORTED_LOCALES } from "@/config/i18n"
import { getLocalizedPath } from "@/i18n/routing"
import { buildAbsoluteUrl, getSiteUrl } from "@/lib/env"

export default function robots(): MetadataRoute.Robots {
  const disallowTransactionalPaths = SUPPORTED_LOCALES.flatMap((locale) => [
    getLocalizedPath(locale, "login"),
    getLocalizedPath(locale, "register"),
    getLocalizedPath(locale, "checkout"),
    getLocalizedPath(locale, "checkoutSuccess"),
    getLocalizedPath(locale, "checkoutCancel"),
    getLocalizedPath(locale, "bookingConfirmation"),
    getLocalizedPath(locale, "profile"),
  ])

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", ...disallowTransactionalPaths],
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  }
}
