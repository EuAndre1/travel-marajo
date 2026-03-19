import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import HomePage from "@/app/page"
import ExperiencesPage from "@/app/experiencias/page"
import ExperienceDetailPage from "@/app/experiencias/[slug]/page"
import PackagesPage from "@/app/pacotes/page"
import PackageDetailPage from "@/app/pacotes/[slug]/page"
import DestinationsPage from "@/app/destinos/page"
import DestinationDetailPage from "@/app/destinos/[slug]/page"
import GuidesIndexPage from "@/app/guides/page"
import GuideDetailPage from "@/app/guides/[slug]/page"
import PlanTripPage from "@/app/planejar-viagem/page"
import OffersPage from "@/app/ofertas/page"
import PartnersPage from "@/app/parceiros/page"
import ServicesPage from "@/app/services/page"
import BrazilVisaConsultingPage from "@/app/services/brazil-visa-consulting/page"
import HotelsPage from "@/app/hotels/page"
import FlightsPage from "@/app/flights/page"
import ActivitiesPage from "@/app/activities/page"
import LoginPage from "@/app/login/page"
import RegisterPage from "@/app/register/page"
import ProfilePage from "@/app/profile/page"
import BookingConfirmationPage from "@/app/booking-confirmation/page"
import CheckoutPage from "@/app/checkout/page"
import CheckoutSuccessPage from "@/app/checkout/success/page"
import CheckoutCancelPage from "@/app/checkout/cancel/page"
import { getDestinationBySlug } from "@/data/destinos"
import { getGuideBySlug } from "@/data/guides"
import { getLocalizedPackage, getPackageBySlug } from "@/data/pacotes"
import { DEFAULT_LOCALE, LOCALE_TO_BCP47, isAppLocale, type AppLocale } from "@/config/i18n"
import { authOptions } from "@/lib/auth"
import { buildAbsoluteUrl } from "@/lib/env"
import { getExperienceBySlug } from "@/lib/experiences"
import {
  getLocalizedAlternates,
  getLocalizedPath,
  resolveCanonicalRoute,
  resolveLegacyRoute,
  resolveLocalizedAliasRoute,
  type AppRouteKey,
} from "@/i18n/routing"

type PageProps = {
  params: {
    locale: string
    segments?: string[]
  }
}

const NON_INDEXABLE_ROUTE_POLICIES: Partial<
  Record<AppRouteKey, { index: boolean; follow: boolean; includeCanonical: boolean }>
> = {
  login: { index: false, follow: true, includeCanonical: false },
  register: { index: false, follow: true, includeCanonical: false },
  profile: { index: false, follow: false, includeCanonical: false },
  bookingConfirmation: { index: false, follow: false, includeCanonical: false },
  checkout: { index: false, follow: false, includeCanonical: false },
  checkoutSuccess: { index: false, follow: false, includeCanonical: false },
  checkoutCancel: { index: false, follow: false, includeCanonical: false },
}

function getMetadataForRoute(locale: AppLocale, key: AppRouteKey, slug?: string): Metadata {
  const robotsPolicy = NON_INDEXABLE_ROUTE_POLICIES[key]
  const base: Metadata = {
    ...(robotsPolicy?.includeCanonical === false
      ? {}
      : {
          alternates: {
            canonical: getLocalizedPath(locale, key, slug ? { slug } : undefined),
            languages: getLocalizedAlternates(key, slug ? { slug } : undefined),
          },
        }),
    openGraph: {
      locale: LOCALE_TO_BCP47[locale].replace("-", "_"),
      url: buildAbsoluteUrl(getLocalizedPath(locale, key, slug ? { slug } : undefined)),
      siteName: "Travel Maraj?",
      type: "website",
    },
    ...(robotsPolicy
      ? {
          robots: {
            index: robotsPolicy.index,
            follow: robotsPolicy.follow,
          },
        }
      : {}),
  }

  if (key === "experienceDetail" && slug) {
    const experience = getExperienceBySlug(slug)
    if (experience) {
      const translated = experience.translations[locale] ?? experience.translations.pt
      return {
        ...base,
        title: translated.title,
        description: translated.shortDescription,
      }
    }
  }

  if (key === "packageDetail" && slug) {
    const pkg = getPackageBySlug(slug)
    if (pkg) {
      const translated = getLocalizedPackage(pkg, locale)
      return {
        ...base,
        title: translated.title,
        description: translated.summary,
      }
    }
  }

  if (key === "destinationDetail" && slug) {
    const destination = getDestinationBySlug(slug)
    if (destination) {
      return {
        ...base,
        title: destination.name,
        description: destination.overview,
      }
    }
  }

  if (key === "guideDetail" && slug) {
    const guide = getGuideBySlug(slug)
    if (guide) {
      return {
        ...base,
        title: guide.seoTitle,
        description: guide.seoDescription,
      }
    }
  }

  const titles: Record<AppRouteKey, string> = {
    home: "Travel Maraj?",
    experiences: "Travel Maraj? Experiences",
    experienceDetail: "Travel Maraj? Experience",
    packages: "Travel Maraj? Packages",
    packageDetail: "Travel Maraj? Package",
    destinations: "Marajo Destinations",
    destinationDetail: "Marajo Destination",
    guides: "Marajo Travel Guides",
    guideDetail: "Marajo Guide",
    planTrip: "Plan Your Marajo Trip",
    offers: "Travel Maraj? Offers",
    partners: "Travel Maraj? Partners",
    services: "Travel Maraj? Services",
    serviceBrazilVisa: "Brazil Visa Consulting",
    hotels: "Marajo Hotels",
    flights: "Marajo Flights",
    activities: "Marajo Activities",
    login: "Login",
    register: "Register",
    profile: "Profile",
    bookingConfirmation: "Booking Confirmation",
    checkout: "Checkout",
    checkoutSuccess: "Checkout Success",
    checkoutCancel: "Checkout Cancelled",
  }

  return {
    ...base,
    title: titles[key],
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, segments = [] } = params

  if (!isAppLocale(locale)) {
    return {}
  }

  const matched = resolveCanonicalRoute(locale, segments)
  if (!matched) {
    return {}
  }

  return getMetadataForRoute(locale, matched.key, matched.params?.slug)
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, segments = [] } = params
  const requestedPath = `/${[locale, ...segments].join("/")}`

  if (!isAppLocale(locale)) {
    const legacyMatch = resolveLegacyRoute(requestedPath)
    if (legacyMatch) {
      redirect(getLocalizedPath(legacyMatch.locale ?? DEFAULT_LOCALE, legacyMatch.key, legacyMatch.params))
    }

    notFound()
  }

  const localizedAliasMatch = resolveLocalizedAliasRoute(locale, segments)
  if (localizedAliasMatch) {
    redirect(getLocalizedPath(locale, localizedAliasMatch.key, localizedAliasMatch.params))
  }

  const matched = resolveCanonicalRoute(locale, segments)
  if (!matched) {
    notFound()
  }

  if (matched.key === "profile" || matched.key === "bookingConfirmation") {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      redirect(`${getLocalizedPath(locale, "login")}?callbackUrl=${encodeURIComponent(requestedPath)}`)
    }
  }

  switch (matched.key) {
    case "home":
      return <HomePage />
    case "experiences":
      return <ExperiencesPage />
    case "experienceDetail":
      return <ExperienceDetailPage params={{ slug: matched.params.slug }} />
    case "packages":
      return <PackagesPage />
    case "packageDetail":
      return <PackageDetailPage params={{ slug: matched.params.slug }} />
    case "destinations":
      return <DestinationsPage />
    case "destinationDetail":
      return <DestinationDetailPage params={{ slug: matched.params.slug }} />
    case "guides":
      return <GuidesIndexPage />
    case "guideDetail":
      return <GuideDetailPage params={{ slug: matched.params.slug }} />
    case "planTrip":
      return <PlanTripPage />
    case "offers":
      return <OffersPage />
    case "partners":
      return <PartnersPage />
    case "services":
      return <ServicesPage />
    case "serviceBrazilVisa":
      return <BrazilVisaConsultingPage />
    case "hotels":
      return <HotelsPage />
    case "flights":
      return <FlightsPage />
    case "activities":
      return <ActivitiesPage />
    case "login":
      return <LoginPage />
    case "register":
      return <RegisterPage />
    case "profile":
      return <ProfilePage />
    case "bookingConfirmation":
      return <BookingConfirmationPage />
    case "checkout":
      return <CheckoutPage />
    case "checkoutSuccess":
      return <CheckoutSuccessPage />
    case "checkoutCancel":
      return <CheckoutCancelPage />
    default:
      notFound()
  }
}
