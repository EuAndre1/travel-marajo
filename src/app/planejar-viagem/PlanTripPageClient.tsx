"use client"

import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { experiences } from "@/data/experiencias"
import { packages } from "@/data/pacotes"
import { getGuidesBySlugs } from "@/data/guides"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"
import { useSiteLanguage } from "@/lib/use-site-language"
import { siteContent } from "@/config/site-content"

type Locale = "pt" | "en" | "es" | "fr"

const pageCopy: Record<
  Locale,
  {
    heroKicker: string
    heroTitle: string
    heroSubtitle: string
    heroPrimary: string
    heroSecondary: string
    stats: string[]
    howItWorksEyebrow: string
    howItWorksTitle: string
    howItWorksSubtitle: string
    steps: Array<{ title: string; body: string }>
    guidanceEyebrow: string
    guidanceTitle: string
    guidanceBody: string
    guidancePoints: string[]
    segmentsEyebrow: string
    segmentsTitle: string
    segments: Array<{ title: string; body: string }>
    intlTitle: string
    intlBody: string
    intlPoints: string[]
    experiencesTitle: string
    experiencesBody: string
    packagesTitle: string
    packagesBody: string
    proofEyebrow: string
    proofTitle: string
    proofBody: string
    proofCards: Array<{
      name: string
      origin: string
      destination: string
      quote: string
      imageLabel: string
    }>
    whatsappTitle: string
    whatsappBody: string
    whatsappBullets: string[]
    finalTitle: string
    finalBody: string
    finalPrimary: string
    finalSecondary: string
    packageLabel: string
    experienceLabel: string
    trustLabel: string
  }
> = {
  pt: {
    heroKicker: "Planejamento premium",
    heroTitle: "Planeje sua viagem ao Marajo com mais clareza e menos friccao",
    heroSubtitle:
      "Esta e a pagina para quem ainda esta comparando experiencias, pacotes e suporte humano. Organizamos o que muda para primeira viagem, visitante internacional e perfis que querem conforto ou pouco tempo.",
    heroPrimary: "Falar no WhatsApp",
    heroSecondary: "Ver pacotes",
    stats: ["Resposta humana em ate 24h", "Curadoria local", "Pacotes e experiencias", "Suporte para visitantes internacionais"],
    howItWorksEyebrow: "Como funciona",
    howItWorksTitle: "Um processo simples para transformar interesse em roteiro real",
    howItWorksSubtitle: "A pagina foi desenhada para reduzir duvidas antes de levar o visitante para WhatsApp, pacotes ou experiencias.",
    steps: [
      { title: "1. Entendemos seu perfil", body: "Primeira viagem, poucos dias, conforto elevado ou visita internacional mudam completamente o desenho ideal do roteiro." },
      { title: "2. Indicamos o melhor formato", body: "Mostramos quando faz mais sentido reservar experiencias avulsas, escolher um pacote ou montar um plano com concierge." },
      { title: "3. Ajustamos logistica e timing", body: "Base da viagem, ritmo, temporada e conexoes locais entram antes da decisao final para reduzir friccao." },
    ],
    guidanceEyebrow: "Primeira viagem",
    guidanceTitle: "O que quase sempre funciona melhor na primeira visita",
    guidanceBody:
      "Quem visita Marajo pela primeira vez costuma ter mais resultado quando evita excesso de deslocamentos e combina um eixo claro: uma base forte, um momento iconico, um contato cultural e uma experiencia de natureza.",
    guidancePoints: [
      "Comece com uma base principal, normalmente Soure ou Salvaterra",
      "Combine um destaque visual, um momento cultural e uma experiencia guiada",
      "Use pacotes quando quiser menos decisao operacional",
      "Use experiencias avulsas quando ja souber o estilo da viagem",
    ],
    segmentsEyebrow: "Perfis de viajante",
    segmentsTitle: "Escolha o caminho mais inteligente para o seu perfil",
    segments: [
      { title: "First-time visitor", body: "Ideal para quem precisa de contexto, comparacao clara entre experiencias e ajuda para nao desperdiçar dias com logistica mal planejada." },
      { title: "International visitor", body: "Melhor para quem precisa de mais seguranca, orientacao local, ajuda com ritmo da viagem e uma rota facil de executar." },
      { title: "Short trip traveler", body: "Perfeito para quem tem poucos dias e quer priorizar impacto visual, deslocamento eficiente e uma selecao enxuta do que vale mais a pena." },
      { title: "Comfort-focused traveler", body: "Pensado para quem quer reduzir incerteza, usar curadoria local e combinar melhor hospedagem, pacing e suporte humano." },
    ],
    intlTitle: "Support designed for international visitors",
    intlBody:
      "Para visitantes vindo dos EUA, Europa e America Latina, a decisao normalmente depende menos de quantidade de opcoes e mais de clareza sobre logistica, segurança percebida e escolha do formato certo da viagem.",
    intlPoints: [
      "Ajuda para transformar interesse em roteiro pratico",
      "Recomendacoes entre experiencias, pacotes e planejamento humano",
      "Orientacao para timing, base da viagem e proximo passo comercial",
    ],
    experiencesTitle: "Experiencias recomendadas para decidir com mais seguranca",
    experiencesBody:
      "Estas sao as experiencias com maior poder de explicacao comercial para quem ainda esta entendendo o destino.",
    packagesTitle: "Pacotes recomendados para reduzir friccao",
    packagesBody:
      "Os pacotes funcionam melhor para viajantes que querem menos incerteza, uma estrutura mais pronta e melhor controle do ritmo da viagem.",
    proofEyebrow: "Estrutura de prova",
    proofTitle: "Pronto para mostrar confianca de forma mais comercial",
    proofBody:
      "Montamos uma estrutura premium pronta para receber prova real de viajantes, com nome, origem, destino visitado, frase curta e imagem.",
    proofCards: [
      { name: "Emily R.", origin: "USA", destination: "Soure", quote: "The concierge made Marajo feel clear and bookable before we even arrived in Belem.", imageLabel: "Traveler portrait placeholder" },
      { name: "Lucia M.", origin: "Spain", destination: "Salvaterra", quote: "The planning help turned a confusing route into a calm and beautifully paced trip.", imageLabel: "Traveler portrait placeholder" },
      { name: "Rafael T.", origin: "Brazil", destination: "Praia do Pesqueiro", quote: "The package recommendation saved time and made the first trip much easier to enjoy.", imageLabel: "Traveler portrait placeholder" },
    ],
    whatsappTitle: "O WhatsApp continua sendo o melhor proximo passo para decisao",
    whatsappBody:
      "Quando o visitante ainda compara formato, timing e nivel de suporte, o WhatsApp converte melhor do que forcar uma decisao imediata de checkout.",
    whatsappBullets: ["Receba orientacao humana", "Entenda se faz mais sentido pacote ou experiencia", "Saia com um proximo passo claro"],
    finalTitle: "Pronto para sair da pesquisa e entrar no planejamento real?",
    finalBody:
      "Se voce ja entendeu seu perfil, o proximo passo e escolher entre falar com o concierge, comparar pacotes ou explorar experiencias especificas.",
    finalPrimary: "Continuar no WhatsApp",
    finalSecondary: "Explorar experiencias",
    packageLabel: "Melhor para menos friccao",
    experienceLabel: "Melhor para escolha flexivel",
    trustLabel: "Estrutura pronta para prova real",
  },
  en: {
    heroKicker: "Premium planning",
    heroTitle: "Plan your Marajo trip with more clarity and less friction",
    heroSubtitle:
      "This is the decision page for travelers still comparing experiences, packages, and human support. It helps first-time visitors, international travelers, short trips, and comfort-focused profiles choose the right next step.",
    heroPrimary: "Talk on WhatsApp",
    heroSecondary: "View packages",
    stats: ["Human reply within 24 hours", "Local curation", "Packages and experiences", "Support for international visitors"],
    howItWorksEyebrow: "How it works",
    howItWorksTitle: "A simpler path from research to a real itinerary",
    howItWorksSubtitle: "The page is structured to reduce doubt before moving the visitor into WhatsApp, packages, or experiences.",
    steps: [
      { title: "1. We understand your profile", body: "First-time visitors, short stays, premium-comfort travelers, and international guests need different trip structures." },
      { title: "2. We recommend the right format", body: "We clarify when separate experiences work best, when a package reduces friction, and when concierge support matters most." },
      { title: "3. We align logistics and timing", body: "Base destination, trip rhythm, seasonality, and local coordination are addressed before the final decision." },
    ],
    guidanceEyebrow: "First trip",
    guidanceTitle: "What usually works best on a first Marajo trip",
    guidanceBody:
      "First-time visitors tend to get a better result when they avoid overloading the itinerary and instead combine one strong base, one iconic moment, one cultural anchor, and one nature experience.",
    guidancePoints: [
      "Start with one main base, usually Soure or Salvaterra",
      "Combine visual impact, cultural depth, and one guided route",
      "Choose packages when you want less operational decision-making",
      "Choose separate experiences when your trip style is already clear",
    ],
    segmentsEyebrow: "Traveler profiles",
    segmentsTitle: "Choose the smartest path for your traveler profile",
    segments: [
      { title: "First-time visitor", body: "Best for travelers who need context, a clear comparison between packages and experiences, and help avoiding weak itinerary decisions." },
      { title: "International visitor", body: "Designed for visitors who need more reassurance, stronger local guidance, and a route that feels easier to execute." },
      { title: "Short trip traveler", body: "Ideal for visitors with limited days who want visual impact, efficient movement, and fewer but stronger choices." },
      { title: "Comfort-focused traveler", body: "For travelers who want to reduce uncertainty, use local curation, and combine pacing, support, and better fit." },
    ],
    intlTitle: "Support designed for international visitors",
    intlBody:
      "For visitors from the USA, Europe, and Latin America, the key decision is usually not quantity of options but clarity around logistics, local support, and the best trip format.",
    intlPoints: [
      "Help turning discovery into a practical route",
      "Guidance on whether packages or experiences fit better",
      "Support for timing, base selection, and the commercial next step",
    ],
    experiencesTitle: "Recommended experiences for a clearer decision",
    experiencesBody: "These are the experiences that best explain the destination while helping visitors decide whether Marajo fits their travel style.",
    packagesTitle: "Recommended packages for lower-friction planning",
    packagesBody: "Packages work best for travelers who want more structure, less uncertainty, and a stronger sense of pacing from the start.",
    proofEyebrow: "Trust structure",
    proofTitle: "Ready to hold stronger traveler proof",
    proofBody: "This section is now structured for commercial proof with traveler name, origin country, destination visited, short quote, and image.",
    proofCards: [
      { name: "Emily R.", origin: "USA", destination: "Soure", quote: "The concierge made Marajo feel clear and bookable before we even arrived in Belem.", imageLabel: "Traveler portrait placeholder" },
      { name: "Lucia M.", origin: "Spain", destination: "Salvaterra", quote: "The planning help turned a confusing route into a calm and beautifully paced trip.", imageLabel: "Traveler portrait placeholder" },
      { name: "Rafael T.", origin: "Brazil", destination: "Praia do Pesqueiro", quote: "The package recommendation saved time and made the first trip much easier to enjoy.", imageLabel: "Traveler portrait placeholder" },
    ],
    whatsappTitle: "WhatsApp is still the strongest next step for decision-stage visitors",
    whatsappBody: "When visitors are still comparing trip format, timing, and support level, WhatsApp converts better than forcing an immediate checkout decision.",
    whatsappBullets: ["Get human guidance", "Understand whether a package or experience fits best", "Leave with a clear next step"],
    finalTitle: "Ready to move from research into real planning?",
    finalBody: "If your profile is already clearer, the next step is to talk to concierge, compare packages, or explore specific experiences.",
    finalPrimary: "Continue on WhatsApp",
    finalSecondary: "Explore experiences",
    packageLabel: "Best for lower friction",
    experienceLabel: "Best for flexible selection",
    trustLabel: "Ready for real traveler proof",
  },
  es: {
    heroKicker: "Planificacion premium",
    heroTitle: "Planifica tu viaje a Marajo con mas claridad y menos friccion",
    heroSubtitle:
      "Esta es la pagina de decision para viajeros que todavia comparan experiencias, paquetes y soporte humano. Ayuda especialmente a visitantes primerizos, internacionales, viajes cortos y perfiles que buscan mas comodidad.",
    heroPrimary: "Hablar por WhatsApp",
    heroSecondary: "Ver paquetes",
    stats: ["Respuesta humana en 24 horas", "Curaduria local", "Paquetes y experiencias", "Soporte para visitantes internacionales"],
    howItWorksEyebrow: "Como funciona",
    howItWorksTitle: "Un camino mas simple desde la investigacion hasta un itinerario real",
    howItWorksSubtitle: "La pagina reduce dudas antes de mover al visitante hacia WhatsApp, paquetes o experiencias.",
    steps: [
      { title: "1. Entendemos tu perfil", body: "Los visitantes primerizos, los viajes cortos, los viajeros internacionales y quienes priorizan comodidad necesitan estructuras distintas." },
      { title: "2. Indicamos el formato correcto", body: "Aclaramos cuando convienen experiencias separadas, cuando un paquete reduce friccion y cuando el concierge agrega mas valor." },
      { title: "3. Ajustamos logistica y timing", body: "Base del viaje, ritmo, temporada y coordinacion local entran antes de la decision final." },
    ],
    guidanceEyebrow: "Primer viaje",
    guidanceTitle: "Lo que suele funcionar mejor en una primera visita",
    guidanceBody: "Quien visita Marajo por primera vez suele obtener mejores resultados evitando itinerarios sobrecargados y combinando una base fuerte, un momento iconico, un eje cultural y una experiencia de naturaleza.",
    guidancePoints: ["Empieza con una base principal, normalmente Soure o Salvaterra", "Combina impacto visual, profundidad cultural y una ruta guiada", "Usa paquetes cuando quieras menos decisiones operativas", "Usa experiencias sueltas cuando ya tengas claro tu estilo de viaje"],
    segmentsEyebrow: "Perfiles de viajero",
    segmentsTitle: "Elige el camino mas inteligente para tu perfil",
    segments: [
      { title: "First-time visitor", body: "Ideal para quien necesita contexto, comparacion clara entre paquetes y experiencias, y ayuda para evitar decisiones debiles." },
      { title: "International visitor", body: "Pensado para visitantes que necesitan mas seguridad, orientacion local y una ruta mas facil de ejecutar." },
      { title: "Short trip traveler", body: "Ideal para quienes tienen pocos dias y quieren impacto visual, desplazamiento eficiente y menos decisiones." },
      { title: "Comfort-focused traveler", body: "Para viajeros que buscan reducir incertidumbre, usar curaduria local y combinar mejor ritmo, soporte y comodidad." },
    ],
    intlTitle: "Soporte pensado para visitantes internacionales",
    intlBody: "Para visitantes de Estados Unidos, Europa y America Latina, la decision depende menos de cantidad de opciones y mas de claridad sobre logistica, soporte local y formato del viaje.",
    intlPoints: ["Ayuda para convertir interes en una ruta practica", "Orientacion sobre paquetes versus experiencias", "Soporte para timing, base del viaje y siguiente paso comercial"],
    experiencesTitle: "Experiencias recomendadas para decidir mejor",
    experiencesBody: "Estas experiencias explican bien el destino y ayudan a decidir si Marajo encaja con el estilo de viaje.",
    packagesTitle: "Paquetes recomendados para reducir friccion",
    packagesBody: "Los paquetes funcionan mejor para viajeros que quieren mas estructura, menos incertidumbre y mejor control del ritmo desde el inicio.",
    proofEyebrow: "Estructura de confianza",
    proofTitle: "Lista para recibir prueba real de viajeros",
    proofBody: "La seccion ya esta preparada para mostrar nombre, pais de origen, destino visitado, frase breve e imagen.",
    proofCards: [
      { name: "Emily R.", origin: "USA", destination: "Soure", quote: "El concierge hizo que Marajo se sintiera claro y reservable antes de llegar a Belem.", imageLabel: "Marcador de retrato de viajero" },
      { name: "Lucia M.", origin: "Spain", destination: "Salvaterra", quote: "La ayuda de planificacion transformo una ruta confusa en un viaje calmo y bien ritmado.", imageLabel: "Marcador de retrato de viajero" },
      { name: "Rafael T.", origin: "Brazil", destination: "Praia do Pesqueiro", quote: "La recomendacion del paquete ahorro tiempo e hizo mucho mas facil disfrutar la primera visita.", imageLabel: "Marcador de retrato de viajero" },
    ],
    whatsappTitle: "WhatsApp sigue siendo el mejor siguiente paso para visitantes en fase de decision",
    whatsappBody: "Cuando el visitante todavia compara formato, timing y nivel de soporte, WhatsApp convierte mejor que forzar una reserva inmediata.",
    whatsappBullets: ["Recibe orientacion humana", "Entiende si conviene mas un paquete o una experiencia", "Termina con un siguiente paso claro"],
    finalTitle: "Listo para pasar de la investigacion a la planificacion real?",
    finalBody: "Si tu perfil ya esta mas claro, el siguiente paso es hablar con el concierge, comparar paquetes o explorar experiencias especificas.",
    finalPrimary: "Continuar por WhatsApp",
    finalSecondary: "Explorar experiencias",
    packageLabel: "Mejor para menos friccion",
    experienceLabel: "Mejor para eleccion flexible",
    trustLabel: "Lista para prueba real de viajeros",
  },
  fr: {
    heroKicker: "Planification premium",
    heroTitle: "Planifiez votre voyage a Marajo avec plus de clarte et moins de friction",
    heroSubtitle:
      "Cette page aide les voyageurs qui comparent encore experiences, forfaits et support humain. Elle a ete pensee pour les premieres visites, les visiteurs internationaux, les courts sejours et les profils qui privilegient le confort.",
    heroPrimary: "Parler sur WhatsApp",
    heroSecondary: "Voir les forfaits",
    stats: ["Reponse humaine sous 24 heures", "Curation locale", "Forfaits et experiences", "Support pour visiteurs internationaux"],
    howItWorksEyebrow: "Fonctionnement",
    howItWorksTitle: "Un passage plus simple de la recherche a un vrai itineraire",
    howItWorksSubtitle: "La page reduit l'incertitude avant d'orienter le visiteur vers WhatsApp, les forfaits ou les experiences.",
    steps: [
      { title: "1. Nous comprenons votre profil", body: "Premiere visite, court sejour, recherche de confort ou visite internationale demandent des structures differentes." },
      { title: "2. Nous recommandons le bon format", body: "Nous clarifions quand choisir des experiences, quand un forfait reduit la friction et quand le concierge apporte le plus de valeur." },
      { title: "3. Nous alignons logistique et timing", body: "Base du voyage, rythme, saison et coordination locale sont pris en compte avant la decision finale." },
    ],
    guidanceEyebrow: "Premiere visite",
    guidanceTitle: "Ce qui fonctionne le mieux lors d'un premier voyage",
    guidanceBody: "Les premiers visiteurs obtiennent souvent de meilleurs resultats lorsqu'ils evitent les itineraires surcharges et combinent une base forte, un moment iconique, un axe culturel et une experience de nature.",
    guidancePoints: ["Commencez avec une base principale, souvent Soure ou Salvaterra", "Combinez impact visuel, profondeur culturelle et une route guidee", "Choisissez les forfaits si vous voulez moins de decisions operationnelles", "Choisissez les experiences si votre style de voyage est deja clair"],
    segmentsEyebrow: "Profils voyageurs",
    segmentsTitle: "Choisissez le chemin le plus intelligent pour votre profil",
    segments: [
      { title: "First-time visitor", body: "Ideal pour les voyageurs qui ont besoin de contexte, de comparaison claire entre forfaits et experiences, et d'aide pour eviter de mauvais choix." },
      { title: "International visitor", body: "Concu pour les visiteurs qui ont besoin de plus de reassurance, d'un meilleur accompagnement local et d'une route plus simple a executer." },
      { title: "Short trip traveler", body: "Ideal pour les voyageurs avec peu de jours qui veulent plus d'impact visuel et moins de friction." },
      { title: "Comfort-focused traveler", body: "Pour les voyageurs qui veulent reduire l'incertitude, utiliser une curation locale et mieux combiner rythme, support et confort." },
    ],
    intlTitle: "Support pense pour les visiteurs internationaux",
    intlBody: "Pour les visiteurs venant des Etats-Unis, d'Europe et d'Amerique latine, la decision depend surtout de clarte sur la logistique, le support local et le format du voyage.",
    intlPoints: ["Aide pour transformer l'interet en route pratique", "Orientation entre forfaits et experiences", "Support pour le timing, la base et le prochain pas commercial"],
    experiencesTitle: "Experiences recommandees pour decider plus facilement",
    experiencesBody: "Ces experiences expliquent bien la destination tout en aidant le visiteur a savoir si Marajo correspond a son profil.",
    packagesTitle: "Forfaits recommandes pour reduire la friction",
    packagesBody: "Les forfaits conviennent mieux aux voyageurs qui veulent plus de structure, moins d'incertitude et un rythme plus clair des le depart.",
    proofEyebrow: "Structure de confiance",
    proofTitle: "Prete a recevoir de vraies preuves voyageurs",
    proofBody: "La section est maintenant prete pour afficher nom, pays d'origine, destination visitee, citation courte et image.",
    proofCards: [
      { name: "Emily R.", origin: "USA", destination: "Soure", quote: "Le concierge a rendu Marajo clair et reservable avant meme notre arrivee a Belem.", imageLabel: "Remplissage portrait voyageur" },
      { name: "Lucia M.", origin: "Spain", destination: "Salvaterra", quote: "L'aide a la planification a transforme une route confuse en voyage calme et bien rythme.", imageLabel: "Remplissage portrait voyageur" },
      { name: "Rafael T.", origin: "Brazil", destination: "Praia do Pesqueiro", quote: "La recommandation du forfait a fait gagner du temps et a rendu le premier voyage beaucoup plus simple.", imageLabel: "Remplissage portrait voyageur" },
    ],
    whatsappTitle: "WhatsApp reste le meilleur prochain pas pour les visiteurs en phase de decision",
    whatsappBody: "Quand le voyageur compare encore format, timing et niveau de support, WhatsApp convertit mieux qu'une tentative de reservation immediate.",
    whatsappBullets: ["Recevez un accompagnement humain", "Comprenez si forfait ou experience convient mieux", "Repartez avec une prochaine etape claire"],
    finalTitle: "Pret a passer de la recherche a la vraie planification ?",
    finalBody: "Si votre profil est deja plus clair, l'etape suivante est de parler au concierge, comparer les forfaits ou explorer des experiences precises.",
    finalPrimary: "Continuer sur WhatsApp",
    finalSecondary: "Explorer les experiences",
    packageLabel: "Mieux pour moins de friction",
    experienceLabel: "Mieux pour un choix flexible",
    trustLabel: "Prete pour de vraies preuves voyageurs",
  },
}

function buildWhatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  return buildWhatsAppUrl(number, message)
}

export default function PlanTripPageClient() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const copy = pageCopy[lang]
  const whatsappLink = buildWhatsappLink(content.pages.planTrip.whatsappMessage)
  const planningGuides = getGuidesBySlugs([
    "marajo-island-travel-guide",
    "how-to-visit-marajo-island",
    "marajo-itinerary-guide",
  ])
  const recommendedExperiences = experiences.filter((item) =>
    ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"].includes(item.slug),
  )
  const recommendedPackages = packages.filter((item) =>
    ["marajo-essencial", "marajo-slow"].includes(item.slug),
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,102,0,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.10),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.heroKicker}</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
                  {copy.heroSubtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                    >
                      {copy.heroPrimary}
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/70">
                      {content.pages.planTrip.whatsappFallback}
                    </span>
                  )}
                  <Link
                    href="/pacotes"
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {copy.heroSecondary}
                  </Link>
                  <Link
                    href="/experiencias"
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {copy.finalSecondary}
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{content.pages.planTrip.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{content.pages.planTrip.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/85">
                  {copy.stats.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.howItWorksEyebrow} title={copy.howItWorksTitle} subtitle={copy.howItWorksSubtitle} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.steps.map((step) => (
                <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#0B1C2C]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_0.92fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.guidanceEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.guidanceTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{copy.guidanceBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {copy.guidancePoints.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-[#FFF1E8] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A3412]">International support</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.intlTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{copy.intlBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {copy.intlPoints.map((item) => (
                  <li key={item} className="rounded-2xl bg-white/80 px-4 py-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.segmentsEyebrow} title={copy.segmentsTitle} subtitle={content.pages.planTrip.subtitle} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.segments.map((segment) => (
                <article key={segment.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#0B1C2C]">{segment.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{segment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.experiencesTitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.experiencesBody}</p>
              <div className="mt-6 grid gap-4">
                {recommendedExperiences.map((experience) => (
                  <Link key={experience.slug} href={`/experiencias/${experience.slug}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#003366] hover:bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0B1C2C]">{experience.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{experience.shortDescription}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#003366]">{copy.experienceLabel}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/experiencias" className="mt-5 inline-flex text-sm font-semibold text-[#003366]">{copy.finalSecondary}</Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{copy.packagesTitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.packagesBody}</p>
              <div className="mt-6 grid gap-4">
                {recommendedPackages.map((item) => (
                  <Link key={item.slug} href="/pacotes" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#003366] hover:bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0B1C2C]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                        <p className="mt-3 text-sm font-medium text-[#003366]">{item.duration}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#003366]">{copy.packageLabel}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/pacotes" className="mt-5 inline-flex text-sm font-semibold text-[#003366]">{copy.heroSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow={copy.proofEyebrow} title={copy.proofTitle} subtitle={copy.proofBody} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.proofCards.map((item) => (
                <article key={`${item.name}-${item.destination}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E8] px-2 text-[10px] font-semibold text-[#9A3412]">
                      {item.imageLabel}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0B1C2C]">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.origin} • {item.destination}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">“{item.quote}”</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">{copy.trustLabel}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_0.92fr]">
            <div className="rounded-3xl bg-[#0B1C2C] p-8 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">WhatsApp conversion</p>
              <h2 className="mt-3 text-3xl font-semibold">{copy.whatsappTitle}</h2>
              <p className="mt-4 text-base leading-7 text-white/80">{copy.whatsappBody}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {copy.whatsappBullets.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</li>
                ))}
              </ul>
              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                >
                  {content.pages.planTrip.whatsappCta}
                </a>
              ) : (
                <p className="mt-6 text-sm text-white/65">{content.pages.planTrip.whatsappFallback}</p>
              )}
              <Link
                href="/services/brazil-visa-consulting"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore visa consulting
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planning guides</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">
                Read before you decide between package, experience, or concierge support
              </h2>
              <div className="mt-6 grid gap-4">
                {planningGuides.map((guide) => (
                  <Link
                    key={guide!.slug}
                    href={`/guides/${guide!.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#003366] hover:bg-white"
                  >
                    <span className="text-base font-semibold text-[#0B1C2C]">{guide!.title}</span>
                    <span className="mt-2 block text-sm text-slate-500">{guide!.seoDescription}</span>
                  </Link>
                ))}
              </div>
              <Link href="/guides" className="mt-5 inline-flex text-sm font-semibold text-[#003366]">
                Explore the full guides hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-[#F7F7F8] p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Final CTA</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">{copy.finalTitle}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{copy.finalBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    {copy.finalPrimary}
                  </a>
                ) : null}
                <Link
                  href="/pacotes"
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                >
                  {copy.heroSecondary}
                </Link>
                <Link
                  href="/experiencias"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {copy.finalSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
