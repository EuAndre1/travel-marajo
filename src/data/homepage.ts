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
    title: "Marajó, a ilha brasileira onde a Amazônia encontra praias, cultura viva e viagens raras",
    subtitle:
      "Travel Marajó reúne descoberta editorial, curadoria local e reserva com suporte humano para quem quer entender o destino, planejar melhor e viajar com confiança.",
    ctas: {
      primary: "Explorar experiências",
      secondary: "Ver roteiros curados",
    },
    tabs: [
      {
        label: "Experiências",
        fields: [
          { label: "Local", placeholder: "Soure, Salvaterra ou Cachoeira do Arari" },
          { label: "Data", placeholder: "Escolha sua data ideal", type: "date" },
          { label: "Perfil", placeholder: "Casal, família ou aventura" },
          { label: "Duração", placeholder: "3h, 1 dia ou 2 dias" },
        ],
        ctaLabel: "Buscar experiências",
        ctaHref: "/experiencias",
      },
      {
        label: "Destinos",
        fields: [
          { label: "Base", placeholder: "Soure ou Salvaterra" },
          { label: "Estilo", placeholder: "Praias, manguezais ou fazendas" },
          { label: "Quando", placeholder: "Melhor época para visitar" },
          { label: "Interesses", placeholder: "Cultura, natureza, gastronomia" },
        ],
        ctaLabel: "Explorar destinos",
        ctaHref: "/destinos",
      },
      {
        label: "Roteiros",
        fields: [
          { label: "Duração", placeholder: "3 a 7 dias" },
          { label: "Grupo", placeholder: "Casal, família, amigos" },
          { label: "Foco", placeholder: "Experiências ou descanso" },
    { label: "Partida", placeholder: "Belém ou Salvaterra" },
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
          { label: "Quartos", placeholder: "Número de hóspedes" },
        ],
        ctaLabel: "Ver hospedagens",
        ctaHref: "/hotels",
      },
    ],
    trustItems: [
      "Curadoria local com presença real em Marajó",
      "Suporte humano antes, durante e depois da viagem",
      "Parceiros licenciados, selecionados e acompanhados",
      "Reserva segura com apoio após a confirmação",
    ],
    stats: [
      { value: "120+", label: "experiências curadas" },
      { value: "40+", label: "parceiros verificados" },
      { value: "4,9/5", label: "avaliação média" },
      { value: "7", label: "roteiros prontos para reservar" },
    ],
  },
  whyMarajo: {
    title: "Por que Marajó?",
    subtitle:
      "Marajó não é só uma ilha: é um encontro raro entre paisagens amazônicas, cultura marajoara, búfalos, praias e um ritmo de viagem difícil de encontrar em qualquer outro lugar do Brasil.",
    items: [
      {
        title: "Paisagens raras em escala continental",
        description:
          "Campos alagados, praias oceânicas, rios amazônicos e manguezais convivem na mesma viagem em uma das maiores ilhas fluviomarinhas do planeta.",
      },
      {
        title: "Cultura que ainda molda o destino",
        description:
          "Cerâmica ancestral, cozinha regional, comunidades ribeirinhas e um modo de vida que transforma visita em leitura real do território.",
      },
      {
        title: "Búfalos, fazendas e identidade própria",
        description:
          "Do queijo marajoara às vivências rurais, a ilha entrega experiências impossíveis de replicar em outro destino brasileiro.",
      },
      {
        title: "Perto de Belém, longe do óbvio",
        description:
          "A logística é acessível, mas a sensação é de descoberta rara para quem busca Brasil autêntico com mais profundidade.",
      },
    ],
  },
  featureExperience: {
    badge: "Experiência assinatura",
    title: "Praia do Pesqueiro ao pôr do sol",
    description:
      "Um dos momentos mais desejados de Marajó: praia aberta, horizonte amplo, atmosfera local e o pôr do sol que melhor traduz o imaginário da ilha para quem viaja pela primeira vez.",
    location: "Soure - Ilha de Marajó",
    duration: "4 horas",
    price: "A partir de R$ 250 por pessoa",
    highlights: [
      "O pôr do sol mais emblemático da ilha",
      "Leitura clara para a primeira viagem",
      "Paradas com contexto local e fotos fortes",
      "Reserva com suporte humano da equipe",
    ],
    ctas: { primary: "Reservar experiência", secondary: "Entender a experiência" },
    image: sharedImages.featureImage,
    gallery: sharedImages.featureGallery,
  },
  topExperiences: {
    title: "Experiências para descobrir o melhor de Marajó",
    subtitle:
      "Seleção curada para diferentes perfis de viajante, com leitura clara do destino, operação confiável e apoio local do início à reserva.",
    filters: ["Todas", "Natureza", "Cultura", "Gastronomia", "Aventura", "Familia"],
    items: [
      {
        title: "Circuito dos Búfalos e Queijaria",
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
        tags: ["Barco", "Observação de aves"],
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
        tags: ["Praia", "Fotogênico"],
        href: "/experiencias",
      },
      {
        title: "Rota da Cerâmica Marajoara",
        category: "Cultura",
        location: "Cachoeira do Arari",
        duration: "1 dia",
        price: "R$ 320 por pessoa",
        rating: "4,7",
        image: sharedImages.experiences.craft,
        tags: ["Ateliês", "Oficina"],
        href: "/experiencias",
      },
      {
        title: "Canoa pelos igarapés",
        category: "Natureza",
        location: "Salvaterra",
        duration: "3h30",
        price: "R$ 210 por pessoa",
        rating: "4,8",
        image: sharedImages.experiences.canoe,
        tags: ["Igarapes", "Silêncio"],
        href: "/experiencias",
      },
      {
        title: "Sabores do Marajó",
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
    ctaLabel: "Comparar todas as experiências",
    ctaHref: "/experiencias",
  },
  destinations: {
    title: "Destinos para começar a explorar a ilha",
    subtitle:
      "Escolha a base da viagem e entenda que tipo de paisagem, ritmo e experiências cada região entrega melhor.",
    items: [
      {
        name: "Soure",
        description: "Centro turístico com estrutura, praias icônicas e fácil acesso às experiências mais reservadas.",
        image: sharedImages.destinations.soure,
        tag: "Base ideal",
      },
      {
        name: "Salvaterra",
        description: "Porta de entrada para manguezais, igarapés e pousadas charmosas à beira-rio.",
        image: sharedImages.destinations.salvaterra,
        tag: "Natureza",
      },
      {
        name: "Praia do Pesqueiro",
        description: "Cartão-postal do Marajó, com dunas baixas, mar aberto e atmosfera cinematográfica.",
        image: sharedImages.destinations.pesqueiro,
        tag: "Praia icônica",
      },
      {
        name: "Barra Velha",
        description: "Praia tranquila para quem busca silencio, ceu aberto e contemplacao sem pressa.",
        image: sharedImages.destinations.barraVelha,
        tag: "Refúgio",
      },
    ],
  },
  routes: {
    title: "Roteiros curados para viajar com mais clareza",
    subtitle:
      "Jornadas desenhadas para reduzir atrito entre logística, hospedagem e experiências, com espaço para personalização quando fizer sentido.",
    items: [
      {
        title: "Marajó Essencial 4 dias",
        days: "4 dias / 3 noites",
        price: "A partir de R$ 1.590",
        description:
          "Ideal para a primeira leitura de Marajó: praias, búfalos, gastronomia e o clássico pôr do sol do Pesqueiro sem correria.",
        highlights: ["2 experiências guiadas", "Hospedagem bem localizada", "Logística simplificada"],
        image: sharedImages.offers.package,
        href: "/pacotes",
      },
      {
        title: "Marajó Slow 6 dias",
        days: "6 dias / 5 noites",
        price: "A partir de R$ 2.340",
        description:
          "Para quem prefere profundidade: igarapés, comunidades, gastronomia e mais tempo para sentir o ritmo da ilha.",
        highlights: ["3 experiências", "Suporte local dedicado", "Upgrade opcional"],
        image: sharedImages.experiences.mangroves,
        href: "/pacotes",
      },
      {
        title: "Família Marajoara 5 dias",
        days: "5 dias / 4 noites",
        price: "A partir de R$ 2.120",
        description:
          "Pensado para famílias que buscam baixa dificuldade, praias amplas, conforto e experiências que funcionam bem com crianças.",
        highlights: ["Experiências family", "Logística leve", "Boas-vindas assistidas"],
        image: sharedImages.experiences.horseback,
        href: "/pacotes",
      },
    ],
  },
  offers: {
    title: "Oportunidades selecionadas para reservar melhor",
    subtitle:
      "Condições pontuais com parceiros confiáveis para quem quer ganhar eficiência sem abrir mão de contexto e suporte.",
    items: [
      {
        title: "Pousada com café regional incluso",
        description: "Hospedagem com produtos marajoaras e acesso rápido às praias de Soure.",
        price: "A partir de R$ 260/noite",
        badge: "Hospedagem",
        image: sharedImages.offers.hotel,
        href: "/hotels",
      },
      {
        title: "Passeio de búfalo + fazenda",
        description: "Experiência guiada com visita à produção de queijo e degustação local.",
        price: "R$ 210 por pessoa",
        badge: "Experiencia",
        image: sharedImages.offers.tour,
        href: "/experiencias",
      },
      {
        title: "Pacote com traslado fluvial",
        description: "Chegada facilitada com integração Belém-Soure e roteiro essencial.",
        price: "A partir de R$ 1.480",
        badge: "Pacote",
        image: sharedImages.offers.package,
        href: "/pacotes",
      },
    ],
  },
  travelGuide: {
    title: "Travel Journal para decidir com mais confiança",
    subtitle:
      "Guias editoriais e práticos para entender logística, sazonalidade, roteiros e o estilo de viagem que faz mais sentido para o seu perfil.",
    items: [
      {
        title: "Melhor época para visitar o Marajó",
        description: "Compare clima, rios e ritmo do destino antes de escolher suas datas.",
        readTime: "6 min",
        tag: "Planejamento",
        href: "/guia",
      },
      {
        title: "Como chegar: Belém, Salvaterra e Soure",
        description: "Veja como chegar, qual base escolher e o que muda na logística da viagem.",
        readTime: "8 min",
        tag: "Logística",
        href: "/guia",
      },
      {
        title: "Top experiências para casais",
        description: "Uma curadoria de experiências para casais que buscam beleza, ritmo e conforto.",
        readTime: "5 min",
        tag: "Curadoria",
        href: "/guia",
      },
    ],
  },
  socialProof: {
    title: "Viajantes que reservaram com a Travel Marajó",
    subtitle:
      "Relatos de quem usou curadoria, suporte local e operação confiável para transformar pesquisa em viagem bem executada.",
    stats: [
      { value: "4,9", label: "avaliação média" },
      { value: "92%", label: "taxa de recomendação" },
      { value: "24h", label: "tempo médio de resposta" },
    ],
    testimonials: [
      {
        name: "Larissa M.",
        role: "São Paulo",
        quote:
          "O roteiro veio com clareza desde o início. A equipe local resolveu a logística e o Pesqueiro entregou exatamente o que prometeram.",
        rating: "5,0",
      },
      {
        name: "Rafael D.",
        role: "Lisboa",
        quote:
          "Gostei do equilíbrio entre autenticidade e conforto. O passeio de búfalos e a gastronomia deram uma leitura muito mais rica da ilha.",
        rating: "4,9",
      },
      {
        name: "Camila R.",
    role: "Belém",
        quote:
          "Viajei com meus filhos e tudo fluiu com leveza. A curadoria ajudou a escolher o que realmente fazia sentido para a família.",
        rating: "5,0",
      },
    ],
  },
  partners: {
    title: "Rede local que sustenta a experiência",
    subtitle:
      "Operadores, pousadas, barcos, fazendas e guias selecionados para manter o padrão de entrega do começo do planejamento à viagem.",
    items: [
      { name: "Pousada Marajó Boutique", type: "Hospedagem" },
      { name: "Fazenda Campo Vivo", type: "Experiencia" },
      { name: "Navega Marajó", type: "Transporte" },
      { name: "Sabores do Norte", type: "Gastronomia" },
      { name: "Ateliê Marajoara", type: "Cultura" },
      { name: "Guia Ribeirinho", type: "Operação local" },
    ],
  },
  newsletter: {
    title: "Receba inteligência de viagem sobre Marajó",
    subtitle:
      "Uma curadoria periódica com melhores épocas, experiências em alta, janelas sazonais e oportunidades relevantes para decidir melhor.",
    ctaLabel: "Quero receber",
    privacyNote: "Sem spam. Cancelamento em um clique.",
    benefits: ["Melhores épocas e alertas sazonais", "Experiências e roteiros em destaque", "Oportunidades com parceiros selecionados"],
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
  "Marajó, o destino onde a Amazônia encontra o oceano": "Marajo, where the Amazon meets the ocean",
  "Curadoria premium de experiências autênticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajó com segurança e encantamento.": "Premium curation of authentic experiences, smart itineraries, and local partners for travelers who want to discover Marajo with confidence and wonder.",
  "Explorar experiências": "Explore experiences",
  "Ver roteiros e pacotes": "View itineraries and packages",
  Experiências: "Experiences",
  Local: "Location",
  Data: "Date",
  Perfil: "Profile",
  Duração: "Duration",
  "Escolha sua data ideal": "Choose your ideal date",
  "Casal, família ou aventura": "Couple, family, or adventure",
  "3h, 1 dia ou 2 dias": "3h, 1 day, or 2 days",
  "Buscar experiências": "Search experiences",
  Destinos: "Destinations",
  Estilo: "Style",
  Quando: "When",
  Interesses: "Interests",
  "Praias, manguezais ou fazendas": "Beaches, mangroves, or farms",
  "Melhor época para visitar": "Best season to visit",
  "Cultura, natureza, gastronomia": "Culture, nature, gastronomy",
  "Explorar destinos": "Explore destinations",
  Roteiros: "Itineraries",
  Grupo: "Group",
  Foco: "Focus",
  Partida: "Departure",
  "3 a 7 dias": "3 to 7 days",
  "Casal, família, amigos": "Couple, family, friends",
  "Experiências ou descanso": "Experiences or relaxation",
  "Ver roteiros": "View itineraries",
  Hospedagem: "Stay",
  Cidade: "Town",
  "Boutique, fazenda, praia": "Boutique, farm, beach",
  Quartos: "Rooms",
  "Número de hóspedes": "Number of guests",
  "Ver hospedagens": "View stays",
  "Curadoria local com equipe no Marajó": "Local curation with a team on Marajo",
  "Atendimento humano antes, durante e depois": "Human support before, during, and after the trip",
  "Parceiros licenciados e avaliados": "Licensed and vetted partners",
  "Pagamento seguro e suporte pós-reserva": "Secure payment and post-booking support",
  "experiências mapeadas": "mapped experiences",
  "parceiros locais": "local partners",
  "avaliação média": "average rating",
  "roteiros inteligentes": "smart itineraries",
  "Por que Marajó?": "Why Marajo?",
  "Uma ilha com identidade própria: natureza viva, cultura ancestral e experiências que não existem em nenhum outro lugar do Brasil.": "An island with its own identity: living nature, ancestral culture, and experiences you will not find anywhere else in Brazil.",
  "Paisagens únicas em escala continental": "Unique landscapes on a continental scale",
  "Campos alagados, praias de água doce e salgada e manguezais preservados em uma das maiores ilhas flúvio-marinhas do planeta.": "Flooded grasslands, freshwater and saltwater beaches, and preserved mangroves across one of the largest fluvio-marine islands on Earth.",
  "Cultura marajoara viva": "Living Marajoara culture",
  "Cerâmica ancestral, sabores amazônicos e comunidades ribeirinhas que transformam cada visita em encontro real.": "Ancestral ceramics, Amazonian flavors, and riverside communities that turn every visit into a real encounter.",
  "Experiências com búfalos e fazendas": "Buffalo and farm experiences",
  "Passeios de búfalo, produção de queijo marajoara e vivências de campo que conectam com o ritmo da ilha.": "Buffalo rides, Marajo cheese production, and countryside moments that connect travelers to the island's rhythm.",
  "Acessível, mas fora do óbvio": "Accessible, yet far from obvious",
    "Um destino autêntico a poucas horas de Belém, com tempo desacelerado e alto potencial de descoberta.": "An authentic destination just a few hours from Belém, with a slower pace and a high discovery factor.",
  "Experiência destaque": "Featured experience",
  "Praia do Pesqueiro ao pôr do sol": "Pesqueiro Beach at sunset",
  "A experiência mais emblemática do Marajó. Dunas baixas, mar aberto, barracas locais e búfalos integrados à paisagem criam um cenário cinematográfico para quem busca beleza e autenticidade.": "Marajo's most emblematic experience. Low dunes, open sea, local beach huts, and buffalo woven into the landscape create a cinematic setting for travelers seeking beauty and authenticity.",
    "Soure - Ilha de Marajó": "Soure - Marajó Island",
  "4 horas": "4 hours",
  "A partir de R$ 250 por pessoa": "From BRL 250 per person",
  "Pôr do sol sobre o Atlântico": "Sunset over the Atlantic",
  "Trilhas leves com guia local": "Light trails with a local guide",
  "Paradas para fotografia e cultura": "Stops for photography and culture",
  "Reserva com suporte humano": "Booking with human support",
  "Reservar agora": "Book now",
  "Ver detalhes": "View details",
  "As experiências mais reservadas": "Most-booked experiences",
  "Seleção com base em satisfação real, infraestrutura local e capacidade de entrega. Compare por perfil e reserve com segurança.": "Selected based on real satisfaction, local infrastructure, and delivery capacity. Compare by travel profile and book with confidence.",
  Todas: "All",
  Natureza: "Nature",
  Cultura: "Culture",
  Gastronomia: "Food",
  Aventura: "Adventure",
  Familia: "Family",
  "Ver todas as experiências": "View all experiences",
  "Destinos principais da ilha": "Main island destinations",
  "Escolha sua base e descubra o que cada região oferece: praias extensas, cultura marajoara e natureza abundante.": "Choose your base and discover what each region offers: wide beaches, Marajoara culture, and abundant nature.",
  "Roteiros e pacotes pensados para você": "Itineraries and packages designed for you",
  "Combine experiências, hospedagens e deslocamentos com flexibilidade. Roteiros prontos ou personalizados com curadoria local.": "Combine experiences, stays, and transfers with flexibility. Ready-made or custom itineraries with local curation.",
  "Ofertas e oportunidades atuais": "Current offers and opportunities",
  "Condições especiais com parceiros locais e afiliados, sem comprometer qualidade ou suporte ao viajante.": "Special conditions with local partners and affiliates without compromising quality or traveler support.",
  "Guia de viagem para decidir com confiança": "Travel guide for confident decisions",
  "Informação prática e editorial para você imaginar, comparar e reservar o Marajó certo para o seu perfil.": "Practical and editorial information to help you imagine, compare, and book the Marajo trip that fits your profile.",
    "Quem viaja com a Travel Marajó recomenda": "Travelers recommend Travel Marajó",
  "Prova social real e transparente: viajantes que vieram pela narrativa e ficaram pela entrega.": "Transparent social proof from travelers who came for the story and stayed for the delivery.",
  "Parceiros locais e afiliados estratégicos": "Local partners and strategic affiliates",
  "Trabalhamos com operadores licenciados, pousadas selecionadas e guias locais para garantir segurança e autenticidade.": "We work with licensed operators, selected inns, and local guides to ensure safety and authenticity.",
  "Receba roteiros secretos e alertas de ofertas": "Get secret itineraries and offer alerts",
  "Uma curadoria mensal com novidades de experiências, épocas ideais e condições exclusivas para quem quer viajar com inteligência.": "A monthly curation with new experiences, best seasons, and exclusive conditions for travelers who want to book smartly.",
  "Quero receber": "I want updates",
  "Sem spam. Cancelamento em um clique.": "No spam. Unsubscribe in one click.",
}

const esTranslations: TranslationDictionary = {
  "Marajó, o destino onde a Amazônia encontra o oceano": "Marajo, donde la Amazonia se encuentra con el oceano",
  "Curadoria premium de experiências autênticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajó com segurança e encantamento.": "Curaduria premium de experiencias autenticas, itinerarios inteligentes y socios locales para quienes quieren vivir lo mejor de la Isla de Marajo con seguridad y encanto.",
  Experiências: "Experiências",
  Local: "Lugar",
  Data: "Fecha",
  Perfil: "Perfil",
  Duração: "Duracion",
  "Escolha sua data ideal": "Elige tu fecha ideal",
  "Casal, família ou aventura": "Pareja, familia o aventura",
  "Buscar experiências": "Buscar experiencias",
  Destinos: "Destinos",
  Estilo: "Estilo",
  Quando: "Cuando",
  Interesses: "Intereses",
  "Praias, manguezais ou fazendas": "Playas, manglares o haciendas",
  "Melhor época para visitar": "Mejor epoca para visitar",
  "Cultura, natureza, gastronomia": "Cultura, naturaleza, gastronomia",
  "Explorar destinos": "Explorar destinos",
  Roteiros: "Itinerarios",
  Grupo: "Grupo",
  Foco: "Enfoque",
  Partida: "Salida",
  "Casal, família, amigos": "Pareja, familia, amigos",
  "Experiências ou descanso": "Experiências o descanso",
  "Ver roteiros": "Ver itinerarios",
  Hospedagem: "Hospedaje",
  Cidade: "Ciudad",
  "Boutique, fazenda, praia": "Boutique, hacienda, playa",
  Quartos: "Habitaciones",
  "Número de hóspedes": "Numero de huespedes",
  "Ver hospedagens": "Ver hospedajes",
  "Por que Marajó?": "Por que Marajó?",
  "Experiência destaque": "Experiencia destacada",
  "Praia do Pesqueiro ao pôr do sol": "Praia do Pesqueiro al atardecer",
  "Reservar agora": "Reservar ahora",
  "Ver detalhes": "Ver detalles",
  "As experiências mais reservadas": "Las experiencias mas reservadas",
  Todas: "Todas",
  Natureza: "Naturaleza",
  Cultura: "Cultura",
  Gastronomia: "Gastronomia",
  Aventura: "Aventura",
  Familia: "Familia",
  "Ver todas as experiências": "Ver todas las experiencias",
  "Destinos principais da ilha": "Destinos principales de la isla",
  "Roteiros e pacotes pensados para você": "Itinerarios y paquetes pensados para ti",
  "Ofertas e oportunidades atuais": "Ofertas y oportunidades actuales",
  "Guia de viagem para decidir com confiança": "Guia de viaje para decidir con confianza",
    "Quem viaja com a Travel Marajó recomenda": "Quienes viajan con Travel Marajó lo recomiendan",
  "Parceiros locais e afiliados estratégicos": "Socios locales y afiliados estrategicos",
  "Receba roteiros secretos e alertas de ofertas": "Recibe itinerarios secretos y alertas de ofertas",
  "Quero receber": "Quiero recibir",
  "Sem spam. Cancelamento em um clique.": "Sin spam. Baja en un clic.",
}

const frTranslations: TranslationDictionary = {
  "Marajó, o destino onde a Amazônia encontra o oceano": "Marajo, la ou l'Amazonie rencontre l'ocean",
  "Curadoria premium de experiências autênticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajó com segurança e encantamento.": "Une curation premium d'experiences authentiques, d'itineraires intelligents et de partenaires locaux pour vivre le meilleur de l'ile de Marajo avec confiance et enchantement.",
  Experiências: "Experiences",
  Local: "Lieu",
  Data: "Date",
  Perfil: "Profil",
  Duração: "Duree",
  "Escolha sua data ideal": "Choisissez votre date ideale",
  "Casal, família ou aventura": "Couple, famille ou aventure",
  "Buscar experi?ncias": "Rechercher des experiences",
  Destinos: "Destinations",
  Estilo: "Style",
  Quando: "Quand",
  Interesses: "Interets",
  "Praias, manguezais ou fazendas": "Plages, mangroves ou fermes",
  "Melhor época para visitar": "Meilleure saison pour visiter",
  "Cultura, natureza, gastronomia": "Culture, nature, gastronomie",
  "Explorar destinos": "Explorer les destinations",
  Roteiros: "Itineraires",
  Grupo: "Groupe",
  Foco: "Focus",
  Partida: "Depart",
  "Casal, família, amigos": "Couple, famille, amis",
  "Experiências ou descanso": "Experiences ou repos",
  "Ver roteiros": "Voir les itineraires",
  Hospedagem: "Hebergement",
  Cidade: "Ville",
  "Boutique, fazenda, praia": "Boutique, ferme, plage",
  Quartos: "Chambres",
  "Número de hóspedes": "Nombre de voyageurs",
  "Ver hospedagens": "Voir les hebergements",
  "Por que Marajó?": "Pourquoi Marajo ?",
  "Experiência destaque": "Experience phare",
  "Praia do Pesqueiro ao pôr do sol": "Praia do Pesqueiro au coucher du soleil",
  "Reservar agora": "Reserver",
  "Ver detalhes": "Voir les details",
  "As experiências mais reservadas": "Les experiences les plus reservees",
  Todas: "Toutes",
  Natureza: "Nature",
  Cultura: "Culture",
  Gastronomia: "Gastronomie",
  Aventura: "Aventure",
  Familia: "Famille",
  "Ver todas as experiências": "Voir toutes les experiences",
  "Destinos principais da ilha": "Principales destinations de l'ile",
  "Roteiros e pacotes pensados para você": "Itineraires et forfaits pensés pour vous",
  "Ofertas e oportunidades atuais": "Offres et opportunites du moment",
  "Guia de viagem para decidir com confiança": "Guide de voyage pour decider en confiance",
    "Quem viaja com a Travel Marajó recomenda": "Les voyageurs recommandent Travel Marajó",
  "Parceiros locais e afiliados estratégicos": "Partenaires locaux et affilies strategiques",
  "Receba roteiros secretos e alertas de ofertas": "Recevez des itineraires secrets et des alertes d'offres",
  "Quero receber": "Je veux les recevoir",
  "Sem spam. Cancelamento em um clique.": "Sans spam. Desinscription en un clic.",
}

Object.assign(enTranslations, {
  "Marajó, a ilha brasileira onde a Amazônia encontra praias, cultura viva e viagens raras":
    "Marajo, the Brazilian island where the Amazon meets beaches, living culture, and rare journeys",
  "Travel Marajó reúne descoberta editorial, curadoria local e reserva com suporte humano para quem quer entender o destino, planejar melhor e viajar com confiança.":
    "Travel Marajo brings together editorial discovery, local curation, and booking with human support for travelers who want to understand the destination, plan better, and travel with confidence.",
  "Ver roteiros curados": "View curated itineraries",
  "Curadoria local com presença real em Marajó": "Local curation with an on-island presence in Marajo",
  "Suporte humano antes, durante e depois da viagem": "Human support before, during, and after the trip",
  "Parceiros licenciados, selecionados e acompanhados": "Licensed, selected, and monitored partners",
  "Reserva segura com apoio após a confirmação": "Secure booking with support after confirmation",
  "experiências curadas": "curated experiences",
  "parceiros verificados": "verified partners",
  "roteiros prontos para reservar": "ready-to-book itineraries",
  "Marajó não é só uma ilha: é um encontro raro entre paisagens amazônicas, cultura marajoara, búfalos, praias e um ritmo de viagem difícil de encontrar em qualquer outro lugar do Brasil.":
    "Marajo is not just an island: it is a rare meeting point of Amazonian landscapes, Marajoara culture, buffalo heritage, beaches, and a travel rhythm that is hard to find anywhere else in Brazil.",
  "Paisagens raras em escala continental": "Rare landscapes on a continental scale",
  "Campos alagados, praias oceânicas, rios amazônicos e manguezais convivem na mesma viagem em uma das maiores ilhas fluviomarinhas do planeta.":
    "Flooded fields, ocean beaches, Amazonian rivers, and mangroves coexist in the same trip across one of the planet's largest fluvio-marine islands.",
  "Cultura que ainda molda o destino": "A culture that still shapes the destination",
  "Cerâmica ancestral, cozinha regional, comunidades ribeirinhas e um modo de vida que transforma visita em leitura real do território.":
    "Ancestral ceramics, regional cuisine, riverside communities, and a way of life that turns a visit into a real reading of the territory.",
  "Búfalos, fazendas e identidade própria": "Buffalo, ranches, and a distinct identity",
  "Do queijo marajoara às vivências rurais, a ilha entrega experiências impossíveis de replicar em outro destino brasileiro.":
    "From Marajoara cheese to rural encounters, the island delivers experiences that are impossible to replicate in any other Brazilian destination.",
    "Perto de Belém, longe do óbvio": "Close to Belém, far from obvious",
  "A logística é acessível, mas a sensação é de descoberta rara para quem busca Brasil autêntico com mais profundidade.":
    "Logistics are accessible, but the feeling is one of rare discovery for travelers seeking a more authentic Brazil.",
  "Experiência assinatura": "Signature experience",
  "Um dos momentos mais desejados de Marajó: praia aberta, horizonte amplo, atmosfera local e o pôr do sol que melhor traduz o imaginário da ilha para quem viaja pela primeira vez.":
    "One of Marajo's most desired moments: open beach, wide horizons, local atmosphere, and the sunset that best translates the island's imagery for first-time travelers.",
  "O pôr do sol mais emblemático da ilha": "The island's most emblematic sunset",
  "Leitura clara para a primeira viagem": "Clear fit for a first trip",
  "Paradas com contexto local e fotos fortes": "Stops with local context and strong photo moments",
  "Reserva com suporte humano da equipe": "Booking with direct team support",
  "Reservar experiência": "Book experience",
  "Entender a experiência": "Understand the experience",
  "Experiências para descobrir o melhor de Marajó": "Experiences to discover the best of Marajo",
  "Seleção curada para diferentes perfis de viajante, com leitura clara do destino, operação confiável e apoio local do início à reserva.":
    "A curated selection for different traveler profiles, with clear destination reading, reliable operation, and local support from first look to booking.",
  "Comparar todas as experiências": "Compare all experiences",
  "Destinos para começar a explorar a ilha": "Destinations to begin exploring the island",
  "Escolha a base da viagem e entenda que tipo de paisagem, ritmo e experiências cada região entrega melhor.":
    "Choose your travel base and understand what kind of landscapes, pace, and experiences each region delivers best.",
  "Roteiros curados para viajar com mais clareza": "Curated itineraries for traveling with more clarity",
  "Jornadas desenhadas para reduzir atrito entre logística, hospedagem e experiências, com espaço para personalização quando fizer sentido.":
    "Journeys designed to reduce friction between logistics, stays, and experiences, with room for personalization when it truly helps.",
  "Ideal para a primeira leitura de Marajó: praias, búfalos, gastronomia e o clássico pôr do sol do Pesqueiro sem correria.":
    "Ideal for a first reading of Marajo: beaches, buffalo culture, gastronomy, and the classic Pesqueiro sunset without rushing.",
  "Hospedagem bem localizada": "Well-located stay",
  "Logística simplificada": "Simplified logistics",
  "Para quem prefere profundidade: igarapés, comunidades, gastronomia e mais tempo para sentir o ritmo da ilha.":
    "For travelers who prefer depth: waterways, communities, gastronomy, and more time to feel the island's pace.",
  "Suporte local dedicado": "Dedicated local support",
  "Pensado para famílias que buscam baixa dificuldade, praias amplas, conforto e experiências que funcionam bem com crianças.":
    "Designed for families seeking low difficulty, wide beaches, comfort, and experiences that work well with children.",
  "Boas-vindas assistidas": "Assisted welcome",
  "Oportunidades selecionadas para reservar melhor": "Carefully selected opportunities for better booking",
  "Condições pontuais com parceiros confiáveis para quem quer ganhar eficiência sem abrir mão de contexto e suporte.":
    "Timely conditions with reliable partners for travelers who want more efficiency without losing context or support.",
  "Travel Journal para decidir com mais confiança": "Travel Journal for more confident decisions",
  "Guias editoriais e práticos para entender logística, sazonalidade, roteiros e o estilo de viagem que faz mais sentido para o seu perfil.":
    "Editorial and practical guides to understand logistics, seasonality, itineraries, and the travel style that best fits your profile.",
  "Compare clima, rios e ritmo do destino antes de escolher suas datas.": "Compare climate, rivers, and travel rhythm before choosing your dates.",
  "Veja como chegar, qual base escolher e o que muda na logística da viagem.": "See how to get there, which base to choose, and what changes in the island logistics.",
  "Uma curadoria de experiências para casais que buscam beleza, ritmo e conforto.":
    "A curation of experiences for couples seeking beauty, rhythm, and comfort.",
  "Viajantes que reservaram com a Travel Marajó": "Travelers who booked with Travel Marajo",
  "Relatos de quem usou curadoria, suporte local e operação confiável para transformar pesquisa em viagem bem executada.":
    "Stories from travelers who used curation, local support, and reliable delivery to turn research into a well-executed trip.",
  "O roteiro veio com clareza desde o início. A equipe local resolveu a logística e o Pesqueiro entregou exatamente o que prometeram.":
    "The itinerary felt clear from the start. The local team solved the logistics and Pesqueiro delivered exactly what was promised.",
  "Gostei do equilíbrio entre autenticidade e conforto. O passeio de búfalos e a gastronomia deram uma leitura muito mais rica da ilha.":
    "I loved the balance between authenticity and comfort. The buffalo experience and the food gave me a much richer understanding of the island.",
  "Viajei com meus filhos e tudo fluiu com leveza. A curadoria ajudou a escolher o que realmente fazia sentido para a família.":
    "I traveled with my children and everything flowed easily. The curation helped us choose what truly made sense for the family.",
  "Rede local que sustenta a experiência": "The local network behind the experience",
  "Operadores, pousadas, barcos, fazendas e guias selecionados para manter o padrão de entrega do começo do planejamento à viagem.":
    "Operators, stays, boats, farms, and guides selected to keep delivery standards high from planning to travel.",
  "Receba inteligência de viagem sobre Marajó": "Receive Marajo travel intelligence",
  "Uma curadoria periódica com melhores épocas, experiências em alta, janelas sazonais e oportunidades relevantes para decidir melhor.":
    "A periodic curation with the best seasons, rising experiences, seasonal windows, and relevant opportunities for better decisions.",
  "Melhores épocas e alertas sazonais": "Best seasons and seasonal alerts",
  "Experiências e roteiros em destaque": "Highlight experiences and itineraries",
  "Oportunidades com parceiros selecionados": "Opportunities with selected partners",
})

Object.assign(esTranslations, {
  "Marajó, a ilha brasileira onde a Amazônia encontra praias, cultura viva e viagens raras":
    "Marajo, la isla brasilena donde la Amazonia se encuentra con playas, cultura viva y viajes raros",
  "Travel Marajó reúne descoberta editorial, curadoria local e reserva com suporte humano para quem quer entender o destino, planejar melhor e viajar com confiança.":
    "Travel Marajo une descubrimiento editorial, curaduria local y reserva con apoyo humano para quienes quieren entender el destino, planificar mejor y viajar con confianza.",
  "Ver roteiros curados": "Ver itinerarios curados",
  "Curadoria local com presença real em Marajó": "Curaduria local con presencia real en Marajo",
  "Suporte humano antes, durante e depois da viagem": "Soporte humano antes, durante y despues del viaje",
  "Parceiros licenciados, selecionados e acompanhados": "Socios licenciados, seleccionados y supervisados",
  "Reserva segura com apoio após a confirmação": "Reserva segura con apoyo despues de la confirmacion",
  "experiências curadas": "experiencias curadas",
  "parceiros verificados": "socios verificados",
  "roteiros prontos para reservar": "itinerarios listos para reservar",
  "Marajó não é só uma ilha: é um encontro raro entre paisagens amazônicas, cultura marajoara, búfalos, praias e um ritmo de viagem difícil de encontrar em qualquer outro lugar do Brasil.":
    "Marajo no es solo una isla: es un encuentro raro entre paisajes amazonicos, cultura marajoara, bufalos, playas y un ritmo de viaje dificil de encontrar en cualquier otro lugar de Brasil.",
  "Paisagens raras em escala continental": "Paisajes raros a escala continental",
  "Campos alagados, praias oceânicas, rios amazônicos e manguezais convivem na mesma viagem em uma das maiores ilhas fluviomarinhas do planeta.":
    "Campos inundables, playas oceanicas, rios amazonicos y manglares conviven en un mismo viaje dentro de una de las mayores islas fluviomarinhas del planeta.",
  "Cultura que ainda molda o destino": "Una cultura que todavia moldea el destino",
  "Cerâmica ancestral, cozinha regional, comunidades ribeirinhas e um modo de vida que transforma visita em leitura real do território.":
    "Ceramica ancestral, cocina regional, comunidades riberenas y una forma de vida que convierte la visita en una lectura real del territorio.",
  "Búfalos, fazendas e identidade própria": "Bufalos, haciendas e identidad propia",
  "Do queijo marajoara às vivências rurais, a ilha entrega experiências impossíveis de replicar em outro destino brasileiro.":
    "Del queso marajoara a las vivencias rurales, la isla ofrece experiencias imposibles de replicar en otro destino brasileno.",
    "Perto de Belém, longe do óbvio": "Cerca de Belém, lejos de lo obvio",
  "A logística é acessível, mas a sensação é de descoberta rara para quem busca Brasil autêntico com mais profundidade.":
    "La logistica es accesible, pero la sensacion es de descubrimiento raro para quienes buscan un Brasil autentico con mas profundidad.",
  "Experiência assinatura": "Experiencia insignia",
  "Um dos momentos mais desejados de Marajó: praia aberta, horizonte amplo, atmosfera local e o pôr do sol que melhor traduz o imaginário da ilha para quem viaja pela primeira vez.":
    "Uno de los momentos mas deseados de Marajo: playa abierta, horizonte amplio, atmosfera local y el atardecer que mejor traduce el imaginario de la isla para quien viaja por primera vez.",
  "O pôr do sol mais emblemático da ilha": "El atardecer mas emblematico de la isla",
  "Leitura clara para a primeira viagem": "Lectura clara para un primer viaje",
  "Paradas com contexto local e fotos fortes": "Paradas con contexto local y grandes momentos fotograficos",
  "Reserva com suporte humano da equipe": "Reserva con apoyo humano del equipo",
  "Reservar experiência": "Reservar experiencia",
  "Entender a experiência": "Entender la experiencia",
  "Experiências para descobrir o melhor de Marajó": "Experiencias para descubrir lo mejor de Marajo",
  "Seleção curada para diferentes perfis de viajante, com leitura clara do destino, operação confiável e apoio local do início à reserva.":
    "Seleccion curada para distintos perfiles de viajero, con una lectura clara del destino, operacion confiable y apoyo local desde el primer vistazo hasta la reserva.",
  "Comparar todas as experiências": "Comparar todas las experiencias",
  "Destinos para começar a explorar a ilha": "Destinos para empezar a explorar la isla",
  "Escolha a base da viagem e entenda que tipo de paisagem, ritmo e experiências cada região entrega melhor.":
    "Elige la base del viaje y entiende que tipo de paisaje, ritmo y experiencias ofrece mejor cada region.",
  "Roteiros curados para viajar com mais clareza": "Itinerarios curados para viajar con mas claridad",
  "Jornadas desenhadas para reduzir atrito entre logística, hospedagem e experiências, com espaço para personalização quando fizer sentido.":
    "Viajes pensados para reducir friccion entre logistica, hospedaje y experiencias, con espacio para personalizacion cuando realmente aporte valor.",
  "Ideal para a primeira leitura de Marajó: praias, búfalos, gastronomia e o clássico pôr do sol do Pesqueiro sem correria.":
    "Ideal para una primera lectura de Marajo: playas, bufalos, gastronomia y el clasico atardecer de Pesqueiro sin prisas.",
  "Hospedagem bem localizada": "Hospedaje bien ubicado",
  "Logística simplificada": "Logistica simplificada",
  "Para quem prefere profundidade: igarapés, comunidades, gastronomia e mais tempo para sentir o ritmo da ilha.":
    "Para quienes prefieren profundidad: igarapes, comunidades, gastronomia y mas tiempo para sentir el ritmo de la isla.",
  "Suporte local dedicado": "Soporte local dedicado",
  "Pensado para famílias que buscam baixa dificuldade, praias amplas, conforto e experiências que funcionam bem com crianças.":
    "Pensado para familias que buscan baja dificultad, playas amplias, comodidad y experiencias que funcionan bien con ninos.",
  "Boas-vindas assistidas": "Bienvenida asistida",
  "Oportunidades selecionadas para reservar melhor": "Oportunidades seleccionadas para reservar mejor",
  "Condições pontuais com parceiros confiáveis para quem quer ganhar eficiência sem abrir mão de contexto e suporte.":
    "Condiciones puntuales con socios confiables para quienes quieren ganar eficiencia sin perder contexto ni apoyo.",
  "Travel Journal para decidir com mais confiança": "Travel Journal para decidir con mas confianza",
  "Guias editoriais e práticos para entender logística, sazonalidade, roteiros e o estilo de viagem que faz mais sentido para o seu perfil.":
    "Guias editoriales y practicos para entender logistica, estacionalidad, itinerarios y el estilo de viaje que mejor encaja con tu perfil.",
  "Compare clima, rios e ritmo do destino antes de escolher suas datas.": "Compara clima, rios y ritmo del destino antes de elegir tus fechas.",
  "Veja como chegar, qual base escolher e o que muda na logística da viagem.": "Entiende como llegar, que base elegir y que cambia en la logistica del viaje.",
  "Uma curadoria de experiências para casais que buscam beleza, ritmo e conforto.":
    "Una curaduria de experiencias para parejas que buscan belleza, ritmo y confort.",
  "Viajantes que reservaram com a Travel Marajó": "Viajeros que reservaron con Travel Marajo",
  "Relatos de quem usou curadoria, suporte local e operação confiável para transformar pesquisa em viagem bem executada.":
    "Relatos de quienes usaron curaduria, apoyo local y una operacion confiable para convertir la investigacion en un viaje bien ejecutado.",
  "O roteiro veio com clareza desde o início. A equipe local resolveu a logística e o Pesqueiro entregou exatamente o que prometeram.":
    "El itinerario llego con claridad desde el inicio. El equipo local resolvio la logistica y Pesqueiro entrego exactamente lo prometido.",
  "Gostei do equilíbrio entre autenticidade e conforto. O passeio de búfalos e a gastronomia deram uma leitura muito mais rica da ilha.":
    "Me gusto el equilibrio entre autenticidad y confort. La experiencia con bufalos y la gastronomia me dieron una lectura mucho mas rica de la isla.",
  "Viajei com meus filhos e tudo fluiu com leveza. A curadoria ajudou a escolher o que realmente fazia sentido para a família.":
    "Viaje con mis hijos y todo fluyo con ligereza. La curaduria nos ayudo a elegir lo que realmente tenia sentido para la familia.",
  "Rede local que sustenta a experiência": "La red local que sostiene la experiencia",
  "Operadores, pousadas, barcos, fazendas e guias selecionados para manter o padrão de entrega do começo do planejamento à viagem.":
    "Operadores, alojamientos, barcos, haciendas y guias seleccionados para mantener el nivel de entrega desde la planificacion hasta el viaje.",
  "Receba inteligência de viagem sobre Marajó": "Recibe inteligencia de viaje sobre Marajo",
  "Uma curadoria periódica com melhores épocas, experiências em alta, janelas sazonais e oportunidades relevantes para decidir melhor.":
    "Una curaduria periodica con mejores temporadas, experiencias en alza, ventanas estacionales y oportunidades relevantes para decidir mejor.",
  "Melhores épocas e alertas sazonais": "Mejores temporadas y alertas estacionales",
  "Experiências e roteiros em destaque": "Experiencias e itinerarios destacados",
  "Oportunidades com parceiros selecionados": "Oportunidades con socios seleccionados",
})

Object.assign(frTranslations, {
  "Marajó, a ilha brasileira onde a Amazônia encontra praias, cultura viva e viagens raras":
    "Marajo, l'ile bresilienne ou l'Amazonie rencontre plages, culture vivante et voyages rares",
  "Travel Marajó reúne descoberta editorial, curadoria local e reserva com suporte humano para quem quer entender o destino, planejar melhor e viajar com confiança.":
    "Travel Marajo reunit decouverte editoriale, curation locale et reservation avec support humain pour les voyageurs qui veulent comprendre la destination, mieux planifier et voyager en confiance.",
  "Ver roteiros curados": "Voir les itineraires cures",
  "Curadoria local com presença real em Marajó": "Curation locale avec presence reelle a Marajo",
  "Suporte humano antes, durante e depois da viagem": "Support humain avant, pendant et apres le voyage",
  "Parceiros licenciados, selecionados e acompanhados": "Partenaires agrees, selectionnes et suivis",
  "Reserva segura com apoio após a confirmação": "Reservation sure avec accompagnement apres confirmation",
  "experiências curadas": "experiences curees",
  "parceiros verificados": "partenaires verifies",
  "roteiros prontos para reservar": "itineraires prets a reserver",
  "Marajó não é só uma ilha: é um encontro raro entre paisagens amazônicas, cultura marajoara, búfalos, praias e um ritmo de viagem difícil de encontrar em qualquer outro lugar do Brasil.":
    "Marajo n'est pas seulement une ile : c'est une rencontre rare entre paysages amazoniens, culture marajoara, buffles, plages et un rythme de voyage difficile a trouver ailleurs au Bresil.",
  "Paisagens raras em escala continental": "Paysages rares a l'echelle continentale",
  "Campos alagados, praias oceânicas, rios amazônicos e manguezais convivem na mesma viagem em uma das maiores ilhas fluviomarinhas do planeta.":
    "Champs inondes, plages oceaniques, rivieres amazoniennes et mangroves coexistent dans un meme voyage sur l'une des plus grandes iles fluviomarines de la planete.",
  "Cultura que ainda molda o destino": "Une culture qui continue de faconner la destination",
  "Cerâmica ancestral, cozinha regional, comunidades ribeirinhas e um modo de vida que transforma visita em leitura real do território.":
    "Ceramique ancestrale, cuisine regionale, communautes riveraines et mode de vie qui transforment la visite en lecture reelle du territoire.",
  "Búfalos, fazendas e identidade própria": "Buffles, fermes et identite propre",
  "Do queijo marajoara às vivências rurais, a ilha entrega experiências impossíveis de replicar em outro destino brasileiro.":
    "Du fromage marajoara aux experiences rurales, l'ile propose des moments impossibles a reproduire dans une autre destination bresilienne.",
    "Perto de Belém, longe do óbvio": "Près de Belém, loin de l'évidence",
  "A logística é acessível, mas a sensação é de descoberta rara para quem busca Brasil autêntico com mais profundidade.":
    "La logistique reste accessible, mais la sensation est celle d'une decouverte rare pour les voyageurs qui cherchent un Bresil plus authentique.",
  "Experiência assinatura": "Experience signature",
  "Um dos momentos mais desejados de Marajó: praia aberta, horizonte amplo, atmosfera local e o pôr do sol que melhor traduz o imaginário da ilha para quem viaja pela primeira vez.":
    "L'un des moments les plus desires de Marajo : plage ouverte, horizon large, atmosphere locale et coucher de soleil qui traduit le mieux l'imaginaire de l'ile pour une premiere visite.",
  "O pôr do sol mais emblemático da ilha": "Le coucher de soleil le plus emblematique de l'ile",
  "Leitura clara para a primeira viagem": "Lecture claire pour un premier voyage",
  "Paradas com contexto local e fotos fortes": "Pauses avec contexte local et moments photo forts",
  "Reserva com suporte humano da equipe": "Reservation avec support humain de l'equipe",
  "Reservar experiência": "Reserver l'experience",
  "Entender a experiência": "Comprendre l'experience",
  "Experiências para descobrir o melhor de Marajó": "Experiences pour decouvrir le meilleur de Marajo",
  "Seleção curada para diferentes perfis de viajante, com leitura clara do destino, operação confiável e apoio local do início à reserva.":
    "Selection curee pour differents profils de voyageurs, avec une lecture claire de la destination, une operation fiable et un support local du premier regard jusqu'a la reservation.",
  "Comparar todas as experiências": "Comparer toutes les experiences",
  "Destinos para começar a explorar a ilha": "Destinations pour commencer a explorer l'ile",
  "Escolha a base da viagem e entenda que tipo de paisagem, ritmo e experiências cada região entrega melhor.":
    "Choisissez votre base de voyage et comprenez quel type de paysages, de rythme et d'experiences chaque region offre le mieux.",
  "Roteiros curados para viajar com mais clareza": "Itineraires cures pour voyager avec plus de clarte",
  "Jornadas desenhadas para reduzir atrito entre logística, hospedagem e experiências, com espaço para personalização quando fizer sentido.":
    "Voyages concus pour reduire la friction entre logistique, hebergement et experiences, avec de la place pour la personnalisation quand elle apporte vraiment quelque chose.",
  "Ideal para a primeira leitura de Marajó: praias, búfalos, gastronomia e o clássico pôr do sol do Pesqueiro sem correria.":
    "Ideal pour une premiere lecture de Marajo : plages, buffles, gastronomie et le classique coucher de soleil de Pesqueiro sans se presser.",
  "Hospedagem bem localizada": "Hebergement bien situe",
  "Logística simplificada": "Logistique simplifiee",
  "Para quem prefere profundidade: igarapés, comunidades, gastronomia e mais tempo para sentir o ritmo da ilha.":
    "Pour les voyageurs qui cherchent plus de profondeur : igarapes, communautes, gastronomie et davantage de temps pour sentir le rythme de l'ile.",
  "Suporte local dedicado": "Support local dedie",
  "Pensado para famílias que buscam baixa dificuldade, praias amplas, conforto e experiências que funcionam bem com crianças.":
    "Pense pour les familles qui recherchent faible difficulte, grandes plages, confort et experiences adaptees aux enfants.",
  "Boas-vindas assistidas": "Accueil assiste",
  "Oportunidades selecionadas para reservar melhor": "Opportunites selectionnees pour mieux reserver",
  "Condições pontuais com parceiros confiáveis para quem quer ganhar eficiência sem abrir mão de contexto e suporte.":
    "Conditions ponctuelles avec des partenaires fiables pour gagner en efficacite sans perdre le contexte ni l'accompagnement.",
  "Travel Journal para decidir com mais confiança": "Travel Journal pour decider avec plus de confiance",
  "Guias editoriais e práticos para entender logística, sazonalidade, roteiros e o estilo de viagem que faz mais sentido para o seu perfil.":
    "Guides editoriaux et pratiques pour comprendre logistique, saisonnalite, itineraires et style de voyage le plus adapte a votre profil.",
  "Compare clima, rios e ritmo do destino antes de escolher suas datas.": "Comparez climat, rivieres et rythme du voyage avant de choisir vos dates.",
  "Veja como chegar, qual base escolher e o que muda na logística da viagem.": "Voyez comment arriver, quelle base choisir et ce qui change dans la logistique du voyage.",
  "Uma curadoria de experiências para casais que buscam beleza, ritmo e conforto.":
    "Une curation d'experiences pour les couples qui cherchent beaute, rythme et confort.",
  "Viajantes que reservaram com a Travel Marajó": "Voyageurs ayant reserve avec Travel Marajo",
  "Relatos de quem usou curadoria, suporte local e operação confiável para transformar pesquisa em viagem bem executada.":
    "Recits de voyageurs qui ont utilise curation, support local et execution fiable pour transformer leur recherche en voyage bien mene.",
  "O roteiro veio com clareza desde o início. A equipe local resolveu a logística e o Pesqueiro entregou exatamente o que prometeram.":
    "L'itineraire etait clair des le debut. L'equipe locale a gere la logistique et Pesqueiro a livre exactement ce qui etait promis.",
  "Gostei do equilíbrio entre autenticidade e conforto. O passeio de búfalos e a gastronomia deram uma leitura muito mais rica da ilha.":
    "J'ai aime l'equilibre entre authenticite et confort. L'experience des buffles et la gastronomie m'ont donne une lecture bien plus riche de l'ile.",
  "Viajei com meus filhos e tudo fluiu com leveza. A curadoria ajudou a escolher o que realmente fazia sentido para a família.":
    "J'ai voyage avec mes enfants et tout a ete fluide. La curation nous a aides a choisir ce qui avait vraiment du sens pour la famille.",
  "Rede local que sustenta a experiência": "Le reseau local qui soutient l'experience",
  "Operadores, pousadas, barcos, fazendas e guias selecionados para manter o padrão de entrega do começo do planejamento à viagem.":
    "Operateurs, hebergements, bateaux, fermes et guides selectionnes pour maintenir un niveau d'execution eleve du debut de la planification jusqu'au voyage.",
  "Receba inteligência de viagem sobre Marajó": "Recevez l'intelligence de voyage sur Marajo",
  "Uma curadoria periódica com melhores épocas, experiências em alta, janelas sazonais e oportunidades relevantes para decidir melhor.":
    "Une curation periodique avec les meilleures saisons, les experiences en hausse, les fenetres saisonnieres et les opportunites pertinentes pour mieux decider.",
  "Melhores épocas e alertas sazonais": "Meilleures saisons et alertes saisonnieres",
  "Experiências e roteiros em destaque": "Experiences et itineraires a la une",
  "Oportunidades com parceiros selecionados": "Opportunites avec des partenaires selectionnes",
})

homeContentByLocale.en = translateHomeContent(basePtContent, enTranslations)
homeContentByLocale.es = translateHomeContent(basePtContent, esTranslations)
homeContentByLocale.fr = translateHomeContent(basePtContent, frTranslations)

export function getHomeContent(locale: AppLocale): HomeContent {
  return homeContentByLocale[locale] ?? homeContentByLocale.pt
}

export const homeContent: HomeContent = homeContentByLocale.pt
