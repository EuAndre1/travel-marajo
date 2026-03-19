import type { AppLocale } from "@/config/i18n"

export interface LocalizedPackageContent {
  title: string
  summary: string
  duration: string
  included: string[]
  itinerary: string[]
}

export interface PackageItem extends LocalizedPackageContent {
  slug: string
  startingPrice: number
  heroImage: string
  translations: Record<AppLocale, LocalizedPackageContent>
}

export type LocalizedPackageItem = PackageItem & LocalizedPackageContent

function withLegacyFields(
  slug: string,
  startingPrice: number,
  heroImage: string,
  translations: Record<AppLocale, LocalizedPackageContent>,
): PackageItem {
  const pt = translations.pt

  return {
    slug,
    startingPrice,
    heroImage,
    translations,
    title: pt.title,
    summary: pt.summary,
    duration: pt.duration,
    included: pt.included,
    itinerary: pt.itinerary,
  }
}

export const packages: PackageItem[] = [
  withLegacyFields("marajo-essencial", 1590, "/pesqueiro-1.png", {
    pt: {
      title: "Marajó Essencial 4 dias",
      summary: "Roteiro ideal para a primeira viagem, com equilíbrio entre praias, cultura local e tempo livre bem aproveitado.",
      duration: "4 dias / 3 noites",
      included: ["2 experiências guiadas", "Hospedagem boutique", "Traslado interno"],
      itinerary: [
        "Dia 1: chegada e recepção local",
        "Dia 2: experiência no Pesqueiro e pôr do sol",
        "Dia 3: circuito gastronômico e cultural",
        "Dia 4: tempo livre e retorno",
      ],
    },
    en: {
      title: "Marajo Essential 4 days",
      summary: "An ideal first journey balancing beaches, local culture, and enough free time to experience the island properly.",
      duration: "4 days / 3 nights",
      included: ["2 guided experiences", "Boutique stay", "Internal transfers"],
      itinerary: [
        "Day 1: arrival and local welcome",
        "Day 2: Pesqueiro experience and sunset",
        "Day 3: cultural and culinary circuit",
        "Day 4: free time and return",
      ],
    },
    es: {
      title: "Marajó Esencial 4 días",
      summary: "Un itinerario ideal para una primera visita, con equilibrio entre playas, cultura local y tiempo libre bien aprovechado.",
      duration: "4 días / 3 noches",
      included: ["2 experiencias guiadas", "Hospedaje boutique", "Traslados internos"],
      itinerary: [
        "Día 1: llegada y bienvenida local",
        "Día 2: experiencia en Pesqueiro y atardecer",
        "Día 3: circuito cultural y gastronómico",
        "Día 4: tiempo libre y regreso",
      ],
    },
    fr: {
      title: "Marajó Essentiel 4 jours",
      summary: "Un itinéraire idéal pour une première découverte, entre plages, culture locale et temps libre bien dosé.",
      duration: "4 jours / 3 nuits",
      included: ["2 expériences guidées", "Hébergement boutique", "Transferts internes"],
      itinerary: [
        "Jour 1 : arrivée et accueil local",
        "Jour 2 : expérience à Pesqueiro et coucher du soleil",
        "Jour 3 : circuit culturel et gastronomique",
        "Jour 4 : temps libre et retour",
      ],
    },
  }),
  withLegacyFields("marajo-slow", 2340, "/atividade-canoa.jpg", {
    pt: {
      title: "Marajó Slow 6 dias",
      summary: "Para quem quer explorar sem pressa, com mais tempo em igarapés, comunidades e paisagens tranquilas.",
      duration: "6 dias / 5 noites",
      included: ["3 experiências", "Suporte local", "Upgrade opcional"],
      itinerary: [
        "Dia 1: chegada e ambientação",
        "Dia 2: manguezais e observação de aves",
        "Dia 3: vivência cultural",
        "Dia 4: rota gastronômica",
        "Dia 5: tempo livre",
        "Dia 6: retorno",
      ],
    },
    en: {
      title: "Marajo Slow 6 days",
      summary: "For travelers who want a slower rhythm, with more time in waterways, communities, and local life.",
      duration: "6 days / 5 nights",
      included: ["3 experiences", "Local support", "Optional upgrade"],
      itinerary: [
        "Day 1: arrival and settling in",
        "Day 2: mangroves and birdwatching",
        "Day 3: cultural immersion",
        "Day 4: culinary route",
        "Day 5: free time",
        "Day 6: return",
      ],
    },
    es: {
      title: "Marajó Slow 6 días",
      summary: "Para quienes quieren explorar sin prisa, con más tiempo en igarapés, comunidades y vida local.",
      duration: "6 días / 5 noches",
      included: ["3 experiencias", "Soporte local", "Upgrade opcional"],
      itinerary: [
        "Día 1: llegada y adaptación",
        "Día 2: manglares y observación de aves",
        "Día 3: vivencia cultural",
        "Día 4: ruta gastronómica",
        "Día 5: tiempo libre",
        "Día 6: regreso",
      ],
    },
    fr: {
      title: "Marajó Slow 6 jours",
      summary: "Pour ceux qui veulent explorer sans se presser, avec plus de temps dans les igarapés, les communautés et la vie locale.",
      duration: "6 jours / 5 nuits",
      included: ["3 expériences", "Support local", "Upgrade optionnel"],
      itinerary: [
        "Jour 1 : arrivée et installation",
        "Jour 2 : mangroves et observation des oiseaux",
        "Jour 3 : immersion culturelle",
        "Jour 4 : route gastronomique",
        "Jour 5 : temps libre",
        "Jour 6 : retour",
      ],
    },
  }),
]

export function getPackageBySlug(slug: string) {
  return packages.find((item) => item.slug === slug)
}

export function getLocalizedPackage(pkg: PackageItem, locale: AppLocale): LocalizedPackageItem {
  const translated = pkg.translations[locale] ?? pkg.translations.pt

  return {
    ...pkg,
    ...translated,
  }
}
