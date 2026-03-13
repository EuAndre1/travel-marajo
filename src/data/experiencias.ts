export type ExperienceCategory =
  | "Natureza"
  | "Cultura"
  | "Gastronomia"
  | "Aventura"
  | "Família"
  | "Bem-estar"

export type ExperienceLocale = "pt" | "en" | "es" | "fr"

export interface ExperienceTranslation {
  title: string
  shortDescription: string
  fullDescription: string
  location: string
  duration: string
  highlights: string[]
  included: string[]
  category: string
}

export interface ExperienceItem {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  location: string
  duration: string
  priceFrom: number
  rating: string
  heroImage: string
  highlights: string[]
  included: string[]
  category: ExperienceCategory
  translations: Record<ExperienceLocale, ExperienceTranslation>
}

export const experiences: ExperienceItem[] = [
  {
    slug: "pesqueiro",
    title: "Praia do Pesqueiro ao pôr do sol",
    shortDescription: "O cartão-postal do Marajó com pôr do sol cinematográfico e curadoria local.",
    fullDescription:
      "A experiência mais emblemática do Marajó. Dunas baixas, mar aberto, barracas locais e búfalos integrados à paisagem criam um cenário cinematográfico para quem busca beleza e autenticidade.",
    location: "Soure • Ilha de Marajó",
    duration: "4 horas",
    priceFrom: 250,
    rating: "4,9",
    heroImage: "/pesqueiro-1.png",
    highlights: [
      "Pôr do sol sobre o Atlântico",
      "Trilhas leves com guia local",
      "Paradas para fotografia e cultura",
      "Reserva com suporte humano",
    ],
    included: ["Curadoria da experiência", "Orientação local", "Suporte pré-viagem"],
    category: "Natureza",
    translations: {
      pt: {
        title: "Praia do Pesqueiro ao pôr do sol",
        shortDescription: "O cartão-postal do Marajó com pôr do sol cinematográfico e curadoria local.",
        fullDescription:
          "A experiência mais emblemática do Marajó. Dunas baixas, mar aberto, barracas locais e búfalos integrados à paisagem criam um cenário cinematográfico para quem busca beleza e autenticidade.",
        location: "Soure • Ilha de Marajó",
        duration: "4 horas",
        highlights: [
          "Pôr do sol sobre o Atlântico",
          "Trilhas leves com guia local",
          "Paradas para fotografia e cultura",
          "Reserva com suporte humano",
        ],
        included: ["Curadoria da experiência", "Orientação local", "Suporte pré-viagem"],
        category: "Natureza",
      },
      en: {
        title: "Pesqueiro Beach at sunset",
        shortDescription: "Marajó's postcard beach with cinematic sunsets and local curation.",
        fullDescription:
          "Marajó's most iconic experience. Low dunes, open sea, local beach huts, and buffalo woven into the landscape create a cinematic setting for travelers seeking beauty and authenticity.",
        location: "Soure • Marajó Island",
        duration: "4 hours",
        highlights: [
          "Sunset over the Atlantic",
          "Easy trails with a local guide",
          "Stops for photography and culture",
          "Booking with human support",
        ],
        included: ["Experience curation", "Local orientation", "Pre-trip support"],
        category: "Nature",
      },
      es: {
        title: "Playa do Pesqueiro al atardecer",
        shortDescription: "La postal de Marajó con atardecer cinematográfico y curaduría local.",
        fullDescription:
          "La experiencia más emblemática de Marajó. Dunas bajas, mar abierto, puestos locales y búfalos integrados al paisaje crean un escenario cinematográfico para viajeros que buscan belleza y autenticidad.",
        location: "Soure • Isla de Marajó",
        duration: "4 horas",
        highlights: [
          "Atardecer sobre el Atlántico",
          "Caminatas suaves con guía local",
          "Paradas para fotografía y cultura",
          "Reserva con soporte humano",
        ],
        included: ["Curaduría de la experiencia", "Orientación local", "Soporte previo al viaje"],
        category: "Naturaleza",
      },
      fr: {
        title: "Plage de Pesqueiro au coucher du soleil",
        shortDescription: "La carte postale de Marajó avec un coucher de soleil cinématographique et une curatelle locale.",
        fullDescription:
          "L'expérience la plus emblématique de Marajó. Dunes basses, mer ouverte, paillotes locales et buffles intégrés au paysage créent un décor cinématographique pour les voyageurs en quête de beauté et d'authenticité.",
        location: "Soure • Île de Marajó",
        duration: "4 heures",
        highlights: [
          "Coucher du soleil sur l'Atlantique",
          "Balades faciles avec un guide local",
          "Arrêts pour photo et culture",
          "Réservation avec support humain",
        ],
        included: ["Curatelle de l'expérience", "Orientation locale", "Support avant le voyage"],
        category: "Nature",
      },
    },
  },
  {
    slug: "bufalos-queijaria",
    title: "Circuito dos Búfalos e Queijaria",
    shortDescription: "Vivência rural com degustação e bastidores do queijo marajoara.",
    fullDescription:
      "Passeio guiado por fazenda tradicional, com visita à produção de queijo marajoara, contato com búfalos e degustações locais em um roteiro de forte identidade cultural.",
    location: "Soure",
    duration: "5 horas",
    priceFrom: 220,
    rating: "4,9",
    heroImage: "/atividade-comunidade.jpg",
    highlights: ["Fazenda local", "Degustação de queijo", "História marajoara"],
    included: ["Guia local", "Degustação", "Transfer interno"],
    category: "Cultura",
    translations: {
      pt: {
        title: "Circuito dos Búfalos e Queijaria",
        shortDescription: "Vivência rural com degustação e bastidores do queijo marajoara.",
        fullDescription:
          "Passeio guiado por fazenda tradicional, com visita à produção de queijo marajoara, contato com búfalos e degustações locais em um roteiro de forte identidade cultural.",
        location: "Soure",
        duration: "5 horas",
        highlights: ["Fazenda local", "Degustação de queijo", "História marajoara"],
        included: ["Guia local", "Degustação", "Transfer interno"],
        category: "Cultura",
      },
      en: {
        title: "Buffalo and Marajoara cheese circuit",
        shortDescription: "A rural immersion with tastings and behind-the-scenes access to Marajoara cheese.",
        fullDescription:
          "A guided visit through a traditional farm, including Marajoara cheese production, encounters with buffalo, and local tastings in an itinerary deeply rooted in island culture.",
        location: "Soure",
        duration: "5 hours",
        highlights: ["Traditional farm", "Cheese tasting", "Marajoara heritage"],
        included: ["Local guide", "Tasting", "Internal transfer"],
        category: "Culture",
      },
      es: {
        title: "Circuito de búfalos y quesería",
        shortDescription: "Una vivencia rural con degustación y acceso al queso marajoara.",
        fullDescription:
          "Recorrido guiado por una hacienda tradicional, con visita a la producción del queso marajoara, contacto con búfalos y degustaciones locales en un itinerario de fuerte identidad cultural.",
        location: "Soure",
        duration: "5 horas",
        highlights: ["Hacienda local", "Degustación de queso", "Historia marajoara"],
        included: ["Guía local", "Degustación", "Traslado interno"],
        category: "Cultura",
      },
      fr: {
        title: "Circuit des buffles et de la fromagerie",
        shortDescription: "Une immersion rurale avec dégustation et découverte du fromage marajoara.",
        fullDescription:
          "Visite guidée d'une ferme traditionnelle, avec découverte de la production du fromage marajoara, contact avec les buffles et dégustations locales dans un itinéraire marqué par l'identité culturelle de l'île.",
        location: "Soure",
        duration: "5 heures",
        highlights: ["Ferme locale", "Dégustation de fromage", "Histoire marajoara"],
        included: ["Guide local", "Dégustation", "Transfert interne"],
        category: "Culture",
      },
    },
  },
  {
    slug: "manguezais-salvaterra",
    title: "Manguezais de Salvaterra",
    shortDescription: "Observação de aves e igarapés em um roteiro tranquilo de natureza.",
    fullDescription:
      "Um passeio de barco pelos manguezais de Salvaterra, com observação de aves, ecossistemas preservados e ritmo contemplativo.",
    location: "Salvaterra",
    duration: "3 horas",
    priceFrom: 180,
    rating: "4,8",
    heroImage: "/destino-manguezais.jpg",
    highlights: ["Barco privativo", "Observação de aves", "Natureza preservada"],
    included: ["Guia local", "Equipamentos básicos", "Seguro"],
    category: "Natureza",
    translations: {
      pt: {
        title: "Manguezais de Salvaterra",
        shortDescription: "Observação de aves e igarapés em um roteiro tranquilo de natureza.",
        fullDescription:
          "Um passeio de barco pelos manguezais de Salvaterra, com observação de aves, ecossistemas preservados e ritmo contemplativo.",
        location: "Salvaterra",
        duration: "3 horas",
        highlights: ["Barco privativo", "Observação de aves", "Natureza preservada"],
        included: ["Guia local", "Equipamentos básicos", "Seguro"],
        category: "Natureza",
      },
      en: {
        title: "Salvaterra mangroves",
        shortDescription: "Birdwatching and waterways in a calm nature-focused outing.",
        fullDescription:
          "A boat tour through Salvaterra's mangroves with birdwatching, preserved ecosystems, and a contemplative pace that suits travelers seeking immersion in nature.",
        location: "Salvaterra",
        duration: "3 hours",
        highlights: ["Private boat", "Birdwatching", "Preserved nature"],
        included: ["Local guide", "Basic equipment", "Insurance"],
        category: "Nature",
      },
      es: {
        title: "Manglares de Salvaterra",
        shortDescription: "Observación de aves y canales en una salida tranquila de naturaleza.",
        fullDescription:
          "Un paseo en barco por los manglares de Salvaterra, con observación de aves, ecosistemas preservados y un ritmo contemplativo para viajeros que buscan inmersión natural.",
        location: "Salvaterra",
        duration: "3 horas",
        highlights: ["Barco privado", "Observación de aves", "Naturaleza preservada"],
        included: ["Guía local", "Equipamiento básico", "Seguro"],
        category: "Naturaleza",
      },
      fr: {
        title: "Mangroves de Salvaterra",
        shortDescription: "Observation d'oiseaux et canaux dans une sortie nature paisible.",
        fullDescription:
          "Une promenade en bateau à travers les mangroves de Salvaterra, avec observation d'oiseaux, écosystèmes préservés et rythme contemplatif pour les voyageurs qui recherchent une immersion naturelle.",
        location: "Salvaterra",
        duration: "3 heures",
        highlights: ["Bateau privatif", "Observation d'oiseaux", "Nature préservée"],
        included: ["Guide local", "Équipement de base", "Assurance"],
        category: "Nature",
      },
    },
  },
  {
    slug: "cavalgada-praia",
    title: "Cavalgada na praia ao entardecer",
    shortDescription: "Um clássico marajoara com paisagem aberta e baixa dificuldade.",
    fullDescription:
      "Cavalgada guiada em praias amplas, com paradas estratégicas para fotos e paisagens abertas. Ideal para quem busca uma experiência autêntica.",
    location: "Soure",
    duration: "2h30",
    priceFrom: 240,
    rating: "4,9",
    heroImage: "/atividade-cavalgada.jpg",
    highlights: ["Guia local", "Paisagens amplas", "Fotogênico"],
    included: ["Cavalo preparado", "Equipamento básico", "Seguro"],
    category: "Aventura",
    translations: {
      pt: {
        title: "Cavalgada na praia ao entardecer",
        shortDescription: "Um clássico marajoara com paisagem aberta e baixa dificuldade.",
        fullDescription:
          "Cavalgada guiada em praias amplas, com paradas estratégicas para fotos e paisagens abertas. Ideal para quem busca uma experiência autêntica.",
        location: "Soure",
        duration: "2h30",
        highlights: ["Guia local", "Paisagens amplas", "Fotogênico"],
        included: ["Cavalo preparado", "Equipamento básico", "Seguro"],
        category: "Aventura",
      },
      en: {
        title: "Horseback riding on the beach at dusk",
        shortDescription: "A Marajoara classic with open landscapes and low difficulty.",
        fullDescription:
          "A guided horseback ride along wide beaches with strategic photo stops and open scenery. Ideal for travelers looking for an authentic island experience.",
        location: "Soure",
        duration: "2h30",
        highlights: ["Local guide", "Open landscapes", "Highly photogenic"],
        included: ["Prepared horse", "Basic equipment", "Insurance"],
        category: "Adventure",
      },
      es: {
        title: "Cabalgata en la playa al atardecer",
        shortDescription: "Un clásico marajoara con paisaje abierto y baja dificultad.",
        fullDescription:
          "Cabalgata guiada por playas amplias, con paradas estratégicas para fotos y paisajes abiertos. Ideal para viajeros que buscan una experiencia auténtica en la isla.",
        location: "Soure",
        duration: "2h30",
        highlights: ["Guía local", "Paisajes abiertos", "Muy fotogénico"],
        included: ["Caballo preparado", "Equipamiento básico", "Seguro"],
        category: "Aventura",
      },
      fr: {
        title: "Balade à cheval sur la plage au crépuscule",
        shortDescription: "Un classique marajoara avec paysages ouverts et faible difficulté.",
        fullDescription:
          "Balade à cheval guidée sur de vastes plages, avec arrêts stratégiques pour les photos et grands paysages. Idéale pour les voyageurs à la recherche d'une expérience authentique sur l'île.",
        location: "Soure",
        duration: "2h30",
        highlights: ["Guide local", "Paysages ouverts", "Très photogénique"],
        included: ["Cheval préparé", "Équipement de base", "Assurance"],
        category: "Aventure",
      },
    },
  },
]

export function getExperienceBySlug(slug: string) {
  return experiences.find((item) => item.slug === slug)
}

export function getLocalizedExperience(experience: ExperienceItem, lang: ExperienceLocale) {
  const translation = experience.translations[lang] ?? experience.translations.pt

  return {
    ...experience,
    ...translation,
  }
}
