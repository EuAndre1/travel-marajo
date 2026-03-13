export type ExperienceFilter = "Todas" | "Natureza" | "Cultura" | "Gastronomia" | "Aventura" | "Família"

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

// Conteúdo centralizado para facilitar migração para CMS headless.
export const homeContent: HomeContent = {
  hero: {
    title: "Marajó, o destino onde a Amazônia encontra o oceano",
    subtitle:
      "Curadoria premium de experiências autênticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de Marajó com segurança e encantamento.",
    ctas: {
      primary: "Explorar experiências",
      secondary: "Ver roteiros e pacotes",
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
      "Curadoria local com equipe no Marajó",
      "Atendimento humano antes, durante e depois",
      "Parceiros licenciados e avaliados",
      "Pagamento seguro e suporte pós-reserva",
    ],
    stats: [
      { value: "120+", label: "experiências mapeadas" },
      { value: "40+", label: "parceiros locais" },
      { value: "4,9/5", label: "avaliação média" },
      { value: "7", label: "roteiros inteligentes" },
    ],
  },
  whyMarajo: {
    title: "Por que Marajó?",
    subtitle:
      "Uma ilha com identidade própria: natureza viva, cultura ancestral e experiências que não existem em nenhum outro lugar do Brasil.",
    items: [
      {
        title: "Paisagens únicas em escala continental",
        description:
          "Campos alagados, praias de água doce e salgada e manguezais preservados em uma das maiores ilhas flúvio-marinhas do planeta.",
      },
      {
        title: "Cultura marajoara viva",
        description:
          "Cerâmica ancestral, sabores amazônicos e comunidades ribeirinhas que transformam cada visita em encontro real.",
      },
      {
        title: "Experiências com búfalos e fazendas",
        description:
          "Passeios de búfalo, produção de queijo marajoara e vivências de campo que conectam com o ritmo da ilha.",
      },
      {
        title: "Acessível, mas fora do óbvio",
        description:
          "Um destino autêntico a poucas horas de Belém, com tempo desacelerado e alto potencial de descoberta.",
      },
    ],
  },
  featureExperience: {
    badge: "Experiência destaque",
    title: "Praia do Pesqueiro ao pôr do sol",
    description:
      "A experiência mais emblemática do Marajó. Dunas baixas, mar aberto, barracas locais e búfalos integrados à paisagem criam um cenário cinematográfico para quem busca beleza e autenticidade.",
    location: "Soure • Ilha de Marajó",
    duration: "4 horas",
    price: "A partir de R$ 250 por pessoa",
    highlights: [
      "Pôr do sol sobre o Atlântico",
      "Trilhas leves com guia local",
      "Paradas para fotografia e cultura",
      "Reserva com suporte humano",
    ],
    ctas: { primary: "Reservar agora", secondary: "Ver detalhes" },
    image: "/pesqueiro-1.png",
    gallery: ["/pesqueiro-2.png", "/pesqueiro-3.png", "/pesqueiro-4.png"],
  },
  topExperiences: {
    title: "As experiências mais reservadas",
    subtitle:
      "Seleção com base em satisfação real, infraestrutura local e capacidade de entrega. Compare por perfil e reserve com segurança.",
    filters: ["Todas", "Natureza", "Cultura", "Gastronomia", "Aventura", "Família"],
    items: [
      {
        title: "Circuito dos Búfalos e Queijaria",
        category: "Cultura",
        location: "Soure",
        duration: "5 horas",
        price: "R$ 220 por pessoa",
        rating: "4,9",
        image: "/atividade-comunidade.jpg",
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
        image: "/destino-manguezais.jpg",
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
        image: "/atividade-cavalgada.jpg",
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
        image: "/atividade-artesanato.jpg",
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
        image: "/atividade-canoa.jpg",
        tags: ["Igarapés", "Silêncio"],
        href: "/experiencias",
      },
      {
        title: "Sabores do Marajó",
        category: "Gastronomia",
        location: "Soure",
        duration: "3 horas",
        price: "R$ 190 por pessoa",
        rating: "4,8",
        image: "/atividade-culinaria.jpg",
        tags: ["Degustação", "Cozinha local"],
        href: "/experiencias",
      },
      {
        title: "Trilha dos campos alagados",
        category: "Família",
        location: "Soure",
        duration: "4 horas",
        price: "R$ 200 por pessoa",
        rating: "4,7",
        image: "/atividade-trilha.jpg",
        tags: ["Guias locais", "Baixa dificuldade"],
        href: "/experiencias",
      },
    ],
    ctaLabel: "Ver todas as experiências",
    ctaHref: "/experiencias",
  },
  destinations: {
    title: "Destinos principais da ilha",
    subtitle:
      "Escolha sua base e descubra o que cada região oferece: praias extensas, cultura marajoara e natureza abundante.",
    items: [
      {
        name: "Soure",
        description: "Centro turístico com estrutura, praias icônicas e fácil acesso às experiências mais reservadas.",
        image: "/destino-soure.jpg",
        tag: "Base ideal",
      },
      {
        name: "Salvaterra",
        description: "Porta de entrada para manguezais, igarapés e pousadas charmosas à beira-rio.",
        image: "/destino-salvaterra.jpg",
        tag: "Natureza",
      },
      {
        name: "Praia do Pesqueiro",
        description: "Cartão-postal do Marajó, com dunas baixas, mar aberto e atmosfera cinematográfica.",
        image: "/destino-pesqueiro.jpg",
        tag: "Praia icônica",
      },
      {
        name: "Barra Velha",
        description: "Praia tranquila para quem busca silêncio, céu aberto e contemplação sem pressa.",
        image: "/destino-barra-velha.jpg",
        tag: "Refúgio",
      },
    ],
  },
  routes: {
    title: "Roteiros e pacotes pensados para você",
    subtitle:
      "Combine experiências, hospedagens e deslocamentos com flexibilidade. Roteiros prontos ou personalizados com curadoria local.",
    items: [
      {
        title: "Marajó Essencial 4 dias",
        days: "4 dias / 3 noites",
        price: "A partir de R$ 1.590",
        description:
          "Ideal para primeira visita: praias, búfalos, gastronomia e o pôr do sol do Pesqueiro com tempo de descanso.",
        highlights: ["2 experiências guiadas", "Hospedagem boutique", "Traslado interno"],
        image: "/oferta-pacote.jpg",
        href: "/pacotes",
      },
      {
        title: "Marajó Slow 6 dias",
        days: "6 dias / 5 noites",
        price: "A partir de R$ 2.340",
        description:
          "Para quem quer explorar com calma: igarapés, comunidades e roteiro gastronômico com tempo livre.",
        highlights: ["3 experiências", "Suporte local", "Upgrade opcional"],
        image: "/destino-manguezais.jpg",
        href: "/pacotes",
      },
      {
        title: "Família Marajoara 5 dias",
        days: "5 dias / 4 noites",
        price: "A partir de R$ 2.120",
        description:
          "Atividades de baixa dificuldade, passeios de búfalo e praias amplas com estrutura para crianças.",
        highlights: ["Experiências family", "Logística leve", "Kit boas-vindas"],
        image: "/atividade-cavalgada.jpg",
        href: "/pacotes",
      },
    ],
  },
  offers: {
    title: "Ofertas e oportunidades atuais",
    subtitle:
      "Condições especiais com parceiros locais e afiliados, sem comprometer qualidade ou suporte ao viajante.",
    items: [
      {
        title: "Pousada com café regional incluso",
        description: "Hospedagem com produtos marajoaras e acesso rápido às praias de Soure.",
        price: "A partir de R$ 260/noite",
        badge: "Hospedagem",
        image: "/oferta-hotel.jpg",
        href: "/hotels",
      },
      {
        title: "Passeio de búfalo + fazenda",
        description: "Experiência guiada com visita à produção de queijo e degustação local.",
        price: "R$ 210 por pessoa",
        badge: "Experiência",
        image: "/oferta-passeio.jpg",
        href: "/experiencias",
      },
      {
        title: "Pacote com traslado fluvial",
        description: "Chegada facilitada com integração Belém–Soure e roteiro essencial.",
        price: "A partir de R$ 1.480",
        badge: "Pacote",
        image: "/oferta-pacote.jpg",
        href: "/pacotes",
      },
    ],
  },
  travelGuide: {
    title: "Guia de viagem para decidir com confiança",
    subtitle:
      "Informação prática e editorial para você imaginar, comparar e reservar o Marajó certo para o seu perfil.",
    items: [
      {
        title: "Melhor época para visitar o Marajó",
        description: "Entenda o ciclo das chuvas, nível dos rios e o que muda nas experiências.",
        readTime: "6 min",
        tag: "Planejamento",
        href: "/guia",
      },
      {
        title: "Como chegar: Belém, Salvaterra e Soure",
        description: "Rotas fluviais, horários e o que considerar na logística da viagem.",
        readTime: "8 min",
        tag: "Logística",
        href: "/guia",
      },
      {
        title: "Top experiências para casais",
        description: "Roteiros românticos, praias tranquilas e pousadas com charme local.",
        readTime: "5 min",
        tag: "Curadoria",
        href: "/guia",
      },
    ],
  },
  socialProof: {
    title: "Quem viaja com a Travel Marajó recomenda",
    subtitle:
      "Prova social real e transparente: viajantes que vieram pela narrativa e ficaram pela entrega.",
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
          "O roteiro foi perfeito para meu casal. A equipe local resolveu tudo e o pôr do sol no Pesqueiro foi inesquecível.",
        rating: "5,0",
      },
      {
        name: "Rafael D.",
        role: "Lisboa",
        quote:
          "Gostei do equilíbrio entre aventura e conforto. O passeio de búfalo e a gastronomia superaram minhas expectativas.",
        rating: "4,9",
      },
      {
        name: "Camila R.",
        role: "Belém",
        quote:
          "Viajei com meus filhos e tudo foi leve. A curadoria das experiências fez a diferença.",
        rating: "5,0",
      },
    ],
  },
  partners: {
    title: "Parceiros locais e afiliados estratégicos",
    subtitle:
      "Trabalhamos com operadores licenciados, pousadas selecionadas e guias locais para garantir segurança e autenticidade.",
    items: [
      { name: "Pousada Marajó Boutique", type: "Hospedagem" },
      { name: "Fazenda Campo Vivo", type: "Experiência" },
      { name: "Navega Marajó", type: "Transporte" },
      { name: "Sabores do Norte", type: "Gastronomia" },
      { name: "Ateliê Marajoara", type: "Cultura" },
      { name: "Guia Ribeirinho", type: "Operação local" },
    ],
  },
  newsletter: {
    title: "Receba roteiros secretos e alertas de ofertas",
    subtitle:
      "Uma curadoria mensal com novidades de experiências, épocas ideais e condições exclusivas para quem quer viajar com inteligência.",
    ctaLabel: "Quero receber",
    privacyNote: "Sem spam. Cancelamento em um clique.",
    benefits: ["Atualizações sazonais", "Ofertas com parceiros", "Guias curados"],
    image: "/newsletter-traveler.jpg",
  },
}
