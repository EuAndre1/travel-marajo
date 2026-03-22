import type { AppLocale } from "@/config/i18n"
import { SUPPORTED_LOCALES } from "@/config/i18n"
import { siteContent } from "@/config/site-content"
import {
  adminDestinationCardsInitialDraft,
  adminHotelCardsInitialDraft,
  adminRouteCardsInitialDraft,
  adminServiceCardsInitialDraft,
  createEmptyAdminHotelCardLocaleDraft,
  createStudioSlug,
  normalizeHotelCardCollectionDraft,
  type AdminCardCollectionDraft,
  type AdminCardDraftItem,
  type AdminCardLocaleDraft,
  type AdminHotelCardCollectionDraft,
  type AdminHotelCardDraftItem,
  type AdminHotelCardLocaleDraft,
  type ResolvedAdminCardItem,
  type ResolvedAdminHotelCardItem,
} from "@/lib/admin-studio/card-collections"
import {
  adminContentInitialDraft,
  adminExperiencesInitialDraft,
  adminHomepageInitialDraft,
  adminPackagesInitialDraft,
  type AdminContentDraft,
  type AdminContentLocaleDraft,
  type AdminExperienceDraftItem,
  type AdminExperiencesDraft,
  type AdminExperienceLocaleDraft,
  type AdminHomepageDraft,
  type AdminHomepageLocaleDraft,
  type AdminPackageDraftItem,
  type AdminPackagesDraft,
  type AdminPackageLocaleDraft,
} from "@/lib/admin-studio/defaults"
import { getHomeContent, type HomeContent } from "@/data/homepage"
import { experiences as baseExperiences, type ExperienceItem } from "@/data/experiencias"
import { FLAGSHIP_PACKAGE_SLUG, premiumPackageLandingContent } from "@/data/package-landing"
import { packages as basePackages, type PackageItem } from "@/data/pacotes"
import { homeAuthorityContent, siteChrome } from "@/data/site"
import { getMediaTypeFromUrl, type MediaReference } from "@/lib/media-library/shared"

export const contentStudioSurfaces = [
  "homepage",
  "content",
  "experiences",
  "packages",
  "destinationCards",
  "routeCards",
  "hotelCards",
  "serviceCards",
] as const

export type ContentStudioSurface = (typeof contentStudioSurfaces)[number]

export interface ContentStudioState {
  homepage: AdminHomepageDraft
  content: AdminContentDraft
  experiences: AdminExperiencesDraft
  packages: AdminPackagesDraft
  destinationCards: AdminCardCollectionDraft
  routeCards: AdminCardCollectionDraft
  hotelCards: AdminHotelCardCollectionDraft
  serviceCards: AdminCardCollectionDraft
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function getStringValue(source: unknown, key: string, fallback: string) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  return typeof value === "string" ? value : fallback
}

function getBooleanValue(source: unknown, key: string, fallback: boolean) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  return typeof value === "boolean" ? value : fallback
}

function getNumberValue(source: unknown, key: string, fallback: number) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function getStringArrayValue(source: unknown, key: string, fallback: string[]) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  if (!Array.isArray(value)) {
    return fallback
  }

  const nextItems = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
  return nextItems.length ? nextItems : fallback
}

function getMediaReferenceArrayValue(source: unknown, key: string, fallback: MediaReference[]) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  if (!Array.isArray(value)) {
    return fallback
  }

  const nextItems = value
    .map((item) => {
      if (!isRecord(item)) {
        return null
      }

      const url = getStringValue(item, "url", "")
      if (!url) {
        return null
      }

      return {
        url,
        type: getStringValue(item, "type", getMediaTypeFromUrl(url)) === "video" ? "video" : "image",
      } as MediaReference
    })
    .filter((item): item is MediaReference => Boolean(item))

  return nextItems.length ? nextItems : fallback
}

function parseMultilineText(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function mergeHomepageLocaleDraft(
  base: AdminHomepageLocaleDraft,
  override: unknown,
): AdminHomepageLocaleDraft {
  return {
    heroImageUrl: getStringValue(override, "heroImageUrl", base.heroImageUrl),
    heroMediaUrl: getStringValue(
      override,
      "heroMediaUrl",
      getStringValue(override, "heroImageUrl", base.heroMediaUrl),
    ),
    heroMediaType:
      getStringValue(override, "heroMediaType", base.heroMediaType) === "video"
        ? "video"
        : "image",
    heroHeadline: getStringValue(override, "heroHeadline", base.heroHeadline),
    heroSubheadline: getStringValue(override, "heroSubheadline", base.heroSubheadline),
    primaryCtaLabel: getStringValue(override, "primaryCtaLabel", base.primaryCtaLabel),
    secondaryCtaLabel: getStringValue(override, "secondaryCtaLabel", base.secondaryCtaLabel),
    trustStripLabel: getStringValue(override, "trustStripLabel", base.trustStripLabel),
    trustItems: getStringValue(override, "trustItems", base.trustItems),
    whyMarajoTitle: getStringValue(override, "whyMarajoTitle", base.whyMarajoTitle),
    whyMarajoIntro: getStringValue(override, "whyMarajoIntro", base.whyMarajoIntro),
    conciergeTitle: getStringValue(override, "conciergeTitle", base.conciergeTitle),
    conciergeText: getStringValue(override, "conciergeText", base.conciergeText),
    finalCtaTitle: getStringValue(override, "finalCtaTitle", base.finalCtaTitle),
    finalCtaText: getStringValue(override, "finalCtaText", base.finalCtaText),
    finalPrimaryLabel: getStringValue(override, "finalPrimaryLabel", base.finalPrimaryLabel),
    finalSecondaryLabel: getStringValue(
      override,
      "finalSecondaryLabel",
      base.finalSecondaryLabel,
    ),
  }
}

function mergeContentLocaleDraft(
  base: AdminContentLocaleDraft,
  override: unknown,
): AdminContentLocaleDraft {
  return {
    brandTagline: getStringValue(override, "brandTagline", base.brandTagline),
    authorityStatement: getStringValue(
      override,
      "authorityStatement",
      base.authorityStatement,
    ),
    footerHeadline: getStringValue(override, "footerHeadline", base.footerHeadline),
    footerSupportCopy: getStringValue(
      override,
      "footerSupportCopy",
      base.footerSupportCopy,
    ),
    footerHighlights: getStringValue(override, "footerHighlights", base.footerHighlights),
    trustHeadline: getStringValue(override, "trustHeadline", base.trustHeadline),
    trustBody: getStringValue(override, "trustBody", base.trustBody),
    trustHighlights: getStringValue(override, "trustHighlights", base.trustHighlights),
    conciergeTitle: getStringValue(override, "conciergeTitle", base.conciergeTitle),
    conciergeBody: getStringValue(override, "conciergeBody", base.conciergeBody),
    conciergeResponseText: getStringValue(
      override,
      "conciergeResponseText",
      base.conciergeResponseText,
    ),
    signInLabel: getStringValue(override, "signInLabel", base.signInLabel),
    profileLabel: getStringValue(override, "profileLabel", base.profileLabel),
    planTripLabel: getStringValue(override, "planTripLabel", base.planTripLabel),
    bookDirectLabel: getStringValue(override, "bookDirectLabel", base.bookDirectLabel),
  }
}

function mergeExperienceLocaleDraft(
  base: AdminExperienceLocaleDraft,
  override: unknown,
): AdminExperienceLocaleDraft {
  return {
    title: getStringValue(override, "title", base.title),
    shortDescription: getStringValue(override, "shortDescription", base.shortDescription),
    fullDescription: getStringValue(override, "fullDescription", base.fullDescription),
    locationLabel: getStringValue(override, "locationLabel", base.locationLabel),
    durationLabel: getStringValue(override, "durationLabel", base.durationLabel),
    highlightsText: getStringValue(override, "highlightsText", base.highlightsText),
    includedText: getStringValue(override, "includedText", base.includedText),
  }
}

function mergePackageLocaleDraft(
  base: AdminPackageLocaleDraft,
  override: unknown,
): AdminPackageLocaleDraft {
  return {
    title: getStringValue(override, "title", base.title),
    summary: getStringValue(override, "summary", base.summary),
    duration: getStringValue(override, "duration", base.duration),
    includedText: getStringValue(override, "includedText", base.includedText),
    itineraryText: getStringValue(override, "itineraryText", base.itineraryText),
    premiumHeroTitle: getStringValue(override, "premiumHeroTitle", base.premiumHeroTitle),
    premiumHeroBody: getStringValue(override, "premiumHeroBody", base.premiumHeroBody),
    premiumWhyTitle: getStringValue(override, "premiumWhyTitle", base.premiumWhyTitle),
    premiumWhyBody: getStringValue(override, "premiumWhyBody", base.premiumWhyBody),
    premiumWhyBookTitle: getStringValue(
      override,
      "premiumWhyBookTitle",
      base.premiumWhyBookTitle,
    ),
    premiumWhyBookSubtitle: getStringValue(
      override,
      "premiumWhyBookSubtitle",
      base.premiumWhyBookSubtitle,
    ),
    premiumFinalTitle: getStringValue(override, "premiumFinalTitle", base.premiumFinalTitle),
    premiumFinalSubtitle: getStringValue(
      override,
      "premiumFinalSubtitle",
      base.premiumFinalSubtitle,
    ),
    premiumListingTitle: getStringValue(
      override,
      "premiumListingTitle",
      base.premiumListingTitle,
    ),
    premiumListingBody: getStringValue(
      override,
      "premiumListingBody",
      base.premiumListingBody,
    ),
    premiumTrustNotes: getStringValue(
      override,
      "premiumTrustNotes",
      base.premiumTrustNotes,
    ),
  }
}

function mergeCardLocaleDraft(base: AdminCardLocaleDraft, override: unknown): AdminCardLocaleDraft {
  return {
    title: getStringValue(override, "title", base.title),
    eyebrow: getStringValue(override, "eyebrow", base.eyebrow),
    description: getStringValue(override, "description", base.description),
    metaPrimary: getStringValue(override, "metaPrimary", base.metaPrimary),
    metaSecondary: getStringValue(override, "metaSecondary", base.metaSecondary),
    ctaLabel: getStringValue(override, "ctaLabel", base.ctaLabel),
  }
}

function mergeHotelLocaleDraft(
  base: AdminHotelCardLocaleDraft,
  override: unknown,
): AdminHotelCardLocaleDraft {
  return {
    ...mergeCardLocaleDraft(base, override),
    fullDescription: getStringValue(override, "fullDescription", base.fullDescription),
    amenitiesText: getStringValue(override, "amenitiesText", base.amenitiesText),
  }
}

function mergeHomepageDraft(base: AdminHomepageDraft, override: unknown): AdminHomepageDraft {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}

  return {
    locales: {
      pt: mergeHomepageLocaleDraft(base.locales.pt, locales.pt),
      en: mergeHomepageLocaleDraft(base.locales.en, locales.en),
      es: mergeHomepageLocaleDraft(base.locales.es, locales.es),
      fr: mergeHomepageLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function mergeContentDraft(base: AdminContentDraft, override: unknown): AdminContentDraft {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}

  return {
    locales: {
      pt: mergeContentLocaleDraft(base.locales.pt, locales.pt),
      en: mergeContentLocaleDraft(base.locales.en, locales.en),
      es: mergeContentLocaleDraft(base.locales.es, locales.es),
      fr: mergeContentLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function mergeExperienceItem(
  base: AdminExperienceDraftItem,
  override: unknown,
): AdminExperienceDraftItem {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}

  return {
    ...base,
    selectedMediaUrl: getStringValue(override, "selectedMediaUrl", base.selectedMediaUrl),
    locales: {
      pt: mergeExperienceLocaleDraft(base.locales.pt, locales.pt),
      en: mergeExperienceLocaleDraft(base.locales.en, locales.en),
      es: mergeExperienceLocaleDraft(base.locales.es, locales.es),
      fr: mergeExperienceLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function mergePackageItem(base: AdminPackageDraftItem, override: unknown): AdminPackageDraftItem {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}

  return {
    ...base,
    selectedMediaUrl: getStringValue(override, "selectedMediaUrl", base.selectedMediaUrl),
    locales: {
      pt: mergePackageLocaleDraft(base.locales.pt, locales.pt),
      en: mergePackageLocaleDraft(base.locales.en, locales.en),
      es: mergePackageLocaleDraft(base.locales.es, locales.es),
      fr: mergePackageLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function mergeCardItem(base: AdminCardDraftItem, override: unknown): AdminCardDraftItem {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}

  return {
    ...base,
    imageUrl: getStringValue(override, "imageUrl", base.imageUrl),
    ctaTarget: getStringValue(override, "ctaTarget", base.ctaTarget),
    linkedSlug: getStringValue(override, "linkedSlug", base.linkedSlug),
    visible: getBooleanValue(override, "visible", base.visible),
    sortOrder: getNumberValue(override, "sortOrder", base.sortOrder),
    locales: {
      pt: mergeCardLocaleDraft(base.locales.pt, locales.pt),
      en: mergeCardLocaleDraft(base.locales.en, locales.en),
      es: mergeCardLocaleDraft(base.locales.es, locales.es),
      fr: mergeCardLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function mergeHotelCardItem(
  base: AdminHotelCardDraftItem,
  override: unknown,
): AdminHotelCardDraftItem {
  const locales = isRecord(override) && isRecord(override.locales) ? override.locales : {}
  const fallbackSlug = createStudioSlug(base.locales.pt.title || base.id, base.id)
  const imageUrl = getStringValue(override, "imageUrl", base.imageUrl)
  const mediaUrl = getStringValue(override, "mediaUrl", base.mediaUrl || imageUrl)
  const rawMediaType = getStringValue(
    override,
    "mediaType",
    base.mediaType || getMediaTypeFromUrl(mediaUrl || imageUrl),
  )
  const mediaType = rawMediaType === "video" ? "video" : "image"
  const galleryImageUrls = getStringArrayValue(
    override,
    "galleryImageUrls",
    base.galleryImageUrls.length
      ? base.galleryImageUrls
      : imageUrl
        ? [imageUrl]
        : [],
  )
  const galleryMediaItems = getMediaReferenceArrayValue(
    override,
    "galleryMediaItems",
    base.galleryMediaItems.length
      ? base.galleryMediaItems
      : galleryImageUrls.map((url) => ({ url, type: "image" as const })),
  )
  const syncedGalleryImageUrls =
    galleryImageUrls.length > 0
      ? galleryImageUrls
      : galleryMediaItems.filter((item) => item.type === "image").map((item) => item.url)

  return {
    ...base,
    imageUrl,
    mediaUrl: mediaUrl || imageUrl,
    mediaType,
    ctaTarget: getStringValue(override, "ctaTarget", base.ctaTarget),
    linkedSlug: getStringValue(override, "linkedSlug", base.linkedSlug || fallbackSlug),
    visible: getBooleanValue(override, "visible", base.visible),
    sortOrder: getNumberValue(override, "sortOrder", base.sortOrder),
    galleryImageUrls: syncedGalleryImageUrls,
    galleryMediaItems,
    locales: {
      pt: mergeHotelLocaleDraft(base.locales.pt, locales.pt),
      en: mergeHotelLocaleDraft(base.locales.en, locales.en),
      es: mergeHotelLocaleDraft(base.locales.es, locales.es),
      fr: mergeHotelLocaleDraft(base.locales.fr, locales.fr),
    },
  }
}

function createOverrideMap(
  value: unknown,
  itemKey: "slug",
): Map<string, Record<string, unknown>> {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return new Map()
  }

  return value.items.reduce((accumulator, item) => {
    if (!isRecord(item)) {
      return accumulator
    }

    const key = item[itemKey]
    if (typeof key === "string") {
      accumulator.set(key, item)
    }

    return accumulator
  }, new Map<string, Record<string, unknown>>())
}

function mergeExperiencesDraft(
  base: AdminExperiencesDraft,
  override: unknown,
): AdminExperiencesDraft {
  const overrideMap = createOverrideMap(override, "slug")

  return {
    items: base.items.map((item) => mergeExperienceItem(item, overrideMap.get(item.slug))),
  }
}

function mergePackagesDraft(base: AdminPackagesDraft, override: unknown): AdminPackagesDraft {
  const overrideMap = createOverrideMap(override, "slug")

  return {
    items: base.items.map((item) => mergePackageItem(item, overrideMap.get(item.slug))),
  }
}

function mergeCardCollectionDraft(
  base: AdminCardCollectionDraft,
  override: unknown,
): AdminCardCollectionDraft {
  if (!isRecord(override) || !Array.isArray(override.items)) {
    return {
      items: [...base.items].sort((left, right) => left.sortOrder - right.sortOrder),
    }
  }

  const items = override.items
    .map((item, index) => {
      if (!isRecord(item)) {
        return null
      }

      const id = getStringValue(item, "id", `card-${index + 1}`)
      const baseItem = base.items.find((candidate) => candidate.id === id)

      if (baseItem) {
        return mergeCardItem(baseItem, item)
      }

      const locales = isRecord(item.locales) ? item.locales : {}

      return {
        id,
        linkedSlug: getStringValue(item, "linkedSlug", ""),
        imageUrl: getStringValue(item, "imageUrl", ""),
        ctaTarget: getStringValue(item, "ctaTarget", ""),
        visible: getBooleanValue(item, "visible", true),
        sortOrder: getNumberValue(item, "sortOrder", index),
        locales: {
          pt: mergeCardLocaleDraft(
            { title: "", eyebrow: "", description: "", metaPrimary: "", metaSecondary: "", ctaLabel: "" },
            locales.pt,
          ),
          en: mergeCardLocaleDraft(
            { title: "", eyebrow: "", description: "", metaPrimary: "", metaSecondary: "", ctaLabel: "" },
            locales.en,
          ),
          es: mergeCardLocaleDraft(
            { title: "", eyebrow: "", description: "", metaPrimary: "", metaSecondary: "", ctaLabel: "" },
            locales.es,
          ),
          fr: mergeCardLocaleDraft(
            { title: "", eyebrow: "", description: "", metaPrimary: "", metaSecondary: "", ctaLabel: "" },
            locales.fr,
          ),
        },
      }
    })
    .filter((item): item is AdminCardDraftItem => Boolean(item))
    .sort((left, right) => left.sortOrder - right.sortOrder)

  return {
    items,
  }
}

function mergeHotelCardCollectionDraft(
  base: AdminHotelCardCollectionDraft,
  override: unknown,
): AdminHotelCardCollectionDraft {
  return normalizeHotelCardCollectionDraft(override, base)
}

export function createDefaultContentStudioState(): ContentStudioState {
  return {
    homepage: adminHomepageInitialDraft,
    content: adminContentInitialDraft,
    experiences: adminExperiencesInitialDraft,
    packages: adminPackagesInitialDraft,
    destinationCards: adminDestinationCardsInitialDraft,
    routeCards: adminRouteCardsInitialDraft,
    hotelCards: adminHotelCardsInitialDraft,
    serviceCards: adminServiceCardsInitialDraft,
  }
}

export function mergeContentStudioState(
  overrideMap: Partial<Record<ContentStudioSurface, unknown>>,
): ContentStudioState {
  const defaults = createDefaultContentStudioState()

  return {
    homepage: mergeHomepageDraft(defaults.homepage, overrideMap.homepage),
    content: mergeContentDraft(defaults.content, overrideMap.content),
    experiences: mergeExperiencesDraft(defaults.experiences, overrideMap.experiences),
    packages: mergePackagesDraft(defaults.packages, overrideMap.packages),
    destinationCards: mergeCardCollectionDraft(defaults.destinationCards, overrideMap.destinationCards),
    routeCards: mergeCardCollectionDraft(defaults.routeCards, overrideMap.routeCards),
    hotelCards: mergeHotelCardCollectionDraft(defaults.hotelCards, overrideMap.hotelCards),
    serviceCards: mergeCardCollectionDraft(defaults.serviceCards, overrideMap.serviceCards),
  }
}

function getHotelLocaleWithFallback(
  item: AdminHotelCardDraftItem,
  locale: AppLocale,
): AdminHotelCardLocaleDraft {
  const baseLocale = item.locales.pt ?? createEmptyAdminHotelCardLocaleDraft()
  const localeDraft = item.locales[locale] ?? createEmptyAdminHotelCardLocaleDraft()

  return {
    title: localeDraft.title || baseLocale.title,
    eyebrow: localeDraft.eyebrow || baseLocale.eyebrow,
    description: localeDraft.description || baseLocale.description,
    metaPrimary: localeDraft.metaPrimary || baseLocale.metaPrimary,
    metaSecondary: localeDraft.metaSecondary || baseLocale.metaSecondary,
    ctaLabel: localeDraft.ctaLabel || baseLocale.ctaLabel,
    fullDescription: localeDraft.fullDescription || baseLocale.fullDescription,
    amenitiesText: localeDraft.amenitiesText || baseLocale.amenitiesText,
  }
}

export function resolveSiteChromeForLocale(
  locale: AppLocale,
  state: ContentStudioState,
) {
  const base = siteChrome[locale]
  const override = state.content.locales[locale]

  return {
    ...base,
    brandTagline: override.brandTagline,
    authorityLabel: override.authorityStatement,
    signInLabel: override.signInLabel,
    profileLabel: override.profileLabel,
    planTripLabel: override.planTripLabel,
    bookDirectLabel: override.bookDirectLabel,
    footerHeadline: override.footerHeadline,
    footerDescription: override.footerSupportCopy,
    footerHighlights: parseMultilineText(override.footerHighlights),
  }
}

export function resolveHomeAuthorityForLocale(
  locale: AppLocale,
  state: ContentStudioState,
) {
  const base = homeAuthorityContent[locale]
  const homepageOverride = state.homepage.locales[locale]

  return {
    ...base,
    trustStripLabel: homepageOverride.trustStripLabel,
    conciergeTitle: homepageOverride.conciergeTitle,
    conciergeSubtitle: homepageOverride.conciergeText,
    finalTitle: homepageOverride.finalCtaTitle,
    finalSubtitle: homepageOverride.finalCtaText,
    finalPrimaryLabel: homepageOverride.finalPrimaryLabel,
    finalSecondaryLabel: homepageOverride.finalSecondaryLabel,
  }
}

export function resolveSiteContentForLocale(
  locale: AppLocale,
  state: ContentStudioState,
) {
  const base = siteContent[locale]
  const contentOverride = state.content.locales[locale]

  return {
    ...base,
    home: {
      ...base.home,
      proofTitle: contentOverride.trustHeadline,
      proofSubtitle: contentOverride.trustBody,
      proofHighlights: parseMultilineText(contentOverride.trustHighlights),
    },
    pages: {
      ...base.pages,
      planTrip: {
        ...base.pages.planTrip,
        title: contentOverride.conciergeTitle,
        subtitle: contentOverride.conciergeBody,
        responseText: contentOverride.conciergeResponseText,
      },
    },
  }
}

export function resolveHomeContentForLocale(
  locale: AppLocale,
  state: ContentStudioState,
): HomeContent {
  const base = getHomeContent(locale)
  const override = state.homepage.locales[locale]

  return {
    ...base,
    hero: {
      ...base.hero,
      title: override.heroHeadline,
      subtitle: override.heroSubheadline,
      ctas: {
        ...base.hero.ctas,
        primary: override.primaryCtaLabel,
        secondary: override.secondaryCtaLabel,
      },
      trustItems: parseMultilineText(override.trustItems),
    },
    whyMarajo: {
      ...base.whyMarajo,
      title: override.whyMarajoTitle,
      subtitle: override.whyMarajoIntro,
    },
  }
}

export function resolveExperienceItems(state: ContentStudioState): ExperienceItem[] {
  const overrideMap = new Map(state.experiences.items.map((item) => [item.slug, item]))

  return baseExperiences.map((experience) => {
    const override = overrideMap.get(experience.slug)
    if (!override) {
      return experience
    }

    const translations = SUPPORTED_LOCALES.reduce((accumulator, locale) => {
      const baseTranslation = experience.translations[locale] ?? experience.translations.pt
      const draftLocale = override.locales[locale]

      accumulator[locale] = {
        ...baseTranslation,
        title: draftLocale.title,
        shortDescription: draftLocale.shortDescription,
        fullDescription: draftLocale.fullDescription,
        locationLabel: draftLocale.locationLabel,
        durationLabel: draftLocale.durationLabel,
        highlights: parseMultilineText(draftLocale.highlightsText),
        included: parseMultilineText(draftLocale.includedText),
      }

      return accumulator
    }, {} as ExperienceItem["translations"])

    const ptTranslation = translations.pt ?? experience.translations.pt

    return {
      ...experience,
      title: ptTranslation.title,
      shortDescription: ptTranslation.shortDescription,
      locationLabel: ptTranslation.locationLabel,
      duration: ptTranslation.durationLabel,
      location: ptTranslation.locationLabel,
      translations,
    }
  })
}

export function resolveExperienceBySlug(
  slug: string,
  state: ContentStudioState,
) {
  return resolveExperienceItems(state).find((item) => item.slug === slug)
}

export function resolvePackages(state: ContentStudioState): PackageItem[] {
  const overrideMap = new Map(state.packages.items.map((item) => [item.slug, item]))

  return basePackages.map((pkg) => {
    const override = overrideMap.get(pkg.slug)
    if (!override) {
      return pkg
    }

    const translations = SUPPORTED_LOCALES.reduce((accumulator, locale) => {
      const baseTranslation = pkg.translations[locale] ?? pkg.translations.pt
      const draftLocale = override.locales[locale]

      accumulator[locale] = {
        ...baseTranslation,
        title: draftLocale.title,
        summary: draftLocale.summary,
        duration: draftLocale.duration,
        included: parseMultilineText(draftLocale.includedText),
        itinerary: parseMultilineText(draftLocale.itineraryText),
      }

      return accumulator
    }, {} as PackageItem["translations"])

    const ptTranslation = translations.pt ?? pkg.translations.pt

    return {
      ...pkg,
      title: ptTranslation.title,
      summary: ptTranslation.summary,
      duration: ptTranslation.duration,
      included: ptTranslation.included,
      itinerary: ptTranslation.itinerary,
      translations,
    }
  })
}

export function resolvePackageBySlug(slug: string, state: ContentStudioState) {
  return resolvePackages(state).find((item) => item.slug === slug)
}

export function resolvePremiumPackageLandingForLocale(
  locale: AppLocale,
  state: ContentStudioState,
) {
  const base = premiumPackageLandingContent[locale]
  const packageOverride = state.packages.items.find(
    (item) => item.slug === FLAGSHIP_PACKAGE_SLUG,
  )
  const localeOverride = packageOverride?.locales[locale]

  if (!localeOverride) {
    return base
  }

  return {
    ...base,
    heroTitle: localeOverride.premiumHeroTitle,
    heroBody: localeOverride.premiumHeroBody,
    heroTrustNotes: parseMultilineText(localeOverride.premiumTrustNotes),
    whyTitle: localeOverride.premiumWhyTitle,
    whyBody: localeOverride.premiumWhyBody,
    whyBookTitle: localeOverride.premiumWhyBookTitle,
    whyBookSubtitle: localeOverride.premiumWhyBookSubtitle,
    finalTitle: localeOverride.premiumFinalTitle,
    finalSubtitle: localeOverride.premiumFinalSubtitle,
    listingFeatureTitle: localeOverride.premiumListingTitle,
    listingFeatureBody: localeOverride.premiumListingBody,
  }
}

function resolveAdminCardCollectionForLocale(
  locale: AppLocale,
  collection: AdminCardCollectionDraft,
): ResolvedAdminCardItem[] {
  return [...collection.items]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item) => ({
      id: item.id,
      linkedSlug: item.linkedSlug,
      imageUrl: item.imageUrl,
      ctaTarget: item.ctaTarget,
      visible: item.visible,
      sortOrder: item.sortOrder,
      ...item.locales[locale],
    }))
}

function resolveAdminHotelCollectionForLocale(
  locale: AppLocale,
  collection: AdminHotelCardCollectionDraft,
): ResolvedAdminHotelCardItem[] {
  return [...collection.items]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item) => {
      const localized = getHotelLocaleWithFallback(item, locale)

      return {
        id: item.id,
        linkedSlug: item.linkedSlug || createStudioSlug(item.locales.pt.title || item.id, item.id),
        imageUrl: item.imageUrl,
        mediaUrl: item.mediaUrl || item.imageUrl,
        mediaType: item.mediaType || getMediaTypeFromUrl(item.mediaUrl || item.imageUrl),
        ctaTarget: item.ctaTarget,
        visible: item.visible,
        sortOrder: item.sortOrder,
        hotelRooms: item.hotelRooms
          .slice()
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map((room) => ({
            ...room,
            amenities: [...room.amenities],
          })),
        galleryImageUrls:
          item.galleryImageUrls.length > 0
            ? item.galleryImageUrls
            : item.imageUrl
              ? [item.imageUrl]
              : [],
        galleryMediaItems:
          item.galleryMediaItems.length > 0
            ? item.galleryMediaItems
            : item.galleryImageUrls.length > 0
              ? item.galleryImageUrls.map((url) => ({ url, type: "image" as const }))
              : item.mediaUrl
                ? [{ url: item.mediaUrl, type: item.mediaType || getMediaTypeFromUrl(item.mediaUrl) }]
                : item.imageUrl
                  ? [{ url: item.imageUrl, type: "image" as const }]
                  : [],
        ...localized,
      }
    })
}

export function resolveDestinationCardsForLocale(
  locale: AppLocale,
  state: ContentStudioState,
) {
  return resolveAdminCardCollectionForLocale(locale, state.destinationCards)
}

export function resolveRouteCardsForLocale(locale: AppLocale, state: ContentStudioState) {
  return resolveAdminCardCollectionForLocale(locale, state.routeCards)
}

export function resolveHotelCardsForLocale(locale: AppLocale, state: ContentStudioState) {
  return resolveAdminHotelCollectionForLocale(locale, state.hotelCards)
}

export function resolveServiceCardsForLocale(locale: AppLocale, state: ContentStudioState) {
  return resolveAdminCardCollectionForLocale(locale, state.serviceCards)
}

export function resolveHotelBySlugForLocale(
  locale: AppLocale,
  slug: string,
  state: ContentStudioState,
) {
  const normalizedSlug = createStudioSlug(slug, slug)

  return resolveAdminHotelCollectionForLocale(locale, state.hotelCards).find((item) => {
    if (!item.visible) {
      return false
    }

    const aliases = [
      item.linkedSlug,
      createStudioSlug(item.linkedSlug || "", item.id),
      createStudioSlug(item.id, item.id),
      createStudioSlug(item.title, item.id),
    ].filter(Boolean)

    return aliases.includes(normalizedSlug)
  })
}
