"use client"

import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import ExperienceCheckoutButton from "@/components/checkout/ExperienceCheckoutButton"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedExperience, type ExperienceItem } from "@/data/experiencias"
import { getGuideSlugsForExperience, getGuidesBySlugs } from "@/data/guides"
import { getLocalizedPath } from "@/i18n/routing"

interface ExperienceDetailContentProps {
  experience: ExperienceItem
}

const localeMap: Record<"pt" | "en" | "es" | "fr", string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
}

const guideSectionLabels = {
  pt: {
    eyebrow: "Guias de viagem",
    fallbackTitle: "Leia antes de reservar",
    fallbackBody:
      "Esses guias adicionam contexto cultural, sazonal e logístico para ajudar você a escolher a experiência certa para o seu estilo de viagem.",
    guideTitlePrefix: "Guia relacionado:",
  },
  en: {
    eyebrow: "Travel guides",
    fallbackTitle: "Read before you book",
    fallbackBody:
      "These guides add cultural, seasonal, and planning context to help you choose the right experience for your travel style.",
    guideTitlePrefix: "Related guide:",
  },
  es: {
    eyebrow: "Guías de viaje",
    fallbackTitle: "Lee antes de reservar",
    fallbackBody:
      "Estas guías añaden contexto cultural, estacional y logístico para ayudarte a elegir la experiencia adecuada para tu estilo de viaje.",
    guideTitlePrefix: "Guía relacionada:",
  },
  fr: {
    eyebrow: "Guides de voyage",
    fallbackTitle: "À lire avant de réserver",
    fallbackBody:
      "Ces guides ajoutent un contexte culturel, saisonnier et logistique pour vous aider à choisir l'expérience la plus adaptée à votre style de voyage.",
    guideTitlePrefix: "Guide associé :",
  },
} as const

const detailPageLabels = {
  pt: {
    eyebrow: "Detalhes",
    title: "O que torna essa experiência única",
    includedTitle: "O que está incluído",
    priceLabel: "Investimento a partir de",
    perPersonLabel: "Por pessoa • avaliação",
    reserveNow: "Reservar agora",
    planWithConcierge: "Planejar com concierge",
    reserveExperience: "Reservar experiência",
    talkToConsultant: "Falar com consultor",
  },
  en: {
    eyebrow: "Details",
    title: "What makes this experience unique",
    includedTitle: "What's included",
    priceLabel: "Investment from",
    perPersonLabel: "Per person • rating",
    reserveNow: "Book now",
    planWithConcierge: "Plan with concierge",
    reserveExperience: "Book experience",
    talkToConsultant: "Talk to a consultant",
  },
  es: {
    eyebrow: "Detalles",
    title: "Qué hace única esta experiencia",
    includedTitle: "Qué está incluido",
    priceLabel: "Inversión desde",
    perPersonLabel: "Por persona • calificación",
    reserveNow: "Reservar ahora",
    planWithConcierge: "Planear con concierge",
    reserveExperience: "Reservar experiencia",
    talkToConsultant: "Hablar con un consultor",
  },
  fr: {
    eyebrow: "Détails",
    title: "Ce qui rend cette expérience unique",
    includedTitle: "Ce qui est inclus",
    priceLabel: "Investissement à partir de",
    perPersonLabel: "Par personne • note",
    reserveNow: "Réserver maintenant",
    planWithConcierge: "Planifier avec le concierge",
    reserveExperience: "Réserver l'expérience",
    talkToConsultant: "Parler à un conseiller",
  },
} as const

const guideContextByExperience = {
  pesqueiro: {
    pt: {
      title: "Planeje a experiência de praia mais icônica com mais contexto",
      body:
        "Esses guias ajudam a entender quando ir, como o Pesqueiro se encaixa em um primeiro roteiro no Marajó e o que combinar com o pôr do sol mais emblemático da ilha.",
    },
    en: {
      title: "Plan the island's signature beach experience with more context",
      body:
        "These guides explain when to go, how Pesqueiro fits into a first Marajó itinerary, and what pairs well with the island's flagship sunset experience.",
    },
    es: {
      title: "Planifica la experiencia de playa más icónica con más contexto",
      body:
        "Estas guías explican cuándo ir, cómo encaja Pesqueiro en un primer itinerario por Marajó y qué combinar con el atardecer más emblemático de la isla.",
    },
    fr: {
      title: "Préparez l'expérience de plage la plus emblématique avec plus de contexte",
      body:
        "Ces guides expliquent quand partir, comment Pesqueiro s'intègre à un premier itinéraire sur Marajó et quoi associer au coucher du soleil le plus emblématique de l'île.",
    },
  },
  "bufalos-queijaria": {
    pt: {
      title: "Entenda a dimensão cultural antes de reservar",
      body:
        "Experiências com búfalos e queijo convertem melhor quando o viajante entende a identidade gastronômica da ilha, a cultura das fazendas e por que esse tema é central no Marajó.",
    },
    en: {
      title: "Understand the cultural side before you book",
      body:
        "Buffalo and cheese experiences work better when travelers understand the island's food identity, farm culture, and why this theme is central to Marajó.",
    },
    es: {
      title: "Comprende el lado cultural antes de reservar",
      body:
        "Las experiencias con búfalos y queso funcionan mejor cuando el viajero entiende la identidad gastronómica de la isla, la cultura de las haciendas y por qué este tema es central en Marajó.",
    },
    fr: {
      title: "Comprenez la dimension culturelle avant de réserver",
      body:
        "Les expériences autour des buffles et du fromage prennent plus de sens quand les voyageurs comprennent l'identité gastronomique de l'île, la culture des fermes et l'importance de ce thème à Marajó.",
    },
  },
  "manguezais-salvaterra": {
    pt: {
      title: "Adicione contexto de vida selvagem e rios a este passeio",
      body:
        "Esses guias ajudam a conectar manguezais, aves, sazonalidade e planejamento mais amplo do destino antes de escolher uma experiência guiada pela natureza.",
    },
    en: {
      title: "Add wildlife and river context to this outing",
      body:
        "These guides connect mangroves, birds, seasonality, and broader destination planning before travelers choose a nature-led experience.",
    },
    es: {
      title: "Añade contexto de fauna y ríos a esta salida",
      body:
        "Estas guías conectan manglares, aves, estacionalidad y planificación más amplia del destino antes de elegir una experiencia centrada en la naturaleza.",
    },
    fr: {
      title: "Ajoutez un contexte faune et rivières à cette sortie",
      body:
        "Ces guides relient mangroves, oiseaux, saisonnalité et planification plus large de la destination avant de choisir une expérience axée sur la nature.",
    },
  },
  "cavalgada-praia": {
    pt: {
      title: "Veja como a cavalgada se encaixa no destino",
      body:
        "As experiências a cavalo ganham mais força quando o viajante entende o melhor momento de praia, a cultura dos búfalos e a paisagem ampla que dá sentido ao percurso.",
    },
    en: {
      title: "See how horseback riding fits the destination",
      body:
        "Horseback outings feel stronger when travelers understand beach timing, buffalo culture, and the broader landscape story behind the ride.",
    },
    es: {
      title: "Descubre cómo encaja la cabalgata en el destino",
      body:
        "Las salidas a caballo tienen más sentido cuando el viajero entiende el mejor momento de playa, la cultura del búfalo y la historia del paisaje detrás del recorrido.",
    },
    fr: {
      title: "Voyez comment l'expérience à cheval s'inscrit dans la destination",
      body:
        "Les sorties à cheval prennent plus de sens quand les voyageurs comprennent le bon moment pour la plage, la culture du buffle et l'histoire paysagère derrière la balade.",
    },
  },
} as const

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ExperienceDetailContent({ experience }: ExperienceDetailContentProps) {
  const { lang } = useSiteLanguage()
  const locale = localeMap[lang] ?? "pt-BR"
  const detailLabels = detailPageLabels[lang]
  const localizedExperience = getLocalizedExperience(experience, lang)
  const guideLabels = guideSectionLabels[lang]
  const relatedGuides = getGuidesBySlugs(getGuideSlugsForExperience(experience.slug)).slice(0, 3)
  const guideContext = guideContextByExperience[experience.slug as keyof typeof guideContextByExperience]?.[lang]

  return (
    <main className="bg-white min-h-screen">
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={experience.heroImage}
            alt={localizedExperience.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/85" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-20">
          <div className="max-w-6xl mx-auto text-white">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white mb-4 backdrop-blur-sm">
              {localizedExperience.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{localizedExperience.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              {localizedExperience.fullDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
              <span className="rounded-full bg-white/10 px-4 py-2">{localizedExperience.location}</span>
              <span className="rounded-full bg-[#FF6600] px-4 py-2 text-white">
                {formatPrice(experience.priceFrom, locale)}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2">{localizedExperience.duration}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <ExperienceCheckoutButton
                slug={experience.slug}
                label={detailLabels.reserveNow}
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              />
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-[#003366] transition"
              >
                {detailLabels.planWithConcierge}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <SectionHeader
                eyebrow={detailLabels.eyebrow}
                title={detailLabels.title}
                subtitle={localizedExperience.shortDescription}
              />
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localizedExperience.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#003366] mb-4">
                  {detailLabels.includedTitle}
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {localizedExperience.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#FF6600]">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedGuides.length > 0 ? (
                <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{guideLabels.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-bold text-[#003366]">
                    {guideContext?.title ?? guideLabels.fallbackTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {guideContext?.body ?? guideLabels.fallbackBody}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide!.slug}
                        href={getLocalizedPath(lang, "guideDetail", { slug: guide!.slug })}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 transition hover:border-[#003366] hover:shadow-sm"
                      >
                        <span className="font-semibold text-[#0B1C2C]">
                          {guideLabels.guideTitlePrefix} {guide!.title}
                        </span>
                        <span className="mt-2 block text-slate-500">{guide!.seoDescription}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="rounded-3xl border border-gray-200 shadow-xl p-6 bg-white h-fit">
              <p className="text-sm text-gray-500 mb-2">{detailLabels.priceLabel}</p>
              <p className="text-3xl font-bold text-[#FF6600] mb-4">{formatPrice(experience.priceFrom, locale)}</p>
              <p className="text-sm text-gray-500 mb-6">
                {detailLabels.perPersonLabel} {experience.rating}
              </p>
              <ExperienceCheckoutButton
                slug={experience.slug}
                label={detailLabels.reserveExperience}
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              />
              <Link
                href={getLocalizedPath(lang, "planTrip")}
                className="mt-4 w-full inline-flex items-center justify-center rounded-xl border border-[#003366] px-6 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition"
              >
                {detailLabels.talkToConsultant}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
