import { partnerCatalog } from "@/data/partners"

export function getPartners() {
  return partnerCatalog
}

export function getActivePartners() {
  return partnerCatalog.filter((partner) => partner.active)
}

export function getFeaturedPartners() {
  return partnerCatalog.filter((partner) => partner.active && partner.featured)
}

export function getPartnerBySlug(slug: string) {
  return partnerCatalog.find((partner) => partner.slug === slug)
}

export function getPartnersByType(type: string) {
  return partnerCatalog.filter((partner) => partner.active && partner.type === type)
}

export function getPartnersByDestination(destinationSlug: string) {
  return partnerCatalog.filter(
    (partner) => partner.active && partner.destinationSlug === destinationSlug,
  )
}

export function getPartnersByExperienceSlug(experienceSlug: string) {
  return partnerCatalog.filter(
    (partner) => partner.active && partner.experienceSlugs.includes(experienceSlug),
  )
}
