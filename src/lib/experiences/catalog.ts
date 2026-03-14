import { experienceCatalog } from "@/data/experiences"

export function getExperiences() {
  return experienceCatalog
}

export function getActiveExperiences() {
  return experienceCatalog.filter((experience) => experience.active)
}

export function getFeaturedExperiences() {
  return experienceCatalog.filter((experience) => experience.active && experience.featured)
}

export function getExperienceBySlug(slug: string) {
  return experienceCatalog.find((experience) => experience.slug === slug)
}

export function getExperiencesByDestination(destinationSlug: string) {
  return experienceCatalog.filter(
    (experience) => experience.active && experience.destinationSlug === destinationSlug,
  )
}

export function getExperiencesByCategory(category: string) {
  return experienceCatalog.filter(
    (experience) => experience.active && experience.category === category,
  )
}

export function getExperiencesByPartnerSlug(partnerSlug: string) {
  return experienceCatalog.filter(
    (experience) => experience.active && experience.partnerSlug === partnerSlug,
  )
}
