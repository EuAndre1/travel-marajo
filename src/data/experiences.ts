import type { Experience } from "@/types"

function buildPriceLabel(priceFrom: number, currency: string) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(priceFrom)

  return `A partir de ${formatted} por pessoa`
}

function buildLegacyGallery(heroImage: string, galleryImages: string[]) {
  return [heroImage, ...galleryImages.filter((image) => image !== heroImage)]
}

export const experienceCatalog: Experience[] = [
  {
    id: "exp_pesqueiro_sunset",
    slug: "pesqueiro",
    title: "Praia do Pesqueiro ao pôr do sol",
    shortDescription: "A leitura mais clássica e desejada de Marajó, com pôr do sol forte, paisagem aberta e curadoria local.",
    category: "beach",
    destinationSlug: "pesqueiro",
    locationLabel: "Soure - Ilha de Marajó",
    duration: "4 horas",
    priceFrom: 250,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "on_request",
    partnerSlug: "soure-local-transfer-provider",
    featured: true,
    active: true,
    seoTitle: "Praia do Pesqueiro no Marajó: experiência de praia e pôr do sol",
    seoDescription:
      "Descubra a Praia do Pesqueiro com curadoria local, suporte humano e uma das experiências mais desejadas para uma primeira viagem a Marajó.",
    guideSlugs: ["things-to-do-in-marajo", "marajo-island-travel-guide", "best-time-to-visit-marajo"],
    itinerarySlugs: ["3-day-marajo-classic", "5-day-marajo-nature"],
    relatedExperienceSlugs: ["cavalgada-praia", "bufalos-queijaria"],
    tags: ["beach", "sunset", "first trip", "photography"],
    difficulty: "easy",
    travelerFit: ["first_time", "photographers", "premium_travelers"],
    media: {
      heroImage: "/pesqueiro-1.png",
      galleryImages: ["/pesqueiro-2.png", "/pesqueiro-3.png", "/pesqueiro-4.png", "/pesqueiro-5.jpg"],
      altByLocale: {
        pt: "Praia do Pesqueiro ao pôr do sol em Marajó",
        en: "Pesqueiro Beach at sunset in Marajo",
      },
    },
    translations: {
      pt: {
        title: "Praia do Pesqueiro ao pôr do sol",
        shortDescription: "A leitura mais clássica e desejada de Marajó, com pôr do sol forte, paisagem aberta e curadoria local.",
        fullDescription:
          "Uma experiência assinatura para quem quer entender o apelo visual de Marajó logo na primeira viagem. Praia ampla, apoio local e uma reserva fácil de encaixar no roteiro.",
        locationLabel: "Soure - Ilha de Marajó",
        durationLabel: "4 horas",
        highlights: ["Pôr do sol emblemático", "Paisagem aberta", "Fácil de encaixar na primeira viagem", "Suporte humano da equipe"],
        included: ["Curadoria da experiência", "Orientação local", "Suporte pré-viagem"],
      },
      en: {
        title: "Pesqueiro Beach at sunset",
        shortDescription: "Marajo's flagship beach experience with cinematic sunset, open scenery, and local curation.",
        fullDescription:
          "A signature coastal experience for travelers who want one of the island's strongest visual moments with practical local support and a booking-ready structure.",
    locationLabel: "Soure - Marajó Island",
        durationLabel: "4 hours",
        highlights: ["Signature sunset", "Open scenery", "First-trip friendly", "Human support"],
        included: ["Experience curation", "Local orientation", "Pre-trip support"],
      },
      es: {
        title: "Playa do Pesqueiro al atardecer",
        shortDescription: "La experiencia de playa mas iconica de Marajo con atardecer, paisaje abierto y curaduria local.",
        fullDescription:
          "Una experiencia clasica para quienes quieren vivir el lado mas fotografico de Marajo con apoyo local y una lectura premium del destino.",
        locationLabel: "Soure - Isla de Marajo",
        durationLabel: "4 horas",
        highlights: ["Atardecer emblematico", "Paisaje abierto", "Ideal para primer viaje", "Soporte humano"],
        included: ["Curaduria de la experiencia", "Orientacion local", "Soporte previo al viaje"],
      },
      fr: {
        title: "Plage de Pesqueiro au coucher du soleil",
        shortDescription: "L'experience de plage la plus iconique de Marajo avec coucher du soleil, paysage ouvert et curation locale.",
        fullDescription:
          "Une experience classique pour les voyageurs qui veulent vivre le cote le plus photogenique de Marajo avec accompagnement local et structure premium.",
        locationLabel: "Soure - Ile de Marajo",
        durationLabel: "4 heures",
        highlights: ["Coucher du soleil phare", "Paysage ouvert", "Facile pour un premier voyage", "Support humain"],
        included: ["Curation de l'experience", "Orientation locale", "Support avant le voyage"],
      },
    },
    ratingValue: 4.9,
  },
  {
    id: "exp_buffalo_farm",
    slug: "bufalos-queijaria",
    title: "Circuito dos búfalos e queijaria",
    shortDescription: "Vivência rural com fazenda, queijo marajoara e uma leitura mais profunda da identidade da ilha.",
    category: "culture",
    destinationSlug: "soure",
    locationLabel: "Soure",
    duration: "5 horas",
    priceFrom: 220,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "on_request",
    partnerSlug: "marajo-buffalo-farm-operator",
    featured: true,
    active: true,
    seoTitle: "Circuito de búfalos e queijo no Marajó: fazenda, cultura e sabor",
    seoDescription:
      "Conheça uma experiência rural em Marajó com queijo marajoara, cultura búfala e apoio local para viajantes que buscam identidade, sabor e contexto.",
    guideSlugs: ["marajo-buffalo-culture", "things-to-do-in-marajo", "marajo-island-travel-guide"],
    itinerarySlugs: ["3-day-marajo-classic"],
    relatedExperienceSlugs: ["pesqueiro", "cavalgada-praia"],
    tags: ["buffalo", "farm", "cheese", "culture"],
    difficulty: "easy",
    travelerFit: ["culture_seekers", "families", "premium_travelers"],
    media: {
      heroImage: "/atividade-comunidade.jpg",
      galleryImages: ["/soure-bufalo.png", "/atividade-culinaria.jpg", "/atividade-artesanato.jpg"],
      altByLocale: {
        pt: "Vivência de fazenda e queijo no Marajó",
        en: "Buffalo farm and cheese experience in Marajo",
      },
    },
    translations: {
      pt: {
        title: "Circuito dos búfalos e queijaria",
        shortDescription: "Vivência rural com fazenda, queijo marajoara e uma leitura mais profunda da identidade da ilha.",
        fullDescription:
          "Uma experiência desenhada para conectar fazenda, queijo e identidade local em um formato que combina bem com roteiros de primeira viagem e viagens guiadas por cultura.",
        locationLabel: "Soure",
        durationLabel: "5 horas",
        highlights: ["Fazenda local", "Queijo marajoara", "Leitura cultural forte", "Boa combinação com praia"],
        included: ["Guia local", "Degustação", "Transfer interno"],
      },
      en: {
        title: "Buffalo farm and cheese circuit",
        shortDescription: "A rural immersion with buffalo culture, Marajoara cheese, and strong destination context.",
        fullDescription:
          "An experience built to connect farm life, cheese production, and local identity in a format that pairs well with first-time itineraries.",
        locationLabel: "Soure",
        durationLabel: "5 hours",
        highlights: ["Working farm context", "Marajoara cheese", "Cultural depth", "Pairs well with beach routes"],
        included: ["Local guide", "Tasting", "Internal transfer"],
      },
      es: {
        title: "Circuito de bufalos y queseria",
        shortDescription: "Una inmersion rural con cultura bufala, queso marajoara y fuerte contexto del destino.",
        fullDescription:
          "Una experiencia pensada para conectar hacienda, queso e identidad local en un formato facil de combinar con un primer itinerario.",
        locationLabel: "Soure",
        durationLabel: "5 horas",
        highlights: ["Contexto de hacienda", "Queso marajoara", "Profundidad cultural", "Combina bien con playa"],
        included: ["Guia local", "Degustacion", "Traslado interno"],
      },
      fr: {
        title: "Circuit buffles et fromagerie",
        shortDescription: "Une immersion rurale avec culture buffle, fromage marajoara et fort contexte de destination.",
        fullDescription:
          "Une experience concue pour relier ferme, fromage et identite locale dans un format facile a integrer a un premier itineraire.",
        locationLabel: "Soure",
        durationLabel: "5 heures",
        highlights: ["Contexte de ferme", "Fromage marajoara", "Profondeur culturelle", "S'accorde avec la plage"],
        included: ["Guide local", "Degustation", "Transfert interne"],
      },
    },
    ratingValue: 4.9,
  },
  {
    id: "exp_salvaterra_mangroves",
    slug: "manguezais-salvaterra",
    title: "Manguezais de Salvaterra",
    shortDescription: "Saída de barco em ritmo calmo para ler rios, aves e o lado mais preservado de Marajó.",
    category: "wildlife",
    destinationSlug: "salvaterra",
    locationLabel: "Salvaterra",
    duration: "3 horas",
    priceFrom: 180,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "seasonal",
    partnerSlug: "marajo-river-boat-operator",
    featured: true,
    active: true,
    seoTitle: "Manguezais de Salvaterra: natureza, aves e passeio de barco no Marajó",
    seoDescription:
      "Explore os manguezais de Salvaterra com observação de aves, paisagem preservada e uma experiência desenhada para natureza, silêncio e descoberta.",
    guideSlugs: ["marajo-wildlife-and-nature", "best-time-to-visit-marajo", "things-to-do-in-marajo"],
    itinerarySlugs: ["5-day-marajo-nature", "marajo-wildlife-itinerary"],
    relatedExperienceSlugs: ["birdwatching-marajo-fields", "boat-tour-igarapes"],
    tags: ["mangroves", "birdwatching", "boat", "nature"],
    difficulty: "easy",
    travelerFit: ["nature_lovers", "wildlife_seekers", "photographers"],
    media: {
      heroImage: "/destino-manguezais.jpg",
      galleryImages: ["/atividade-boto.jpg", "/atividade-canoa.jpg", "/destino-salvaterra.jpg"],
      altByLocale: {
        pt: "Passeio pelos manguezais de Salvaterra",
        en: "Mangrove experience in Salvaterra",
      },
    },
    translations: {
      pt: {
        title: "Manguezais de Salvaterra",
        shortDescription: "Saída de barco em ritmo calmo para ler rios, aves e o lado mais preservado de Marajó.",
        fullDescription:
          "Uma experiência pensada para observação e contemplação, ideal para viajantes que querem ver o lado mais natural da ilha sem pressa e com bom contexto local.",
        locationLabel: "Salvaterra",
        durationLabel: "3 horas",
        highlights: ["Passeio de barco", "Observação de aves", "Natureza preservada", "Ritmo tranquilo"],
        included: ["Guia local", "Equipamento básico", "Seguro"],
      },
      en: {
        title: "Salvaterra mangroves",
        shortDescription: "A calm boat outing focused on birdlife, waterways, and preserved ecosystems.",
        fullDescription:
          "A nature-led experience for travelers who want slower observation, river landscapes, and one of the island's strongest wildlife contexts.",
        locationLabel: "Salvaterra",
        durationLabel: "3 hours",
        highlights: ["Boat outing", "Birdwatching", "Preserved ecosystems", "Calm pace"],
        included: ["Local guide", "Basic equipment", "Insurance"],
      },
      es: {
        title: "Manglares de Salvaterra",
        shortDescription: "Una salida en barco de ritmo tranquilo enfocada en aves, rios y ecosistemas preservados.",
        fullDescription:
          "Una experiencia de naturaleza pensada para viajeros que quieren observacion lenta, paisajes fluviales y uno de los contextos de fauna mas fuertes de la isla.",
        locationLabel: "Salvaterra",
        durationLabel: "3 horas",
        highlights: ["Paseo en barco", "Observacion de aves", "Ecosistemas preservados", "Ritmo tranquilo"],
        included: ["Guia local", "Equipamiento basico", "Seguro"],
      },
      fr: {
        title: "Mangroves de Salvaterra",
        shortDescription: "Une sortie en bateau paisible orientee vers les oiseaux, les rivieres et les ecosystemes preserves.",
        fullDescription:
          "Une experience nature pour les voyageurs qui veulent observation lente, paysages fluviaux et l'un des meilleurs contextes faune de l'ile.",
        locationLabel: "Salvaterra",
        durationLabel: "3 heures",
        highlights: ["Sortie en bateau", "Observation d'oiseaux", "Ecosystemes preserves", "Rythme calme"],
        included: ["Guide local", "Equipement de base", "Assurance"],
      },
    },
    ratingValue: 4.8,
  },
  {
    id: "exp_horseback_beach",
    slug: "cavalgada-praia",
    title: "Cavalgada na praia ao entardecer",
    shortDescription: "Uma experiência clássica de Marajó que combina cavalo, praia aberta e um dos cenários mais fotogênicos da ilha.",
    category: "horseback",
    destinationSlug: "soure",
    locationLabel: "Soure",
    duration: "2h30",
    priceFrom: 240,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "on_request",
    partnerSlug: "soure-eco-lodge",
    featured: true,
    active: true,
    seoTitle: "Cavalgada na praia no Marajó: experiência a cavalo e paisagem aberta",
    seoDescription:
      "Planeje uma cavalgada na praia em Marajó com paisagem aberta, leitura cultural do destino e uma experiência fotogênica de baixa dificuldade.",
    guideSlugs: ["marajo-horseback-experience", "best-time-to-visit-marajo", "things-to-do-in-marajo"],
    itinerarySlugs: ["3-day-marajo-classic"],
    relatedExperienceSlugs: ["pesqueiro", "bufalos-queijaria"],
    tags: ["horseback", "beach", "sunset", "soft adventure"],
    difficulty: "moderate",
    travelerFit: ["soft_adventure", "photographers", "premium_travelers"],
    media: {
      heroImage: "/atividade-cavalgada.jpg",
      galleryImages: ["/destino-pesqueiro.jpg", "/pesqueiro-4.png", "/soure-bufalo.png"],
      altByLocale: {
        pt: "Cavalgada na praia no Marajó",
        en: "Horseback ride on the beach in Marajo",
      },
    },
    translations: {
      pt: {
        title: "Cavalgada na praia ao entardecer",
        shortDescription: "Uma experiência clássica de Marajó que combina cavalo, praia aberta e um dos cenários mais fotogênicos da ilha.",
        fullDescription:
          "Uma saída guiada para quem quer paisagem ampla, movimento leve e uma leitura autêntica da relação entre campo, praia e cultura marajoara.",
        locationLabel: "Soure",
        durationLabel: "2h30",
        highlights: ["Praia aberta", "Apelo fotográfico", "Ritmo acessível", "Leitura do território"],
        included: ["Cavalo preparado", "Equipamento básico", "Seguro"],
      },
      en: {
        title: "Horseback ride on the beach at dusk",
        shortDescription: "A classic Marajo outing with horses, open beach scenery, and strong visual appeal.",
        fullDescription:
          "A guided ride designed for travelers who want open landscapes, gentle movement, and a stronger sense of the island's ranch-and-beach identity.",
        locationLabel: "Soure",
        durationLabel: "2h30",
        highlights: ["Open beach scenery", "Photogenic route", "Accessible pace", "Territory context"],
        included: ["Prepared horse", "Basic equipment", "Insurance"],
      },
      es: {
        title: "Cabalgata en la playa al atardecer",
        shortDescription: "Una salida clasica de Marajo con caballo, playa abierta y fuerte atractivo visual.",
        fullDescription:
          "Una cabalgata guiada pensada para viajeros que quieren paisaje amplio, movimiento suave y una mejor lectura del territorio de campo y playa.",
        locationLabel: "Soure",
        durationLabel: "2h30",
        highlights: ["Playa abierta", "Ruta fotogenica", "Ritmo accesible", "Contexto del territorio"],
        included: ["Caballo preparado", "Equipamiento basico", "Seguro"],
      },
      fr: {
        title: "Balade a cheval sur la plage au crepuscule",
        shortDescription: "Une sortie classique de Marajo avec cheval, plage ouverte et fort impact visuel.",
        fullDescription:
          "Une balade guidee pour les voyageurs qui veulent paysage ouvert, mouvement doux et meilleure lecture du territoire entre ranch et plage.",
        locationLabel: "Soure",
        durationLabel: "2h30",
        highlights: ["Plage ouverte", "Parcours photogenique", "Rythme accessible", "Contexte du territoire"],
        included: ["Cheval prepare", "Equipement de base", "Assurance"],
      },
    },
    ratingValue: 4.9,
  },
  {
    id: "exp_birdwatching_fields",
    slug: "birdwatching-marajo-fields",
    title: "Expedição de observação de aves",
    shortDescription: "Saída de campo focada em aves, paisagem aberta e fotografia para quem quer o lado mais selvagem da ilha.",
    category: "wildlife",
    destinationSlug: "salvaterra",
    locationLabel: "Salvaterra e campos alagados",
    duration: "4h30",
    priceFrom: 260,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "seasonal",
    partnerSlug: "salvaterra-birdwatching-guide",
    featured: false,
    active: true,
    seoTitle: "Birdwatching no Marajó: expedição de observação de aves e natureza",
    seoDescription:
      "Planeje uma expedição de birdwatching em Marajó com foco em habitats abertos, fotografia e leitura de natureza com apoio local.",
    guideSlugs: ["marajo-wildlife-and-nature", "best-time-to-visit-marajo"],
    itinerarySlugs: ["marajo-wildlife-itinerary", "5-day-marajo-nature"],
    relatedExperienceSlugs: ["manguezais-salvaterra", "boat-tour-igarapes"],
    tags: ["birdwatching", "wildlife", "photography", "nature"],
    difficulty: "moderate",
    travelerFit: ["wildlife_seekers", "nature_lovers", "photographers"],
    media: {
      heroImage: "/atividade-boto.jpg",
      galleryImages: ["/destino-manguezais.jpg", "/atividade-trilha.jpg", "/atividade-canoa.jpg"],
    },
    translations: {
      pt: {
        title: "Expedição de observação de aves",
        shortDescription: "Saída de campo focada em aves, paisagem aberta e fotografia para quem quer o lado mais selvagem da ilha.",
        fullDescription:
          "Uma experiência para viajantes que priorizam natureza, observação e tempo de leitura de habitat antes de transformar a viagem em um roteiro mais amplo e bem desenhado.",
        locationLabel: "Salvaterra e campos alagados",
        durationLabel: "4h30",
        highlights: ["Habitats abertos", "Leitura de fauna", "Boa para fotografia", "Saída curada"],
        included: ["Guia local", "Janela recomendada", "Suporte pré-viagem"],
      },
      en: {
        title: "Birdwatching expedition",
        shortDescription: "A field outing focused on birds, open landscapes, and nature photography in Marajo.",
        fullDescription:
          "A curated nature experience for travelers who prioritize habitat reading, patient observation, and a stronger wildlife layer in their itinerary.",
        locationLabel: "Salvaterra and flooded fields",
        durationLabel: "4h30",
        highlights: ["Open habitats", "Wildlife reading", "Strong for photography", "Curated outing"],
        included: ["Local guide", "Recommended time window", "Pre-trip support"],
      },
      es: {
        title: "Expedicion de observacion de aves",
        shortDescription: "Una salida de campo enfocada en aves, paisaje abierto y fotografia de naturaleza en Marajo.",
        fullDescription:
          "Una experiencia curada para viajeros que priorizan lectura de habitat, observacion paciente y una capa de fauna mas fuerte en el itinerario.",
        locationLabel: "Salvaterra y campos inundables",
        durationLabel: "4h30",
        highlights: ["Habitats abiertos", "Lectura de fauna", "Fuerte para fotografia", "Salida curada"],
        included: ["Guia local", "Ventana horaria recomendada", "Soporte previo al viaje"],
      },
      fr: {
        title: "Expedition d'observation des oiseaux",
        shortDescription: "Une sortie de terrain axee sur les oiseaux, les paysages ouverts et la photographie nature a Marajo.",
        fullDescription:
          "Une experience nature pour les voyageurs qui priorisent lecture d'habitat, observation patiente et une couche faune plus forte dans l'itineraire.",
        locationLabel: "Salvaterra et champs inondables",
        durationLabel: "4h30",
        highlights: ["Habitats ouverts", "Lecture de la faune", "Fort potentiel photo", "Sortie curee"],
        included: ["Guide local", "Fenetre horaire recommandee", "Support avant le voyage"],
      },
    },
    ratingValue: 4.8,
  },
  {
    id: "exp_boat_igarapes",
    slug: "boat-tour-igarapes",
    title: "Passeio de barco por igarapés",
    shortDescription: "Uma saída leve de barco para entender rios, canais e o ritmo mais contemplativo de Marajó.",
    category: "boat",
    destinationSlug: "salvaterra",
    locationLabel: "Salvaterra",
    duration: "3h30",
    priceFrom: 210,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "on_request",
    partnerSlug: "marajo-river-boat-operator",
    featured: false,
    active: true,
    seoTitle: "Passeio de barco nos igarapés do Marajó: rios, paisagem e descoberta lenta",
    seoDescription:
      "Descubra um passeio de barco pelos igarapés de Marajó com foco em paisagem, ritmo calmo e combinação inteligente com roteiros de natureza.",
    guideSlugs: ["how-to-visit-marajo-island", "marajo-wildlife-and-nature"],
    itinerarySlugs: ["5-day-marajo-nature", "marajo-fishing-itinerary"],
    relatedExperienceSlugs: ["manguezais-salvaterra", "birdwatching-marajo-fields"],
    tags: ["boat", "river", "nature", "slow travel"],
    difficulty: "easy",
    travelerFit: ["first_time", "nature_lovers", "families"],
    media: {
      heroImage: "/atividade-canoa.jpg",
      galleryImages: ["/destino-manguezais.jpg", "/atividade-boto.jpg", "/destino-salvaterra.jpg"],
    },
    translations: {
      pt: {
        title: "Passeio de barco por igarapés",
        shortDescription: "Uma saída leve de barco para entender rios, canais e o ritmo mais contemplativo de Marajó.",
        fullDescription:
          "Uma experiência pensada para quem quer navegar sem pressa, entender o território de água e combinar a saída com outros momentos fortes de natureza.",
        locationLabel: "Salvaterra",
        durationLabel: "3h30",
        highlights: ["Ritmo contemplativo", "Boa combinação com natureza", "Leitura de rios", "Saída acessível"],
        included: ["Barco local", "Guia", "Orientações gerais"],
      },
      en: {
        title: "Boat tour through waterways",
        shortDescription: "A light boat outing designed to read rivers, channels, and the slower rhythm of Marajo.",
        fullDescription:
          "A curated boat experience for travelers who want to understand the water landscape and combine it with broader nature-led planning.",
        locationLabel: "Salvaterra",
        durationLabel: "3h30",
        highlights: ["Contemplative pace", "Pairs with nature planning", "River reading", "Accessible outing"],
        included: ["Local boat", "Guide", "General orientation"],
      },
      es: {
        title: "Paseo en barco por canales",
        shortDescription: "Una salida ligera en barco para leer rios, canales y el ritmo mas lento de Marajo.",
        fullDescription:
          "Una experiencia curada para viajeros que quieren entender el paisaje de agua y combinarlo con una planificacion de naturaleza mas amplia.",
        locationLabel: "Salvaterra",
        durationLabel: "3h30",
        highlights: ["Ritmo contemplativo", "Combina con naturaleza", "Lectura de rios", "Salida accesible"],
        included: ["Barco local", "Guia", "Orientaciones generales"],
      },
      fr: {
        title: "Sortie en bateau sur les canaux",
        shortDescription: "Une sortie legere en bateau pour lire rivieres, canaux et le rythme plus lent de Marajo.",
        fullDescription:
          "Une experience curee pour les voyageurs qui veulent comprendre le paysage d'eau et le combiner a une planification nature plus large.",
        locationLabel: "Salvaterra",
        durationLabel: "3h30",
        highlights: ["Rythme contemplatif", "S'accorde avec la nature", "Lecture des rivieres", "Sortie accessible"],
        included: ["Bateau local", "Guide", "Orientation generale"],
      },
    },
    ratingValue: 4.7,
  },
  {
    id: "exp_fishing_marajo",
    slug: "pesca-esportiva-marajo",
    title: "Experiência de pesca esportiva",
    shortDescription: "Saída orientada para pesca e leitura de água com apoio local para viajantes que buscam atividade com contexto.",
    category: "fishing",
    destinationSlug: "soure",
    locationLabel: "Soure e arredores",
    duration: "6 horas",
    priceFrom: 320,
    currency: "BRL",
    bookingMode: "direct_checkout",
    availabilityMode: "seasonal",
    partnerSlug: "marajo-river-boat-operator",
    featured: false,
    active: true,
    seoTitle: "Pesca esportiva no Marajó: experiência de água e curadoria local",
    seoDescription:
      "Planeje uma experiência de pesca esportiva em Marajó com apoio local, leitura de água, ritmo ajustado e integração com roteiros premium.",
    guideSlugs: ["things-to-do-in-marajo", "how-to-visit-marajo-island"],
    itinerarySlugs: ["marajo-fishing-itinerary"],
    relatedExperienceSlugs: ["boat-tour-igarapes", "pesqueiro"],
    tags: ["fishing", "boat", "water", "outdoor"],
    difficulty: "active",
    travelerFit: ["soft_adventure", "premium_travelers", "nature_lovers"],
    media: {
      heroImage: "/atividade-pesca.jpg",
      galleryImages: ["/atividade-canoa.jpg", "/destino-soure.jpg", "/pesqueiro-2.png"],
    },
    translations: {
      pt: {
        title: "Experiência de pesca esportiva",
        shortDescription: "Saída orientada para pesca e leitura de água com apoio local para viajantes que buscam atividade com contexto.",
        fullDescription:
          "Uma experiência forte para perfis que querem atividade, água e acompanhamento local sem transformar a viagem em uma operação complexa.",
        locationLabel: "Soure e arredores",
        durationLabel: "6 horas",
        highlights: ["Saída focada", "Leitura de água", "Apoio local", "Boa para perfis ativos"],
        included: ["Guia local", "Apoio operacional básico", "Orientações de saída"],
      },
      en: {
        title: "Sport fishing experience",
        shortDescription: "A guided fishing outing with local support, water reading, and premium positioning.",
        fullDescription:
          "A commercially strong experience for travelers who want activity, water access, and local coordination without turning the trip into a complex expedition.",
        locationLabel: "Soure and surroundings",
        durationLabel: "6 hours",
        highlights: ["Focused outing", "Water reading", "Local support", "Strong for active travelers"],
        included: ["Local guide", "Basic operational support", "Departure orientation"],
      },
      es: {
        title: "Experiencia de pesca deportiva",
        shortDescription: "Una salida guiada de pesca con apoyo local, lectura de agua y posicionamiento premium.",
        fullDescription:
          "Una experiencia comercialmente fuerte para viajeros que quieren actividad, agua y coordinacion local sin convertir el viaje en una expedicion compleja.",
        locationLabel: "Soure y alrededores",
        durationLabel: "6 horas",
        highlights: ["Salida enfocada", "Lectura de agua", "Apoyo local", "Fuerte para viajeros activos"],
        included: ["Guia local", "Apoyo operacional basico", "Orientacion de salida"],
      },
      fr: {
        title: "Experience de peche sportive",
        shortDescription: "Une sortie guidee de peche avec support local, lecture de l'eau et positionnement premium.",
        fullDescription:
          "Une experience commercialement forte pour les voyageurs qui veulent activite, eau et coordination locale sans expedition complexe.",
        locationLabel: "Soure et alentours",
        durationLabel: "6 heures",
        highlights: ["Sortie ciblee", "Lecture de l'eau", "Support local", "Forte pour profils actifs"],
        included: ["Guide local", "Support operationnel de base", "Orientation de depart"],
      },
    },
    ratingValue: 4.7,
  },
]

export const experiences = Object.fromEntries(
  experienceCatalog.map((experience) => [
    experience.slug,
    {
      slug: experience.slug,
      title: experience.title,
      location: experience.locationLabel,
      price: buildPriceLabel(experience.priceFrom, experience.currency),
      heroImage: experience.media.heroImage,
      images: buildLegacyGallery(experience.media.heroImage, experience.media.galleryImages),
      description: experience.shortDescription,
      highlights: experience.translations.pt.highlights,
      included: experience.translations.pt.included,
    },
  ]),
) as Record<
  string,
  {
    slug: string
    title: string
    location: string
    price: string
    heroImage: string
    images: string[]
    description: string
    highlights: string[]
    included: string[]
  }
>

export type ExperienceKey = keyof typeof experiences
