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
    tagline: "Base estratÃ©gica para experiÃªncias premium",
    overview:
      "Soure Ã© o principal polo turÃ­stico do MarajÃ³, com praias icÃ´nicas, infraestrutura de apoio e acesso rÃ¡pido Ã s experiÃªncias mais reservadas.",
    heroImage: "/destino-soure.jpg",
    highlights: ["Praias amplas", "Gastronomia local", "Acesso a experiÃªncias"],
    relatedExperiences: ["pesqueiro", "cavalgada-praia"],
  },
  {
    slug: "salvaterra",
    name: "Salvaterra",
    tagline: "Porta de entrada para manguezais e igarapÃ©s",
    overview:
      "Salvaterra combina pousadas charmosas e roteiros de natureza. Ideal para quem busca contato com rios, manguezais e tranquilidade.",
    heroImage: "/destino-salvaterra.jpg",
    highlights: ["Manguezais", "Passeios de barco", "Ritmo tranquilo"],
    relatedExperiences: ["manguezais-salvaterra"],
  },
  {
    slug: "pesqueiro",
    name: "Praia do Pesqueiro",
    tagline: "CenÃ¡rio cinematogrÃ¡fico do MarajÃ³",
    overview:
      "Praia extensa, dunas baixas e o pÃ´r do sol mais emblemÃ¡tico da ilha. Um destino obrigatÃ³rio para quem quer viver o MarajÃ³.",
    heroImage: "/destino-pesqueiro.jpg",
    highlights: ["PÃ´r do sol", "Paisagem aberta", "ExperiÃªncias fotogÃªnicas"],
    relatedExperiences: ["pesqueiro"],
  },
]

export function getDestinationBySlug(slug: string) {
  return destinations.find((item) => item.slug === slug)
}