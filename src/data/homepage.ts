export type ExperienceFilter = "Todas" | "Natureza" | "Cultura" | "Gastronomia" | "Aventura" | "FamÃ­lia"

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

// ConteÃºdo centralizado para facilitar migraÃ§Ã£o para CMS headless.
export const homeContent: HomeContent = {
  hero: {
    title: "MarajÃ³, o destino onde a AmazÃ´nia encontra o oceano",
    subtitle:
      "Curadoria premium de experiÃªncias autÃªnticas, roteiros inteligentes e parceiros locais para quem quer viver o melhor da Ilha de MarajÃ³ com seguranÃ§a e encantamento.",
    ctas: {
      primary: "Explorar experiÃªncias",
      secondary: "Ver roteiros e pacotes",
    },
    tabs: [
      {
        label: "ExperiÃªncias",
        fields: [
          { label: "Local", placeholder: "Soure, Salvaterra ou Cachoeira do Arari" },
          { label: "Data", placeholder: "Escolha sua data ideal", type: "date" },
          { label: "Perfil", placeholder: "Casal, famÃ­lia ou aventura" },
          { label: "DuraÃ§Ã£o", placeholder: "3h, 1 dia ou 2 dias" },
        ],
        ctaLabel: "Buscar experiÃªncias",
        ctaHref: "/experiencias",
      },
      {
        label: "Destinos",
        fields: [
          { label: "Base", placeholder: "Soure ou Salvaterra" },
          { label: "Estilo", placeholder: "Praias, manguezais ou fazendas" },
          { label: "Quando", placeholder: "Melhor Ã©poca para visitar" },
          { label: "Interesses", placeholder: "Cultura, natureza, gastronomia" },
        ],
        ctaLabel: "Explorar destinos",
        ctaHref: "/destinos",
      },
      {
        label: "Roteiros",
        fields: [
          { label: "DuraÃ§Ã£o", placeholder: "3 a 7 dias" },
          { label: "Grupo", placeholder: "Casal, famÃ­lia, amigos" },
          { label: "Foco", placeholder: "ExperiÃªncias ou descanso" },
          { label: "Partida", placeholder: "BelÃ©m ou Salvaterra" },
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
          { label: "Quartos", placeholder: "NÃºmero de hÃ³spedes" },
        ],
        ctaLabel: "Ver hospedagens",
        ctaHref: "/hotels",
      },
    ],
    trustItems: [
      "Curadoria local com equipe no MarajÃ³",
      "Atendimento humano antes, durante e depois",
      "Parceiros licenciados e avaliados",
      "Pagamento seguro e suporte pÃ³s-reserva",
    ],
    stats: [
      { value: "120+", label: "experiÃªncias mapeadas" },
      { value: "40+", label: "parceiros locais" },
      { value: "4,9/5", label: "avaliaÃ§Ã£o mÃ©dia" },
      { value: "7", label: "roteiros inteligentes" },
    ],
  },
  whyMarajo: {
    title: "Por que MarajÃ³?",
    subtitle:
      "Uma ilha com identidade prÃ³pria: natureza viva, cultura ancestral e experiÃªncias que nÃ£o existem em nenhum outro lugar do Brasil.",
    items: [
      {
        title: "Paisagens Ãºnicas em escala continental",
        description:
          "Campos alagados, praias de Ã¡gua doce e salgada e manguezais preservados em uma das maiores ilhas flÃºvio-marinhas do planeta.",
      },
      {
        title: "Cultura marajoara viva",
        description:
          "CerÃ¢mica ancestral, sabores amazÃ´nicos e comunidades ribeirinhas que transformam cada visita em encontro real.",
      },
      {
        title: "ExperiÃªncias com bÃºfalos e fazendas",
        description:
          "Passeios de bÃºfalo, produÃ§Ã£o de queijo marajoara e vivÃªncias de campo que conectam com o ritmo da ilha.",
      },
      {
        title: "AcessÃ­vel, mas fora do Ã³bvio",
        description:
          "Um destino autÃªntico a poucas horas de BelÃ©m, com tempo desacelerado e alto potencial de descoberta.",
      },
    ],
  },
  featureExperience: {
    badge: "ExperiÃªncia destaque",
    title: "Praia do Pesqueiro ao pÃ´r do sol",
    description:
      "A experiÃªncia mais emblemÃ¡tica do MarajÃ³. Dunas baixas, mar aberto, barracas locais e bÃºfalos integrados Ã  paisagem criam um cenÃ¡rio cinematogrÃ¡fico para quem busca beleza e autenticidade.",
    location: "Soure â€¢ Ilha de MarajÃ³",
    duration: "4 horas",
    price: "A partir de R$ 250 por pessoa",
    highlights: [
      "PÃ´r do sol sobre o AtlÃ¢ntico",
      "Trilhas leves com guia local",
      "Paradas para fotografia e cultura",
      "Reserva com suporte humano",
    ],
    ctas: { primary: "Reservar agora", secondary: "Ver detalhes" },
    image: "/pesqueiro-1.png",
    gallery: ["/pesqueiro-2.png", "/pesqueiro-3.png", "/pesqueiro-4.png"],
  },
  topExperiences: {
    title: "As experiÃªncias mais reservadas",
    subtitle:
      "SeleÃ§Ã£o com base em satisfaÃ§Ã£o real, infraestrutura local e capacidade de entrega. Compare por perfil e reserve com seguranÃ§a.",
    filters: ["Todas", "Natureza", "Cultura", "Gastronomia", "Aventura", "FamÃ­lia"],
    items: [
      {
        title: "Circuito dos BÃºfalos e Queijaria",
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
        tags: ["Barco", "ObservaÃ§Ã£o de aves"],
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
        tags: ["Praia", "FotogÃªnico"],
        href: "/experiencias",
      },
      {
        title: "Rota da CerÃ¢mica Marajoara",
        category: "Cultura",
        location: "Cachoeira do Arari",
        duration: "1 dia",
        price: "R$ 320 por pessoa",
        rating: "4,7",
        image: "/atividade-artesanato.jpg",
        tags: ["AteliÃªs", "Oficina"],
        href: "/experiencias",
      },
      {
        title: "Canoa pelos igarapÃ©s",
        category: "Natureza",
        location: "Salvaterra",
        duration: "3h30",
        price: "R$ 210 por pessoa",
        rating: "4,8",
        image: "/atividade-canoa.jpg",
        tags: ["IgarapÃ©s", "SilÃªncio"],
        href: "/experiencias",
      },
      {
        title: "Sabores do MarajÃ³",
        category: "Gastronomia",
        location: "Soure",
        duration: "3 horas",
        price: "R$ 190 por pessoa",
        rating: "4,8",
        image: "/atividade-culinaria.jpg",
        tags: ["DegustaÃ§Ã£o", "Cozinha local"],
        href: "/experiencias",
      },
      {
        title: "Trilha dos campos alagados",
        category: "FamÃ­lia",
        location: "Soure",
        duration: "4 horas",
        price: "R$ 200 por pessoa",
        rating: "4,7",
        image: "/atividade-trilha.jpg",
        tags: ["Guias locais", "Baixa dificuldade"],
        href: "/experiencias",
      },
    ],
    ctaLabel: "Ver todas as experiÃªncias",
    ctaHref: "/experiencias",
  },
  destinations: {
    title: "Destinos principais da ilha",
    subtitle:
      "Escolha sua base e descubra o que cada regiÃ£o oferece: praias extensas, cultura marajoara e natureza abundante.",
    items: [
      {
        name: "Soure",
        description: "Centro turÃ­stico com estrutura, praias icÃ´nicas e fÃ¡cil acesso Ã s experiÃªncias mais reservadas.",
        image: "/destino-soure.jpg",
        tag: "Base ideal",
      },
      {
        name: "Salvaterra",
        description: "Porta de entrada para manguezais, igarapÃ©s e pousadas charmosas Ã  beira-rio.",
        image: "/destino-salvaterra.jpg",
        tag: "Natureza",
      },
      {
        name: "Praia do Pesqueiro",
        description: "CartÃ£o-postal do MarajÃ³, com dunas baixas, mar aberto e atmosfera cinematogrÃ¡fica.",
        image: "/destino-pesqueiro.jpg",
        tag: "Praia icÃ´nica",
      },
      {
        name: "Barra Velha",
        description: "Praia tranquila para quem busca silÃªncio, cÃ©u aberto e contemplaÃ§Ã£o sem pressa.",
        image: "/destino-barra-velha.jpg",
        tag: "RefÃºgio",
      },
    ],
  },
  routes: {
    title: "Roteiros e pacotes pensados para vocÃª",
    subtitle:
      "Combine experiÃªncias, hospedagens e deslocamentos com flexibilidade. Roteiros prontos ou personalizados com curadoria local.",
    items: [
      {
        title: "MarajÃ³ Essencial 4 dias",
        days: "4 dias / 3 noites",
        price: "A partir de R$ 1.590",
        description:
          "Ideal para primeira visita: praias, bÃºfalos, gastronomia e o pÃ´r do sol do Pesqueiro com tempo de descanso.",
        highlights: ["2 experiÃªncias guiadas", "Hospedagem boutique", "Traslado interno"],
        image: "/oferta-pacote.jpg",
        href: "/pacotes",
      },
      {
        title: "MarajÃ³ Slow 6 dias",
        days: "6 dias / 5 noites",
        price: "A partir de R$ 2.340",
        description:
          "Para quem quer explorar com calma: igarapÃ©s, comunidades e roteiro gastronÃ´mico com tempo livre.",
        highlights: ["3 experiÃªncias", "Suporte local", "Upgrade opcional"],
        image: "/destino-manguezais.jpg",
        href: "/pacotes",
      },
      {
        title: "FamÃ­lia Marajoara 5 dias",
        days: "5 dias / 4 noites",
        price: "A partir de R$ 2.120",
        description:
          "Atividades de baixa dificuldade, passeios de bÃºfalo e praias amplas com estrutura para crianÃ§as.",
        highlights: ["ExperiÃªncias family", "LogÃ­stica leve", "Kit boas-vindas"],
        image: "/atividade-cavalgada.jpg",
        href: "/pacotes",
      },
    ],
  },
  offers: {
    title: "Ofertas e oportunidades atuais",
    subtitle:
      "CondiÃ§Ãµes especiais com parceiros locais e afiliados, sem comprometer qualidade ou suporte ao viajante.",
    items: [
      {
        title: "Pousada com cafÃ© regional incluso",
        description: "Hospedagem com produtos marajoaras e acesso rÃ¡pido Ã s praias de Soure.",
        price: "A partir de R$ 260/noite",
        badge: "Hospedagem",
        image: "/oferta-hotel.jpg",
        href: "/hotels",
      },
      {
        title: "Passeio de bÃºfalo + fazenda",
        description: "ExperiÃªncia guiada com visita Ã  produÃ§Ã£o de queijo e degustaÃ§Ã£o local.",
        price: "R$ 210 por pessoa",
        badge: "ExperiÃªncia",
        image: "/oferta-passeio.jpg",
        href: "/experiencias",
      },
      {
        title: "Pacote com traslado fluvial",
        description: "Chegada facilitada com integraÃ§Ã£o BelÃ©mâ€“Soure e roteiro essencial.",
        price: "A partir de R$ 1.480",
        badge: "Pacote",
        image: "/oferta-pacote.jpg",
        href: "/pacotes",
      },
    ],
  },
  travelGuide: {
    title: "Guia de viagem para decidir com confianÃ§a",
    subtitle:
      "InformaÃ§Ã£o prÃ¡tica e editorial para vocÃª imaginar, comparar e reservar o MarajÃ³ certo para o seu perfil.",
    items: [
      {
        title: "Melhor Ã©poca para visitar o MarajÃ³",
        description: "Entenda o ciclo das chuvas, nÃ­vel dos rios e o que muda nas experiÃªncias.",
        readTime: "6 min",
        tag: "Planejamento",
        href: "/guia",
      },
      {
        title: "Como chegar: BelÃ©m, Salvaterra e Soure",
        description: "Rotas fluviais, horÃ¡rios e o que considerar na logÃ­stica da viagem.",
        readTime: "8 min",
        tag: "LogÃ­stica",
        href: "/guia",
      },
      {
        title: "Top experiÃªncias para casais",
        description: "Roteiros romÃ¢nticos, praias tranquilas e pousadas com charme local.",
        readTime: "5 min",
        tag: "Curadoria",
        href: "/guia",
      },
    ],
  },
  socialProof: {
    title: "Quem viaja com a Travel MarajÃ³ recomenda",
    subtitle:
      "Prova social real e transparente: viajantes que vieram pela narrativa e ficaram pela entrega.",
    stats: [
      { value: "4,9", label: "avaliaÃ§Ã£o mÃ©dia" },
      { value: "92%", label: "taxa de recomendaÃ§Ã£o" },
      { value: "24h", label: "tempo mÃ©dio de resposta" },
    ],
    testimonials: [
      {
        name: "Larissa M.",
        role: "SÃ£o Paulo",
        quote:
          "O roteiro foi perfeito para meu casal. A equipe local resolveu tudo e o pÃ´r do sol no Pesqueiro foi inesquecÃ­vel.",
        rating: "5,0",
      },
      {
        name: "Rafael D.",
        role: "Lisboa",
        quote:
          "Gostei do equilÃ­brio entre aventura e conforto. O passeio de bÃºfalo e a gastronomia superaram minhas expectativas.",
        rating: "4,9",
      },
      {
        name: "Camila R.",
        role: "BelÃ©m",
        quote:
          "Viajei com meus filhos e tudo foi leve. A curadoria das experiÃªncias fez a diferenÃ§a.",
        rating: "5,0",
      },
    ],
  },
  partners: {
    title: "Parceiros locais e afiliados estratÃ©gicos",
    subtitle:
      "Trabalhamos com operadores licenciados, pousadas selecionadas e guias locais para garantir seguranÃ§a e autenticidade.",
    items: [
      { name: "Pousada MarajÃ³ Boutique", type: "Hospedagem" },
      { name: "Fazenda Campo Vivo", type: "ExperiÃªncia" },
      { name: "Navega MarajÃ³", type: "Transporte" },
      { name: "Sabores do Norte", type: "Gastronomia" },
      { name: "AteliÃª Marajoara", type: "Cultura" },
      { name: "Guia Ribeirinho", type: "OperaÃ§Ã£o local" },
    ],
  },
  newsletter: {
    title: "Receba roteiros secretos e alertas de ofertas",
    subtitle:
      "Uma curadoria mensal com novidades de experiÃªncias, Ã©pocas ideais e condiÃ§Ãµes exclusivas para quem quer viajar com inteligÃªncia.",
    ctaLabel: "Quero receber",
    privacyNote: "Sem spam. Cancelamento em um clique.",
    benefits: ["AtualizaÃ§Ãµes sazonais", "Ofertas com parceiros", "Guias curados"],
    image: "/newsletter-traveler.jpg",
  },
}
