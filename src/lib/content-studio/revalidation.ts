import { revalidatePath } from "next/cache"
import type { ContentStudioSurface } from "@/lib/content-studio/resolvers"

const SURFACE_REVALIDATION_PATHS: Record<ContentStudioSurface, string[]> = {
  homepage: ["/planejar-viagem", "/destinos", "/services", "/pacotes", "/hotels"],
  content: ["/planejar-viagem", "/destinos", "/services", "/pacotes", "/hotels"],
  experiences: ["/experiencias", "/experiences/pesqueiro"],
  packages: ["/pacotes", "/packages"],
  destinationCards: ["/destinos"],
  routeCards: ["/pacotes", "/packages"],
  hotelCards: ["/hotels"],
  serviceCards: ["/services"],
} as const

function extractHotelDetailPaths(draft: unknown) {
  if (!draft || typeof draft !== "object" || !("items" in draft)) {
    return []
  }

  const items = Array.isArray((draft as { items?: unknown[] }).items)
    ? (draft as { items: unknown[] }).items
    : []

  const detailPaths = new Set<string>()

  for (const item of items) {
    if (!item || typeof item !== "object") {
      continue
    }

    const linkedSlug =
      typeof (item as { linkedSlug?: unknown }).linkedSlug === "string"
        ? (item as { linkedSlug: string }).linkedSlug
        : ""
    const legacySlug =
      typeof (item as { slug?: unknown }).slug === "string"
        ? (item as { slug: string }).slug
        : ""

    for (const slug of [linkedSlug, legacySlug]) {
      if (slug) {
        detailPaths.add(`/hotels/${slug}`)
      }
    }
  }

  return Array.from(detailPaths)
}

export function revalidateContentStudioSurface(surface: ContentStudioSurface, draft: unknown) {
  const paths = new Set<string>(SURFACE_REVALIDATION_PATHS[surface] ?? [])

  if (surface === "hotelCards") {
    for (const path of extractHotelDetailPaths(draft)) {
      paths.add(path)
    }
  }

  revalidatePath("/", "layout")

  for (const path of Array.from(paths)) {
    revalidatePath(path)
  }
}
