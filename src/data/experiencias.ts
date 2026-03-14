import { experienceCatalog } from "@/data/experiences"
import type { Experience, ExperienceLocale, ExperienceTranslation } from "@/types"

const categoryLabels = {
  pt: {
    beach: "Praia",
    culture: "Cultura",
    wildlife: "Natureza",
    boat: "Barco",
    fishing: "Pesca",
    horseback: "Aventura",
    food: "Gastronomia",
  },
  en: {
    beach: "Beach",
    culture: "Culture",
    wildlife: "Wildlife",
    boat: "Boat",
    fishing: "Fishing",
    horseback: "Horseback",
    food: "Food",
  },
  es: {
    beach: "Playa",
    culture: "Cultura",
    wildlife: "Naturaleza",
    boat: "Barco",
    fishing: "Pesca",
    horseback: "Cabalgata",
    food: "Gastronomia",
  },
  fr: {
    beach: "Plage",
    culture: "Culture",
    wildlife: "Nature",
    boat: "Bateau",
    fishing: "Peche",
    horseback: "Cheval",
    food: "Gastronomie",
  },
} as const

export type ExperienceItem = Omit<Experience, "category"> & {
  category: string
  categoryKey: Experience["category"]
  heroImage: string
  location: string
  rating: string
}
export type { ExperienceLocale, ExperienceTranslation }

export const experiences: ExperienceItem[] = experienceCatalog.map((experience) => ({
  ...experience,
  categoryKey: experience.category,
  category: categoryLabels.pt[experience.category],
  heroImage: experience.media.heroImage,
  location: experience.locationLabel,
  rating: experience.ratingValue ? experience.ratingValue.toFixed(1).replace(".", ",") : "4,8",
}))

export function getExperienceBySlug(slug: string) {
  return experiences.find((item) => item.slug === slug)
}

export function getLocalizedExperience(experience: ExperienceItem, lang: ExperienceLocale) {
  const translation = experience.translations[lang] ?? experience.translations.pt

  return {
    ...experience,
    ...translation,
    location: translation.locationLabel,
    duration: translation.durationLabel,
    heroImage: experience.media.heroImage,
    highlights: translation.highlights,
    included: translation.included,
    category: categoryLabels[lang][experience.categoryKey],
  }
}
