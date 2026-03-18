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
    brandName: "Travel Marajo",
    brandTagline: "Gateway global de Marajo",
    authorityLabel: "Autoridade editorial, descoberta premium e reserva com suporte local",
    languageLabel: "Idioma",
    signInLabel: "Entrar",
    signOutLabel: "Sair",
    profileLabel: "Mochila do viajante",
    planTripLabel: "Planejar viagem",
    bookDirectLabel: "Reservar direto",
    mainNav: [
      { label: "Descobrir Marajo", route: "destinations" },
      { label: "Experiencias", route: "experiences" },
      { label: "Pacotes", route: "packages" },
      { label: "Planejar viagem", route: "planTrip" },
      { label: "Diario de viagem", route: "guides" },
      { label: "Parceiros", route: "partners" },
    ],
    footerHeadline: "Travel Marajo apresenta Marajo ao mundo com confianca editorial e prontidao para reserva.",
    footerDescription:
      "A plataforma que apresenta Marajo ao mundo com curadoria premium, contexto editorial e confianca para planejar, reservar ou pedir suporte humano.",
    footerHighlights: [
      "Descoberta de destino com contexto real",
      "Curadoria local com confianca internacional",
      "Planejamento, reserva e concierge no mesmo fluxo",
    ],
    footerColumns: [
      {
        title: "Descobrir",
        links: [
          { label: "Marajo", route: "destinations" },
          { label: "Experiencias", route: "experiences" },
          { label: "Pacotes", route: "packages" },
          { label: "Diario de viagem", route: "guides" },
        ],
      },
      {
        title: "Planejamento",
        links: [
          { label: "Planejar viagem", route: "planTrip" },
          { label: "Servicos", route: "services" },
          { label: "Hoteis", route: "hotels" },
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
    brandName: "Travel Marajo",
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
    footerHeadline: "Travel Marajo introduces Marajo to the world with editorial confidence and booking readiness.",
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
    brandName: "Travel Marajo",
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
      { label: "Experiencias", route: "experiences" },
      { label: "Paquetes", route: "packages" },
      { label: "Planificar viaje", route: "planTrip" },
      { label: "Diario de viaje", route: "guides" },
      { label: "Socios", route: "partners" },
    ],
    footerHeadline: "Travel Marajo presenta Marajo al mundo con autoridad editorial y confianza para reservar.",
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
          { label: "Experiencias", route: "experiences" },
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
    brandName: "Travel Marajo",
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
    footerHeadline: "Travel Marajo presente Marajo au monde avec autorite editoriale et confiance pour reserver.",
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
    "Soure, Ilha de Marajo - PA",
  ],
  legal: {
    cnpj: "00.000.000/0001-00",
    cadastur: "26.012747.10.0001-6",
  },
}

export const homeAuthorityContent: Record<AppLocale, HomeAuthorityContent> = {
  pt: {
    trustStripLabel: "Confianca para descobrir, planejar e reservar",
    heroPlannerEyebrow: "Planejamento premium",
    heroPlannerTitle: "Seu gateway internacional para um Marajo mais claro, autentico e reservavel.",
    heroPlannerBody:
      "Passe da inspiracao para um roteiro executavel com contexto editorial, curadoria local e suporte humano.",
    heroPlannerHighlights: [
      "Escolha entre experiencias, pacotes e planejamento assistido",
      "Receba suporte local antes, durante e depois da viagem",
      "Use o travel journal para decidir com mais confianca",
    ],
    planningEyebrow: "Planeje com contexto real",
    planningTitle: "Tudo o que um viajante internacional precisa para desenhar melhor a viagem",
    planningSubtitle:
      "Superficiamos os guias e entradas praticas que ajudam a entender logistica, tempo ideal, base da viagem e ritmo do roteiro sem criar links mortos.",
    planningCards: [
      {
        eyebrow: "Como chegar",
        title: "Entenda a rota ate Marajo",
        description: "Logistica a partir de Belem, escolha da base e sequencia de deslocamentos.",
        route: "guideDetail",
        slug: "how-to-visit-marajo-island",
      },
      {
        eyebrow: "Melhor epoca",
        title: "Escolha a temporada certa",
        description: "Compare clima, conforto, paisagem e timing das experiencias.",
        route: "guideDetail",
        slug: "best-time-to-visit-marajo",
      },
      {
        eyebrow: "Hospedagem",
        title: "Descubra onde ficar",
        description: "Use a pagina de hoteis para comparar estilo de estadia, base e apoio local.",
        route: "hotels",
      },
      {
        eyebrow: "Roteiro",
        title: "Monte um itinerario mais forte",
        description: "Veja como combinar praia, cultura, natureza e ritmo da viagem.",
        route: "guideDetail",
        slug: "marajo-itinerary-guide",
      },
    ],
    planningPrimaryLabel: "Planejar viagem com concierge",
    planningSecondaryLabel: "Explorar todos os guias",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Precisa de ajuda humana para transformar descoberta em reserva?",
    conciergeSubtitle:
      "Quando a viagem envolve logistica, temporadas, hospedagem e experiencias curadas, nosso suporte local encurta o caminho para uma decisao segura.",
    conciergeHighlights: [
      "Orientacao antes, durante e depois da viagem",
      "Suporte para experiencias, pacotes e desenho do roteiro",
      "Atendimento local com perspectiva internacional",
    ],
    conciergePrimaryLabel: "Falar com especialista local",
    conciergeSecondaryLabel: "Ir para planejamento da viagem",
    finalEyebrow: "Pronto para avancar",
    finalTitle: "Escolha seu proximo passo em Marajo com mais confianca",
    finalSubtitle:
      "Reserve experiencias com clareza ou fale com um especialista local para desenhar uma viagem mais completa.",
    finalPrimaryLabel: "Reservar direto",
    finalSecondaryLabel: "Falar com especialista local",
  },
  en: {
    trustStripLabel: "Confidence to discover, plan, and book",
    heroPlannerEyebrow: "Premium planning",
    heroPlannerTitle: "Your international gateway to a clearer, more authentic, and bookable Marajo.",
    heroPlannerBody:
      "Move from inspiration into an executable trip with destination intelligence, local curation, and human support.",
    heroPlannerHighlights: [
      "Choose between experiences, packages, and assisted planning",
      "Access local support before, during, and after the trip",
      "Use the travel journal to decide with more confidence",
    ],
    planningEyebrow: "Plan with real context",
    planningTitle: "What international travelers need to shape a stronger Marajo trip",
    planningSubtitle:
      "We surface the planning guides and practical entry points that help visitors understand logistics, trip timing, base selection, and itinerary rhythm without dead-end links.",
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
    planningPrimaryLabel: "Plan your trip with concierge",
    planningSecondaryLabel: "Explore the travel journal",
    conciergeEyebrow: "Local concierge",
    conciergeTitle: "Need human guidance to turn discovery into booking?",
    conciergeSubtitle:
      "When the trip involves logistics, seasonality, stays, and curated experiences, local support is the fastest way to move toward a confident decision.",
    conciergeHighlights: [
      "Guidance before, during, and after the journey",
      "Support for experiences, packages, and trip design",
      "Local delivery with international-facing communication",
    ],
    conciergePrimaryLabel: "Talk to a local travel specialist",
    conciergeSecondaryLabel: "Go to trip planning",
    finalEyebrow: "Ready to move",
    finalTitle: "Choose your next Marajo step with more confidence",
    finalSubtitle:
      "Book experiences directly or talk to a local specialist to shape a fuller itinerary.",
    finalPrimaryLabel: "Book direct",
    finalSecondaryLabel: "Talk to a local specialist",
  },
  es: {
    trustStripLabel: "Confianza para descubrir, planificar y reservar",
    heroPlannerEyebrow: "Planificacion premium",
    heroPlannerTitle: "Tu puerta internacional a un Marajo mas claro, autentico y listo para reservar.",
    heroPlannerBody:
      "Pasa de la inspiracion a un viaje ejecutable con inteligencia de destino, curaduria local y soporte humano.",
    heroPlannerHighlights: [
      "Elige entre experiencias, paquetes y planificacion asistida",
      "Accede a soporte local antes, durante y despues del viaje",
      "Usa el travel journal para decidir con mas confianza",
    ],
    planningEyebrow: "Planifica con contexto real",
    planningTitle: "Lo que un viajero internacional necesita para construir un mejor viaje a Marajo",
    planningSubtitle:
      "Mostramos los guias y entradas practicas que ayudan a entender logistica, temporada, base del viaje y ritmo del itinerario sin crear enlaces muertos.",
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
    planningPrimaryLabel: "Planificar viaje con concierge",
    planningSecondaryLabel: "Explorar el travel journal",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Necesitas ayuda humana para convertir descubrimiento en reserva?",
    conciergeSubtitle:
      "Cuando el viaje involucra logistica, temporada, hospedaje y experiencias curadas, el soporte local acelera una decision segura.",
    conciergeHighlights: [
      "Orientacion antes, durante y despues del viaje",
      "Apoyo para experiencias, paquetes y diseno del itinerario",
      "Entrega local con comunicacion internacional",
    ],
    conciergePrimaryLabel: "Hablar con un especialista local",
    conciergeSecondaryLabel: "Ir a planificar viaje",
    finalEyebrow: "Listo para avanzar",
    finalTitle: "Elige el siguiente paso en Marajo con mas confianza",
    finalSubtitle:
      "Reserva experiencias directamente o habla con un especialista local para construir un itinerario mas completo.",
    finalPrimaryLabel: "Reservar directo",
    finalSecondaryLabel: "Hablar con especialista local",
  },
  fr: {
    trustStripLabel: "Confiance pour decouvrir, planifier et reserver",
    heroPlannerEyebrow: "Planification premium",
    heroPlannerTitle: "Votre portail international vers un Marajo plus clair, plus authentique et plus reservable.",
    heroPlannerBody:
      "Passez de l'inspiration a un voyage executable avec intelligence destination, curation locale et support humain.",
    heroPlannerHighlights: [
      "Choisissez entre experiences, forfaits et planification assistee",
      "Accedez a un support local avant, pendant et apres le voyage",
      "Utilisez le travel journal pour decider avec plus de confiance",
    ],
    planningEyebrow: "Planifiez avec un vrai contexte",
    planningTitle: "Ce dont un voyageur international a besoin pour construire un meilleur voyage a Marajo",
    planningSubtitle:
      "Nous faisons remonter les guides et points d'entree utiles pour comprendre logistique, saison, base du voyage et rythme d'itineraire sans liens morts.",
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
    planningPrimaryLabel: "Planifier avec le concierge",
    planningSecondaryLabel: "Explorer le travel journal",
    conciergeEyebrow: "Concierge local",
    conciergeTitle: "Besoin d'une aide humaine pour transformer la decouverte en reservation ?",
    conciergeSubtitle:
      "Quand le voyage implique logistique, saison, hebergement et experiences choisies, le support local raccourcit le chemin vers une decision sure.",
    conciergeHighlights: [
      "Orientation avant, pendant et apres le voyage",
      "Support pour experiences, forfaits et dessin d'itineraire",
      "Execution locale avec communication internationale",
    ],
    conciergePrimaryLabel: "Parler a un specialiste local",
    conciergeSecondaryLabel: "Aller a la planification du voyage",
    finalEyebrow: "Pret a avancer",
    finalTitle: "Choisissez la prochaine etape a Marajo avec plus de confiance",
    finalSubtitle:
      "Reservez des experiences directement ou parlez a un specialiste local pour construire un itineraire plus complet.",
    finalPrimaryLabel: "Reserver en direct",
    finalSecondaryLabel: "Parler a un specialiste local",
  },
}
