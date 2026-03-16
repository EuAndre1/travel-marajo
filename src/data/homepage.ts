import type { AppLocale } from "@/config/i18n"

export type ExperienceFilter = string

export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    ctas: { primary: string; secondary: string }
    tabs: {
      label: string
      fields: { label: string; placeholder: string; type?: string }[]
      ctaLabel: string
      ctaHref: string
    }[]
    trustItems: string[]
    stats: { value: string; label: string }[]
  }
  whyMarajo: {
    title: string
    subtitle: string
    items: { title: string; description: string }[]
  }
  featureExperience: {
    badge: string
    title: string
    description: string
    location: string
    duration: string
    price: string
    highlights: string[]
    ctas: { primary: string; secondary: string }
    image: string
    gallery: string[]
  }
  topExperiences: {
    title: string
    subtitle: string
    filters: ExperienceFilter[]
    items: {
      title: string
      category: ExperienceFilter
      location: string
      duration: string
      price: string
      rating: string
      image: string
      tags: string[]
      href: string
    }[]
    ctaLabel: string
    ctaHref: string
  }
  destinations: {
    title: string
    subtitle: string
    items: {
      name: string
      description: string
      image: string
      tag: string
    }[]
  }
  routes: {
    title: string
    subtitle: string
    items: {
      title: string
      days: string
      price: string
      description: string
      highlights: string[]
      image: string
      href: string
    }[]
  }
  offers: {
    title: string
    subtitle: string
    items: {
      title: string
      description: string
      price: string
      badge: string
      image: string
      href: string
    }[]
  }
  travelGuide: {
    title: string
    subtitle: string
    items: {
      title: string
      description: string
      readTime: string
      tag: string
      href: string
    }[]
  }
  socialProof: {
    title: string
    subtitle: string
    stats: { value: string; label: string }[]
    testimonials: {
      name: string
      role: string
      quote: string
      rating: string
    }[]
  }
  partners: {
    title: string
    subtitle: string
    items: { name: string; type: string }[]
  }
  newsletter: {
    title: string
    subtitle: string
    ctaLabel: string
    privacyNote: string
    benefits: string[]
    image: string
  }
}

type TranslationDictionary = Record<string, string>

const sharedImages = {
  featureImage: "/pesqueiro-1.png",
  featureGallery: ["/pesqueiro-2.png", "/pesqueiro-3.png", "/pesqueiro-4.png"],
  destinations: {
    soure: "/destino-soure.jpg",
    salvaterra: "/destino-salvaterra.jpg",
    pesqueiro: "/destino-pesqueiro.jpg",
    barraVelha: "/destino-barra-velha.jpg",
  },
  experiences: {
    community: "/atividade-comunidade.jpg",
    mangroves: "/destino-manguezais.jpg",
    horseback: "/atividade-cavalgada.jpg",
    craft: "/atividade-artesanato.jpg",
    canoe: "/atividade-canoa.jpg",
    cuisine: "/atividade-culinaria.jpg",
    trail: "/atividade-trilha.jpg",
  },
  offers: {
    hotel: "/oferta-hotel.jpg",
    tour: "/oferta-passeio.jpg",
    package: "/oferta-pacote.jpg",
  },
  newsletter: "/newsletter-traveler.jpg",
}

const basePtContent: HomeContent = {
  hero: {
    title: "Marajo, o destino onde a Amazonia encontra o oceano",
    subtitle:
      "Curadoria premium de experiencias autenticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajo com seguranca e encantamento.",
    ctas: {
      primary: "Explorar experiencias",
      secondary: "Ver roteiros e pacotes",
    },
    tabs: [
      {
        label: "Experiencias",
        fields: [
          { label: "Local", placeholder: "Soure, Salvaterra ou Cachoeira do Arari" },
          { label: "Data", placeholder: "Escolha sua data ideal", type: "date" },
          { label: "Perfil", placeholder: "Casal, familia ou aventura" },
          { label: "Duracao", placeholder: "3h, 1 dia ou 2 dias" },
        ],
        ctaLabel: "Buscar experiencias",
        ctaHref: "/experiencias",
      },
      {
        label: "Destinos",
        fields: [
          { label: "Base", placeholder: "Soure ou Salvaterra" },
          { label: "Estilo", placeholder: "Praias, manguezais ou fazendas" },
          { label: "Quando", placeholder: "Melhor epoca para visitar" },
          { label: "Interesses", placeholder: "Cultura, natureza, gastronomia" },
        ],
        ctaLabel: "Explorar destinos",
        ctaHref: "/destinos",
      },
      {
        label: "Roteiros",
        fields: [
          { label: "Duracao", placeholder: "3 a 7 dias" },
          { label: "Grupo", placeholder: "Casal, familia, amigos" },
          { label: "Foco", placeholder: "Experiencias ou descanso" },
          { label: "Partida", placeholder: "Belem ou Salvaterra" },
        ],
        ctaLabel: "Ver roteiros",
        ctaHref: "/pacotes",
      },
      {
        label: "Hospedagem",
        fields: [
          { label: "Cidade", placeholder: "Soure, Salvaterra" },
          { label: "Perfil", placeholder: "Boutique, fazenda, praia" },
          { label: "Datas", placeholder: "Check-in e check-out" },
          { label: "Quartos", placeholder: "Numero de hospedes" },
        ],
        ctaLabel: "Ver hospedagens",
        ctaHref: "/hotels",
      },
    ],
    trustItems: [
      "Curadoria local com equipe no Marajo",
      "Atendimento humano antes, durante e depois",
      "Parceiros licenciados e avaliados",
      "Pagamento seguro e suporte pos-reserva",
    ],
    stats: [
      { value: "120+", label: "experiencias mapeadas" },
      { value: "40+", label: "parceiros locais" },
      { value: "4,9/5", label: "avaliacao media" },
      { value: "7", label: "roteiros inteligentes" },
    ],
  },
  whyMarajo: {
    title: "Por que Marajo?",
    subtitle:
      "Uma ilha com identidade propria: natureza viva, cultura ancestral e experiencias que nao existem em nenhum outro lugar do Brasil.",
    items: [
      {
        title: "Paisagens unicas em escala continental",
        description:
          "Campos alagados, praias de agua doce e salgada e manguezais preservados em uma das maiores ilhas fluvio-marinhas do planeta.",
      },
      {
        title: "Cultura marajoara viva",
        description:
          "Ceramica ancestral, sabores amazonicos e comunidades ribeirinhas que transformam cada visita em encontro real.",
      },
      {
        title: "Experiencias com bufalos e fazendas",
        description:
          "Passeios de bufalo, producao de queijo marajoara e vivencias de campo que conectam com o ritmo da ilha.",
      },
      {
        title: "Acessivel, mas fora do obvio",
        description:
          "Um destino autentico a poucas horas de Belem, com tempo desacelerado e alto potencial de descoberta.",
      },
    ],
  },
  featureExperience: {
    badge: "Experiencia destaque",
    title: "Praia do Pesqueiro ao por do sol",
    description:
      "A experiencia mais emblematica do Marajo. Dunas baixas, mar aberto, barracas locais e bufalos integrados a paisagem criam um cenario cinematografico para quem busca beleza e autenticidade.",
    location: "Soure - Ilha de Marajo",
    duration: "4 horas",
    price: "A partir de R$ 250 por pessoa",
    highlights: [
      "Por do sol sobre o Atlantico",
      "Trilhas leves com guia local",
      "Paradas para fotografia e cultura",
      "Reserva com suporte humano",
    ],
    ctas: { primary: "Reservar agora", secondary: "Ver detalhes" },
    image: sharedImages.featureImage,
    gallery: sharedImages.featureGallery,
  },
  topExperiences: {
    title: "As experiencias mais reservadas",
    subtitle:
      "Selecao com base em satisfacao real, infraestrutura local e capacidade de entrega. Compare por perfil e reserve com seguranca.",
    filters: ["Todas", "Natureza", "Cultura", "Gastronomia", "Aventura", "Familia"],
    items: [
      {
        title: "Circuito dos Bufalos e Queijaria",
        category: "Cultura",
        location: "Soure",
        duration: "5 horas",
        price: "R$ 220 por pessoa",
        rating: "4,9",
        image: sharedImages.experiences.community,
        tags: ["Queijo marajoara", "Fazenda local"],
        href: "/experiencias",
      },
      {
        title: "Manguezais de Salvaterra",
        category: "Natureza",
        location: "Salvaterra",
        duration: "3 horas",
        price: "R$ 180 por pessoa",
        rating: "4,8",
        image: sharedImages.experiences.mangroves,
        tags: ["Barco", "Observacao de aves"],
        href: "/experiencias",
      },
      {
        title: "Cavalgada na praia ao entardecer",
        category: "Aventura",
        location: "Soure",
        duration: "2h30",
        price: "R$ 240 por pessoa",
        rating: "4,9",
        image: sharedImages.experiences.horseback,
        tags: ["Praia", "Fotogenico"],
        href: "/experiencias",
      },
      {
        title: "Rota da Ceramica Marajoara",
        category: "Cultura",
        location: "Cachoeira do Arari",
        duration: "1 dia",
        price: "R$ 320 por pessoa",
        rating: "4,7",
        image: sharedImages.experiences.craft,
        tags: ["Atelies", "Oficina"],
        href: "/experiencias",
      },
      {
        title: "Canoa pelos igarapes",
        category: "Natureza",
        location: "Salvaterra",
        duration: "3h30",
        price: "R$ 210 por pessoa",
        rating: "4,8",
        image: sharedImages.experiences.canoe,
        tags: ["Igarapes", "Silencio"],
        href: "/experiencias",
      },
      {
        title: "Sabores do Marajo",
        category: "Gastronomia",
        location: "Soure",
        duration: "3 horas",
        price: "R$ 190 por pessoa",
        rating: "4,8",
        image: sharedImages.experiences.cuisine,
        tags: ["Degustacao", "Cozinha local"],
        href: "/experiencias",
      },
      {
        title: "Trilha dos campos alagados",
        category: "Familia",
        location: "Soure",
        duration: "4 horas",
        price: "R$ 200 por pessoa",
        rating: "4,7",
        image: sharedImages.experiences.trail,
        tags: ["Guias locais", "Baixa dificuldade"],
        href: "/experiencias",
      },
    ],
    ctaLabel: "Ver todas as experiencias",
    ctaHref: "/experiencias",
  },
  destinations: {
    title: "Destinos principais da ilha",
    subtitle:
      "Escolha sua base e descubra o que cada regiao oferece: praias extensas, cultura marajoara e natureza abundante.",
    items: [
      {
        name: "Soure",
        description: "Centro turistico com estrutura, praias iconicas e facil acesso as experiencias mais reservadas.",
        image: sharedImages.destinations.soure,
        tag: "Base ideal",
      },
      {
        name: "Salvaterra",
        description: "Porta de entrada para manguezais, igarapes e pousadas charmosas a beira-rio.",
        image: sharedImages.destinations.salvaterra,
        tag: "Natureza",
      },
      {
        name: "Praia do Pesqueiro",
        description: "Cartao-postal do Marajo, com dunas baixas, mar aberto e atmosfera cinematografica.",
        image: sharedImages.destinations.pesqueiro,
        tag: "Praia iconica",
      },
      {
        name: "Barra Velha",
        description: "Praia tranquila para quem busca silencio, ceu aberto e contemplacao sem pressa.",
        image: sharedImages.destinations.barraVelha,
        tag: "Refugio",
      },
    ],
  },
  routes: {
    title: "Roteiros e pacotes pensados para voce",
    subtitle:
      "Combine experiencias, hospedagens e deslocamentos com flexibilidade. Roteiros prontos ou personalizados com curadoria local.",
    items: [
      {
        title: "Marajo Essencial 4 dias",
        days: "4 dias / 3 noites",
        price: "A partir de R$ 1.590",
        description:
          "Ideal para primeira visita: praias, bufalos, gastronomia e o por do sol do Pesqueiro com tempo de descanso.",
        highlights: ["2 experiencias guiadas", "Hospedagem boutique", "Traslado interno"],
        image: sharedImages.offers.package,
        href: "/pacotes",
      },
      {
        title: "Marajo Slow 6 dias",
        days: "6 dias / 5 noites",
        price: "A partir de R$ 2.340",
        description:
          "Para quem quer explorar com calma: igarapes, comunidades e roteiro gastronomico com tempo livre.",
        highlights: ["3 experiencias", "Suporte local", "Upgrade opcional"],
        image: sharedImages.experiences.mangroves,
        href: "/pacotes",
      },
      {
        title: "Familia Marajoara 5 dias",
        days: "5 dias / 4 noites",
        price: "A partir de R$ 2.120",
        description:
          "Atividades de baixa dificuldade, passeios de bufalo e praias amplas com estrutura para criancas.",
        highlights: ["Experiencias family", "Logistica leve", "Kit boas-vindas"],
        image: sharedImages.experiences.horseback,
        href: "/pacotes",
      },
    ],
  },
  offers: {
    title: "Ofertas e oportunidades atuais",
    subtitle:
      "Condicoes especiais com parceiros locais e afiliados, sem comprometer qualidade ou suporte ao viajante.",
    items: [
      {
        title: "Pousada com cafe regional incluso",
        description: "Hospedagem com produtos marajoaras e acesso rapido as praias de Soure.",
        price: "A partir de R$ 260/noite",
        badge: "Hospedagem",
        image: sharedImages.offers.hotel,
        href: "/hotels",
      },
      {
        title: "Passeio de bufalo + fazenda",
        description: "Experiencia guiada com visita a producao de queijo e degustacao local.",
        price: "R$ 210 por pessoa",
        badge: "Experiencia",
        image: sharedImages.offers.tour,
        href: "/experiencias",
      },
      {
        title: "Pacote com traslado fluvial",
        description: "Chegada facilitada com integracao Belem-Soure e roteiro essencial.",
        price: "A partir de R$ 1.480",
        badge: "Pacote",
        image: sharedImages.offers.package,
        href: "/pacotes",
      },
    ],
  },
  travelGuide: {
    title: "Guia de viagem para decidir com confianca",
    subtitle:
      "Informacao pratica e editorial para voce imaginar, comparar e reservar o Marajo certo para o seu perfil.",
    items: [
      {
        title: "Melhor epoca para visitar o Marajo",
        description: "Entenda o ciclo das chuvas, nivel dos rios e o que muda nas experiencias.",
        readTime: "6 min",
        tag: "Planejamento",
        href: "/guia",
      },
      {
        title: "Como chegar: Belem, Salvaterra e Soure",
        description: "Rotas fluviais, horarios e o que considerar na logistica da viagem.",
        readTime: "8 min",
        tag: "Logistica",
        href: "/guia",
      },
      {
        title: "Top experiencias para casais",
        description: "Roteiros romanticos, praias tranquilas e pousadas com charme local.",
        readTime: "5 min",
        tag: "Curadoria",
        href: "/guia",
      },
    ],
  },
  socialProof: {
    title: "Quem viaja com a Travel Marajo recomenda",
    subtitle:
      "Prova social real e transparente: viajantes que vieram pela narrativa e ficaram pela entrega.",
    stats: [
      { value: "4,9", label: "avaliacao media" },
      { value: "92%", label: "taxa de recomendacao" },
      { value: "24h", label: "tempo medio de resposta" },
    ],
    testimonials: [
      {
        name: "Larissa M.",
        role: "Sao Paulo",
        quote:
          "O roteiro foi perfeito para meu casal. A equipe local resolveu tudo e o por do sol no Pesqueiro foi inesquecivel.",
        rating: "5,0",
      },
      {
        name: "Rafael D.",
        role: "Lisboa",
        quote:
          "Gostei do equilibrio entre aventura e conforto. O passeio de bufalo e a gastronomia superaram minhas expectativas.",
        rating: "4,9",
      },
      {
        name: "Camila R.",
        role: "Belem",
        quote:
          "Viajei com meus filhos e tudo foi leve. A curadoria das experiencias fez a diferenca.",
        rating: "5,0",
      },
    ],
  },
  partners: {
    title: "Parceiros locais e afiliados estrategicos",
    subtitle:
      "Trabalhamos com operadores licenciados, pousadas selecionadas e guias locais para garantir seguranca e autenticidade.",
    items: [
      { name: "Pousada Marajo Boutique", type: "Hospedagem" },
      { name: "Fazenda Campo Vivo", type: "Experiencia" },
      { name: "Navega Marajo", type: "Transporte" },
      { name: "Sabores do Norte", type: "Gastronomia" },
      { name: "Atelie Marajoara", type: "Cultura" },
      { name: "Guia Ribeirinho", type: "Operacao local" },
    ],
  },
  newsletter: {
    title: "Receba roteiros secretos e alertas de ofertas",
    subtitle:
      "Uma curadoria mensal com novidades de experiencias, epocas ideais e condicoes exclusivas para quem quer viajar com inteligencia.",
    ctaLabel: "Quero receber",
    privacyNote: "Sem spam. Cancelamento em um clique.",
    benefits: ["Atualizacoes sazonais", "Ofertas com parceiros", "Guias curados"],
    image: sharedImages.newsletter,
  },
}

export const homeContentByLocale: Record<AppLocale, HomeContent> = {
  pt: basePtContent,
  en: basePtContent,
  es: basePtContent,
  fr: basePtContent,
}

function translateHomeContent<T>(value: T, translations: TranslationDictionary): T {
  if (typeof value === "string") {
    return (translations[value] ?? value) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateHomeContent(item, translations)) as T
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, translateHomeContent(nestedValue, translations)]),
    ) as T
  }

  return value
}

const enTranslations: TranslationDictionary = {
  "Marajo, o destino onde a Amazonia encontra o oceano": "Marajo, where the Amazon meets the ocean",
  "Curadoria premium de experiencias autenticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajo com seguranca e encantamento.": "Premium curation of authentic experiences, smart itineraries, and local partners for travelers who want to discover Marajo with confidence and wonder.",
  "Explorar experiencias": "Explore experiences",
  "Ver roteiros e pacotes": "View itineraries and packages",
  Experiencias: "Experiences",
  Local: "Location",
  Data: "Date",
  Perfil: "Profile",
  Duracao: "Duration",
  "Escolha sua data ideal": "Choose your ideal date",
  "Casal, familia ou aventura": "Couple, family, or adventure",
  "3h, 1 dia ou 2 dias": "3h, 1 day, or 2 days",
  "Buscar experiencias": "Search experiences",
  Destinos: "Destinations",
  Estilo: "Style",
  Quando: "When",
  Interesses: "Interests",
  "Praias, manguezais ou fazendas": "Beaches, mangroves, or farms",
  "Melhor epoca para visitar": "Best season to visit",
  "Cultura, natureza, gastronomia": "Culture, nature, gastronomy",
  "Explorar destinos": "Explore destinations",
  Roteiros: "Itineraries",
  Grupo: "Group",
  Foco: "Focus",
  Partida: "Departure",
  "3 a 7 dias": "3 to 7 days",
  "Casal, familia, amigos": "Couple, family, friends",
  "Experiencias ou descanso": "Experiences or relaxation",
  "Ver roteiros": "View itineraries",
  Hospedagem: "Stay",
  Cidade: "Town",
  "Boutique, fazenda, praia": "Boutique, farm, beach",
  Quartos: "Rooms",
  "Numero de hospedes": "Number of guests",
  "Ver hospedagens": "View stays",
  "Curadoria local com equipe no Marajo": "Local curation with a team on Marajo",
  "Atendimento humano antes, durante e depois": "Human support before, during, and after the trip",
  "Parceiros licenciados e avaliados": "Licensed and vetted partners",
  "Pagamento seguro e suporte pos-reserva": "Secure payment and post-booking support",
  "experiencias mapeadas": "mapped experiences",
  "parceiros locais": "local partners",
  "avaliacao media": "average rating",
  "roteiros inteligentes": "smart itineraries",
  "Por que Marajo?": "Why Marajo?",
  "Uma ilha com identidade propria: natureza viva, cultura ancestral e experiencias que nao existem em nenhum outro lugar do Brasil.": "An island with its own identity: living nature, ancestral culture, and experiences you will not find anywhere else in Brazil.",
  "Paisagens unicas em escala continental": "Unique landscapes on a continental scale",
  "Campos alagados, praias de agua doce e salgada e manguezais preservados em uma das maiores ilhas fluvio-marinhas do planeta.": "Flooded grasslands, freshwater and saltwater beaches, and preserved mangroves across one of the largest fluvio-marine islands on Earth.",
  "Cultura marajoara viva": "Living Marajoara culture",
  "Ceramica ancestral, sabores amazonicos e comunidades ribeirinhas que transformam cada visita em encontro real.": "Ancestral ceramics, Amazonian flavors, and riverside communities that turn every visit into a real encounter.",
  "Experiencias com bufalos e fazendas": "Buffalo and farm experiences",
  "Passeios de bufalo, producao de queijo marajoara e vivencias de campo que conectam com o ritmo da ilha.": "Buffalo rides, Marajo cheese production, and countryside moments that connect travelers to the island's rhythm.",
  "Acessivel, mas fora do obvio": "Accessible, yet far from obvious",
  "Um destino autentico a poucas horas de Belem, com tempo desacelerado e alto potencial de descoberta.": "An authentic destination just a few hours from Belem, with a slower pace and a high discovery factor.",
  "Experiencia destaque": "Featured experience",
  "Praia do Pesqueiro ao por do sol": "Pesqueiro Beach at sunset",
  "A experiencia mais emblematica do Marajo. Dunas baixas, mar aberto, barracas locais e bufalos integrados a paisagem criam um cenario cinematografico para quem busca beleza e autenticidade.": "Marajo's most emblematic experience. Low dunes, open sea, local beach huts, and buffalo woven into the landscape create a cinematic setting for travelers seeking beauty and authenticity.",
  "Soure - Ilha de Marajo": "Soure - Marajo Island",
  "4 horas": "4 hours",
  "A partir de R$ 250 por pessoa": "From BRL 250 per person",
  "Por do sol sobre o Atlantico": "Sunset over the Atlantic",
  "Trilhas leves com guia local": "Light trails with a local guide",
  "Paradas para fotografia e cultura": "Stops for photography and culture",
  "Reserva com suporte humano": "Booking with human support",
  "Reservar agora": "Book now",
  "Ver detalhes": "View details",
  "As experiencias mais reservadas": "Most-booked experiences",
  "Selecao com base em satisfacao real, infraestrutura local e capacidade de entrega. Compare por perfil e reserve com seguranca.": "Selected based on real satisfaction, local infrastructure, and delivery capacity. Compare by travel profile and book with confidence.",
  Todas: "All",
  Natureza: "Nature",
  Cultura: "Culture",
  Gastronomia: "Food",
  Aventura: "Adventure",
  Familia: "Family",
  "Ver todas as experiencias": "View all experiences",
  "Destinos principais da ilha": "Main island destinations",
  "Escolha sua base e descubra o que cada regiao oferece: praias extensas, cultura marajoara e natureza abundante.": "Choose your base and discover what each region offers: wide beaches, Marajoara culture, and abundant nature.",
  "Roteiros e pacotes pensados para voce": "Itineraries and packages designed for you",
  "Combine experiencias, hospedagens e deslocamentos com flexibilidade. Roteiros prontos ou personalizados com curadoria local.": "Combine experiences, stays, and transfers with flexibility. Ready-made or custom itineraries with local curation.",
  "Ofertas e oportunidades atuais": "Current offers and opportunities",
  "Condicoes especiais com parceiros locais e afiliados, sem comprometer qualidade ou suporte ao viajante.": "Special conditions with local partners and affiliates without compromising quality or traveler support.",
  "Guia de viagem para decidir com confianca": "Travel guide for confident decisions",
  "Informacao pratica e editorial para voce imaginar, comparar e reservar o Marajo certo para o seu perfil.": "Practical and editorial information to help you imagine, compare, and book the Marajo trip that fits your profile.",
  "Quem viaja com a Travel Marajo recomenda": "Travelers recommend Travel Marajo",
  "Prova social real e transparente: viajantes que vieram pela narrativa e ficaram pela entrega.": "Transparent social proof from travelers who came for the story and stayed for the delivery.",
  "Parceiros locais e afiliados estrategicos": "Local partners and strategic affiliates",
  "Trabalhamos com operadores licenciados, pousadas selecionadas e guias locais para garantir seguranca e autenticidade.": "We work with licensed operators, selected inns, and local guides to ensure safety and authenticity.",
  "Receba roteiros secretos e alertas de ofertas": "Get secret itineraries and offer alerts",
  "Uma curadoria mensal com novidades de experiencias, epocas ideais e condicoes exclusivas para quem quer viajar com inteligencia.": "A monthly curation with new experiences, best seasons, and exclusive conditions for travelers who want to book smartly.",
  "Quero receber": "I want updates",
  "Sem spam. Cancelamento em um clique.": "No spam. Unsubscribe in one click.",
}

const esTranslations: TranslationDictionary = {
  "Marajo, o destino onde a Amazonia encontra o oceano": "Marajo, donde la Amazonia se encuentra con el oceano",
  "Curadoria premium de experiencias autenticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajo com seguranca e encantamento.": "Curaduria premium de experiencias autenticas, itinerarios inteligentes y socios locales para quienes quieren vivir lo mejor de la Isla de Marajo con seguridad y encanto.",
  Experiencias: "Experiencias",
  Local: "Lugar",
  Data: "Fecha",
  Perfil: "Perfil",
  Duracao: "Duracion",
  "Escolha sua data ideal": "Elige tu fecha ideal",
  "Casal, familia ou aventura": "Pareja, familia o aventura",
  "Buscar experiencias": "Buscar experiencias",
  Destinos: "Destinos",
  Estilo: "Estilo",
  Quando: "Cuando",
  Interesses: "Intereses",
  "Praias, manguezais ou fazendas": "Playas, manglares o haciendas",
  "Melhor epoca para visitar": "Mejor epoca para visitar",
  "Cultura, natureza, gastronomia": "Cultura, naturaleza, gastronomia",
  "Explorar destinos": "Explorar destinos",
  Roteiros: "Itinerarios",
  Grupo: "Grupo",
  Foco: "Enfoque",
  Partida: "Salida",
  "Casal, familia, amigos": "Pareja, familia, amigos",
  "Experiencias ou descanso": "Experiencias o descanso",
  "Ver roteiros": "Ver itinerarios",
  Hospedagem: "Hospedaje",
  Cidade: "Ciudad",
  "Boutique, fazenda, praia": "Boutique, hacienda, playa",
  Quartos: "Habitaciones",
  "Numero de hospedes": "Numero de huespedes",
  "Ver hospedagens": "Ver hospedajes",
  "Por que Marajo?": "Por que Marajo?",
  "Experiencia destaque": "Experiencia destacada",
  "Praia do Pesqueiro ao por do sol": "Praia do Pesqueiro al atardecer",
  "Reservar agora": "Reservar ahora",
  "Ver detalhes": "Ver detalles",
  "As experiencias mais reservadas": "Las experiencias mas reservadas",
  Todas: "Todas",
  Natureza: "Naturaleza",
  Cultura: "Cultura",
  Gastronomia: "Gastronomia",
  Aventura: "Aventura",
  Familia: "Familia",
  "Ver todas as experiencias": "Ver todas las experiencias",
  "Destinos principais da ilha": "Destinos principales de la isla",
  "Roteiros e pacotes pensados para voce": "Itinerarios y paquetes pensados para ti",
  "Ofertas e oportunidades atuais": "Ofertas y oportunidades actuales",
  "Guia de viagem para decidir com confianca": "Guia de viaje para decidir con confianza",
  "Quem viaja com a Travel Marajo recomenda": "Quienes viajan con Travel Marajo lo recomiendan",
  "Parceiros locais e afiliados estrategicos": "Socios locales y afiliados estrategicos",
  "Receba roteiros secretos e alertas de ofertas": "Recibe itinerarios secretos y alertas de ofertas",
  "Quero receber": "Quiero recibir",
  "Sem spam. Cancelamento em um clique.": "Sin spam. Baja en un clic.",
}

const frTranslations: TranslationDictionary = {
  "Marajo, o destino onde a Amazonia encontra o oceano": "Marajo, la ou l'Amazonie rencontre l'ocean",
  "Curadoria premium de experiencias autenticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajo com seguranca e encantamento.": "Une curation premium d'experiences authentiques, d'itineraires intelligents et de partenaires locaux pour vivre le meilleur de l'ile de Marajo avec confiance et enchantement.",
  Experiencias: "Experiences",
  Local: "Lieu",
  Data: "Date",
  Perfil: "Profil",
  Duracao: "Duree",
  "Escolha sua data ideal": "Choisissez votre date ideale",
  "Casal, familia ou aventura": "Couple, famille ou aventure",
  "Buscar experiencias": "Rechercher des experiences",
  Destinos: "Destinations",
  Estilo: "Style",
  Quando: "Quand",
  Interesses: "Interets",
  "Praias, manguezais ou fazendas": "Plages, mangroves ou fermes",
  "Melhor epoca para visitar": "Meilleure saison pour visiter",
  "Cultura, natureza, gastronomia": "Culture, nature, gastronomie",
  "Explorar destinos": "Explorer les destinations",
  Roteiros: "Itineraires",
  Grupo: "Groupe",
  Foco: "Focus",
  Partida: "Depart",
  "Casal, familia, amigos": "Couple, famille, amis",
  "Experiencias ou descanso": "Experiences ou repos",
  "Ver roteiros": "Voir les itineraires",
  Hospedagem: "Hebergement",
  Cidade: "Ville",
  "Boutique, fazenda, praia": "Boutique, ferme, plage",
  Quartos: "Chambres",
  "Numero de hospedes": "Nombre de voyageurs",
  "Ver hospedagens": "Voir les hebergements",
  "Por que Marajo?": "Pourquoi Marajo ?",
  "Experiencia destaque": "Experience phare",
  "Praia do Pesqueiro ao por do sol": "Praia do Pesqueiro au coucher du soleil",
  "Reservar agora": "Reserver",
  "Ver detalhes": "Voir les details",
  "As experiencias mais reservadas": "Les experiences les plus reservees",
  Todas: "Toutes",
  Natureza: "Nature",
  Cultura: "Culture",
  Gastronomia: "Gastronomie",
  Aventura: "Aventure",
  Familia: "Famille",
  "Ver todas as experiencias": "Voir toutes les experiences",
  "Destinos principais da ilha": "Principales destinations de l'ile",
  "Roteiros e pacotes pensados para voce": "Itineraires et forfaits pensés pour vous",
  "Ofertas e oportunidades atuais": "Offres et opportunites du moment",
  "Guia de viagem para decidir com confianca": "Guide de voyage pour decider en confiance",
  "Quem viaja com a Travel Marajo recomenda": "Les voyageurs recommandent Travel Marajo",
  "Parceiros locais e afiliados estrategicos": "Partenaires locaux et affilies strategiques",
  "Receba roteiros secretos e alertas de ofertas": "Recevez des itineraires secrets et des alertes d'offres",
  "Quero receber": "Je veux les recevoir",
  "Sem spam. Cancelamento em um clique.": "Sans spam. Desinscription en un clic.",
}

homeContentByLocale.en = translateHomeContent(basePtContent, enTranslations)
homeContentByLocale.es = translateHomeContent(basePtContent, esTranslations)
homeContentByLocale.fr = translateHomeContent(basePtContent, frTranslations)

export function getHomeContent(locale: AppLocale): HomeContent {
  return homeContentByLocale[locale] ?? homeContentByLocale.pt
}

export const homeContent: HomeContent = homeContentByLocale.pt
