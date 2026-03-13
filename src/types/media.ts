import type { AppLocale } from "@/config/i18n"

export type LocalizedText = Partial<Record<AppLocale, string>>

export interface MediaSourceAttribution {
  label?: string
  url?: string
  owner?: string
  license?: string
}

export interface ImageAsset {
  kind: "image"
  id: string
  src: string
  width: number
  height: number
  alt: LocalizedText
  blurDataURL?: string
  attribution?: MediaSourceAttribution
}

export interface VideoAsset {
  kind: "video"
  id: string
  src: string
  poster?: string
  width?: number
  height?: number
  title: LocalizedText
  caption?: LocalizedText
  attribution?: MediaSourceAttribution
}

export interface ProofQuote {
  id: string
  author?: string
  role?: string
  sourceUrl?: string
  quote: LocalizedText
}

export interface ProofBundle {
  id: string
  images?: ImageAsset[]
  videos?: VideoAsset[]
  testimonials?: ProofQuote[]
}
