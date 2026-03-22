"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { AppLocale } from "@/config/i18n"
import type { ResolvedAdminHotelCardItem } from "@/lib/admin-studio/card-collections"
import { getLocalizedPath } from "@/i18n/routing"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"
import BookingActionBar from "@/components/hotels/BookingActionBar"

const copyByLocale = {
  pt: {
    title: "Acomodacoes disponiveis",
    subtitle: "Compare perfis de quarto, beneficios e faixa de valor antes de falar com o concierge ou seguir para a proxima etapa.",
    quantityLabel: "Quantidade",
    reserveLabel: "Reservar",
    selectedLabel: "acomodacao(oes) selecionada(s)",
    breakfastIncluded: "Cafe da manha incluso",
    breakfastPending: "Cafe da manha sob consulta",
    cancellationLabel: "Cancelamento",
    paymentLabel: "Pagamento",
    taxesLabel: "Taxas",
    emptyTitle: "Consulte disponibilidade com nosso concierge",
    emptyBody: "Este hotel ainda nao publicou quartos detalhados nesta pagina. Nossa equipe pode confirmar disponibilidade, perfil de acomodacao e melhor combinacao para a viagem.",
    emptyCta: "Falar com concierge",
    priceFallback: "Sob consulta",
    occupancyFallback: "Capacidade sob consulta",
    bedsFallback: "Configuracao de cama sob consulta",
    summaryTitle: "Resumo da reserva",
    selectedRoomsTitle: "Quartos selecionados",
    hotelLabel: "Hotel",
    totalLabel: "Total estimado",
    checkoutLabel: "Reservar agora",
    specialistLabel: "Falar com especialista",
    checkoutErrorFallback: "Nao foi possivel iniciar a reserva agora. Tente novamente em instantes.",
    whatsappHelper: "Leve esta selecao para o time e continue com apoio humano.",
    checkoutHelper: "Pagamento seguro via Stripe para confirmar esta selecao.",
  },
  en: {
    title: "Available rooms",
    subtitle: "Compare room profiles, benefits, and pricing before speaking with the concierge or moving to the next step.",
    quantityLabel: "Quantity",
    reserveLabel: "Reserve",
    selectedLabel: "room(s) selected",
    breakfastIncluded: "Breakfast included",
    breakfastPending: "Breakfast on request",
    cancellationLabel: "Cancellation",
    paymentLabel: "Payment",
    taxesLabel: "Taxes",
    emptyTitle: "Check availability with our concierge",
    emptyBody: "This hotel has not published detailed room types on this page yet. Our team can confirm availability, room profile, and the best fit for the trip.",
    emptyCta: "Talk to concierge",
    priceFallback: "On request",
    occupancyFallback: "Occupancy on request",
    bedsFallback: "Bed setup on request",
    summaryTitle: "Booking summary",
    selectedRoomsTitle: "Selected rooms",
    hotelLabel: "Hotel",
    totalLabel: "Estimated total",
    checkoutLabel: "Reserve now",
    specialistLabel: "Talk to specialist",
    checkoutErrorFallback: "We could not start the reservation just now. Please try again.",
    whatsappHelper: "Send this selection to our team and continue with human support.",
    checkoutHelper: "Secure Stripe payment to confirm this selection.",
  },
  es: {
    title: "Alojamientos disponibles",
    subtitle: "Compara perfiles de habitacion, beneficios y rango de valor antes de hablar con el concierge o seguir al siguiente paso.",
    quantityLabel: "Cantidad",
    reserveLabel: "Reservar",
    selectedLabel: "habitacion(es) seleccionada(s)",
    breakfastIncluded: "Desayuno incluido",
    breakfastPending: "Desayuno a confirmar",
    cancellationLabel: "Cancelacion",
    paymentLabel: "Pago",
    taxesLabel: "Tasas",
    emptyTitle: "Consulta disponibilidad con nuestro concierge",
    emptyBody: "Este hotel aun no publico habitaciones detalladas en esta pagina. Nuestro equipo puede confirmar disponibilidad, perfil de alojamiento y la mejor combinacion para el viaje.",
    emptyCta: "Hablar con concierge",
    priceFallback: "Bajo consulta",
    occupancyFallback: "Capacidad a confirmar",
    bedsFallback: "Configuracion de cama a confirmar",
    summaryTitle: "Resumen de la reserva",
    selectedRoomsTitle: "Habitaciones seleccionadas",
    hotelLabel: "Hotel",
    totalLabel: "Total estimado",
    checkoutLabel: "Reservar ahora",
    specialistLabel: "Hablar con especialista",
    checkoutErrorFallback: "No fue posible iniciar la reserva ahora. Intentalo de nuevo.",
    whatsappHelper: "Envia esta seleccion al equipo y continua con apoyo humano.",
    checkoutHelper: "Pago seguro con Stripe para confirmar esta seleccion.",
  },
  fr: {
    title: "Hebergements disponibles",
    subtitle: "Comparez les profils de chambre, les avantages et la gamme de prix avant de parler au concierge ou de passer a l'etape suivante.",
    quantityLabel: "Quantite",
    reserveLabel: "Reserver",
    selectedLabel: "chambre(s) selectionnee(s)",
    breakfastIncluded: "Petit-dejeuner inclus",
    breakfastPending: "Petit-dejeuner a confirmer",
    cancellationLabel: "Annulation",
    paymentLabel: "Paiement",
    taxesLabel: "Taxes",
    emptyTitle: "Verifiez la disponibilite avec notre concierge",
    emptyBody: "Cet hotel n'a pas encore publie de chambres detaillees sur cette page. Notre equipe peut confirmer la disponibilite, le profil d'hebergement et la meilleure combinaison pour le voyage.",
    emptyCta: "Parler au concierge",
    priceFallback: "Sur demande",
    occupancyFallback: "Capacite a confirmer",
    bedsFallback: "Configuration du lit a confirmer",
    summaryTitle: "Resume de la reservation",
    selectedRoomsTitle: "Chambres selectionnees",
    hotelLabel: "Hotel",
    totalLabel: "Total estime",
    checkoutLabel: "Reserver maintenant",
    specialistLabel: "Parler a un specialiste",
    checkoutErrorFallback: "Impossible de lancer la reservation pour le moment. Veuillez reessayer.",
    whatsappHelper: "Envoyez cette selection a notre equipe et continuez avec un accompagnement humain.",
    checkoutHelper: "Paiement securise via Stripe pour confirmer cette selection.",
  },
} as const

const numberFormatByLocale = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
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

function formatRoomPrice(value: number | null, locale: AppLocale) {
  if (value === null || value <= 0) {
    return ""
  }

  return new Intl.NumberFormat(numberFormatByLocale[locale], {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatRoomOccupancy(value: number | null, locale: AppLocale) {
  if (value === null || value <= 0) {
    return ""
  }

  if (locale === "en") {
    return `${value} guest${value === 1 ? "" : "s"}`
  }

  if (locale === "fr") {
    return `${value} personne${value === 1 ? "" : "s"}`
  }

  return `${value} ${value === 1 ? "pessoa" : "pessoas"}`
}

function resolveRoomContactHref(
  roomTarget: string,
  hotelTarget: string,
  conciergeHref: string,
) {
  if (!roomTarget) {
    return hotelTarget
  }

  if (roomTarget === "whatsapp") {
    return isExternalHref(hotelTarget) ? hotelTarget : conciergeHref
  }

  return roomTarget
}

function resolveSpecialistHref(
  hotel: ResolvedAdminHotelCardItem,
  locale: AppLocale,
  message: string,
) {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  if (configuredNumber) {
    return buildWhatsAppUrl(configuredNumber, message)
  }

  if (hotel.ctaTarget && isExternalHref(hotel.ctaTarget)) {
    return hotel.ctaTarget
  }

  return getLocalizedPath(locale, "planTrip")
}

function buildHotelSelectionMessage(
  hotel: ResolvedAdminHotelCardItem,
  selectedRoomsSummary: Array<{
    name: string
    quantity: number
    price: number
    subtotal: number
  }>,
  totalPrice: number,
  locale: AppLocale,
) {
  const formattedTotal = formatRoomPrice(totalPrice, locale)
  const selectedLines = selectedRoomsSummary
    .map(
      (room) =>
        `- ${room.name} x ${room.quantity} (${formatRoomPrice(room.subtotal, locale)})`,
    )
    .join("\n")

  return [
    `Ola! Quero reservar quartos em ${hotel.title}.`,
    "",
    "Selecao atual:",
    selectedLines,
    "",
    `Total estimado: ${formattedTotal}`,
  ].join("\n")
}

export default function HotelAvailabilitySection({
  hotel,
  locale,
}: {
  hotel: ResolvedAdminHotelCardItem
  locale: AppLocale
}) {
  const copy = copyByLocale[locale]
  const rooms = hotel.hotelRooms
    .filter((room) => room.visible && room.name.trim().length > 0)
    .sort((left, right) => left.sortOrder - right.sortOrder)
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({})
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")
  const conciergeHref = getLocalizedPath(locale, "planTrip")
  const selectedRoomsSummary = useMemo(
    () =>
      rooms
        .map((room) => {
          const quantity = selectedQuantities[room.id] ?? 0
          const price = room.price ?? 0

          if (quantity < 1) {
            return null
          }

          return {
            id: room.id,
            name: room.name,
            quantity,
            price,
            subtotal: price * quantity,
          }
        })
        .filter(
          (
            room,
          ): room is {
            id: string
            name: string
            quantity: number
            price: number
            subtotal: number
          } => Boolean(room),
        ),
    [rooms, selectedQuantities],
  )
  const totalPrice = useMemo(
    () => selectedRoomsSummary.reduce((sum, room) => sum + room.subtotal, 0),
    [selectedRoomsSummary],
  )
  const hasSelection = selectedRoomsSummary.length > 0
  const canCheckout =
    hasSelection &&
    totalPrice > 0 &&
    selectedRoomsSummary.every((room) => room.price > 0)
  const specialistHref = resolveSpecialistHref(
    hotel,
    locale,
    buildHotelSelectionMessage(hotel, selectedRoomsSummary, totalPrice, locale),
  )

  async function handleCheckout() {
    if (!canCheckout || isCreatingCheckout) {
      return
    }

    setIsCreatingCheckout(true)
    setCheckoutError("")

    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelName: hotel.title,
          hotelSlug: hotel.linkedSlug,
          locale,
          total: totalPrice,
          selectedRooms: selectedRoomsSummary,
        }),
      })

      const payload = (await response.json()) as { checkoutUrl?: string; error?: string }

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || copy.checkoutErrorFallback)
      }

      window.location.href = payload.checkoutUrl
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : copy.checkoutErrorFallback)
      setIsCreatingCheckout(false)
    }
  }

  if (rooms.length === 0) {
    return (
      <section className="tm-section pt-0">
        <div className="tm-shell">
          <div className="tm-card bg-white p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.title}</p>
            <h2 className="mt-3 text-3xl font-display text-[#0B1C2C]">{copy.emptyTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{copy.emptyBody}</p>
            <div className="mt-6">
              <Link
                href={conciergeHref}
                className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
              >
                {copy.emptyCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`tm-section pt-0 ${hasSelection ? "pb-32 sm:pb-36" : ""}`}>
      <div className="tm-shell">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.title}</p>
          <h2 className="mt-3 text-3xl font-display text-[#0B1C2C]">{copy.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{copy.subtitle}</p>
        </div>

        <div className="space-y-4">
          {rooms.map((room) => {
            const selectedQuantity = selectedQuantities[room.id] ?? 0
            const selectionLimit = room.maxRooms > 0 ? room.maxRooms : 5
            const roomCtaTarget = resolveRoomContactHref(
              room.ctaTarget,
              hotel.ctaTarget,
              conciergeHref,
            )
            const roomCtaExternal = roomCtaTarget ? isExternalHref(roomCtaTarget) : false
            const formattedOccupancy = formatRoomOccupancy(room.occupancy, locale)
            const formattedPrice = formatRoomPrice(room.price, locale)

            return (
              <div
                key={room.id}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              >
                <div className="grid gap-6 xl:grid-cols-[1.25fr_0.72fr_0.85fr_auto] xl:items-start">
                  <div>
                    {room.category ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {room.category}
                      </p>
                    ) : null}
                    <h3 className="mt-2 text-xl font-semibold text-[#0B1C2C]">{room.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                      {formattedOccupancy ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {formattedOccupancy}
                        </span>
                      ) : null}
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        {room.beds || copy.bedsFallback}
                      </span>
                    </div>
                    {room.amenities.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {room.amenities.map((item) => (
                          <span
                            key={`${room.id}-${item}`}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[1.3rem] bg-slate-50 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.taxesLabel}</p>
                    <p className="mt-2 text-2xl font-semibold text-[#0B1C2C]">
                      {formattedPrice || copy.priceFallback}
                    </p>
                    {room.taxesInfo ? (
                      <p className="mt-2 text-sm leading-6 text-slate-600">{room.taxesInfo}</p>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                      {room.breakfastIncluded ? copy.breakfastIncluded : copy.breakfastPending}
                    </div>
                    {room.cancellation ? (
                      <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                        <strong className="text-[#0B1C2C]">{copy.cancellationLabel}:</strong> {room.cancellation}
                      </div>
                    ) : null}
                    {room.payment ? (
                      <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                        <strong className="text-[#0B1C2C]">{copy.paymentLabel}:</strong> {room.payment}
                      </div>
                    ) : null}
                  </div>

                  <div className="min-w-[180px] space-y-3 xl:justify-self-end">
                    <div className="rounded-[1.2rem] border border-slate-200 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.quantityLabel}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedQuantities((current) => ({
                              ...current,
                              [room.id]: Math.max(0, (current[room.id] ?? 0) - 1),
                            }))
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:border-slate-300"
                        >
                          -
                        </button>
                        <span className="min-w-[2ch] text-center text-lg font-semibold text-[#0B1C2C]">
                          {selectedQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedQuantities((current) => ({
                              ...current,
                              [room.id]: Math.min(selectionLimit, (current[room.id] ?? 0) + 1),
                            }))
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:border-slate-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQuantities((current) => ({
                          ...current,
                          [room.id]: current[room.id] && current[room.id] > 0 ? current[room.id] : 1,
                        }))
                      }
                      className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                        selectedQuantity > 0
                          ? "bg-[#0B1C2C] text-white hover:bg-[#10283d]"
                          : "bg-[#E57A1F] text-white hover:bg-[#c96815]"
                      }`}
                    >
                      {room.ctaLabel || copy.reserveLabel}
                    </button>

                    {selectedQuantity > 0 ? (
                      <p className="text-center text-xs leading-5 text-slate-500">
                        {selectedQuantity} {copy.selectedLabel}
                      </p>
                    ) : null}

                    {roomCtaTarget ? (
                      roomCtaExternal ? (
                        <a
                          href={roomCtaTarget}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                        >
                          {copy.emptyCta}
                        </a>
                      ) : (
                        <Link
                          href={roomCtaTarget}
                          className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                        >
                          {copy.emptyCta}
                        </Link>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {hasSelection ? (
          <div className="mt-8 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{copy.summaryTitle}</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm font-semibold text-[#0B1C2C]">
                  {copy.hotelLabel}: {hotel.title}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#0B1C2C]">
                  {copy.selectedRoomsTitle}
                </p>
                <div className="mt-3 space-y-3">
                  {selectedRoomsSummary.map((room) => (
                    <div
                      key={room.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <span>
                        {room.name} × {room.quantity}
                      </span>
                      <strong className="text-[#0B1C2C]">
                        {formatRoomPrice(room.subtotal, locale)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,#fff8f1,#f8fbfd)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.totalLabel}</p>
                <p className="mt-2 text-3xl font-semibold text-[#0B1C2C]">
                  {formatRoomPrice(totalPrice, locale) || copy.priceFallback}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy.checkoutHelper}</p>
                {checkoutError ? (
                  <p className="mt-3 text-sm font-medium text-rose-600">{checkoutError}</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {totalPrice > 0 ? (
        <BookingActionBar
          totalLabel={formatRoomPrice(totalPrice, locale) || copy.priceFallback}
          primaryLabel={copy.checkoutLabel}
          secondaryLabel={copy.specialistLabel}
          secondaryHref={specialistHref}
          onPrimaryAction={handleCheckout}
          primaryLoading={isCreatingCheckout}
          primaryDisabled={!canCheckout}
          helperText={checkoutError || copy.whatsappHelper}
        />
      ) : null}
    </section>
  )
}
