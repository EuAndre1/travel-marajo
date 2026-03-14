import { guides } from "@/data/guides"
import type { GuideContentItem } from "@/data/guides"
import { seoPages } from "@/data/seo-pages"
import type { SeoCatalogEntry, SeoCluster, SeoEditorialIndexEntry, SeoSearchIntent, SeoStatus } from "@/types"

const IMPLEMENTED_SEO_STATUSES: ReadonlySet<SeoStatus> = new Set<SeoStatus>([
  "implemented",
  "published",
])

function inferGuideCluster(guide: GuideContentItem): SeoCluster {
  const slug = guide.slug.toLowerCase()
  const keywordSpace = guide.keywords?.join(" ").toLowerCase() ?? ""

  if (slug.includes("itinerary") || slug.includes("days")) {
    return "itinerary"
  }

  if (slug.includes("wildlife") || keywordSpace.includes("wildlife") || keywordSpace.includes("nature")) {
    return "wildlife"
  }

  if (slug.includes("destination") || keywordSpace.includes("destination")) {
    return "destinations"
  }

  if (
    slug.includes("visit") ||
    slug.includes("how-to") ||
    slug.includes("time") ||
    keywordSpace.includes("logistics") ||
    keywordSpace.includes("weather")
  ) {
    return "logistics"
  }

  if (
    slug.includes("things-to-do") ||
    slug.includes("beaches") ||
    slug.includes("horseback") ||
    keywordSpace.includes("experiences")
  ) {
    return "experiences"
  }

  if (
    slug.includes("culture") ||
    slug.includes("food") ||
    slug.includes("craft") ||
    slug.includes("buffalo")
  ) {
    return "culture"
  }

  return "guide"
}

function inferGuideSearchIntent(guide: GuideContentItem): SeoSearchIntent {
  const slug = guide.slug.toLowerCase()
  const keywordSpace = guide.keywords?.join(" ").toLowerCase() ?? ""

  if (
    slug.includes("things-to-do") ||
    slug.includes("experience") ||
    slug.includes("itinerary") ||
    keywordSpace.includes("experiences")
  ) {
    return "commercial"
  }

  if (slug.includes("how-to") || slug.includes("visit") || slug.includes("where-is")) {
    return "navigational"
  }

  return "informational"
}

function getEditorialIndexEntryForGuide(guideSlug: string) {
  return seoPages.find((entry) => entry.guideSourceSlug === guideSlug || entry.slug === guideSlug)
}

function deriveImplementedSeoEntry(guide: GuideContentItem): SeoCatalogEntry {
  const indexed = getEditorialIndexEntryForGuide(guide.slug)

  return {
    slug: guide.slug,
    title: guide.seoTitle,
    description: guide.seoDescription,
    cluster: indexed?.cluster ?? inferGuideCluster(guide),
    status: indexed?.status && IMPLEMENTED_SEO_STATUSES.has(indexed.status) ? indexed.status : "published",
    primaryKeyword: indexed?.primaryKeyword ?? guide.keywords?.[0] ?? guide.slug.replace(/-/g, " "),
    secondaryKeywords: indexed?.secondaryKeywords.length ? indexed.secondaryKeywords : guide.keywords?.slice(1) ?? [],
    searchIntent: indexed?.searchIntent ?? inferGuideSearchIntent(guide),
    priority: indexed?.priority,
    source: "guides",
    guideSourceSlug: guide.slug,
    canonicalRoute: indexed?.canonicalRoute ?? "guideDetail",
  }
}

function derivePlanningSeoEntry(entry: SeoEditorialIndexEntry): SeoCatalogEntry {
  return {
    slug: entry.slug,
    title: entry.title ?? entry.slug.replace(/-/g, " "),
    description: entry.description ?? "",
    cluster: entry.cluster,
    status: entry.status,
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords,
    searchIntent: entry.searchIntent,
    priority: entry.priority,
    source: "editorial-index",
    guideSourceSlug: entry.guideSourceSlug,
    canonicalRoute: entry.canonicalRoute,
  }
}

export function getImplementedSeoPages() {
  return guides.map(deriveImplementedSeoEntry)
}

export function getPlannedSeoPages() {
  return seoPages
    .filter((entry) => !IMPLEMENTED_SEO_STATUSES.has(entry.status))
    .map(derivePlanningSeoEntry)
}

export function getSeoCatalog() {
  const catalogBySlug = new Map<string, SeoCatalogEntry>()

  for (const entry of getImplementedSeoPages()) {
    catalogBySlug.set(entry.slug, entry)
  }

  for (const entry of getPlannedSeoPages()) {
    if (!catalogBySlug.has(entry.slug)) {
      catalogBySlug.set(entry.slug, entry)
    }
  }

  return Array.from(catalogBySlug.values()).sort((left, right) => (right.priority ?? 0) - (left.priority ?? 0))
}

export function getSeoEntryBySlug(slug: string) {
  return getSeoCatalog().find((entry) => entry.slug === slug)
}

export const getPublishedSeoGuideEntries = getImplementedSeoPages
export const getEditorialRoadmapEntries = getPlannedSeoPages
export const getSeoCatalogEntries = getSeoCatalog
export const getSeoCatalogEntryBySlug = getSeoEntryBySlug
