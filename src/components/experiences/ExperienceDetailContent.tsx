"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useResolvedExperienceBySlug,
  useResolvedSiteContent,
} from "@/components/content/ContentOverridesProvider"
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
    fallbackTitle: "Leitura essencial antes de reservar",
    fallbackBody:
      "Estes guias ajudam você a entender contexto cultural, sazonalidade e encaixe logístico para reservar com mais segurança.",
    guideTitlePrefix: "Guia relacionado:",
  },
  en: {
    eyebrow: "Travel guides",
    fallbackTitle: "Essential reading before you book",
    fallbackBody:
      "These guides add cultural, seasonal, and planning context so you can book with more clarity and confidence.",
    guideTitlePrefix: "Related guide:",
  },
  es: {
    eyebrow: "Guias de viaje",
    fallbackTitle: "Lectura clave antes de reservar",
    fallbackBody:
      "Estas guias aportan contexto cultural, estacional y logistico para ayudarte a reservar con mas claridad y confianza.",
    guideTitlePrefix: "Guia relacionada:",
  },
  fr: {
    eyebrow: "Guides de voyage",
    fallbackTitle: "Lecture essentielle avant de reserver",
    fallbackBody:
      "Ces guides ajoutent un contexte culturel, saisonnier et logistique pour vous aider a reserver avec plus de clarte et de confiance.",
    guideTitlePrefix: "Guide associe :",
  },
} as const

const detailPageLabels = {
  pt: {
    eyebrow: "Detalhes",
    title: "Por que esta experiência merece entrar no seu roteiro",
    includedTitle: "O que acompanha a experiência",
    priceLabel: "Investimento inicial",
    perPersonLabel: "Por pessoa • avaliação real",
    reserveNow: "Reservar agora",
    planWithConcierge: "Planejar com especialista",
    reserveExperience: "Reservar experiência",
    talkToConsultant: "Falar com especialista",
  },
  en: {
    eyebrow: "Details",
    title: "Why this experience deserves a place in your itinerary",
    includedTitle: "What's included in your booking",
    priceLabel: "Starting investment",
    perPersonLabel: "Per person • verified rating",
    reserveNow: "Book now",
    planWithConcierge: "Plan with a specialist",
    reserveExperience: "Book experience",
    talkToConsultant: "Talk to a specialist",
  },
  es: {
    eyebrow: "Detalles",
    title: "Por que esta experiencia merece entrar en tu itinerario",
    includedTitle: "Que incluye tu reserva",
    priceLabel: "Inversion inicial",
    perPersonLabel: "Por persona • valoracion real",
    reserveNow: "Reservar ahora",
    planWithConcierge: "Planificar con especialista",
    reserveExperience: "Reservar experiencia",
    talkToConsultant: "Hablar con especialista",
  },
  fr: {
    eyebrow: "Details",
    title: "Pourquoi cette experience merite sa place dans votre itineraire",
    includedTitle: "Ce que comprend votre reservation",
    priceLabel: "Investissement initial",
    perPersonLabel: "Par personne • note verifiee",
    reserveNow: "Reserver maintenant",
    planWithConcierge: "Planifier avec un specialiste",
    reserveExperience: "Reserver l'experience",
    talkToConsultant: "Parler a un specialiste",
  },
} as const

const guideContextByExperience = {
  pesqueiro: {
    pt: {
      title: "Entenda por que o Pesqueiro costuma ser a primeira escolha de quem quer sentir Marajó",
      body:
        "Esses guias ajudam a entender quando ir, como o Pesqueiro entra em um primeiro roteiro bem desenhado e o que combinar com o pôr do sol mais emblemático da ilha.",
    },
    en: {
      title: "Understand why Pesqueiro is often the first choice for travelers who want to feel Marajo",
      body:
        "These guides explain when to go, how Pesqueiro fits a well-built first itinerary, and what pairs best with the island's flagship sunset experience.",
    },
    es: {
      title: "Entiende por que Pesqueiro suele ser la primera eleccion para sentir Marajo",
      body:
        "Estas guias explican cuando ir, como encaja Pesqueiro en un primer itinerario bien resuelto y que combinar con el atardecer mas emblematico de la isla.",
    },
    fr: {
      title: "Comprenez pourquoi Pesqueiro est souvent le premier choix pour ressentir Marajo",
      body:
        "Ces guides expliquent quand partir, comment Pesqueiro s'integre a un premier itineraire bien construit et quoi associer au coucher de soleil le plus emblematique de l'ile.",
    },
  },
  "bufalos-queijaria": {
    pt: {
      title: "Veja por que búfalos e queijo ajudam a revelar a identidade de Marajó",
      body:
        "Experiências com búfalos e queijo ficam mais valiosas quando o viajante entende a identidade gastronômica da ilha, a cultura das fazendas e o peso desse tema na leitura do destino.",
    },
    en: {
      title: "Understand the cultural side before you book",
      body:
        "Buffalo and cheese experiences work better when travelers understand the island's food identity, farm culture, and why this theme is central to Marajo.",
    },
    es: {
      title: "Comprende el lado cultural antes de reservar",
      body:
        "Las experiências con bufalos y queso funcionan mejor cuando el viajero entiende la identidad gastronomica de la isla, la cultura de las haciendas y por que este tema es central en Marajo.",
    },
    fr: {
      title: "Comprenez la dimension culturelle avant de reserver",
      body:
        "Les experiences autour des buffles et du fromage prennent plus de sens quand les voyageurs comprennent l'identite gastronomique de l'ile, la culture des fermes et l'importance de ce theme a Marajo.",
    },
  },
  "manguezais-salvaterra": {
    pt: {
      title: "Entenda como manguezais, rios e fauna entram no lado mais natural da ilha",
      body:
        "Esses guias conectam manguezais, aves, sazonalidade e planejamento mais amplo do destino antes de escolher uma experiência guiada pela natureza.",
    },
    en: {
      title: "Add wildlife and river context to this outing",
      body:
        "These guides connect mangroves, birds, seasonality, and broader destination planning before travelers choose a nature-led experience.",
    },
    es: {
      title: "Anade contexto de fauna y rios a esta salida",
      body:
        "Estas guias conectan manglares, aves, estacionalidad y planificacion mas amplia del destino antes de elegir una experiência centrada en la naturaleza.",
    },
    fr: {
      title: "Ajoutez un contexte faune et rivieres a cette sortie",
      body:
        "Ces guides relient mangroves, oiseaux, saisonnalite et planification plus large de la destination avant de choisir une experience axee sur la nature.",
    },
  },
  "cavalgada-praia": {
    pt: {
      title: "Entenda por que a cavalgada combina paisagem, ritmo e leitura cultural da ilha",
      body:
        "As experiências a cavalo ganham mais força quando o viajante entende o melhor momento de praia, a cultura dos búfalos e a paisagem ampla que dá sentido ao percurso.",
    },
    en: {
      title: "See how horseback riding fits the destination",
      body:
        "Horseback outings feel stronger when travelers understand beach timing, buffalo culture, and the broader landscape story behind the ride.",
    },
    es: {
      title: "Descubre como encaja la cabalgata en el destino",
      body:
        "Las salidas a caballo tienen mas sentido cuando el viajero entiende el mejor momento de playa, la cultura del bufalo y la historia del paisaje detras del recorrido.",
    },
    fr: {
      title: "Voyez comment l'experience a cheval s'inscrit dans la destination",
      body:
        "Les sorties a cheval prennent plus de sens quand les voyageurs comprennent le bon moment pour la plage, la culture du buffle et l'histoire paysagere derriere la balade.",
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
  const resolvedExperience = useResolvedExperienceBySlug(experience.slug) ?? experience
  const detailLabels = detailPageLabels[lang]
  const content = useResolvedSiteContent()
  const experiencePageContent = content.pages.experienceDetail
  const localizedExperience = getLocalizedExperience(resolvedExperience, lang)
  const guideLabels = guideSectionLabels[lang]
  const relatedGuides = getGuidesBySlugs(getGuideSlugsForExperience(resolvedExperience.slug)).slice(0, 3)
  const guideContext =
    guideContextByExperience[resolvedExperience.slug as keyof typeof guideContextByExperience]?.[lang]

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f7f8_0%,#ffffff_100%)]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={resolvedExperience.heroImage}
            alt={localizedExperience.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,44,0.46)_0%,rgba(11,28,44,0.68)_38%,rgba(11,28,44,0.92)_100%)]" />
        </div>

        <div className="relative z-10 tm-shell pb-12 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div className="text-white">
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                {localizedExperience.category}
              </span>
              <h1 className="mt-4 max-w-4xl text-[2.4rem] font-display leading-[1.02] sm:text-5xl xl:text-6xl">
                {localizedExperience.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-white/82 sm:text-lg sm:leading-8">
                {localizedExperience.fullDescription}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm text-white/82">
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2">{localizedExperience.location}</span>
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2">{localizedExperience.duration}</span>
                <span className="rounded-full bg-[#E57A1F] px-4 py-2 text-white">
                  {formatPrice(resolvedExperience.priceFrom, locale)}
                </span>
              </div>
            </div>

            <div className="tm-card-dark border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),linear-gradient(180deg,#0B1C2C_0%,#071521_100%)] p-5 sm:p-6">
              <div className="tm-chip !border-white/14 !bg-white/10 !text-white/70">{detailLabels.eyebrow}</div>
              <h2 className="mt-4 text-[1.7rem] font-display text-white sm:text-2xl">{detailLabels.title}</h2>
              <div className="mt-5 grid gap-2.5">
                {localizedExperience.highlights.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/8 bg-white/6 px-4 py-3.5 text-sm text-white/78">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ExperienceCheckoutButton
                  slug={resolvedExperience.slug}
                  label={detailLabels.reserveNow}
                  className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 font-semibold text-white transition hover:bg-[#c96815]"
                />
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full border border-white/18 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  {detailLabels.planWithConcierge}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tm-section pt-10 sm:pt-12">
        <div className="tm-shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.75fr_0.95fr]">
            <div className="space-y-6">
              <div className="tm-card p-5 sm:p-7">
                <SectionHeader
                  eyebrow={detailLabels.eyebrow}
                  title={detailLabels.title}
                  subtitle={localizedExperience.shortDescription}
                />
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {localizedExperience.highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/70 px-4 py-3.5 text-sm font-medium leading-6 text-[#0B1C2C] sm:leading-7"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="tm-card p-5 sm:p-7">
                <h3 className="text-2xl font-display text-[#0B1C2C]">{detailLabels.includedTitle}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600 sm:leading-7">
                  {localizedExperience.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedGuides.length > 0 ? (
                <div className="tm-card bg-[linear-gradient(135deg,#fffaf4,#f8fbfd)] p-5 sm:p-7">
                  <p className="tm-chip">{guideLabels.eyebrow}</p>
                  <h3 className="mt-5 text-2xl font-display text-[#0B1C2C]">
                    {guideContext?.title ?? guideLabels.fallbackTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
                    {guideContext?.body ?? guideLabels.fallbackBody}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide!.slug}
                        href={getLocalizedPath(lang, "guideDetail", { slug: guide!.slug })}
                        className="rounded-[1.6rem] border border-slate-200/80 bg-white px-4 py-4 text-sm text-slate-700 transition hover:border-[#003366] hover:shadow-sm"
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

            <aside className="space-y-5">
              <div className="tm-card p-5 sm:p-6">
                <p className="tm-chip">{detailLabels.priceLabel}</p>
                <p className="mt-5 text-4xl font-semibold text-[#E57A1F]">
                  {formatPrice(resolvedExperience.priceFrom, locale)}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  {detailLabels.perPersonLabel} {resolvedExperience.rating}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ExperienceCheckoutButton
                    slug={resolvedExperience.slug}
                    label={detailLabels.reserveExperience}
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-6 py-3 font-semibold text-white transition hover:bg-[#c96815]"
                  />
                  <Link
                    href={getLocalizedPath(lang, "planTrip")}
                    className="w-full inline-flex items-center justify-center rounded-full border border-[#003366] px-6 py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    {detailLabels.talkToConsultant}
                  </Link>
                </div>
              </div>

              <div className="tm-card bg-[linear-gradient(180deg,#fffaf4_0%,#ffffff_100%)] p-5 sm:p-6">
                <p className="tm-chip">{experiencePageContent.trustEyebrow}</p>
                <h3 className="mt-5 text-2xl font-display text-[#0B1C2C]">
                  {experiencePageContent.trustTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">
                  {experiencePageContent.trustSubtitle}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600 sm:leading-7">
                  {experiencePageContent.trustItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0B1C2C,#10283d)] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-accent-light/70 sm:text-xs sm:tracking-[0.28em]">
                  {guideLabels.eyebrow}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/76 sm:leading-7">
                  {guideContext?.body ?? guideLabels.fallbackBody}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
