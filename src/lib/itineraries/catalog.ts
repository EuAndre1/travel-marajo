import { itineraryCatalog } from "@/data/itineraries"
import type { ItineraryTravelerFit } from "@/types"

export function getItineraries() {
  return itineraryCatalog
}

export function getActiveItineraries() {
  return itineraryCatalog.filter((itinerary) => itinerary.active)
}

export function getFeaturedItineraries() {
  return itineraryCatalog.filter((itinerary) => itinerary.active && itinerary.featured)
}

export function getItineraryBySlug(slug: string) {
  return itineraryCatalog.find((itinerary) => itinerary.slug === slug)
}

export function getItinerariesByCategory(category: string) {
  return itineraryCatalog.filter((itinerary) => itinerary.active && itinerary.category === category)
}

export function getItinerariesByDestination(destinationSlug: string) {
  return itineraryCatalog.filter(
    (itinerary) => itinerary.active && itinerary.destinationSlugs.includes(destinationSlug),
  )
}

export function getItinerariesByExperienceSlug(experienceSlug: string) {
  return itineraryCatalog.filter(
    (itinerary) => itinerary.active && itinerary.experienceSlugs.includes(experienceSlug),
  )
}

export function getItinerariesByTravelerFit(travelerFit: ItineraryTravelerFit) {
  return itineraryCatalog.filter(
    (itinerary) => itinerary.active && itinerary.travelerFit.includes(travelerFit),
  )
}
