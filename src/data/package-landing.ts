import type { AppLocale } from "@/config/i18n"

export const FLAGSHIP_PACKAGE_SLUG = "marajo-essencial"

type FaqItem = {
  question: string
  answer: string
}

type PackageLandingCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  heroTrustNotes: string[]
  whyTitle: string
  whyBody: string
  audienceTitle: string
  audienceItems: string[]
  journeyTitle: string
  journeySubtitle: string
  whyBookTitle: string
  whyBookSubtitle: string
  whyBookItems: string[]
  trustEyebrow: string
  trustTitle: string
  trustSubtitle: string
  faqTitle: string
  faqSubtitle: string
  faqItems: FaqItem[]
  finalEyebrow: string
  finalTitle: string
  finalSubtitle: string
  listingFeatureEyebrow: string
  listingFeatureTitle: string
  listingFeatureBody: string
}

export const premiumPackageLandingContent: Record<AppLocale, PackageLandingCopy> = {
  pt: {
    heroEyebrow: "Jornada assinatura",
    heroTitle: "O pacote mais claro para uma primeira viagem forte a Marajó",
    heroBody:
      "Marajó Essencial combina praia, cultura, gastronomia e tempo livre em um roteiro que reduz fricção para quem quer descobrir a ilha com mais contexto e mais confiança para reservar.",
    heroTrustNotes: ["Reserva segura", "Suporte local", "Parceiros curados"],
    whyTitle: "Por que este pacote funciona tão bem",
    whyBody:
      "Ele resolve a dúvida mais comum da primeira viagem: como viver o melhor de Marajó sem perder tempo com combinações frágeis de logística, hospedagem e experiências.",
    audienceTitle: "Ideal para",
    audienceItems: [
      "quem visita Marajó pela primeira vez",
      "viajantes que querem praia, cultura e leitura de destino no mesmo roteiro",
      "quem prefere reservar uma jornada mais pronta, com menos atrito de decisão",
    ],
    journeyTitle: "Como a jornada se desenha",
    journeySubtitle:
      "Um fluxo curto, legível e equilibrado para transformar interesse em uma viagem bem executada.",
    whyBookTitle: "Por que reservar com a Travel Marajó",
    whyBookSubtitle:
      "A plataforma ajuda você a sair da curiosidade para uma decisão melhor amparada por contexto local, suporte humano e parceiros acompanhados.",
    whyBookItems: [
      "curadoria local para reduzir ruído na escolha do roteiro",
      "parceiros selecionados com capacidade real de entrega",
      "apoio antes, durante e depois da viagem",
      "mais segurança para quem ainda está entendendo a ilha",
    ],
    trustEyebrow: "Confiança real",
    trustTitle: "Uma reserva premium precisa de contexto, não só de botões",
    trustSubtitle:
      "Por isso esta página combina leitura de destino, estrutura da jornada e caminhos claros para reserva direta ou apoio com especialista local.",
    faqTitle: "Perguntas que ajudam a decidir",
    faqSubtitle:
      "As respostas abaixo foram pensadas para reduzir dúvida comercial sem prometer nada além do que o produto e a operação realmente entregam.",
    faqItems: [
      {
        question: "Para quem este pacote faz mais sentido?",
        answer:
          "Ele foi pensado para viajantes que querem uma primeira leitura forte de Marajó, com equilíbrio entre praia, cultura e tempo livre, sem precisar montar tudo do zero.",
      },
      {
        question: "Como funciona a reserva?",
        answer:
          "Você pode reservar diretamente pelo fluxo de package checkout ou falar com um especialista local se quiser validar timing, logística e encaixe do roteiro antes de fechar.",
      },
      {
        question: "O que acontece depois da reserva?",
        answer:
          "A equipe segue como ponto de apoio para orientar os próximos passos e manter a viagem mais clara entre confirmação, logística e experiência no destino.",
      },
      {
        question: "Existe suporte local durante a viagem?",
        answer:
          "Sim. O posicionamento da Travel Marajó inclui suporte antes, durante e depois da viagem, sempre que o viajante precisar de clareza adicional.",
      },
    ],
    finalEyebrow: "Pronto para avançar",
    finalTitle: "Escolha entre reservar agora ou falar com quem conhece a ilha de verdade",
    finalSubtitle:
      "Se o pacote já faz sentido para o seu perfil, avance para a reserva. Se precisar alinhar contexto, temporada ou logística, nosso especialista local encurta o caminho.",
    listingFeatureEyebrow: "Pacote em destaque",
    listingFeatureTitle: "Marajó Essencial: a jornada mais direta para começar bem",
    listingFeatureBody:
      "Uma landing premium para quem quer entender o pacote flagship antes de reservar ou seguir para concierge.",
  },
  en: {
    heroEyebrow: "Signature journey",
    heroTitle: "The clearest package for a strong first journey to Marajó",
    heroBody:
      "Marajo Essential combines beach time, culture, cuisine, and breathing room in one route that reduces friction for travelers who want to understand the island and book with more confidence.",
    heroTrustNotes: ["Secure booking", "Local support", "Curated partners"],
    whyTitle: "Why this package works so well",
    whyBody:
      "It solves the most common first-trip problem: how to experience the best of Marajó without losing time to fragile combinations of logistics, stays, and experiences.",
    audienceTitle: "Best for",
    audienceItems: [
      "first-time visitors to Marajó",
      "travelers who want beach, culture, and destination context in one journey",
      "people who prefer a more ready-built route with less planning friction",
    ],
    journeyTitle: "How the journey unfolds",
    journeySubtitle:
      "A short, legible, well-balanced flow designed to turn interest into a well-executed trip.",
    whyBookTitle: "Why book through Travel Marajó",
    whyBookSubtitle:
      "The platform helps travelers move from curiosity to a better decision backed by local context, human support, and monitored partners.",
    whyBookItems: [
      "local curation to reduce noise in package selection",
      "selected partners with real delivery capacity",
      "support before, during, and after the trip",
      "more confidence for travelers still learning the island",
    ],
    trustEyebrow: "Real confidence",
    trustTitle: "A premium booking needs context, not just buttons",
    trustSubtitle:
      "That is why this page combines destination reading, journey structure, and clear paths to direct booking or concierge-assisted planning.",
    faqTitle: "Questions that help you decide",
    faqSubtitle:
      "These answers are designed to reduce purchase friction without promising anything beyond what the product and operation really deliver.",
    faqItems: [
      {
        question: "Who is this package best for?",
        answer:
          "It is built for travelers who want a strong first reading of Marajó, balancing beach time, culture, and room to breathe without assembling everything from scratch.",
      },
      {
        question: "How does booking work?",
        answer:
          "You can book directly through the package checkout flow or talk to a local specialist first if you want to validate timing, logistics, or itinerary fit.",
      },
      {
        question: "What happens after booking?",
        answer:
          "The team remains an active point of support for next steps, helping keep the trip clearer between confirmation, logistics, and on-island delivery.",
      },
      {
        question: "Is local support available during the trip?",
        answer:
          "Yes. Travel Marajó is positioned around support before, during, and after the trip whenever the traveler needs more clarity.",
      },
    ],
    finalEyebrow: "Ready to move",
    finalTitle: "Choose between booking now or talking to someone who truly knows the island",
    finalSubtitle:
      "If the package already fits your profile, move to booking. If you still need to align timing, logistics, or destination context, a local specialist can shorten the path.",
    listingFeatureEyebrow: "Featured package",
    listingFeatureTitle: "Marajo Essential: the most direct way to start well",
    listingFeatureBody:
      "A premium landing page for travelers who want to understand the flagship package before booking or moving into concierge support.",
  },
  es: {
    heroEyebrow: "Jornada insignia",
    heroTitle: "El paquete más claro para una primera gran experiencia en Marajó",
    heroBody:
      "Marajó Esencial combina playa, cultura, gastronomía y tiempo libre en una ruta que reduce fricción para quienes quieren entender la isla y reservar con más confianza.",
    heroTrustNotes: ["Reserva segura", "Soporte local", "Socios curados"],
    whyTitle: "Por qué este paquete funciona tan bien",
    whyBody:
      "Resuelve la duda más común de la primera visita: cómo vivir lo mejor de Marajó sin perder tiempo con combinaciones frágiles de logística, hospedaje y experiencias.",
    audienceTitle: "Ideal para",
    audienceItems: [
      "quienes visitan Marajó por primera vez",
      "viajeros que quieren playa, cultura y lectura del destino en una sola ruta",
      "personas que prefieren un itinerario más listo y con menos fricción de decisión",
    ],
    journeyTitle: "Cómo se desarrolla la jornada",
    journeySubtitle:
      "Un flujo corto, legible y equilibrado para convertir interés en un viaje mejor ejecutado.",
    whyBookTitle: "Por qué reservar con Travel Marajó",
    whyBookSubtitle:
      "La plataforma ayuda a pasar de la curiosidad a una decisión mejor respaldada por contexto local, soporte humano y socios acompañados.",
    whyBookItems: [
      "curaduría local para reducir ruido en la elección del paquete",
      "socios seleccionados con capacidad real de entrega",
      "soporte antes, durante y después del viaje",
      "más confianza para quienes aún están entendiendo la isla",
    ],
    trustEyebrow: "Confianza real",
    trustTitle: "Una reserva premium necesita contexto, no solo botones",
    trustSubtitle:
      "Por eso esta página combina lectura del destino, estructura de la jornada y caminos claros para reserva directa o planificación asistida.",
    faqTitle: "Preguntas que ayudan a decidir",
    faqSubtitle:
      "Estas respuestas fueron pensadas para reducir fricción de compra sin prometer nada más allá de lo que el producto y la operación realmente entregan.",
    faqItems: [
      {
        question: "¿Para quién tiene más sentido este paquete?",
        answer:
          "Está pensado para viajeros que quieren una primera lectura fuerte de Marajó, con equilibrio entre playa, cultura y tiempo libre, sin tener que construir todo desde cero.",
      },
      {
        question: "¿Cómo funciona la reserva?",
        answer:
          "Puedes reservar directamente por el flujo de package checkout o hablar antes con un especialista local si quieres validar temporada, logística o encaje del itinerario.",
      },
      {
        question: "¿Qué pasa después de reservar?",
        answer:
          "El equipo sigue como punto de apoyo para orientar los próximos pasos y mantener el viaje más claro entre confirmación, logística y experiencia en destino.",
      },
      {
        question: "¿Hay soporte local durante el viaje?",
        answer:
          "Sí. Travel Marajó está posicionada con soporte antes, durante y después del viaje siempre que el viajero necesite más claridad.",
      },
    ],
    finalEyebrow: "Listo para avanzar",
    finalTitle: "Elige entre reservar ahora o hablar con quien realmente conoce la isla",
    finalSubtitle:
      "Si el paquete ya encaja con tu perfil, avanza a la reserva. Si aún necesitas alinear contexto, temporada o logística, un especialista local acorta el camino.",
    listingFeatureEyebrow: "Paquete destacado",
    listingFeatureTitle: "Marajó Esencial: la forma más directa de empezar bien",
    listingFeatureBody:
      "Una landing premium para viajeros que quieren entender el paquete insignia antes de reservar o pasar al concierge.",
  },
  fr: {
    heroEyebrow: "Voyage signature",
    heroTitle: "Le forfait le plus clair pour une première découverte forte de Marajó",
    heroBody:
      "Marajó Essentiel réunit plage, culture, gastronomie et temps libre dans un itinéraire qui réduit la friction pour les voyageurs qui veulent comprendre l'île et réserver avec plus de confiance.",
    heroTrustNotes: ["Réservation sécurisée", "Support local", "Partenaires curés"],
    whyTitle: "Pourquoi ce forfait fonctionne si bien",
    whyBody:
      "Il répond à la question la plus fréquente d'un premier voyage : comment vivre le meilleur de Marajó sans perdre du temps avec une logistique, un hébergement et des expériences mal articulés.",
    audienceTitle: "Idéal pour",
    audienceItems: [
      "les voyageurs qui découvrent Marajó pour la première fois",
      "ceux qui veulent plage, culture et lecture de destination dans un même parcours",
      "les visiteurs qui préfèrent une route plus prête avec moins de friction de décision",
    ],
    journeyTitle: "Comment le voyage se déploie",
    journeySubtitle:
      "Un parcours court, lisible et équilibré pour transformer l'intérêt en voyage mieux exécuté.",
    whyBookTitle: "Pourquoi réserver avec Travel Marajó",
    whyBookSubtitle:
      "La plateforme aide les voyageurs à passer de la curiosité à une décision mieux soutenue par du contexte local, un support humain et des partenaires suivis.",
    whyBookItems: [
      "curation locale pour réduire le bruit dans le choix du forfait",
      "partenaires sélectionnés avec vraie capacité d'exécution",
      "support avant, pendant et après le voyage",
      "plus de confiance pour les voyageurs qui découvrent encore l'île",
    ],
    trustEyebrow: "Confiance réelle",
    trustTitle: "Une réservation premium a besoin de contexte, pas seulement de boutons",
    trustSubtitle:
      "C'est pourquoi cette page réunit lecture de destination, structure du voyage et chemins clairs vers la réservation directe ou l'accompagnement concierge.",
    faqTitle: "Questions utiles avant de décider",
    faqSubtitle:
      "Ces réponses sont pensées pour réduire la friction d'achat sans promettre davantage que ce que le produit et l'opération livrent réellement.",
    faqItems: [
      {
        question: "À qui ce forfait convient-il le mieux ?",
        answer:
          "Il a été conçu pour les voyageurs qui veulent une première lecture forte de Marajó, en équilibrant plage, culture et temps libre sans devoir construire tout le voyage depuis zéro.",
      },
      {
        question: "Comment fonctionne la réservation ?",
        answer:
          "Vous pouvez réserver directement via le flow de package checkout ou parler d'abord avec un spécialiste local si vous voulez valider saison, logistique ou pertinence de l'itinéraire.",
      },
      {
        question: "Que se passe-t-il après la réservation ?",
        answer:
          "L'équipe reste un point d'appui pour les prochaines étapes afin de garder le voyage plus clair entre confirmation, logistique et expérience sur place.",
      },
      {
        question: "Le support local est-il disponible pendant le voyage ?",
        answer:
          "Oui. Travel Marajó se positionne avec un support avant, pendant et après le voyage dès qu'un voyageur a besoin de plus de clarté.",
      },
    ],
    finalEyebrow: "Prêt à avancer",
    finalTitle: "Choisissez entre réserver maintenant ou parler à quelqu'un qui connaît vraiment l'île",
    finalSubtitle:
      "Si le forfait correspond déjà à votre profil, avancez vers la réservation. Si vous devez encore aligner saison, logistique ou contexte destination, un spécialiste local raccourcira le chemin.",
    listingFeatureEyebrow: "Forfait vedette",
    listingFeatureTitle: "Marajó Essentiel : la manière la plus directe de bien commencer",
    listingFeatureBody:
      "Une landing premium pour les voyageurs qui veulent comprendre le forfait phare avant de réserver ou de passer au concierge.",
  },
}
