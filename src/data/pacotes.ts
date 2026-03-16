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
    title: "Marajó Essencial 4 dias",
    summary: "Roteiro ideal para primeira visita com equilíbrio entre praias, cultura e tempo livre.",
    duration: "4 dias / 3 noites",
    startingPrice: 1590,
    included: ["2 experiências guiadas", "Hospedagem boutique", "Traslado interno"],
    itinerary: [
      "Dia 1: chegada e recepção local",
      "Dia 2: experiência Pesqueiro e pôr do sol",
      "Dia 3: circuito gastronômico e cultural",
      "Dia 4: tempo livre e retorno",
    ],
  },
  {
    slug: "marajo-slow",
    title: "Marajó Slow 6 dias",
    summary: "Para quem quer explorar com calma, com mais tempo em igarapés e comunidades.",
    duration: "6 dias / 5 noites",
    startingPrice: 2340,
    included: ["3 experiências", "Suporte local", "Upgrade opcional"],
    itinerary: [
      "Dia 1: chegada e ambientação",
      "Dia 2: manguezais e observação de aves",
      "Dia 3: vivência cultural",
      "Dia 4: rota gastronômica",
      "Dia 5: tempo livre",
      "Dia 6: retorno",
    ],
  },
]

export function getPackageBySlug(slug: string) {
  return packages.find((item) => item.slug === slug)
}
