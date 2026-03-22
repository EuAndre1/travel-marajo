import { SUPPORTED_LOCALES, type AppLocale } from "@/config/i18n"
import { siteContent } from "@/config/site-content"
import { experienceCatalog } from "@/data/experiences"
import { homeContentByLocale } from "@/data/homepage"
import { FLAGSHIP_PACKAGE_SLUG, premiumPackageLandingContent } from "@/data/package-landing"
import { packages } from "@/data/pacotes"
import { homeAuthorityContent, siteChrome } from "@/data/site"
import type { MediaAssetType } from "@/lib/media-library/shared"

export const adminStudioLocales = SUPPORTED_LOCALES

export const adminLocaleLabels: Record<AppLocale, string> = {
  pt: "PT-BR",
  en: "EN",
  es: "ES",
  fr: "FR",
}

function joinLines(items: readonly string[]) {
  return items.join("\n")
}

export interface AdminHomepageLocaleDraft {
  heroImageUrl: string
  heroMediaUrl: string
  heroMediaType: MediaAssetType
  heroHeadline: string
  heroSubheadline: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  trustStripLabel: string
  trustItems: string
  whyMarajoTitle: string
  whyMarajoIntro: string
  conciergeTitle: string
  conciergeText: string
  finalCtaTitle: string
  finalCtaText: string
  finalPrimaryLabel: string
  finalSecondaryLabel: string
}

export interface AdminHomepageDraft {
  locales: Record<AppLocale, AdminHomepageLocaleDraft>
}

export interface AdminContentLocaleDraft {
  brandTagline: string
  authorityStatement: string
  footerHeadline: string
  footerSupportCopy: string
  footerHighlights: string
  trustHeadline: string
  trustBody: string
  trustHighlights: string
  conciergeTitle: string
  conciergeBody: string
  conciergeResponseText: string
  signInLabel: string
  profileLabel: string
  planTripLabel: string
  bookDirectLabel: string
}

export interface AdminContentDraft {
  locales: Record<AppLocale, AdminContentLocaleDraft>
}

export interface AdminExperienceLocaleDraft {
  title: string
  shortDescription: string
  fullDescription: string
  locationLabel: string
  durationLabel: string
  highlightsText: string
  includedText: string
}

export interface AdminExperienceDraftItem {
  slug: string
  categoryKey: string
  featured: boolean
  active: boolean
  selectedMediaUrl: string
  locales: Record<AppLocale, AdminExperienceLocaleDraft>
}

export interface AdminExperiencesDraft {
  items: AdminExperienceDraftItem[]
}

export interface AdminPackageLocaleDraft {
  title: string
  summary: string
  duration: string
  includedText: string
  itineraryText: string
  premiumHeroTitle: string
  premiumHeroBody: string
  premiumWhyTitle: string
  premiumWhyBody: string
  premiumWhyBookTitle: string
  premiumWhyBookSubtitle: string
  premiumFinalTitle: string
  premiumFinalSubtitle: string
  premiumListingTitle: string
  premiumListingBody: string
  premiumTrustNotes: string
}

export interface AdminPackageDraftItem {
  slug: string
  startingPrice: number
  isFlagship: boolean
  selectedMediaUrl: string
  locales: Record<AppLocale, AdminPackageLocaleDraft>
}

export interface AdminPackagesDraft {
  items: AdminPackageDraftItem[]
}

export interface AdminMediaDraftItem {
  id: string
  kind: "image" | "video"
  fileName: string
  mimeType: string
  sizeBytes: number
  displayName: string
  usageNote: string
  persisted: false
  addedAt: string
}

export interface AdminMediaDraft {
  items: AdminMediaDraftItem[]
}

function createLocaleRecord<T>(builder: (locale: AppLocale) => T) {
  return adminStudioLocales.reduce(
    (accumulator, locale) => {
      accumulator[locale] = builder(locale)
      return accumulator
    },
    {} as Record<AppLocale, T>,
  )
}

export const adminHomepageInitialDraft: AdminHomepageDraft = {
  locales: {
    pt: {
      heroImageUrl: "/hero-bg.jpg",
      heroMediaUrl: "/hero-bg.jpg",
      heroMediaType: "image",
      heroHeadline: homeContentByLocale.pt.hero.title,
      heroSubheadline: homeContentByLocale.pt.hero.subtitle,
      primaryCtaLabel: homeContentByLocale.pt.hero.ctas.primary,
      secondaryCtaLabel: homeContentByLocale.pt.hero.ctas.secondary,
      trustStripLabel: homeAuthorityContent.pt.trustStripLabel,
      trustItems: joinLines(homeContentByLocale.pt.hero.trustItems),
      whyMarajoTitle: homeContentByLocale.pt.whyMarajo.title,
      whyMarajoIntro: homeContentByLocale.pt.whyMarajo.subtitle,
      conciergeTitle: homeAuthorityContent.pt.conciergeTitle,
      conciergeText: homeAuthorityContent.pt.conciergeSubtitle,
      finalCtaTitle: homeAuthorityContent.pt.finalTitle,
      finalCtaText: homeAuthorityContent.pt.finalSubtitle,
      finalPrimaryLabel: homeAuthorityContent.pt.finalPrimaryLabel,
      finalSecondaryLabel: homeAuthorityContent.pt.finalSecondaryLabel,
    },
    en: {
      heroImageUrl: "/hero-bg.jpg",
      heroMediaUrl: "/hero-bg.jpg",
      heroMediaType: "image",
      heroHeadline: homeContentByLocale.en.hero.title,
      heroSubheadline: homeContentByLocale.en.hero.subtitle,
      primaryCtaLabel: homeContentByLocale.en.hero.ctas.primary,
      secondaryCtaLabel: homeContentByLocale.en.hero.ctas.secondary,
      trustStripLabel: homeAuthorityContent.en.trustStripLabel,
      trustItems: joinLines(homeContentByLocale.en.hero.trustItems),
      whyMarajoTitle: homeContentByLocale.en.whyMarajo.title,
      whyMarajoIntro: homeContentByLocale.en.whyMarajo.subtitle,
      conciergeTitle: homeAuthorityContent.en.conciergeTitle,
      conciergeText: homeAuthorityContent.en.conciergeSubtitle,
      finalCtaTitle: homeAuthorityContent.en.finalTitle,
      finalCtaText: homeAuthorityContent.en.finalSubtitle,
      finalPrimaryLabel: homeAuthorityContent.en.finalPrimaryLabel,
      finalSecondaryLabel: homeAuthorityContent.en.finalSecondaryLabel,
    },
    es: {
      heroImageUrl: "/hero-bg.jpg",
      heroMediaUrl: "/hero-bg.jpg",
      heroMediaType: "image",
      heroHeadline: homeContentByLocale.es.hero.title,
      heroSubheadline: homeContentByLocale.es.hero.subtitle,
      primaryCtaLabel: homeContentByLocale.es.hero.ctas.primary,
      secondaryCtaLabel: homeContentByLocale.es.hero.ctas.secondary,
      trustStripLabel: homeAuthorityContent.es.trustStripLabel,
      trustItems: joinLines(homeContentByLocale.es.hero.trustItems),
      whyMarajoTitle: homeContentByLocale.es.whyMarajo.title,
      whyMarajoIntro: homeContentByLocale.es.whyMarajo.subtitle,
      conciergeTitle: homeAuthorityContent.es.conciergeTitle,
      conciergeText: homeAuthorityContent.es.conciergeSubtitle,
      finalCtaTitle: homeAuthorityContent.es.finalTitle,
      finalCtaText: homeAuthorityContent.es.finalSubtitle,
      finalPrimaryLabel: homeAuthorityContent.es.finalPrimaryLabel,
      finalSecondaryLabel: homeAuthorityContent.es.finalSecondaryLabel,
    },
    fr: {
      heroImageUrl: "/hero-bg.jpg",
      heroMediaUrl: "/hero-bg.jpg",
      heroMediaType: "image",
      heroHeadline: homeContentByLocale.fr.hero.title,
      heroSubheadline: homeContentByLocale.fr.hero.subtitle,
      primaryCtaLabel: homeContentByLocale.fr.hero.ctas.primary,
      secondaryCtaLabel: homeContentByLocale.fr.hero.ctas.secondary,
      trustStripLabel: homeAuthorityContent.fr.trustStripLabel,
      trustItems: joinLines(homeContentByLocale.fr.hero.trustItems),
      whyMarajoTitle: homeContentByLocale.fr.whyMarajo.title,
      whyMarajoIntro: homeContentByLocale.fr.whyMarajo.subtitle,
      conciergeTitle: homeAuthorityContent.fr.conciergeTitle,
      conciergeText: homeAuthorityContent.fr.conciergeSubtitle,
      finalCtaTitle: homeAuthorityContent.fr.finalTitle,
      finalCtaText: homeAuthorityContent.fr.finalSubtitle,
      finalPrimaryLabel: homeAuthorityContent.fr.finalPrimaryLabel,
      finalSecondaryLabel: homeAuthorityContent.fr.finalSecondaryLabel,
    },
  },
}

export const adminContentInitialDraft: AdminContentDraft = {
  locales: {
    pt: {
      brandTagline: siteChrome.pt.brandTagline,
      authorityStatement: siteChrome.pt.authorityLabel,
      footerHeadline: siteChrome.pt.footerHeadline,
      footerSupportCopy: siteChrome.pt.footerDescription,
      footerHighlights: joinLines(siteChrome.pt.footerHighlights),
      trustHeadline: siteContent.pt.home.proofTitle,
      trustBody: siteContent.pt.home.proofSubtitle,
      trustHighlights: joinLines(siteContent.pt.home.proofHighlights),
      conciergeTitle: siteContent.pt.pages.planTrip.title,
      conciergeBody: siteContent.pt.pages.planTrip.subtitle,
      conciergeResponseText: siteContent.pt.pages.planTrip.responseText,
      signInLabel: siteChrome.pt.signInLabel,
      profileLabel: siteChrome.pt.profileLabel,
      planTripLabel: siteChrome.pt.planTripLabel,
      bookDirectLabel: siteChrome.pt.bookDirectLabel,
    },
    en: {
      brandTagline: siteChrome.en.brandTagline,
      authorityStatement: siteChrome.en.authorityLabel,
      footerHeadline: siteChrome.en.footerHeadline,
      footerSupportCopy: siteChrome.en.footerDescription,
      footerHighlights: joinLines(siteChrome.en.footerHighlights),
      trustHeadline: siteContent.en.home.proofTitle,
      trustBody: siteContent.en.home.proofSubtitle,
      trustHighlights: joinLines(siteContent.en.home.proofHighlights),
      conciergeTitle: siteContent.en.pages.planTrip.title,
      conciergeBody: siteContent.en.pages.planTrip.subtitle,
      conciergeResponseText: siteContent.en.pages.planTrip.responseText,
      signInLabel: siteChrome.en.signInLabel,
      profileLabel: siteChrome.en.profileLabel,
      planTripLabel: siteChrome.en.planTripLabel,
      bookDirectLabel: siteChrome.en.bookDirectLabel,
    },
    es: {
      brandTagline: siteChrome.es.brandTagline,
      authorityStatement: siteChrome.es.authorityLabel,
      footerHeadline: siteChrome.es.footerHeadline,
      footerSupportCopy: siteChrome.es.footerDescription,
      footerHighlights: joinLines(siteChrome.es.footerHighlights),
      trustHeadline: siteContent.es.home.proofTitle,
      trustBody: siteContent.es.home.proofSubtitle,
      trustHighlights: joinLines(siteContent.es.home.proofHighlights),
      conciergeTitle: siteContent.es.pages.planTrip.title,
      conciergeBody: siteContent.es.pages.planTrip.subtitle,
      conciergeResponseText: siteContent.es.pages.planTrip.responseText,
      signInLabel: siteChrome.es.signInLabel,
      profileLabel: siteChrome.es.profileLabel,
      planTripLabel: siteChrome.es.planTripLabel,
      bookDirectLabel: siteChrome.es.bookDirectLabel,
    },
    fr: {
      brandTagline: siteChrome.fr.brandTagline,
      authorityStatement: siteChrome.fr.authorityLabel,
      footerHeadline: siteChrome.fr.footerHeadline,
      footerSupportCopy: siteChrome.fr.footerDescription,
      footerHighlights: joinLines(siteChrome.fr.footerHighlights),
      trustHeadline: siteContent.fr.home.proofTitle,
      trustBody: siteContent.fr.home.proofSubtitle,
      trustHighlights: joinLines(siteContent.fr.home.proofHighlights),
      conciergeTitle: siteContent.fr.pages.planTrip.title,
      conciergeBody: siteContent.fr.pages.planTrip.subtitle,
      conciergeResponseText: siteContent.fr.pages.planTrip.responseText,
      signInLabel: siteChrome.fr.signInLabel,
      profileLabel: siteChrome.fr.profileLabel,
      planTripLabel: siteChrome.fr.planTripLabel,
      bookDirectLabel: siteChrome.fr.bookDirectLabel,
    },
  },
}

export const adminExperiencesInitialDraft: AdminExperiencesDraft = {
  items: experienceCatalog.map((experience) => ({
    slug: experience.slug,
    categoryKey: experience.category,
    featured: experience.featured,
    active: experience.active,
    selectedMediaUrl: experience.media.heroImage,
    locales: createLocaleRecord((locale) => {
      const translation = experience.translations[locale] ?? experience.translations.pt

      return {
        title: translation.title,
        shortDescription: translation.shortDescription,
        fullDescription: translation.fullDescription,
        locationLabel: translation.locationLabel,
        durationLabel: translation.durationLabel,
        highlightsText: joinLines(translation.highlights),
        includedText: joinLines(translation.included),
      }
    }),
  })),
}

export const adminPackagesInitialDraft: AdminPackagesDraft = {
  items: packages.map((pkg) => {
    const isFlagship = pkg.slug === FLAGSHIP_PACKAGE_SLUG

    return {
      slug: pkg.slug,
      startingPrice: pkg.startingPrice,
      isFlagship,
      selectedMediaUrl: pkg.heroImage,
      locales: createLocaleRecord((locale) => {
        const translation = pkg.translations[locale] ?? pkg.translations.pt
        const landingCopy = premiumPackageLandingContent[locale]

        return {
          title: translation.title,
          summary: translation.summary,
          duration: translation.duration,
          includedText: joinLines(translation.included),
          itineraryText: joinLines(translation.itinerary),
          premiumHeroTitle: isFlagship ? landingCopy.heroTitle : "",
          premiumHeroBody: isFlagship ? landingCopy.heroBody : "",
          premiumWhyTitle: isFlagship ? landingCopy.whyTitle : "",
          premiumWhyBody: isFlagship ? landingCopy.whyBody : "",
          premiumWhyBookTitle: isFlagship ? landingCopy.whyBookTitle : "",
          premiumWhyBookSubtitle: isFlagship ? landingCopy.whyBookSubtitle : "",
          premiumFinalTitle: isFlagship ? landingCopy.finalTitle : "",
          premiumFinalSubtitle: isFlagship ? landingCopy.finalSubtitle : "",
          premiumListingTitle: isFlagship ? landingCopy.listingFeatureTitle : "",
          premiumListingBody: isFlagship ? landingCopy.listingFeatureBody : "",
          premiumTrustNotes: isFlagship ? joinLines(landingCopy.heroTrustNotes) : "",
        }
      }),
    }
  }),
}

export const adminMediaInitialDraft: AdminMediaDraft = {
  items: [],
}
