import { destinations } from "@/data/destinos"
import { experienceCatalog } from "@/data/experiences"
import { guides } from "@/data/guides"
import { itineraryCatalog } from "@/data/itineraries"
import { partnerCatalog } from "@/data/partners"

export interface ItineraryRelationshipValidationResult {
  itinerarySlug: string
  missingDestinations: string[]
  missingExperiences: string[]
  missingGuides: string[]
  missingPartners: string[]
}

function buildSlugSet(values: string[]) {
  return new Set(values)
}

const destinationSlugs = buildSlugSet(destinations.map((item) => item.slug))
const experienceSlugs = buildSlugSet(experienceCatalog.map((item) => item.slug))
const guideSlugs = buildSlugSet(guides.map((item) => item.slug))
const partnerSlugs = buildSlugSet(partnerCatalog.map((item) => item.slug))

export function validateItineraryRelationships(): ItineraryRelationshipValidationResult[] {
  return itineraryCatalog.map((itinerary) => ({
    itinerarySlug: itinerary.slug,
    missingDestinations: itinerary.destinationSlugs.filter((slug) => !destinationSlugs.has(slug)),
    missingExperiences: itinerary.experienceSlugs.filter((slug) => !experienceSlugs.has(slug)),
    missingGuides: itinerary.guideSlugs.filter((slug) => !guideSlugs.has(slug)),
    missingPartners: itinerary.partnerSlugs.filter((slug) => !partnerSlugs.has(slug)),
  }))
}

export function getInvalidItineraryRelationships() {
  return validateItineraryRelationships().filter(
    (result) =>
      result.missingDestinations.length > 0 ||
      result.missingExperiences.length > 0 ||
      result.missingGuides.length > 0 ||
      result.missingPartners.length > 0,
  )
}
