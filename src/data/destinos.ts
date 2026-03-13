export interface DestinationItem {
  slug: string
  name: string
  tagline: string
  overview: string
  heroImage: string
  highlights: string[]
  relatedExperiences: string[]
}

export const destinations: DestinationItem[] = [
  {
    slug: "soure",
    name: "Soure",
    tagline: "Base estratégica para experiências premium",
    overview:
      "Soure é o principal polo turístico do Marajó, com praias icônicas, infraestrutura de apoio e acesso rápido às experiências mais reservadas.",
    heroImage: "/destino-soure.jpg",
    highlights: ["Praias amplas", "Gastronomia local", "Acesso a experiências"],
    relatedExperiences: ["pesqueiro", "cavalgada-praia"],
  },
  {
    slug: "salvaterra",
    name: "Salvaterra",
    tagline: "Porta de entrada para manguezais e igarapés",
    overview:
      "Salvaterra combina pousadas charmosas e roteiros de natureza. Ideal para quem busca contato com rios, manguezais e tranquilidade.",
    heroImage: "/destino-salvaterra.jpg",
    highlights: ["Manguezais", "Passeios de barco", "Ritmo tranquilo"],
    relatedExperiences: ["manguezais-salvaterra"],
  },
  {
    slug: "pesqueiro",
    name: "Praia do Pesqueiro",
    tagline: "Cenário cinematográfico do Marajó",
    overview:
      "Praia extensa, dunas baixas e o pôr do sol mais emblemático da ilha. Um destino obrigatório para quem quer viver o Marajó.",
    heroImage: "/destino-pesqueiro.jpg",
    highlights: ["Pôr do sol", "Paisagem aberta", "Experiências fotogênicas"],
    relatedExperiences: ["pesqueiro"],
  },
]

export function getDestinationBySlug(slug: string) {
  return destinations.find((item) => item.slug === slug)
}
