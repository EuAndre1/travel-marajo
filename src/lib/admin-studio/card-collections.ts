import type { AppLocale } from "@/config/i18n"
import { SUPPORTED_LOCALES } from "@/config/i18n"
import { destinations as baseDestinations } from "@/data/destinos"
import { homeContentByLocale } from "@/data/homepage"
import { packages as basePackages } from "@/data/pacotes"
import { services as baseServices } from "@/data/services"

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
  galleryImageUrls: string[]
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
  ctaTarget: string
  visible: boolean
  sortOrder: number
  galleryImageUrls: string[]
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
        ctaTarget: "/hotels",
        visible: true,
        sortOrder: 0,
        galleryImageUrls: baseOffer.image ? [baseOffer.image] : [],
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
