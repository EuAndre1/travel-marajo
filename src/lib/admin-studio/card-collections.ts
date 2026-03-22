import type { AppLocale } from "@/config/i18n"
import { SUPPORTED_LOCALES } from "@/config/i18n"
import { destinations as baseDestinations } from "@/data/destinos"
import { homeContentByLocale } from "@/data/homepage"
import { packages as basePackages } from "@/data/pacotes"
import { services as baseServices } from "@/data/services"
import {
  getMediaTypeFromUrl,
  type MediaAssetType,
  type MediaReference,
} from "@/lib/media-library/shared"

export interface AdminCardLocaleDraft {
  title: string
  eyebrow: string
  description: string
  metaPrimary: string
  metaSecondary: string
  ctaLabel: string
}

export interface AdminHotelCardLocaleDraft extends AdminCardLocaleDraft {
  fullDescription: string
  amenitiesText: string
}

export interface AdminHotelRoomDraftItem {
  id: string
  visible: boolean
  sortOrder: number
  name: string
  category: string
  occupancy: string
  beds: string
  amenities: string[]
  breakfastIncluded: boolean
  price: string
  taxesInfo: string
  cancellation: string
  payment: string
  maxRooms: number | null
  ctaLabel: string
  ctaTarget: string
}

export interface AdminCardDraftItem {
  id: string
  linkedSlug: string
  imageUrl: string
  ctaTarget: string
  visible: boolean
  sortOrder: number
  locales: Record<AppLocale, AdminCardLocaleDraft>
}

export interface AdminHotelCardDraftItem
  extends Omit<AdminCardDraftItem, "locales"> {
  mediaUrl: string
  mediaType: MediaAssetType
  galleryImageUrls: string[]
  galleryMediaItems: MediaReference[]
  hotelRooms: AdminHotelRoomDraftItem[]
  locales: Record<AppLocale, AdminHotelCardLocaleDraft>
}

export interface AdminCardCollectionDraft {
  items: AdminCardDraftItem[]
}

export interface AdminHotelCardCollectionDraft {
  items: AdminHotelCardDraftItem[]
}

export interface ResolvedAdminCardItem extends AdminCardLocaleDraft {
  id: string
  linkedSlug: string
  imageUrl: string
  ctaTarget: string
  visible: boolean
  sortOrder: number
}

export interface ResolvedAdminHotelCardItem extends AdminHotelCardLocaleDraft {
  id: string
  linkedSlug: string
  imageUrl: string
  mediaUrl: string
  mediaType: MediaAssetType
  ctaTarget: string
  visible: boolean
  sortOrder: number
  galleryImageUrls: string[]
  galleryMediaItems: MediaReference[]
  hotelRooms: ResolvedAdminHotelRoomItem[]
}

export interface ResolvedAdminHotelRoomItem {
  id: string
  visible: boolean
  sortOrder: number
  name: string
  category: string
  occupancy: string
  beds: string
  amenities: string[]
  breakfastIncluded: boolean
  price: string
  taxesInfo: string
  cancellation: string
  payment: string
  maxRooms: number | null
  ctaLabel: string
  ctaTarget: string
}

type LocaleRecord<T> = Record<AppLocale, T>

const LOCALE_NUMBER_FORMAT: Record<AppLocale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
}

const destinationCtaLabels: LocaleRecord<string> = {
  pt: "Ver destino",
  en: "View destination",
  es: "Ver destino",
  fr: "Voir la destination",
}

const routeCtaLabels: LocaleRecord<string> = {
  pt: "Ver pacote",
  en: "View package",
  es: "Ver paquete",
  fr: "Voir le forfait",
}

const hotelCtaLabels: LocaleRecord<string> = {
  pt: "Ver hospedagem",
  en: "View stay",
  es: "Ver alojamiento",
  fr: "Voir l'hebergement",
}

const serviceCtaLabels: LocaleRecord<string> = {
  pt: "Entender servico",
  en: "Explore service",
  es: "Ver servicio",
  fr: "Voir le service",
}

const hotelLocationLabels: LocaleRecord<string> = {
  pt: "Soure",
  en: "Soure",
  es: "Soure",
  fr: "Soure",
}

const serviceRouteBySlug: Record<string, string> = {
  "brazil-visa-consulting": "/services/brazil-visa-consulting",
  "custom-travel-planning": "/planejar-viagem",
  "concierge-assistance": "/planejar-viagem",
}

export function createStudioSlug(rawValue: string, fallbackSeed = "item") {
  const normalized = rawValue
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  if (normalized) {
    return normalized.slice(0, 80)
  }

  return fallbackSeed
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "item"
}

export function createEmptyAdminCardLocaleDraft(): AdminCardLocaleDraft {
  return {
    title: "",
    eyebrow: "",
    description: "",
    metaPrimary: "",
    metaSecondary: "",
    ctaLabel: "",
  }
}

export function createEmptyAdminHotelCardLocaleDraft(): AdminHotelCardLocaleDraft {
  return {
    ...createEmptyAdminCardLocaleDraft(),
    fullDescription: "",
    amenitiesText: "",
  }
}

export function createEmptyAdminHotelRoomDraftItem(
  index = 0,
  fallback?: Partial<AdminHotelRoomDraftItem>,
): AdminHotelRoomDraftItem {
  return {
    id: fallback?.id ?? `hotel-room-${index + 1}`,
    visible: fallback?.visible ?? true,
    sortOrder: fallback?.sortOrder ?? index,
    name: fallback?.name ?? "",
    category: fallback?.category ?? "",
    occupancy: fallback?.occupancy ?? "",
    beds: fallback?.beds ?? "",
    amenities: fallback?.amenities ?? [],
    breakfastIncluded: fallback?.breakfastIncluded ?? false,
    price: fallback?.price ?? "",
    taxesInfo: fallback?.taxesInfo ?? "",
    cancellation: fallback?.cancellation ?? "",
    payment: fallback?.payment ?? "",
    maxRooms: fallback?.maxRooms ?? null,
    ctaLabel: fallback?.ctaLabel ?? "Reservar",
    ctaTarget: fallback?.ctaTarget ?? "",
  }
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

function getStringValueFromKeys(source: unknown, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = getStringValue(source, key, "")
    if (value) {
      return value
    }
  }

  return fallback
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

function getNullableNumberValue(source: unknown, key: string, fallback: number | null) {
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

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
}

function getStringArrayValueFromKeys(source: unknown, keys: string[], fallback: string[]) {
  for (const key of keys) {
    const value = getStringArrayValue(source, key, [])
    if (value.length > 0) {
      return value
    }
  }

  return fallback
}

function parseLooseStringList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getStringListValueFromKeys(source: unknown, keys: string[], fallback: string[]) {
  for (const key of keys) {
    if (!isRecord(source)) {
      break
    }

    const rawValue = source[key]

    if (typeof rawValue === "string" && rawValue.trim().length > 0) {
      return parseLooseStringList(rawValue)
    }

    if (Array.isArray(rawValue)) {
      const nextItems = rawValue.filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0,
      )

      if (nextItems.length > 0) {
        return nextItems
      }
    }
  }

  return fallback
}

function getMultilineStringValueFromKeys(source: unknown, keys: string[], fallback: string) {
  for (const key of keys) {
    if (!isRecord(source)) {
      break
    }

    const rawValue = source[key]
    if (typeof rawValue === "string" && rawValue.trim().length > 0) {
      return rawValue
    }

    if (Array.isArray(rawValue)) {
      const nextItems = rawValue.filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0,
      )
      if (nextItems.length > 0) {
        return nextItems.join("\n")
      }
    }
  }

  return fallback
}

function normalizeMediaReference(
  value: unknown,
  fallback?: Partial<MediaReference>,
): MediaReference | null {
  if (!isRecord(value)) {
    if (fallback?.url) {
      return {
        url: fallback.url,
        type: fallback.type ?? getMediaTypeFromUrl(fallback.url),
      }
    }
    return null
  }

  const url = getStringValue(value, "url", fallback?.url ?? "")
  if (!url) {
    return null
  }

  const rawType = getStringValue(value, "type", fallback?.type ?? getMediaTypeFromUrl(url))
  const type: MediaAssetType = rawType === "video" ? "video" : "image"

  return {
    url,
    type,
  }
}

function getMediaReferenceArrayValue(
  source: unknown,
  key: string,
  fallback: MediaReference[],
) {
  if (!isRecord(source)) {
    return fallback
  }

  const value = source[key]
  if (!Array.isArray(value)) {
    return fallback
  }

  const nextItems = value
    .map((item) => normalizeMediaReference(item))
    .filter((item): item is MediaReference => Boolean(item))

  return nextItems.length ? nextItems : fallback
}

export function normalizeHotelLocaleDraft(
  localeValue: unknown,
  fallback?: Partial<AdminHotelCardLocaleDraft>,
): AdminHotelCardLocaleDraft {
  const base = {
    ...createEmptyAdminHotelCardLocaleDraft(),
    ...fallback,
  }

  return {
    title: getStringValue(localeValue, "title", base.title),
    eyebrow: getStringValue(localeValue, "eyebrow", base.eyebrow),
    description: getStringValue(localeValue, "description", base.description),
    metaPrimary: getStringValue(localeValue, "metaPrimary", base.metaPrimary),
    metaSecondary: getStringValue(localeValue, "metaSecondary", base.metaSecondary),
    ctaLabel: getStringValue(localeValue, "ctaLabel", base.ctaLabel),
    fullDescription: getStringValue(localeValue, "fullDescription", base.fullDescription),
    amenitiesText: getStringValue(localeValue, "amenitiesText", base.amenitiesText),
  }
}

export function normalizeHotelRoomDraftItem(
  itemValue: unknown,
  index: number,
  fallback?: AdminHotelRoomDraftItem,
): AdminHotelRoomDraftItem {
  const base = createEmptyAdminHotelRoomDraftItem(index, fallback)

  return {
    id: getStringValue(itemValue, "id", base.id),
    visible: getBooleanValue(itemValue, "visible", base.visible),
    sortOrder: getNumberValue(
      itemValue,
      "sortOrder",
      getNumberValue(itemValue, "order", base.sortOrder),
    ),
    name: getStringValueFromKeys(itemValue, ["name", "title"], base.name),
    category: getStringValue(itemValue, "category", base.category),
    occupancy: getStringValueFromKeys(itemValue, ["occupancy", "capacity"], base.occupancy),
    beds: getStringValueFromKeys(itemValue, ["beds", "bedType"], base.beds),
    amenities: getStringListValueFromKeys(itemValue, ["amenities", "amenitiesText"], base.amenities),
    breakfastIncluded: getBooleanValue(itemValue, "breakfastIncluded", base.breakfastIncluded),
    price: getStringValue(itemValue, "price", base.price),
    taxesInfo: getStringValue(itemValue, "taxesInfo", base.taxesInfo),
    cancellation: getStringValue(itemValue, "cancellation", base.cancellation),
    payment: getStringValue(itemValue, "payment", base.payment),
    maxRooms: getNullableNumberValue(itemValue, "maxRooms", base.maxRooms),
    ctaLabel: getStringValueFromKeys(itemValue, ["ctaLabel", "buttonLabel"], base.ctaLabel),
    ctaTarget: getStringValueFromKeys(itemValue, ["ctaTarget", "href", "url"], base.ctaTarget),
  }
}

export function normalizeHotelCardDraftItem(
  itemValue: unknown,
  index: number,
  fallback?: AdminHotelCardDraftItem,
): AdminHotelCardDraftItem {
  const baseId = fallback?.id ?? `hotel-card-${index + 1}`
  const localesValue = isRecord(itemValue) && isRecord(itemValue.locales) ? itemValue.locales : {}
  const legacyPtFallback: Partial<AdminHotelCardLocaleDraft> = {
    title: getStringValueFromKeys(itemValue, ["title", "hotelName", "name"], fallback?.locales?.pt.title ?? ""),
    eyebrow: getStringValueFromKeys(
      itemValue,
      ["location", "eyebrow", "subtitle", "label"],
      fallback?.locales?.pt.eyebrow ?? "",
    ),
    description: getStringValueFromKeys(
      itemValue,
      ["shortDescription", "description", "summary"],
      fallback?.locales?.pt.description ?? "",
    ),
    metaPrimary: getStringValueFromKeys(
      itemValue,
      ["priceRange", "metaPrimary", "price"],
      fallback?.locales?.pt.metaPrimary ?? "",
    ),
    metaSecondary: getStringValueFromKeys(
      itemValue,
      ["metaSecondary"],
      fallback?.locales?.pt.metaSecondary ?? "",
    ),
    ctaLabel: getStringValueFromKeys(
      itemValue,
      ["ctaLabel", "buttonLabel"],
      fallback?.locales?.pt.ctaLabel ?? "",
    ),
    fullDescription: getMultilineStringValueFromKeys(
      itemValue,
      ["fullDescription", "longDescription"],
      fallback?.locales?.pt.fullDescription ?? "",
    ),
    amenitiesText: getMultilineStringValueFromKeys(
      itemValue,
      ["amenitiesText", "amenities", "differentials"],
      fallback?.locales?.pt.amenitiesText ?? "",
    ),
  }
  const ptLocale = normalizeHotelLocaleDraft(localesValue.pt, legacyPtFallback)
  const imageUrl = getStringValueFromKeys(
    itemValue,
    ["imageUrl", "image", "coverImageUrl", "mainImageUrl"],
    fallback?.imageUrl ?? "",
  )
  const mediaUrl = getStringValueFromKeys(
    itemValue,
    ["mediaUrl", "videoUrl", "coverMediaUrl"],
    fallback?.mediaUrl ?? imageUrl,
  ) || imageUrl
  const rawMediaType = getStringValue(
    itemValue,
    "mediaType",
    fallback?.mediaType ?? getMediaTypeFromUrl(mediaUrl || imageUrl),
  )
  const mediaType: MediaAssetType = rawMediaType === "video" ? "video" : "image"
  const galleryImageUrls = getStringArrayValueFromKeys(
    itemValue,
    ["galleryImageUrls", "galleryImages", "gallery", "photos"],
    fallback?.galleryImageUrls?.length
      ? fallback.galleryImageUrls
      : imageUrl
        ? [imageUrl]
        : [],
  )
  const galleryMediaItems = getMediaReferenceArrayValue(
    itemValue,
    "galleryMediaItems",
    fallback?.galleryMediaItems?.length
      ? fallback.galleryMediaItems
      : galleryImageUrls.map((url) => ({ url, type: "image" as const })),
  )
  const syncedGalleryImageUrls =
    galleryImageUrls.length > 0
      ? galleryImageUrls
      : galleryMediaItems.filter((item) => item.type === "image").map((item) => item.url)
  const fallbackRooms = fallback?.hotelRooms ?? []
  const rawRooms =
    isRecord(itemValue) && Array.isArray(itemValue.hotelRooms)
      ? itemValue.hotelRooms
      : isRecord(itemValue) && Array.isArray(itemValue.rooms)
        ? itemValue.rooms
        : undefined
  const hotelRooms = (rawRooms ?? fallbackRooms)
    .map((room, roomIndex) => {
      const baseRoom =
        fallbackRooms.find(
          (candidate) =>
            isRecord(room) &&
            typeof room.id === "string" &&
            candidate.id === room.id,
        ) ?? fallbackRooms[roomIndex]

      return normalizeHotelRoomDraftItem(room, roomIndex, baseRoom)
    })
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((room, roomIndex) => ({
      ...room,
      sortOrder: roomIndex,
    }))

  return {
    id: getStringValue(itemValue, "id", baseId),
    linkedSlug: createStudioSlug(
      getStringValueFromKeys(
        itemValue,
        ["linkedSlug", "slug"],
        fallback?.linkedSlug ?? ptLocale.title ?? baseId,
      ),
      baseId,
    ),
    imageUrl,
    mediaUrl: mediaUrl || imageUrl,
    mediaType,
    ctaTarget: getStringValueFromKeys(
      itemValue,
      ["ctaTarget", "href", "url"],
      fallback?.ctaTarget ?? "/hotels",
    ),
    visible: getBooleanValue(
      itemValue,
      "visible",
      getBooleanValue(itemValue, "showOnSite", fallback?.visible ?? true),
    ),
    sortOrder: getNumberValue(
      itemValue,
      "sortOrder",
      getNumberValue(itemValue, "order", fallback?.sortOrder ?? index),
    ),
    galleryImageUrls: syncedGalleryImageUrls,
    galleryMediaItems,
    hotelRooms,
    locales: {
      pt: ptLocale,
      en: normalizeHotelLocaleDraft(localesValue.en, fallback?.locales?.en ?? ptLocale),
      es: normalizeHotelLocaleDraft(localesValue.es, fallback?.locales?.es ?? ptLocale),
      fr: normalizeHotelLocaleDraft(localesValue.fr, fallback?.locales?.fr ?? ptLocale),
    },
  }
}

export function normalizeHotelCardCollectionDraft(
  collectionValue: unknown,
  fallbackCollection: AdminHotelCardCollectionDraft = { items: [] },
): AdminHotelCardCollectionDraft {
  if (!isRecord(collectionValue) || !Array.isArray(collectionValue.items)) {
    return {
      items: [...fallbackCollection.items]
        .map((item, index) => normalizeHotelCardDraftItem(item, index, item))
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((item, index) => ({ ...item, sortOrder: index })),
    }
  }

  const items = collectionValue.items
    .map((item, index) => {
      const baseItem =
        fallbackCollection.items.find(
          (candidate) =>
            isRecord(item) &&
            typeof item.id === "string" &&
            candidate.id === item.id,
        ) ?? undefined

      return normalizeHotelCardDraftItem(item, index, baseItem)
    })
    .filter(Boolean)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item, index) => ({
      ...item,
      sortOrder: index,
    }))

  return {
    items,
  }
}

function createLocaleRecord<T>(builder: (locale: AppLocale) => T) {
  return SUPPORTED_LOCALES.reduce(
    (accumulator, locale) => {
      accumulator[locale] = builder(locale)
      return accumulator
    },
    {} as Record<AppLocale, T>,
  )
}

function formatPrice(value: number, locale: AppLocale) {
  return new Intl.NumberFormat(LOCALE_NUMBER_FORMAT[locale], {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

function buildDestinationCards(): AdminCardCollectionDraft {
  return {
    items: baseDestinations.map((destination, index) => ({
      id: `destination-${destination.slug}`,
      linkedSlug: destination.slug,
      imageUrl: destination.heroImage,
      ctaTarget: `/destinos/${destination.slug}`,
      visible: true,
      sortOrder: index,
      locales: createLocaleRecord((locale) => {
        const homeDestination =
          homeContentByLocale[locale].destinations.items.find(
            (item) => item.name === destination.name,
          ) ?? homeContentByLocale.pt.destinations.items[index]

        return {
          title: homeDestination?.name ?? destination.name,
          eyebrow: destination.tagline,
          description: homeDestination?.description ?? destination.overview,
          metaPrimary: "",
          metaSecondary: "",
          ctaLabel: destinationCtaLabels[locale],
        }
      }),
    })),
  }
}

function buildRouteCards(): AdminCardCollectionDraft {
  return {
    items: basePackages.map((pkg, index) => ({
      id: `route-${pkg.slug}`,
      linkedSlug: pkg.slug,
      imageUrl: pkg.heroImage,
      ctaTarget: `/pacotes/${pkg.slug}`,
      visible: true,
      sortOrder: index,
      locales: createLocaleRecord((locale) => {
        const translation = pkg.translations[locale] ?? pkg.translations.pt

        return {
          title: translation.title,
          eyebrow: translation.duration,
          description: translation.summary,
          metaPrimary: translation.included.slice(0, 2).join(" • "),
          metaSecondary: formatPrice(pkg.startingPrice, locale),
          ctaLabel: routeCtaLabels[locale],
        }
      }),
    })),
  }
}

function buildHotelCards(): AdminHotelCardCollectionDraft {
  const baseOffer =
    homeContentByLocale.pt.offers.items.find((item) => item.href === "/hotels") ??
    homeContentByLocale.pt.offers.items.find((item) => item.href === "/hoteis")

  if (!baseOffer) {
    return { items: [] }
  }

  const linkedSlug = createStudioSlug(baseOffer.title, "hotel-parceiro")

  return {
    items: [
      {
        id: "hotel-partner-1",
        linkedSlug,
        imageUrl: baseOffer.image,
        mediaUrl: baseOffer.image,
        mediaType: "image",
        ctaTarget: "/hotels",
        visible: true,
        sortOrder: 0,
        galleryImageUrls: baseOffer.image ? [baseOffer.image] : [],
        galleryMediaItems: baseOffer.image ? [{ url: baseOffer.image, type: "image" }] : [],
        hotelRooms: [],
        locales: createLocaleRecord((locale) => {
          const localeOffer =
            homeContentByLocale[locale].offers.items.find((item) => item.href === "/hotels") ??
            homeContentByLocale[locale].offers.items.find((item) => item.href === "/hoteis") ??
            baseOffer

          return {
            title: localeOffer?.title ?? "Hospedagem parceira",
            eyebrow: hotelLocationLabels[locale],
            description: localeOffer?.description ?? "",
            metaPrimary: localeOffer?.price ?? "",
            metaSecondary: "",
            ctaLabel: hotelCtaLabels[locale],
            fullDescription: localeOffer?.description ?? "",
            amenitiesText: "",
          }
        }),
      },
    ],
  }
}

function buildServiceCards(): AdminCardCollectionDraft {
  return {
    items: baseServices.map((service, index) => ({
      id: `service-${service.slug}`,
      linkedSlug: service.slug,
      imageUrl: index % 2 === 0 ? "/oferta-pacote.jpg" : "/oferta-hotel.jpg",
      ctaTarget: serviceRouteBySlug[service.slug] ?? "/services",
      visible: true,
      sortOrder: index,
      locales: createLocaleRecord((locale) => ({
        title: service.title,
        eyebrow: service.priceModel,
        description: service.description,
        metaPrimary: "",
        metaSecondary: "",
        ctaLabel: serviceCtaLabels[locale],
      })),
    })),
  }
}

export const adminDestinationCardsInitialDraft = buildDestinationCards()
export const adminRouteCardsInitialDraft = buildRouteCards()
export const adminHotelCardsInitialDraft = buildHotelCards()
export const adminServiceCardsInitialDraft = buildServiceCards()
