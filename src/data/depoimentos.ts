export interface TestimonialItem {
  name: string
  country: string
  destination: string
  quote: string
  image: string
}

export const testimonials: TestimonialItem[] = [
  {
    name: "Larissa M.",
    country: "Brasil",
    destination: "Soure",
    quote: "A curadoria foi impecável. Tudo fluiu com tranquilidade e o pôr do sol no Pesqueiro foi inesquecível.",
    image: "/newsletter-traveler.jpg",
  },
  {
    name: "Rafael D.",
    country: "Portugal",
    destination: "Salvaterra",
    quote: "Experiências autênticas e suporte humano. O roteiro equilibrou aventura e conforto na medida certa.",
    image: "/atividade-comunidade.jpg",
  },
  {
    name: "Camila R.",
    country: "Brasil",
    destination: "Pesqueiro",
    quote: "Viajei em família e me senti segura do início ao fim. Excelente atenção da equipe local.",
    image: "/atividade-cavalgada.jpg",
  },
]
