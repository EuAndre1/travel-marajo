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
    quote: "A curadoria foi impecÃ¡vel. Tudo fluiu com tranquilidade e o pÃ´r do sol no Pesqueiro foi inesquecÃ­vel.",
    image: "/newsletter-traveler.jpg",
  },
  {
    name: "Rafael D.",
    country: "Portugal",
    destination: "Salvaterra",
    quote: "ExperiÃªncias autÃªnticas e suporte humano. O roteiro equilibrou aventura e conforto na medida certa.",
    image: "/atividade-comunidade.jpg",
  },
  {
    name: "Camila R.",
    country: "Brasil",
    destination: "Pesqueiro",
    quote: "Viajei em famÃ­lia e me senti segura do inÃ­cio ao fim. Excelente atenÃ§Ã£o da equipe local.",
    image: "/atividade-cavalgada.jpg",
  },
]
