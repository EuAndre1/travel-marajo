export type SeoCluster =
  | "guide"
  | "logistics"
  | "experiences"
  | "itinerary"
  | "wildlife"
  | "culture"
  | "destinations"

export type SeoStatus = "planned" | "draft" | "implemented" | "published"

export type SeoSearchIntent = "informational" | "commercial" | "transactional" | "navigational"

export type SeoCanonicalRoute = "guideDetail"

export interface SeoEditorialIndexEntry {
  slug: string
  title?: string
  description?: string
  cluster: SeoCluster
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: SeoSearchIntent
  status: SeoStatus
  priority?: number
  guideSourceSlug?: string
  canonicalRoute: SeoCanonicalRoute
}

export interface SeoCatalogEntry {
  slug: string
  title: string
  description: string
  cluster: SeoCluster
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: SeoSearchIntent
  status: SeoStatus
  priority?: number
  source: "guides" | "editorial-index"
  guideSourceSlug?: string
  canonicalRoute: SeoCanonicalRoute
}
