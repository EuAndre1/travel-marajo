"use client"

import { createContext, useContext } from "react"
import { useSiteLanguage } from "@/lib/use-site-language"
import {
  createDefaultContentStudioState,
  resolveDestinationCardsForLocale,
  resolveExperienceBySlug,
  resolveExperienceItems,
  resolveHotelCardsForLocale,
  resolveHotelBySlugForLocale,
  resolveHomeAuthorityForLocale,
  resolveHomeContentForLocale,
  resolvePackageBySlug,
  resolvePackages,
  resolvePremiumPackageLandingForLocale,
  resolveRouteCardsForLocale,
  resolveServiceCardsForLocale,
  resolveSiteChromeForLocale,
  resolveSiteContentForLocale,
  type ContentStudioState,
} from "@/lib/content-studio/resolvers"

const ContentOverridesContext = createContext<ContentStudioState>(createDefaultContentStudioState())

export function ContentOverridesProvider({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState: ContentStudioState
}) {
  return (
    <ContentOverridesContext.Provider value={initialState}>
      {children}
    </ContentOverridesContext.Provider>
  )
}

export function useContentOverridesState() {
  return useContext(ContentOverridesContext)
}

export function useResolvedSiteChrome() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveSiteChromeForLocale(lang, state)
}

export function useResolvedHomeContent() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveHomeContentForLocale(lang, state)
}

export function useResolvedHomeAuthorityContent() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveHomeAuthorityForLocale(lang, state)
}

export function useResolvedSiteContent() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveSiteContentForLocale(lang, state)
}

export function useResolvedExperiences() {
  const state = useContentOverridesState()
  return resolveExperienceItems(state)
}

export function useResolvedExperienceBySlug(slug: string) {
  const state = useContentOverridesState()
  return resolveExperienceBySlug(slug, state)
}

export function useResolvedPackages() {
  const state = useContentOverridesState()
  return resolvePackages(state)
}

export function useResolvedPackageBySlug(slug: string) {
  const state = useContentOverridesState()
  return resolvePackageBySlug(slug, state)
}

export function useResolvedPremiumPackageLandingCopy() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolvePremiumPackageLandingForLocale(lang, state)
}

export function useResolvedDestinationCards() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveDestinationCardsForLocale(lang, state)
}

export function useResolvedRouteCards() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveRouteCardsForLocale(lang, state)
}

export function useResolvedHotelCards() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveHotelCardsForLocale(lang, state)
}

export function useResolvedHotelBySlug(slug: string) {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveHotelBySlugForLocale(lang, slug, state)
}

export function useResolvedServiceCards() {
  const { lang } = useSiteLanguage()
  const state = useContentOverridesState()
  return resolveServiceCardsForLocale(lang, state)
}
