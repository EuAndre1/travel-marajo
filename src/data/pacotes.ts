export interface PackageItem {
  slug: string
  title: string
  summary: string
  duration: string
  startingPrice: number
  included: string[]
  itinerary: string[]
}

export const packages: PackageItem[] = [
  {
    slug: "marajo-essencial",
    title: "MarajÃ³ Essencial 4 dias",
    summary: "Roteiro ideal para primeira visita com equilÃ­brio entre praias, cultura e tempo livre.",
    duration: "4 dias / 3 noites",
    startingPrice: 1590,
    included: ["2 experiÃªncias guiadas", "Hospedagem boutique", "Traslado interno"],
    itinerary: [
      "Dia 1: chegada e recepÃ§Ã£o local",
      "Dia 2: experiÃªncia Pesqueiro e pÃ´r do sol",
      "Dia 3: circuito gastronÃ´mico e cultural",
      "Dia 4: tempo livre e retorno",
    ],
  },
  {
    slug: "marajo-slow",
    title: "MarajÃ³ Slow 6 dias",
    summary: "Para quem quer explorar com calma, com mais tempo em igarapÃ©s e comunidades.",
    duration: "6 dias / 5 noites",
    startingPrice: 2340,
    included: ["3 experiÃªncias", "Suporte local", "Upgrade opcional"],
    itinerary: [
      "Dia 1: chegada e ambientaÃ§Ã£o",
      "Dia 2: manguezais e observaÃ§Ã£o de aves",
      "Dia 3: vivÃªncia cultural",
      "Dia 4: rota gastronÃ´mica",
      "Dia 5: tempo livre",
      "Dia 6: retorno",
    ],
  },
]

export function getPackageBySlug(slug: string) {
  return packages.find((item) => item.slug === slug)
}