export const experiences = {
  pesqueiro: {
    slug: "pesqueiro",
    title: "Praia do Pesqueiro",
    location: "Soure • Ilha de Marajó",
    price: "A partir de R$ 250 por pessoa",
    heroImage: "/pesqueiro-1.png",
    images: [
      "/pesqueiro-1.png",
      "/pesqueiro-2.png",
      "/pesqueiro-3.png",
      "/pesqueiro-4.png",
      "/pesqueiro-5.jpg",
      "/soure-bufalo.png"
    ],
    description:
      "A Praia do Pesqueiro é uma das experiências mais emblemáticas do Marajó. Um cenário de forte apelo visual, natureza, cultura local e a presença marcante dos búfalos criam uma vivência autêntica e memorável.",
    highlights: [
      "Praia icônica de Soure",
      "Experiência com búfalos",
      "Paisagem autêntica do Marajó",
      "Pôr do sol inesquecível"
    ],
    included: [
      "Atendimento de apoio",
      "Curadoria da experiência",
      "Orientações para o passeio"
    ]
  }
} as const

export type ExperienceKey = keyof typeof experiences
