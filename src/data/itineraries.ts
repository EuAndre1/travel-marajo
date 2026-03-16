import type { Itinerary } from "@/types"

export const itineraryCatalog: Itinerary[] = [
  {
    id: "iti_marajo_classic_3d",
    slug: "3-day-marajo-classic",
    title: "3 Day Marajo Classic",
    shortDescription: "A compact first-trip itinerary balancing iconic beach scenery, buffalo culture, and light logistics.",
    durationDays: 3,
    category: "classic",
    destinationSlugs: ["soure", "pesqueiro"],
    travelerFit: ["first_time", "premium_travelers"],
    budgetLevel: "midrange",
    active: true,
    featured: true,
    difficulty: "easy",
    seoTitle: "3 Day Marajo Classic Itinerary: beach, culture, and first-trip planning",
    seoDescription: "Plan a 3-day Marajo itinerary with iconic beaches, buffalo culture, practical pacing, and a booking-ready first-trip structure.",
    guideSlugs: ["marajo-itinerary-guide", "how-many-days-in-marajo", "things-to-do-in-marajo"],
    experienceSlugs: ["pesqueiro", "bufalos-queijaria"],
    partnerSlugs: ["soure-local-transfer-provider", "marajo-buffalo-farm-operator"],
    tags: ["first trip", "classic", "beach", "culture"],
    seasonalNotes: "Works best when transfer timing and sunset windows are aligned in advance.",
    bookingReadiness: "concierge_ready",
    media: {
      heroImage: "/pesqueiro-1.png",
      altByLocale: {
        en: "Classic Marajo itinerary with beach and culture",
        pt: "Roteiro classico no Marajo com praia e cultura",
      },
    },
    days: [
      {
        day: 1,
        title: "Arrival and base setup in Soure",
        summary: "Use arrival day to settle logistics, understand pacing, and prepare for the core signature experiences.",
        stops: [
          {
            title: "Arrival coordination",
            description: "Soft arrival support and transfer alignment for first-time visitors.",
            destinationSlug: "soure",
            partnerSlug: "soure-local-transfer-provider",
          },
        ],
      },
      {
        day: 2,
        title: "Signature beach and sunset route",
        summary: "Anchor the itinerary around Marajo's most iconic beach moment.",
        stops: [
          {
            title: "Pesqueiro beach experience",
            description: "Use the beach route as the visual high point of the itinerary.",
            destinationSlug: "pesqueiro",
            experienceSlug: "pesqueiro",
          },
        ],
      },
      {
        day: 3,
        title: "Buffalo culture and departure rhythm",
        summary: "Close the trip with cultural depth and a stronger understanding of island identity.",
        stops: [
          {
            title: "Buffalo farm and cheese circuit",
            description: "Add food, rural context, and destination identity before departure.",
            destinationSlug: "soure",
            experienceSlug: "bufalos-queijaria",
            partnerSlug: "marajo-buffalo-farm-operator",
          },
        ],
      },
    ],
    translations: {
      pt: {
        title: "Roteiro classico de 3 dias no Marajo",
        shortDescription: "Roteiro compacto de primeira viagem com praia iconica, cultura bufala e ritmo logistico simples.",
        seasonalNotes: "Funciona melhor quando os horarios de transfer e por do sol sao alinhados com antecedencia.",
      },
      en: {
        title: "3 Day Marajo Classic",
        shortDescription: "A compact first-trip itinerary with iconic beach, buffalo culture, and easy logistics.",
        seasonalNotes: "Works best when transfers and sunset timing are aligned in advance.",
      },
      es: {
        title: "Ruta clasica de 3 dias en Marajo",
        shortDescription: "Un itinerario compacto de primer viaje con playa iconica, cultura bufala y logistica simple.",
        seasonalNotes: "Funciona mejor cuando traslados y atardecer se alinean con anticipacion.",
      },
      fr: {
        title: "Itineraire classique de 3 jours a Marajo",
        shortDescription: "Un itineraire compact pour un premier voyage avec plage iconique, culture buffle et logistique simple.",
        seasonalNotes: "Fonctionne mieux lorsque transferts et coucher du soleil sont alignes a l'avance.",
      },
    },
  },
  {
    id: "iti_marajo_nature_5d",
    slug: "5-day-marajo-nature",
    title: "5 Day Marajo Nature",
    shortDescription: "A slower itinerary blending mangroves, boat outings, and destination context across Soure and Salvaterra.",
    durationDays: 5,
    category: "nature",
    destinationSlugs: ["soure", "salvaterra"],
    travelerFit: ["nature_lovers", "premium_travelers", "families"],
    budgetLevel: "premium",
    active: true,
    featured: true,
    difficulty: "easy",
    seoTitle: "5 Day Marajo Nature Itinerary: mangroves, boats, and slow discovery",
    seoDescription: "Discover a 5-day Marajo nature itinerary with mangroves, waterways, quieter pacing, and premium planning support.",
    guideSlugs: ["marajo-wildlife-and-nature", "how-to-visit-marajo-island", "best-time-to-visit-marajo"],
    experienceSlugs: ["manguezais-salvaterra", "boat-tour-igarapes", "pesqueiro"],
    partnerSlugs: ["marajo-river-boat-operator", "soure-eco-lodge"],
    tags: ["nature", "slow travel", "boat", "premium"],
    seasonalNotes: "Best for travelers who can adapt timing to water rhythm and weather comfort.",
    bookingReadiness: "package_ready",
    media: {
      heroImage: "/destino-manguezais.jpg",
    },
    days: [
      {
        day: 1,
        title: "Arrival and base orientation",
        summary: "Begin in Soure with a soft introduction to trip rhythm and practical planning.",
        stops: [
          {
            title: "Lodging base setup",
            description: "Use a stable base before moving into nature-led outings.",
            destinationSlug: "soure",
            partnerSlug: "soure-eco-lodge",
          },
        ],
      },
      {
        day: 2,
        title: "Water and mangrove reading",
        summary: "Shift into calmer landscapes and river-connected discovery.",
        stops: [
          {
            title: "Mangroves of Salvaterra",
            description: "Birds, waterways, and preserved ecosystems set the tone for the itinerary.",
            destinationSlug: "salvaterra",
            experienceSlug: "manguezais-salvaterra",
            partnerSlug: "marajo-river-boat-operator",
          },
        ],
      },
      {
        day: 3,
        title: "Slow boat exploration",
        summary: "Add a second water layer to deepen destination understanding.",
        stops: [
          {
            title: "Boat tour through waterways",
            description: "A contemplative route that strengthens the nature narrative.",
            destinationSlug: "salvaterra",
            experienceSlug: "boat-tour-igarapes",
            partnerSlug: "marajo-river-boat-operator",
          },
        ],
      },
      {
        day: 4,
        title: "Open landscapes and iconic visuals",
        summary: "Rebalance nature-led discovery with a flagship beach route.",
        stops: [
          {
            title: "Pesqueiro beach",
            description: "Use the island's visual signature as a strong late-itinerary contrast.",
            destinationSlug: "pesqueiro",
            experienceSlug: "pesqueiro",
          },
        ],
      },
      {
        day: 5,
        title: "Departure and planning wrap-up",
        summary: "Close with enough buffer for departure and future upsell pathways.",
        stops: [],
      },
    ],
    translations: {
      pt: {
        title: "Roteiro natureza de 5 dias no Marajo",
        shortDescription: "Roteiro mais lento com manguezais, passeios de barco e descoberta entre Soure e Salvaterra.",
        seasonalNotes: "Melhor para quem consegue adaptar o ritmo ao tempo e a dinamica da agua.",
      },
      en: {
        title: "5 Day Marajo Nature",
        shortDescription: "A slower itinerary with mangroves, boat outings, and discovery across Soure and Salvaterra.",
        seasonalNotes: "Best for travelers who can adapt pace to weather and water rhythm.",
      },
      es: {
        title: "Ruta naturaleza de 5 dias en Marajo",
        shortDescription: "Un itinerario mas lento con manglares, barcos y descubrimiento entre Soure y Salvaterra.",
        seasonalNotes: "Mejor para viajeros que pueden adaptar el ritmo al clima y al agua.",
      },
      fr: {
        title: "Itineraire nature de 5 jours a Marajo",
        shortDescription: "Un itineraire plus lent avec mangroves, sorties en bateau et decouverte entre Soure et Salvaterra.",
        seasonalNotes: "Ideal pour les voyageurs capables d'adapter le rythme a la meteo et a l'eau.",
      },
    },
  },
  {
    id: "iti_marajo_wildlife",
    slug: "marajo-wildlife-itinerary",
    title: "Marajo Wildlife Itinerary",
    shortDescription: "A planning layer focused on birdwatching, habitats, mangroves, and wildlife-led pacing.",
    durationDays: 4,
    category: "wildlife",
    destinationSlugs: ["salvaterra"],
    travelerFit: ["wildlife_seekers", "photographers", "nature_lovers"],
    budgetLevel: "premium",
    active: true,
    featured: false,
    difficulty: "moderate",
    seoTitle: "Marajo Wildlife Itinerary: birdwatching, habitats, and slow nature planning",
    seoDescription: "Plan a wildlife-focused Marajo itinerary with birdwatching, mangroves, habitat reading, and premium nature pacing.",
    guideSlugs: ["marajo-wildlife-and-nature", "best-time-to-visit-marajo"],
    experienceSlugs: ["birdwatching-marajo-fields", "manguezais-salvaterra"],
    partnerSlugs: ["salvaterra-birdwatching-guide", "marajo-river-boat-operator"],
    tags: ["wildlife", "birdwatching", "nature", "photography"],
    seasonalNotes: "Best when field timing stays flexible enough for habitat and weather conditions.",
    bookingReadiness: "inquiry_ready",
    media: {
      heroImage: "/atividade-boto.jpg",
    },
    days: [
      {
        day: 1,
        title: "Habitat orientation",
        summary: "Begin with guide-led context to frame the wildlife lens of the trip.",
        stops: [
          {
            title: "Birdwatching guide briefing",
            description: "Use specialist context before entering the field.",
            destinationSlug: "salvaterra",
            partnerSlug: "salvaterra-birdwatching-guide",
          },
        ],
      },
      {
        day: 2,
        title: "Field birdwatching expedition",
        summary: "Spend a full day in open habitats and wildlife observation windows.",
        stops: [
          {
            title: "Birdwatching expedition",
            description: "A focused outing for habitat reading and photography.",
            destinationSlug: "salvaterra",
            experienceSlug: "birdwatching-marajo-fields",
            partnerSlug: "salvaterra-birdwatching-guide",
          },
        ],
      },
      {
        day: 3,
        title: "Mangrove and water ecosystems",
        summary: "Add water-linked ecosystems to complement field observation.",
        stops: [
          {
            title: "Salvaterra mangroves",
            description: "Strengthen the wildlife narrative through river and mangrove context.",
            destinationSlug: "salvaterra",
            experienceSlug: "manguezais-salvaterra",
            partnerSlug: "marajo-river-boat-operator",
          },
        ],
      },
      {
        day: 4,
        title: "Flexible wrap-up and departure",
        summary: "Keep the final day flexible for weather, return timing, and upsell into longer nature stays.",
        stops: [],
      },
    ],
    translations: {
      pt: {
        title: "Roteiro de vida selvagem no Marajo",
        shortDescription: "Camada de planejamento focada em observacao de aves, habitats e ritmo de natureza.",
        seasonalNotes: "Melhor quando a janela de campo pode se adaptar ao clima e aos habitats.",
      },
      en: {
        title: "Marajo Wildlife Itinerary",
        shortDescription: "A planning layer focused on birdwatching, habitats, and nature pacing.",
        seasonalNotes: "Best when field windows stay flexible for weather and habitat conditions.",
      },
      es: {
        title: "Itinerario de vida silvestre en Marajo",
        shortDescription: "Una capa de planificacion centrada en aves, habitats y ritmo de naturaleza.",
        seasonalNotes: "Mejor cuando la salida de campo puede adaptarse al clima y al habitat.",
      },
      fr: {
        title: "Itineraire faune a Marajo",
        shortDescription: "Une couche de planification axee sur oiseaux, habitats et rythme nature.",
        seasonalNotes: "Ideal lorsque les sorties terrain restent flexibles selon la meteo et l'habitat.",
      },
    },
  },
  {
    id: "iti_marajo_fishing",
    slug: "marajo-fishing-itinerary",
    title: "Marajo Fishing Itinerary",
    shortDescription: "A commercially ready planning structure for travelers who want fishing as the anchor of a broader Marajo trip.",
    durationDays: 4,
    category: "fishing",
    destinationSlugs: ["soure", "salvaterra"],
    travelerFit: ["soft_adventure", "premium_travelers", "nature_lovers"],
    budgetLevel: "premium",
    active: true,
    featured: false,
    difficulty: "active",
    seoTitle: "Marajo Fishing Itinerary: sport fishing, waterways, and premium planning",
    seoDescription: "Build a Marajo fishing itinerary with sport fishing, boat support, practical logistics, and premium planning structure.",
    guideSlugs: ["how-to-visit-marajo-island", "things-to-do-in-marajo", "how-many-days-in-marajo"],
    experienceSlugs: ["pesca-esportiva-marajo", "boat-tour-igarapes"],
    partnerSlugs: ["marajo-river-boat-operator", "soure-local-transfer-provider"],
    tags: ["fishing", "water", "active", "premium"],
    seasonalNotes: "Fishing-led itineraries need flexible timing and clear expectation-setting before confirmation.",
    bookingReadiness: "inquiry_ready",
    media: {
      heroImage: "/atividade-pesca.jpg",
    },
    days: [
      {
        day: 1,
        title: "Arrival and water logistics",
        summary: "Prepare departure timing, support, and local expectations before the active portion of the trip.",
        stops: [
          {
            title: "Arrival support",
            description: "Soft logistics support for transfer and water-access readiness.",
            destinationSlug: "soure",
            partnerSlug: "soure-local-transfer-provider",
          },
        ],
      },
      {
        day: 2,
        title: "Fishing-focused day",
        summary: "Use the strongest activity block as the centerpiece of the itinerary.",
        stops: [
          {
            title: "Sport fishing experience",
            description: "A guided water-led experience for active travelers.",
            destinationSlug: "soure",
            experienceSlug: "pesca-esportiva-marajo",
            partnerSlug: "marajo-river-boat-operator",
          },
        ],
      },
      {
        day: 3,
        title: "Secondary boat layer",
        summary: "Add a complementary water route to broaden the trip beyond the fishing core.",
        stops: [
          {
            title: "Waterways boat route",
            description: "A slower complementary outing before departure windows tighten.",
            destinationSlug: "salvaterra",
            experienceSlug: "boat-tour-igarapes",
            partnerSlug: "marajo-river-boat-operator",
          },
        ],
      },
      {
        day: 4,
        title: "Departure or premium extension",
        summary: "Leave space for return logistics or extension into a broader premium package.",
        stops: [],
      },
    ],
    translations: {
      pt: {
        title: "Roteiro de pesca no Marajo",
        shortDescription: "Estrutura de planejamento para quem quer a pesca como ancora de uma viagem mais ampla.",
        seasonalNotes: "Roteiros de pesca precisam de timing flexivel e alinhamento claro de expectativa antes da confirmacao.",
      },
      en: {
        title: "Marajo Fishing Itinerary",
        shortDescription: "A planning structure for travelers who want fishing as the anchor of a broader trip.",
        seasonalNotes: "Fishing itineraries need flexible timing and clear expectation setting before confirmation.",
      },
      es: {
        title: "Itinerario de pesca en Marajo",
        shortDescription: "Una estructura de planificacion para viajeros que quieren pesca como ancla del viaje.",
        seasonalNotes: "Los itinerarios de pesca necesitan timing flexible y expectativa clara antes de confirmar.",
      },
      fr: {
        title: "Itineraire peche a Marajo",
        shortDescription: "Une structure de planification pour les voyageurs qui veulent la peche comme axe principal du voyage.",
        seasonalNotes: "Les itineraires de peche exigent un timing flexible et des attentes claires avant confirmation.",
      },
    },
  },
]
