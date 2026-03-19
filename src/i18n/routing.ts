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

export type DynamicRouteKey = "experienceDetail" | "packageDetail" | "destinationDetail" | "guideDetail"

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
  | { key: "packageDetail"; params: { slug: string } }
  | { key: "destinationDetail"; params: { slug: string } }
  | { key: "guideDetail"; params: { slug: string } }

const ROUTES: Record<AppRouteKey, RouteDefinition> = {
  home: { pt: [], en: [], es: [], fr: [] },
  experiences: { pt: ["experiencias"], en: ["experiences"], es: ["experiencias"], fr: ["experiences"] },
  experienceDetail: { pt: ["experiencias"], en: ["experiences"], es: ["experiencias"], fr: ["experiences"] },
  packages: { pt: ["pacotes"], en: ["packages"], es: ["paquetes"], fr: ["forfaits"] },
  packageDetail: { pt: ["pacotes"], en: ["packages"], es: ["paquetes"], fr: ["forfaits"] },
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

const LEGACY_STATIC_PATHS: Array<{ path: string; key: AppRouteKey; locale?: AppLocale; params?: Record<string, string> }> = [
  { path: "/", key: "home" },
  { path: "/meuperfil", key: "profile", locale: "pt" },
  { path: "/experiencias", key: "experiences", locale: "pt" },
  { path: "/experiences", key: "experiences", locale: "en" },
  { path: "/pacotes", key: "packages", locale: "pt" },
  { path: "/packages", key: "packages", locale: "en" },
  { path: "/destinos", key: "destinations", locale: "pt" },
  { path: "/destinations", key: "destinations", locale: "en" },
  { path: "/guia", key: "guides", locale: "pt" },
  { path: "/guides", key: "guides", locale: "en" },
  { path: "/planejar-viagem", key: "planTrip", locale: "pt" },
  { path: "/plan-trip", key: "planTrip", locale: "en" },
  { path: "/ofertas", key: "offers", locale: "pt" },
  { path: "/offers", key: "offers", locale: "en" },
  { path: "/parceiros", key: "partners", locale: "pt" },
  { path: "/partners", key: "partners", locale: "en" },
  { path: "/services", key: "services", locale: "en" },
  { path: "/servicos", key: "services", locale: "pt" },
  { path: "/services/brazil-visa-consulting", key: "serviceBrazilVisa", locale: "en" },
  { path: "/hotels", key: "hotels", locale: "en" },
  { path: "/hoteis", key: "hotels", locale: "pt" },
  { path: "/flights", key: "flights", locale: "en" },
  { path: "/voos", key: "flights", locale: "pt" },
  { path: "/activities", key: "activities", locale: "en" },
  { path: "/atividades", key: "activities", locale: "pt" },
  { path: "/login", key: "login", locale: "en" },
  { path: "/entrar", key: "login", locale: "pt" },
  { path: "/register", key: "register", locale: "en" },
  { path: "/cadastro", key: "register", locale: "pt" },
  { path: "/profile", key: "profile", locale: "en" },
  { path: "/perfil", key: "profile", locale: "pt" },
  { path: "/booking-confirmation", key: "bookingConfirmation", locale: "en" },
  { path: "/confirmacao-reserva", key: "bookingConfirmation", locale: "pt" },
  { path: "/checkout", key: "checkout" },
  { path: "/checkout/success", key: "checkoutSuccess" },
  { path: "/checkout/cancel", key: "checkoutCancel" },
]

const LOCALIZED_ALIAS_PATHS: Array<{
  locale: AppLocale
  segments: string[]
  key: AppRouteKey
  params?: Record<string, string>
}> = [
  { locale: "pt", segments: ["meuperfil"], key: "profile" },
]

export function getLocalizedPath(
  locale: AppLocale,
  key: AppRouteKey,
  params?: { slug?: string },
): string {
  const segments = [...ROUTES[key][locale]]

  if (
    (key === "experienceDetail" ||
      key === "packageDetail" ||
      key === "destinationDetail" ||
      key === "guideDetail") &&
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

  const packagesRoot = ROUTES.packageDetail[locale]
  if (segments.length === packagesRoot.length + 1 && packagesRoot.every((segment, index) => segment === segments[index])) {
    return { key: "packageDetail", params: { slug: segments.at(-1)! } }
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

export function resolveLegacyRoute(pathname: string): { key: AppRouteKey; locale?: AppLocale; params?: { slug: string } } | null {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")

  const staticMatch = LEGACY_STATIC_PATHS.find((entry) => entry.path === normalized)
  if (staticMatch) {
    return staticMatch.params
      ? { key: staticMatch.key, locale: staticMatch.locale, params: { slug: staticMatch.params.slug } }
      : { key: staticMatch.key, locale: staticMatch.locale }
  }

  const dynamicPatterns = [
    { prefix: "/experiencias/", key: "experienceDetail" as const, locale: "pt" as const },
    { prefix: "/experiences/", key: "experienceDetail" as const, locale: "en" as const },
    { prefix: "/pacotes/", key: "packageDetail" as const, locale: "pt" as const },
    { prefix: "/packages/", key: "packageDetail" as const, locale: "en" as const },
    { prefix: "/paquetes/", key: "packageDetail" as const, locale: "es" as const },
    { prefix: "/forfaits/", key: "packageDetail" as const, locale: "fr" as const },
    { prefix: "/destinos/", key: "destinationDetail" as const, locale: "pt" as const },
    { prefix: "/destinations/", key: "destinationDetail" as const, locale: "en" as const },
    { prefix: "/guides/", key: "guideDetail" as const, locale: "en" as const },
    { prefix: "/guia/", key: "guideDetail" as const, locale: "pt" as const },
  ]

  for (const pattern of dynamicPatterns) {
    if (normalized.startsWith(pattern.prefix)) {
      const slug = normalized.slice(pattern.prefix.length)
      if (slug) {
        return { key: pattern.key, locale: pattern.locale, params: { slug } }
      }
    }
  }

  return null
}

export function resolveLocalizedAliasRoute(
  locale: AppLocale,
  segments: string[],
): { key: AppRouteKey; params?: { slug: string } } | null {
  const aliasMatch = LOCALIZED_ALIAS_PATHS.find(
    (entry) =>
      entry.locale === locale &&
      entry.segments.length === segments.length &&
      entry.segments.every((segment, index) => segment === segments[index]),
  )

  if (!aliasMatch) {
    return null
  }

  return aliasMatch.params
    ? { key: aliasMatch.key, params: { slug: aliasMatch.params.slug } }
    : { key: aliasMatch.key }
}

export function getLocaleFromCookie(cookieValue?: string): AppLocale {
  return isAppLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE
}
