import { destinations } from "@/data/destinos"
import { experienceCatalog } from "@/data/experiences"
import { guides } from "@/data/guides"
import { itineraryCatalog } from "@/data/itineraries"
import { partnerCatalog } from "@/data/partners"
import { seoPages } from "@/data/seo-pages"
import { getEnvReadinessReport, type EnvReadinessReport } from "@/lib/env"
import { getPlannedSeoPages } from "@/lib/seo"

type MissingReference = {
  ownerSlug: string
  missingSlugs: string[]
}

export interface PlatformHealthReport {
  missingReferences: {
    guideExperienceSlugs: MissingReference[]
    experienceItinerarySlugs: MissingReference[]
    experiencePartnerSlugs: MissingReference[]
    itineraryGuideSlugs: MissingReference[]
    itineraryExperienceSlugs: MissingReference[]
    itineraryPartnerSlugs: MissingReference[]
    partnerExperienceSlugs: MissingReference[]
    seoImplementedGuideMappings: MissingReference[]
  }
  orphanRecords: {
    activePartnersWithoutExperienceLinks: string[]
    activeItinerariesWithoutExperienceLinks: string[]
    activeExperiencesWithoutGuideLinks: string[]
  }
  sourceOfTruth: {
    guideContentSource: string
    seoPlanningSource: string
    experienceContentSource: string
    partnerContentSource: string
    itineraryContentSource: string
    compatibilityAdapters: string[]
  }
  adapterDebtHotspots: string[]
  runtimeValidationHotspots: string[]
  adapterDebtNotes: {
    runtimeCritical: string[]
    technicalDebtOnly: string[]
  }
  planningLiveMismatchRisks: {
    planningSeoEntriesWithoutGuideSource: string[]
  }
}

export interface PlatformPreflightReport {
  env: EnvReadinessReport
  platform: PlatformHealthReport
  launchSignals: {
    hasMissingReferences: boolean
    hasCriticalEnvGaps: boolean
    runtimeValidationHotspots: string[]
    adapterRuntimeRisks: string[]
  }
}

function buildSlugSet(values: string[]) {
  return new Set(values)
}

function collectMissingReferences(
  records: Array<{ ownerSlug: string; values: string[] }>,
  existing: Set<string>,
) {
  return records
    .map((record) => ({
      ownerSlug: record.ownerSlug,
      missingSlugs: record.values.filter((value) => !existing.has(value)),
    }))
    .filter((record) => record.missingSlugs.length > 0)
}

export function getPlatformHealthReport(): PlatformHealthReport {
  const guideSlugs = buildSlugSet(guides.map((guide) => guide.slug))
  const experienceSlugs = buildSlugSet(experienceCatalog.map((experience) => experience.slug))
  const partnerSlugs = buildSlugSet(partnerCatalog.map((partner) => partner.slug))
  const itinerarySlugs = buildSlugSet(itineraryCatalog.map((itinerary) => itinerary.slug))

  return {
    missingReferences: {
      guideExperienceSlugs: collectMissingReferences(
        guides.map((guide) => ({
          ownerSlug: guide.slug,
          values: guide.relatedExperiences,
        })),
        experienceSlugs,
      ),
      experienceItinerarySlugs: collectMissingReferences(
        experienceCatalog.map((experience) => ({
          ownerSlug: experience.slug,
          values: experience.itinerarySlugs,
        })),
        itinerarySlugs,
      ),
      experiencePartnerSlugs: collectMissingReferences(
        experienceCatalog.map((experience) => ({
          ownerSlug: experience.slug,
          values: experience.partnerSlug ? [experience.partnerSlug] : [],
        })),
        partnerSlugs,
      ),
      itineraryGuideSlugs: collectMissingReferences(
        itineraryCatalog.map((itinerary) => ({
          ownerSlug: itinerary.slug,
          values: itinerary.guideSlugs,
        })),
        guideSlugs,
      ),
      itineraryExperienceSlugs: collectMissingReferences(
        itineraryCatalog.map((itinerary) => ({
          ownerSlug: itinerary.slug,
          values: itinerary.experienceSlugs,
        })),
        experienceSlugs,
      ),
      itineraryPartnerSlugs: collectMissingReferences(
        itineraryCatalog.map((itinerary) => ({
          ownerSlug: itinerary.slug,
          values: itinerary.partnerSlugs,
        })),
        partnerSlugs,
      ),
      partnerExperienceSlugs: collectMissingReferences(
        partnerCatalog.map((partner) => ({
          ownerSlug: partner.slug,
          values: partner.experienceSlugs,
        })),
        experienceSlugs,
      ),
      seoImplementedGuideMappings: collectMissingReferences(
        seoPages
          .filter((entry) => entry.status === "implemented" || entry.status === "published")
          .map((entry) => ({
            ownerSlug: entry.slug,
            values: entry.guideSourceSlug ? [entry.guideSourceSlug] : [entry.slug],
          })),
        guideSlugs,
      ),
    },
    orphanRecords: {
      activePartnersWithoutExperienceLinks: partnerCatalog
        .filter((partner) => partner.active && partner.experienceSlugs.length === 0)
        .map((partner) => partner.slug),
      activeItinerariesWithoutExperienceLinks: itineraryCatalog
        .filter((itinerary) => itinerary.active && itinerary.experienceSlugs.length === 0)
        .map((itinerary) => itinerary.slug),
      activeExperiencesWithoutGuideLinks: experienceCatalog
        .filter((experience) => experience.active && experience.guideSlugs.length === 0)
        .map((experience) => experience.slug),
    },
    sourceOfTruth: {
      guideContentSource: "src/data/guides.ts",
      seoPlanningSource: "src/data/seo-pages.ts",
      experienceContentSource: "src/data/experiences.ts",
      partnerContentSource: "src/data/partners.ts",
      itineraryContentSource: "src/data/itineraries.ts",
      compatibilityAdapters: ["src/data/experiencias.ts"],
    },
    adapterDebtHotspots: [
      "src/components/experiences/ExperienceDetailContent.tsx",
      "src/app/guides/[slug]/GuidePageClient.tsx",
      "src/app/guides/GuidesIndexClient.tsx",
      "src/app/experiencias/page.tsx",
      "src/app/planejar-viagem/PlanTripPageClient.tsx",
    ],
    runtimeValidationHotspots: [
      "middleware.ts",
      "src/lib/use-site-language.ts",
      "src/lib/auth/options.ts",
      "src/app/api/stripe/experience-checkout/route.ts",
      "src/app/api/stripe/package-checkout/route.ts",
      "src/app/destinos/[slug]/page.tsx",
      "src/app/checkout/success/SuccessClient.tsx",
    ],
    adapterDebtNotes: {
      runtimeCritical: [
        "src/components/experiences/ExperienceDetailContent.tsx",
        "src/app/guides/[slug]/GuidePageClient.tsx",
      ],
      technicalDebtOnly: [
        "src/app/guides/GuidesIndexClient.tsx",
        "src/app/experiencias/page.tsx",
        "src/app/planejar-viagem/PlanTripPageClient.tsx",
      ],
    },
    planningLiveMismatchRisks: {
      planningSeoEntriesWithoutGuideSource: getPlannedSeoPages()
        .filter((entry) => !entry.guideSourceSlug)
        .map((entry) => entry.slug),
    },
  }
}

export function getPlatformHealthSummary() {
  const report = getPlatformHealthReport()
  const missingReferenceGroups = Object.values(report.missingReferences).reduce(
    (total, entries) => total + entries.length,
    0,
  )

  return {
    missingReferenceGroups,
    adapterDebtHotspots: report.adapterDebtHotspots.length,
    runtimeValidationHotspots: report.runtimeValidationHotspots.length,
    planningMismatchRisks: report.planningLiveMismatchRisks.planningSeoEntriesWithoutGuideSource.length,
    hasDestinationCatalog: destinations.length > 0,
  }
}

export function getPlatformPreflightReport(): PlatformPreflightReport {
  const platform = getPlatformHealthReport()
  const env = getEnvReadinessReport()
  const hasMissingReferences = Object.values(platform.missingReferences).some((entries) => entries.length > 0)

  return {
    env,
    platform,
    launchSignals: {
      hasMissingReferences,
      hasCriticalEnvGaps: env.critical.missing.length > 0,
      runtimeValidationHotspots: platform.runtimeValidationHotspots,
      adapterRuntimeRisks: platform.adapterDebtNotes.runtimeCritical,
    },
  }
}
