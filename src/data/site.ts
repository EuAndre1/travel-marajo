import type { AppLocale } from "@/config/i18n"
import type { StaticRouteKey } from "@/i18n/routing"

type ChromeLink = {
  label: string
  route: StaticRouteKey
}

type FooterColumn = {
  title: string
  links: ChromeLink[]
}

type SiteChromeContent = {
  brandName: string
  brandTagline: string
  authorityLabel: string
  languageLabel: string
  signInLabel: string
  signOutLabel: string
  profileLabel: string
  planTripLabel: string
  bookDirectLabel: string
  mainNav: ChromeLink[]
  footerHeadline: string
  footerDescription: string
  footerHighlights: string[]
  footerColumns: FooterColumn[]
  footerContactTitle: string
  footerLegalLabel: string
}

type HomeAuthorityCard = {
  eyebrow: string
  title: string
  description: string
  route: StaticRouteKey | "guideDetail"
  slug?: string
}

type HomeAuthorityContent = {
  trustStripLabel: string
  heroPlannerEyebrow: string
  heroPlannerTitle: string
  heroPlannerBody: string
  heroPlannerHighlights: string[]
  planningEyebrow: string
  planningTitle: string
  planningSubtitle: string
  planningCards: HomeAuthorityCard[]
  planningPrimaryLabel: string
  planningSecondaryLabel: string
  conciergeEyebrow: string
  conciergeTitle: string
  conciergeSubtitle: string
  conciergeHighlights: string[]
  conciergePrimaryLabel: string
  conciergeSecondaryLabel: string
  finalEyebrow: string
  finalTitle: string
  finalSubtitle: string
  finalPrimaryLabel: string
  finalSecondaryLabel: string
}

export const siteChrome: Record<AppLocale, SiteChromeContent> = {
  pt: {
    brandName: "Travel Marajó",
    brandTagline: "Gateway global de Marajó",
    authorityLabel: "Autoridade editorial, descoberta premium e reserva com suporte local",
    languageLabel: "Idioma",
    signInLabel: "Entrar",
    signOutLabel: "Sair",
    profileLabel: "Mochila do viajante",
    planTripLabel: "Planejar viagem",
    bookDirectLabel: "Reservar direto",
    mainNav: [
      { label: "Descobrir Marajó", route: "destinations" },
      { label: "Experiências", route: "experiences" },
      { label: "Pacotes", route: "packages" },
      { label: "Planejar viagem", route: "planTrip" },
      { label: "Diário de viagem", route: "guides" },
      { label: "Parceiros", route: "partners" },
    ],
    footerHeadline: "Travel Marajó apresenta Marajó ao mundo com confiança editorial e prontidão para reserva.",
    footerDescription:
      "A plataforma que apresenta Marajó ao mundo com curadoria premium, contexto editorial e confiança para planejar, reservar ou pedir suporte humano.",
    footerHighlights: [
      "Descoberta de destino com contexto real",
      "Curadoria local com confiança internacional",
      "Planejamento, reserva e concierge no mesmo fluxo",
    ],
    footerColumns: [
      {
        title: "Descobrir",
        links: [
          { label: "Marajó", route: "destinations" },
          { label: "Experiências", route: "experiences" },
          { label: "Pacotes", route: "packages" },
          { label: "Diário de viagem", route: "guides" },
        ],
      },
      {
        title: "Planejamento",
        links: [
          { label: "Planejar viagem", route: "planTrip" },
          { label: "Serviços", route: "services" },
          { label: "Hotéis", route: "hotels" },
          { label: "Voos", route: "flights" },
        ],
      },
      {
        title: "Conta",
        links: [
          { label: "Entrar", route: "login" },
          { label: "Cadastro", route: "register" },
          { label: "Mochila do viajante", route: "profile" },
          { label: "Parceiros", route: "partners" },
        ],
      },
    ],
    footerContactTitle: "Contato",
    footerLegalLabel: "Todos os direitos reservados.",
  },
  en: {
    brandName: "Travel Marajó",
    brandTagline: "Global gateway to Marajo",
    authorityLabel: "Editorial authority, premium discovery, and booking confidence with local support",
    languageLabel: "Language",
    signInLabel: "Sign in",
    signOutLabel: "Sign out",
    profileLabel: "Traveller's Backpack",
    planTripLabel: "Plan trip",
    bookDirectLabel: "Book direct",
    mainNav: [
      { label: "Discover Marajo", route: "destinations" },
      { label: "Experiences", route: "experiences" },
      { label: "Packages", route: "packages" },
      { label: "Plan your trip", route: "planTrip" },
      { label: "Travel Journal", route: "guides" },
      { label: "Partners", route: "partners" },
    ],
    footerHeadline: "Travel Marajó introduces Marajo to the world with editorial confidence and booking readiness.",
    footerDescription:
      "The platform introducing Marajo to the world through premium curation, destination intelligence, and direct booking confidence.",
    footerHighlights: [
      "Destination discovery with real context",
      "Local curation with international confidence",
      "Planning, booking, and concierge in one flow",
    ],
    footerColumns: [
      {
        title: "Discover",
        links: [
          { label: "Discover Marajo", route: "destinations" },
          { label: "Experiences", route: "experiences" },
          { label: "Packages", route: "packages" },
          { label: "Travel Journal", route: "guides" },
        ],
      },
      {
        title: "Planning",
        links: [
          { label: "Plan trip", route: "planTrip" },
          { label: "Services", route: "services" },
          { label: "Hotels", route: "hotels" },
          { label: "Flights", route: "flights" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Sign in", route: "login" },
          { label: "Register", route: "register" },
          { label: "Traveller's Backpack", route: "profile" },
          { label: "Partners", route: "partners" },
        ],
      },
    ],
    footerContactTitle: "Contact",
    footerLegalLabel: "All rights reserved.",
  },
  es: {
    brandName: "Travel Marajó",
    brandTagline: "Puerta global a Marajo",
    authorityLabel: "Autoridad editorial, descubrimiento premium y reserva con soporte local",
    languageLabel: "Idioma",
    signInLabel: "Acceso",
    signOutLabel: "Salir",
    profileLabel: "Mochila del viajero",
    planTripLabel: "Planificar viaje",
    bookDirectLabel: "Reservar directo",
    mainNav: [
      { label: "Descubrir Marajo", route: "destinations" },
      { label: "Experiências", route: "experiences" },
      { label: "Paquetes", route: "packages" },
      { label: "Planificar viaje", route: "planTrip" },
      { label: "Diario de viaje", route: "guides" },
      { label: "Socios", route: "partners" },
    ],
    footerHeadline: "Travel Marajó presenta Marajo al mundo con autoridad editorial y confianza para reservar.",
    footerDescription:
      "La plataforma que presenta Marajo al mundo con curaduria premium, contexto editorial y confianza para planificar o reservar.",
    footerHighlights: [
      "Descubrimiento del destino con contexto real",
      "Curaduria local con confianza internacional",
      "Planificacion, reserva y concierge en un mismo flujo",
    ],
    footerColumns: [
      {
        title: "Descubrir",
        links: [
          { label: "Descubrir Marajo", route: "destinations" },
          { label: "Experiências", route: "experiences" },
          { label: "Paquetes", route: "packages" },
          { label: "Diario de viaje", route: "guides" },
        ],
      },
      {
        title: "Planificacion",
        links: [
          { label: "Planificar viaje", route: "planTrip" },
          { label: "Servicios", route: "services" },
          { label: "Hoteles", route: "hotels" },
          { label: "Vuelos", route: "flights" },
        ],
      },
      {
        title: "Cuenta",
        links: [
          { label: "Acceso", route: "login" },
          { label: "Registro", route: "register" },
          { label: "Mochila del viajero", route: "profile" },
          { label: "Socios", route: "partners" },
        ],
      },
    ],
    footerContactTitle: "Contacto",
    footerLegalLabel: "Todos los derechos reservados.",
  },
  fr: {
    brandName: "Travel Marajó",
    brandTagline: "Portail mondial vers Marajo",
    authorityLabel: "Autorite editoriale, decouverte premium et reservation avec support local",
    languageLabel: "Langue",
    signInLabel: "Connexion",
    signOutLabel: "Deconnexion",
    profileLabel: "Sac du voyageur",
    planTripLabel: "Planifier voyage",
    bookDirectLabel: "Reserver en direct",
    mainNav: [
      { label: "Decouvrir Marajo", route: "destinations" },
      { label: "Experiences", route: "experiences" },
      { label: "Forfaits", route: "packages" },
      { label: "Planifier voyage", route: "planTrip" },
      { label: "Journal de voyage", route: "guides" },
      { label: "Partenaires", route: "partners" },
    ],
    footerHeadline: "Travel Marajó presente Marajo au monde avec autorite editoriale et confiance pour reserver.",
    footerDescription:
      "La plateforme qui presente Marajo au monde grace a une curation premium, une vraie autorite destination et une reservation plus rassurante.",
    footerHighlights: [
      "Decouverte destination avec vrai contexte",
      "Curation locale avec confiance internationale",
      "Planification, reservation et concierge dans un meme flux",
    ],
    footerColumns: [
      {
        title: "Decouvrir",
        links: [
          { label: "Decouvrir Marajo", route: "destinations" },
          { label: "Experiences", route: "experiences" },
          { label: "Forfaits", route: "packages" },
          { label: "Journal de voyage", route: "guides" },
        ],
      },
      {
        title: "Planification",
        links: [
          { label: "Planifier voyage", route: "planTrip" },
          { label: "Services", route: "services" },
          { label: "Hotels", route: "hotels" },
          { label: "Vols", route: "flights" },
        ],
      },
      {
        title: "Compte",
        links: [
          { label: "Connexion", route: "login" },
          { label: "Inscription", route: "register" },
          { label: "Sac du voyageur", route: "profile" },
          { label: "Partenaires", route: "partners" },
        ],
      },
    ],
    footerContactTitle: "Contact",
    footerLegalLabel: "Tous droits reserves.",
  },
}

export const footerContact = {
  items: [
    "contato@travelmarajo.com",
    "+55 91 99999-0000",
    "Soure, Ilha de Marajó - PA",
  ],
  legal: {
    cnpj: "00.000.000/0001-00",
    cadastur: "26.012747.10.0001-6",
  },
}

export const homeAuthorityContent: Record<AppLocale, HomeAuthorityContent> = {
  pt: {
    trustStripLabel: "Curadoria local, reserva segura e suporte humano",
    heroPlannerEyebrow: "Planejamento premium",
    heroPlannerTitle: "Travel Marajó é a forma mais clara de descobrir, planejar e reservar o melhor da ilha.",
    heroPlannerBody:
      "Saia da curiosidade e entre em um roteiro viável com contexto editorial, parceiros verificados e assistência local em cada etapa.",
    heroPlannerHighlights: [
      "Compare experiências, pacotes e planejamento assistido com mais clareza",
      "Receba suporte local antes, durante e depois da viagem",
      "Use o travel journal para decidir com mais confiança",
    ],
    planningEyebrow: "Planeje com contexto real",
    planningTitle: "Planeje Marajó com a mesma clareza de um especialista local",
    planningSubtitle:
      "Superfícies editoriais e práticas pensadas para quem precisa entender acesso, melhor época, base da viagem e desenho de roteiro antes de reservar.",
    planningCards: [
      {
        eyebrow: "Como chegar",
        title: "Entenda a rota até Marajó",
        description: "Logística a partir de Belém, escolha da base e sequência de deslocamentos.",
        route: "guideDetail",
        slug: "how-to-visit-marajo-island",
      },
      {
        eyebrow: "Melhor época",
        title: "Escolha a temporada certa",
        description: "Compare clima, conforto, paisagem e timing das experiências.",
        route: "guideDetail",
        slug: "best-time-to-visit-marajo",
      },
      {
        eyebrow: "Hospedagem",
        title: "Descubra onde ficar",
        description: "Use a página de hotéis para comparar estilo de estadia, base e apoio local.",
        route: "hotels",
      },
      {
        eyebrow: "Roteiro",
        title: "Monte um itinerário mais forte",
        description: "Veja como combinar praia, cultura, natureza e ritmo da viagem.",
        route: "guideDetail",
        slug: "marajo-itinerary-guide",
      },
    ],
    planningPrimaryLabel: "Planejar com especialista local",
    planningSecondaryLabel: "Explorar o travel journal",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Quando a viagem exige mais contexto, nosso concierge encurta o caminho até a reserva",
    conciergeSubtitle:
      "Para combinar logística, temporada, hospedagem e experiências sem ruído, o suporte humano ajuda você a decidir com segurança e rapidez.",
    conciergeHighlights: [
      "Orientação antes, durante e depois da viagem",
      "Suporte para experiências, pacotes e desenho do roteiro",
      "Atendimento local com perspectiva internacional",
    ],
    conciergePrimaryLabel: "Falar com especialista local",
    conciergeSecondaryLabel: "Ir para planejamento da viagem",
    finalEyebrow: "Pronto para avançar",
    finalTitle: "Descubra Marajó com mais clareza. Reserve com mais confiança.",
    finalSubtitle:
      "Escolha entre reservar experiências agora ou falar com um especialista local para montar a viagem completa.",
    finalPrimaryLabel: "Reservar direto",
    finalSecondaryLabel: "Falar com especialista local",
  },
  en: {
    trustStripLabel: "Local curation, secure booking, and human support",
    heroPlannerEyebrow: "Premium planning",
    heroPlannerTitle: "Travel Marajo is the clearest way to discover, plan, and book the best of the island.",
    heroPlannerBody:
      "Move from curiosity into a workable itinerary with destination intelligence, verified partners, and local assistance at every step.",
    heroPlannerHighlights: [
      "Compare experiences, packages, and assisted planning with more clarity",
      "Access local support before, during, and after the trip",
      "Use the travel journal to decide with more confidence",
    ],
    planningEyebrow: "Plan with real context",
    planningTitle: "Plan Marajo with the clarity of a trusted local specialist",
    planningSubtitle:
      "Editorial and practical surfaces designed for travelers who need to understand access, seasonality, base selection, and itinerary design before they book.",
    planningCards: [
      {
        eyebrow: "How to get there",
        title: "Understand the route to Marajo",
        description: "Gateway logistics from Belem, base selection, and how movement on the island really works.",
        route: "guideDetail",
        slug: "how-to-visit-marajo-island",
      },
      {
        eyebrow: "Best season",
        title: "Choose the right timing",
        description: "Compare climate, comfort, scenery, and when key experiences feel strongest.",
        route: "guideDetail",
        slug: "best-time-to-visit-marajo",
      },
      {
        eyebrow: "Where to stay",
        title: "Compare the best bases",
        description: "Use the hotels area to evaluate stay style, base selection, and local support.",
        route: "hotels",
      },
      {
        eyebrow: "Itinerary",
        title: "Build a stronger island route",
        description: "See how to combine beach, culture, nature, and pacing into one trip.",
        route: "guideDetail",
        slug: "marajo-itinerary-guide",
      },
    ],
    planningPrimaryLabel: "Plan with a local specialist",
    planningSecondaryLabel: "Explore the travel journal",
    conciergeEyebrow: "Local concierge",
    conciergeTitle: "When the trip requires more context, our concierge shortens the path to booking",
    conciergeSubtitle:
      "When logistics, timing, stays, and curated experiences need to work together, human guidance helps travelers decide with more speed and confidence.",
    conciergeHighlights: [
      "Guidance before, during, and after the journey",
      "Support for experiences, packages, and trip design",
      "Local delivery with international-facing communication",
    ],
    conciergePrimaryLabel: "Talk to a local travel specialist",
    conciergeSecondaryLabel: "Go to trip planning",
    finalEyebrow: "Ready to move",
    finalTitle: "Discover Marajo with more clarity. Book with more confidence.",
    finalSubtitle:
      "Choose between booking experiences now or talking to a local specialist to shape the fuller journey.",
    finalPrimaryLabel: "Book direct",
    finalSecondaryLabel: "Talk to a local specialist",
  },
  es: {
    trustStripLabel: "Curaduria local, reserva segura y soporte humano",
    heroPlannerEyebrow: "Planificacion premium",
    heroPlannerTitle: "Travel Marajo es la forma mas clara de descubrir, planificar y reservar lo mejor de la isla.",
    heroPlannerBody:
      "Pasa de la curiosidad a un itinerario viable con inteligencia de destino, socios verificados y asistencia local en cada etapa.",
    heroPlannerHighlights: [
      "Compara experiencias, paquetes y planificacion asistida con mas claridad",
      "Accede a soporte local antes, durante y despues del viaje",
      "Usa el travel journal para decidir con mas confianza",
    ],
    planningEyebrow: "Planifica con contexto real",
    planningTitle: "Planifica Marajo con la claridad de un especialista local confiable",
    planningSubtitle:
      "Superficies editoriales y practicas pensadas para quienes necesitan entender acceso, temporada, base del viaje y diseno del itinerario antes de reservar.",
    planningCards: [
      {
        eyebrow: "Como llegar",
        title: "Entiende la ruta hasta Marajo",
        description: "Logistica desde Belem, eleccion de base y como se mueve realmente el viajero por la isla.",
        route: "guideDetail",
        slug: "how-to-visit-marajo-island",
      },
      {
        eyebrow: "Mejor temporada",
        title: "Elige el momento correcto",
        description: "Compara clima, comodidad, paisaje y el mejor timing para cada experiencia.",
        route: "guideDetail",
        slug: "best-time-to-visit-marajo",
      },
      {
        eyebrow: "Donde alojarse",
        title: "Compara las mejores bases",
        description: "Usa el area de hoteles para evaluar estilo de estancia, base y soporte local.",
        route: "hotels",
      },
      {
        eyebrow: "Itinerario",
        title: "Construye una ruta mas fuerte",
        description: "Aprende a combinar playa, cultura, naturaleza y ritmo en un solo viaje.",
        route: "guideDetail",
        slug: "marajo-itinerary-guide",
      },
    ],
    planningPrimaryLabel: "Planificar con especialista local",
    planningSecondaryLabel: "Explorar el travel journal",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Cuando el viaje exige mas contexto, nuestro concierge acorta el camino hasta la reserva",
    conciergeSubtitle:
      "Cuando logistica, temporada, hospedaje y experiencias curadas deben encajar bien, la ayuda humana permite decidir con mas velocidad y confianza.",
    conciergeHighlights: [
      "Orientacion antes, durante y despues del viaje",
      "Apoyo para experiencias, paquetes y diseno del itinerario",
      "Entrega local con comunicacion internacional",
    ],
    conciergePrimaryLabel: "Hablar con un especialista local",
    conciergeSecondaryLabel: "Ir a planificar viaje",
    finalEyebrow: "Listo para avanzar",
    finalTitle: "Descubre Marajo con mas claridad. Reserva con mas confianza.",
    finalSubtitle:
      "Elige entre reservar experiencias ahora o hablar con un especialista local para construir el viaje completo.",
    finalPrimaryLabel: "Reservar directo",
    finalSecondaryLabel: "Hablar con especialista local",
  },
  fr: {
    trustStripLabel: "Curation locale, reservation sure et support humain",
    heroPlannerEyebrow: "Planification premium",
    heroPlannerTitle: "Travel Marajo est la facon la plus claire de decouvrir, planifier et reserver le meilleur de l'ile.",
    heroPlannerBody:
      "Passez de la curiosite a un itineraire realisable avec intelligence destination, partenaires verifies et assistance locale a chaque etape.",
    heroPlannerHighlights: [
      "Comparez experiences, forfaits et planification assistee avec plus de clarte",
      "Accedez a un support local avant, pendant et apres le voyage",
      "Utilisez le travel journal pour decider avec plus de confiance",
    ],
    planningEyebrow: "Planifiez avec un vrai contexte",
    planningTitle: "Planifiez Marajo avec la clarte d'un specialiste local de confiance",
    planningSubtitle:
      "Des surfaces editoriales et pratiques pensees pour ceux qui doivent comprendre acces, saison, base du voyage et dessin d'itineraire avant de reserver.",
    planningCards: [
      {
        eyebrow: "Comment y aller",
        title: "Comprendre la route vers Marajo",
        description: "Logistique depuis Belem, choix de la base et circulation reelle sur l'ile.",
        route: "guideDetail",
        slug: "how-to-visit-marajo-island",
      },
      {
        eyebrow: "Meilleure saison",
        title: "Choisir le bon timing",
        description: "Comparez climat, confort, paysages et moment ideal pour les experiences cles.",
        route: "guideDetail",
        slug: "best-time-to-visit-marajo",
      },
      {
        eyebrow: "Ou dormir",
        title: "Comparer les meilleures bases",
        description: "Utilisez l'espace hotels pour evaluer style de sejour, base et support local.",
        route: "hotels",
      },
      {
        eyebrow: "Itineraire",
        title: "Construire une route plus solide",
        description: "Voyez comment combiner plage, culture, nature et rythme dans un meme voyage.",
        route: "guideDetail",
        slug: "marajo-itinerary-guide",
      },
    ],
    planningPrimaryLabel: "Planifier avec un specialiste local",
    planningSecondaryLabel: "Explorer le travel journal",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Quand le voyage demande plus de contexte, notre concierge raccourcit le chemin vers la reservation",
    conciergeSubtitle:
      "Quand logistique, saison, hebergement et experiences choisies doivent bien s'assembler, l'accompagnement humain permet de decider plus vite et avec davantage de confiance.",
    conciergeHighlights: [
      "Orientation avant, pendant et apres le voyage",
      "Support pour experiences, forfaits et dessin d'itineraire",
      "Execution locale avec communication internationale",
    ],
    conciergePrimaryLabel: "Parler a un specialiste local",
    conciergeSecondaryLabel: "Aller a la planification du voyage",
    finalEyebrow: "Pret a avancer",
    finalTitle: "Decouvrez Marajo avec plus de clarte. Reservez avec plus de confiance.",
    finalSubtitle:
      "Choisissez entre reserver des experiences maintenant ou parler a un specialiste local pour dessiner le voyage complet.",
    finalPrimaryLabel: "Reserver en direct",
    finalSecondaryLabel: "Parler a un specialiste local",
  },
}
