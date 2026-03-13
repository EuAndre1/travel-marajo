import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isAppLocale, type AppLocale } from "@/config/i18n"

export type StaticRouteKey =
  | "home"
  | "experiences"
  | "packages"
  | "destinations"
  | "guides"
  | "planTrip"
  | "offers"
  | "partners"
  | "services"
  | "serviceBrazilVisa"
  | "hotels"
  | "flights"
  | "activities"
  | "login"
  | "register"
  | "profile"
  | "bookingConfirmation"
  | "checkout"
  | "checkoutSuccess"
  | "checkoutCancel"

export type DynamicRouteKey = "experienceDetail" | "destinationDetail" | "guideDetail"

export type AppRouteKey = StaticRouteKey | DynamicRouteKey

type RouteDefinition = {
  pt: string[]
  en: string[]
  es: string[]
  fr: string[]
}

type RouteMatch =
  | { key: StaticRouteKey; params?: undefined }
  | { key: "experienceDetail"; params: { slug: string } }
  | { key: "destinationDetail"; params: { slug: string } }
  | { key: "guideDetail"; params: { slug: string } }

const ROUTES: Record<AppRouteKey, RouteDefinition> = {
  home: { pt: [], en: [], es: [], fr: [] },
  experiences: { pt: ["experiencias"], en: ["experiences"], es: ["experiencias"], fr: ["experiences"] },
  experienceDetail: { pt: ["experiencias"], en: ["experiences"], es: ["experiencias"], fr: ["experiences"] },
  packages: { pt: ["pacotes"], en: ["packages"], es: ["paquetes"], fr: ["forfaits"] },
  destinations: { pt: ["destinos"], en: ["destinations"], es: ["destinos"], fr: ["destinations"] },
  destinationDetail: { pt: ["destinos"], en: ["destinations"], es: ["destinos"], fr: ["destinations"] },
  guides: { pt: ["guia"], en: ["guides"], es: ["guias"], fr: ["guides"] },
  guideDetail: { pt: ["guia"], en: ["guides"], es: ["guias"], fr: ["guides"] },
  planTrip: { pt: ["planejar-viagem"], en: ["plan-trip"], es: ["planificar-viaje"], fr: ["planifier-voyage"] },
  offers: { pt: ["ofertas"], en: ["offers"], es: ["ofertas"], fr: ["offres"] },
  partners: { pt: ["parceiros"], en: ["partners"], es: ["socios"], fr: ["partenaires"] },
  services: { pt: ["servicos"], en: ["services"], es: ["servicios"], fr: ["services"] },
  serviceBrazilVisa: {
    pt: ["servicos", "consultoria-visto-brasil"],
    en: ["services", "brazil-visa-consulting"],
    es: ["servicios", "consultoria-visa-brasil"],
    fr: ["services", "conseil-visa-bresil"],
  },
  hotels: { pt: ["hoteis"], en: ["hotels"], es: ["hoteles"], fr: ["hotels"] },
  flights: { pt: ["voos"], en: ["flights"], es: ["vuelos"], fr: ["vols"] },
  activities: { pt: ["atividades"], en: ["activities"], es: ["actividades"], fr: ["activites"] },
  login: { pt: ["entrar"], en: ["login"], es: ["acceso"], fr: ["connexion"] },
  register: { pt: ["cadastro"], en: ["register"], es: ["registro"], fr: ["inscription"] },
  profile: { pt: ["perfil"], en: ["profile"], es: ["perfil"], fr: ["profil"] },
  bookingConfirmation: {
    pt: ["confirmacao-reserva"],
    en: ["booking-confirmation"],
    es: ["confirmacion-reserva"],
    fr: ["confirmation-reservation"],
  },
  checkout: { pt: ["checkout"], en: ["checkout"], es: ["checkout"], fr: ["checkout"] },
  checkoutSuccess: {
    pt: ["checkout", "sucesso"],
    en: ["checkout", "success"],
    es: ["checkout", "exito"],
    fr: ["checkout", "succes"],
  },
  checkoutCancel: {
    pt: ["checkout", "cancelado"],
    en: ["checkout", "cancel"],
    es: ["checkout", "cancelado"],
    fr: ["checkout", "annule"],
  },
}

const LEGACY_STATIC_PATHS: Array<{ path: string; key: AppRouteKey; params?: Record<string, string> }> = [
  { path: "/", key: "home" },
  { path: "/experiencias", key: "experiences" },
  { path: "/experiences", key: "experiences" },
  { path: "/pacotes", key: "packages" },
  { path: "/packages", key: "packages" },
  { path: "/destinos", key: "destinations" },
  { path: "/destinations", key: "destinations" },
  { path: "/guia", key: "guides" },
  { path: "/guides", key: "guides" },
  { path: "/planejar-viagem", key: "planTrip" },
  { path: "/plan-trip", key: "planTrip" },
  { path: "/ofertas", key: "offers" },
  { path: "/offers", key: "offers" },
  { path: "/parceiros", key: "partners" },
  { path: "/partners", key: "partners" },
  { path: "/services", key: "services" },
  { path: "/servicos", key: "services" },
  { path: "/services/brazil-visa-consulting", key: "serviceBrazilVisa" },
  { path: "/hotels", key: "hotels" },
  { path: "/hoteis", key: "hotels" },
  { path: "/flights", key: "flights" },
  { path: "/voos", key: "flights" },
  { path: "/activities", key: "activities" },
  { path: "/atividades", key: "activities" },
  { path: "/login", key: "login" },
  { path: "/entrar", key: "login" },
  { path: "/register", key: "register" },
  { path: "/cadastro", key: "register" },
  { path: "/profile", key: "profile" },
  { path: "/perfil", key: "profile" },
  { path: "/booking-confirmation", key: "bookingConfirmation" },
  { path: "/confirmacao-reserva", key: "bookingConfirmation" },
  { path: "/checkout", key: "checkout" },
  { path: "/checkout/success", key: "checkoutSuccess" },
  { path: "/checkout/cancel", key: "checkoutCancel" },
]

export function getLocalizedPath(
  locale: AppLocale,
  key: AppRouteKey,
  params?: { slug?: string },
): string {
  const segments = [...ROUTES[key][locale]]

  if (
    (key === "experienceDetail" || key === "destinationDetail" || key === "guideDetail") &&
    params?.slug
  ) {
    segments.push(params.slug)
  }

  return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`
}

export function getLocalizedAlternates(key: AppRouteKey, params?: { slug?: string }) {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, getLocalizedPath(locale, key, params)]),
  ) as Record<AppLocale, string>
}

export function detectLocaleFromPathname(pathname: string): AppLocale | null {
  const first = pathname.split("/").filter(Boolean)[0]
  return isAppLocale(first) ? first : null
}

export function stripLocalePrefix(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const locale = segments[0]

  if (!isAppLocale(locale)) {
    return { locale: null, segments }
  }

  return { locale, segments: segments.slice(1) }
}

export function resolveCanonicalRoute(locale: AppLocale, segments: string[]): RouteMatch | null {
  if (segments.length === 0) {
    return { key: "home" }
  }

  const exactStatic = (Object.keys(ROUTES) as AppRouteKey[]).find((key) => {
    if (key === "experienceDetail" || key === "destinationDetail" || key === "guideDetail") {
      return false
    }

    const routeSegments = ROUTES[key][locale]
    return routeSegments.length === segments.length && routeSegments.every((segment, index) => segment === segments[index])
  })

  if (exactStatic) {
    return { key: exactStatic as StaticRouteKey }
  }

  const experiencesRoot = ROUTES.experienceDetail[locale]
  if (segments.length === experiencesRoot.length + 1 && experiencesRoot.every((segment, index) => segment === segments[index])) {
    return { key: "experienceDetail", params: { slug: segments.at(-1)! } }
  }

  const destinationsRoot = ROUTES.destinationDetail[locale]
  if (segments.length === destinationsRoot.length + 1 && destinationsRoot.every((segment, index) => segment === segments[index])) {
    return { key: "destinationDetail", params: { slug: segments.at(-1)! } }
  }

  const guidesRoot = ROUTES.guideDetail[locale]
  if (segments.length === guidesRoot.length + 1 && guidesRoot.every((segment, index) => segment === segments[index])) {
    return { key: "guideDetail", params: { slug: segments.at(-1)! } }
  }

  return null
}

export function resolveLegacyRoute(pathname: string): { key: AppRouteKey; params?: { slug: string } } | null {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")

  const staticMatch = LEGACY_STATIC_PATHS.find((entry) => entry.path === normalized)
  if (staticMatch) {
    return staticMatch.params ? { key: staticMatch.key, params: { slug: staticMatch.params.slug } } : { key: staticMatch.key }
  }

  const dynamicPatterns = [
    { prefix: "/experiencias/", key: "experienceDetail" as const },
    { prefix: "/experiences/", key: "experienceDetail" as const },
    { prefix: "/destinos/", key: "destinationDetail" as const },
    { prefix: "/destinations/", key: "destinationDetail" as const },
    { prefix: "/guides/", key: "guideDetail" as const },
    { prefix: "/guia/", key: "guideDetail" as const },
  ]

  for (const pattern of dynamicPatterns) {
    if (normalized.startsWith(pattern.prefix)) {
      const slug = normalized.slice(pattern.prefix.length)
      if (slug) {
        return { key: pattern.key, params: { slug } }
      }
    }
  }

  return null
}

export function getLocaleFromCookie(cookieValue?: string): AppLocale {
  return isAppLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE
}
