import Image from "next/image"
import Link from "next/link"
import type { AppLocale } from "@/config/i18n"
import type { ResolvedAdminHotelCardItem } from "@/lib/admin-studio/card-collections"
import { getLocalizedPath } from "@/i18n/routing"

const copyByLocale = {
  pt: {
    eyebrow: "Hospedagem parceira",
    aboutTitle: "Sobre esta hospedagem",
    galleryTitle: "Galeria da hospedagem",
    detailsTitle: "O que esperar da estadia",
    detailsBody:
      "Use esta pagina para entender o clima da hospedagem, comparar fotos reais e decidir o melhor proximo passo da reserva.",
    amenitiesTitle: "Diferenciais e comodidades",
    planTripLabel: "Falar com especialista local",
    fallbackCta: "Consultar disponibilidade",
    trustTitle: "Por que reservar com a Travel Marajo",
    trustItems: [
      "Curadoria local para combinar hospedagem, base e experiencias.",
      "Apoio antes, durante e depois da viagem.",
      "Orientacao mais clara para quem visita Marajo pela primeira vez.",
    ],
  },
  en: {
    eyebrow: "Partner stay",
    aboutTitle: "About this stay",
    galleryTitle: "Stay gallery",
    detailsTitle: "What to expect from the stay",
    detailsBody:
      "Use this page to understand the atmosphere of the property, compare real photos, and choose the next booking step with confidence.",
    amenitiesTitle: "Highlights and amenities",
    planTripLabel: "Talk to a local specialist",
    fallbackCta: "Check availability",
    trustTitle: "Why book with Travel Marajo",
    trustItems: [
      "Local curation to align stays, arrival base, and experiences.",
      "Support before, during, and after the trip.",
      "Clearer guidance for first-time Marajo travelers.",
    ],
  },
  es: {
    eyebrow: "Alojamiento aliado",
    aboutTitle: "Sobre este alojamiento",
    galleryTitle: "Galeria del alojamiento",
    detailsTitle: "Que esperar de la estancia",
    detailsBody:
      "Usa esta pagina para entender el perfil del alojamiento, comparar fotos reales y decidir el siguiente paso con mas seguridad.",
    amenitiesTitle: "Diferenciales y comodidades",
    planTripLabel: "Hablar con un especialista local",
    fallbackCta: "Consultar disponibilidad",
    trustTitle: "Por que reservar con Travel Marajo",
    trustItems: [
      "Curaduria local para alinear alojamiento, base y experiencias.",
      "Apoyo antes, durante y despues del viaje.",
      "Guia mas clara para quien visita Marajo por primera vez.",
    ],
  },
  fr: {
    eyebrow: "Hebergement partenaire",
    aboutTitle: "A propos de cet hebergement",
    galleryTitle: "Galerie de l'hebergement",
    detailsTitle: "Ce que vous pouvez attendre du sejour",
    detailsBody:
      "Utilisez cette page pour comprendre l'ambiance du lieu, comparer les vraies photos et choisir la prochaine etape de reservation en toute confiance.",
    amenitiesTitle: "Points forts et commodites",
    planTripLabel: "Parler a un specialiste local",
    fallbackCta: "Verifier la disponibilite",
    trustTitle: "Pourquoi reserver avec Travel Marajo",
    trustItems: [
      "Curation locale pour aligner hebergement, base d'arrivee et experiences.",
      "Support avant, pendant et apres le voyage.",
      "Orientation plus claire pour une premiere visite a Marajo.",
    ],
  },
} as const

function isExternalHref(value: string) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.includes("wa.me")
  )
}

function parseMultilineText(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function buildPrimaryHref(hotel: ResolvedAdminHotelCardItem, locale: AppLocale) {
  if (!hotel.ctaTarget || hotel.ctaTarget === "/hotels" || hotel.ctaTarget === "/hoteis") {
    return getLocalizedPath(locale, "hotels")
  }

  return hotel.ctaTarget
}

export default function HotelDetailPageContent({
  hotel,
  locale,
}: {
  hotel: ResolvedAdminHotelCardItem
  locale: AppLocale
}) {
  const copy = copyByLocale[locale]
  const gallery = Array.from(new Set([hotel.imageUrl, ...hotel.galleryImageUrls].filter(Boolean)))
  const fullDescription = hotel.fullDescription.trim() || hotel.description
  const amenities = parseMultilineText(hotel.amenitiesText)
  const primaryHref = buildPrimaryHref(hotel, locale)
  const primaryExternal = isExternalHref(primaryHref)
  const usesSearchFallback =
    !hotel.ctaTarget || hotel.ctaTarget === "/hotels" || hotel.ctaTarget === "/hoteis"
  const primaryLabel = usesSearchFallback ? copy.fallbackCta : hotel.ctaLabel || copy.fallbackCta

  return (
    <main className="min-h-screen bg-[#f8f7f3]">
      <section className="relative overflow-hidden bg-[#0B1C2C] text-white">
        <div className="absolute inset-0">
          <Image src={hotel.imageUrl} alt={hotel.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(11,28,44,0.92)_0%,rgba(11,28,44,0.8)_42%,rgba(11,28,44,0.28)_100%)]" />
        </div>

        <div className="relative tm-shell py-16 sm:py-20">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/65">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-display leading-tight sm:text-5xl">
                {hotel.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
                {hotel.eyebrow ? (
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    {hotel.eyebrow}
                  </span>
                ) : null}
                {hotel.metaPrimary ? (
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    {hotel.metaPrimary}
                  </span>
                ) : null}
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{hotel.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {primaryExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                  >
                    {primaryLabel}
                  </a>
                ) : (
                  <Link
                    href={primaryHref}
                    className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                  >
                    {primaryLabel}
                  </Link>
                )}

                <Link
                  href={getLocalizedPath(locale, "planTrip")}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  {copy.planTripLabel}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/65">{copy.detailsTitle}</p>
              <p className="mt-4 text-sm leading-7 text-white/85">{copy.detailsBody}</p>
              <div className="mt-6 space-y-3">
                {copy.trustItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/12 bg-white/8 px-4 py-3 text-sm leading-6 text-white/85"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tm-section">
        <div className="tm-shell grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="tm-card bg-white p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.aboutTitle}</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">{fullDescription}</p>
          </div>

          <div className="tm-card bg-[linear-gradient(135deg,#fff8f1,#f8fbfd)] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.trustTitle}</p>
            <div className="mt-4 space-y-3">
              {copy.trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="tm-section pt-0">
          <div className="tm-shell">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.galleryTitle}</p>
              <h2 className="mt-3 text-3xl font-display text-[#0B1C2C]">{hotel.title}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gallery.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className={`relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className={`relative ${index === 0 ? "h-[340px] sm:h-[420px]" : "h-56 sm:h-64"}`}>
                    <Image
                      src={imageUrl}
                      alt={`${hotel.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {amenities.length > 0 ? (
        <section className="tm-section pt-0">
          <div className="tm-shell">
            <div className="tm-card bg-white p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.amenitiesTitle}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {amenities.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
