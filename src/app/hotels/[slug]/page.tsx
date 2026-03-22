import type { Metadata } from "next"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import HotelDetailPageContent from "@/components/hotels/HotelDetailPageContent"
import { DEFAULT_LOCALE, isAppLocale, type AppLocale } from "@/config/i18n"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"
import { resolveHotelBySlugForLocale } from "@/lib/content-studio/resolvers"

type Props = {
  params: { slug: string }
}

function getRequestLocale(): AppLocale {
  const locale = headers().get("x-site-locale")
  return locale && isAppLocale(locale) ? locale : DEFAULT_LOCALE
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getRequestLocale()
  const state = await loadPersistedContentStudioState()
  const hotel = resolveHotelBySlugForLocale(locale, params.slug, state)

  if (!hotel) {
    return { title: "Hotel | Travel Marajo" }
  }

  return {
    title: hotel.title,
    description: hotel.description || hotel.fullDescription,
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const locale = getRequestLocale()
  const state = await loadPersistedContentStudioState()
  const hotel = resolveHotelBySlugForLocale(locale, params.slug, state)

  if (!hotel) {
    notFound()
  }

  return <HotelDetailPageContent hotel={hotel} locale={locale} />
}
