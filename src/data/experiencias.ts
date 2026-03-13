export type ExperienceCategory =
  | "Natureza"
  | "Cultura"
  | "Gastronomia"
  | "Aventura"
  | "FamÃ­lia"
  | "Bem-estar"

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
}

export const experiences: ExperienceItem[] = [
  {
    slug: "pesqueiro",
    title: "Praia do Pesqueiro ao pÃ´r do sol",
    shortDescription: "O cartÃ£o-postal do MarajÃ³ com pÃ´r do sol cinematogrÃ¡fico e curadoria local.",
    fullDescription:
      "A experiÃªncia mais emblemÃ¡tica do MarajÃ³. Dunas baixas, mar aberto, barracas locais e bÃºfalos integrados Ã  paisagem criam um cenÃ¡rio cinematogrÃ¡fico para quem busca beleza e autenticidade.",
    location: "Soure â€¢ Ilha de MarajÃ³",
    duration: "4 horas",
    priceFrom: 250,
    rating: "4,9",
    heroImage: "/pesqueiro-1.png",
    highlights: [
      "PÃ´r do sol sobre o AtlÃ¢ntico",
      "Trilhas leves com guia local",
      "Paradas para fotografia e cultura",
      "Reserva com suporte humano",
    ],
    included: ["Curadoria da experiÃªncia", "OrientaÃ§Ã£o local", "Suporte prÃ©-viagem"],
    category: "Natureza",
  },
  {
    slug: "bufalos-queijaria",
    title: "Circuito dos BÃºfalos e Queijaria",
    shortDescription: "VivÃªncia rural com degustaÃ§Ã£o e bastidores do queijo marajoara.",
    fullDescription:
      "Passeio guiado por fazenda tradicional, com visita Ã  produÃ§Ã£o de queijo marajoara, contato com bÃºfalos e degustaÃ§Ãµes locais em um roteiro de forte identidade cultural.",
    location: "Soure",
    duration: "5 horas",
    priceFrom: 220,
    rating: "4,9",
    heroImage: "/atividade-comunidade.jpg",
    highlights: ["Fazenda local", "DegustaÃ§Ã£o de queijo", "HistÃ³ria marajoara"],
    included: ["Guia local", "DegustaÃ§Ã£o", "Transfer interno"],
    category: "Cultura",
  },
  {
    slug: "manguezais-salvaterra",
    title: "Manguezais de Salvaterra",
    shortDescription: "ObservaÃ§Ã£o de aves e igarapÃ©s em um roteiro tranquilo de natureza.",
    fullDescription:
      "Um passeio de barco pelos manguezais de Salvaterra, com observaÃ§Ã£o de aves, ecossistemas preservados e ritmo contemplativo.",
    location: "Salvaterra",
    duration: "3 horas",
    priceFrom: 180,
    rating: "4,8",
    heroImage: "/destino-manguezais.jpg",
    highlights: ["Barco privativo", "ObservaÃ§Ã£o de aves", "Natureza preservada"],
    included: ["Guia local", "Equipamentos bÃ¡sicos", "Seguro"],
    category: "Natureza",
  },
  {
    slug: "cavalgada-praia",
    title: "Cavalgada na praia ao entardecer",
    shortDescription: "Um clÃ¡ssico marajoara com paisagem aberta e baixa dificuldade.",
    fullDescription:
      "Cavalgada guiada em praias amplas, com paradas estratÃ©gicas para fotos e paisagens abertas. Ideal para quem busca uma experiÃªncia autÃªntica.",
    location: "Soure",
    duration: "2h30",
    priceFrom: 240,
    rating: "4,9",
    heroImage: "/atividade-cavalgada.jpg",
    highlights: ["Guia local", "Paisagens amplas", "FotogÃªnico"],
    included: ["Cavalo preparado", "Equipamento bÃ¡sico", "Seguro"],
    category: "Aventura",
  },
]

export function getExperienceBySlug(slug: string) {
  return experiences.find((item) => item.slug === slug)
}