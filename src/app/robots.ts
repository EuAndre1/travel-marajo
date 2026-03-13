import type { MetadataRoute } from "next"
import { buildAbsoluteUrl, getSiteUrl } from "@/lib/env"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/success", "/checkout/cancel"],
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  }
}
