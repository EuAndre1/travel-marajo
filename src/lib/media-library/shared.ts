export const MAX_MEDIA_IMAGE_BYTES = 5 * 1024 * 1024
export const MAX_MEDIA_VIDEO_BYTES = 50 * 1024 * 1024

export const ACCEPTED_MEDIA_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const

export const ACCEPTED_MEDIA_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
] as const

export const ACCEPTED_MEDIA_TYPES = [
  ...ACCEPTED_MEDIA_IMAGE_TYPES,
  ...ACCEPTED_MEDIA_VIDEO_TYPES,
] as const

export type MediaAssetType = "image" | "video"

export interface MediaReference {
  url: string
  type: MediaAssetType
}

export interface MediaAssetItem {
  id: string
  url: string
  type: MediaAssetType
  filename: string
  alt: string | null
  createdAt: string
  uploadedBy: string
}

export interface MediaStorageStatus {
  provider: "vercel-blob"
  configured: boolean
  maxFileSizeBytes: number
  maxImageFileSizeBytes: number
  maxVideoFileSizeBytes: number
  acceptedMimeTypes: readonly string[]
  note: string
}

export function isMediaAssetType(value: unknown): value is MediaAssetType {
  return value === "image" || value === "video"
}

export function getMediaTypeFromMimeType(value: string | null | undefined): MediaAssetType {
  return value?.startsWith("video/") ? "video" : "image"
}

export function getMediaTypeFromUrl(value: string | null | undefined): MediaAssetType {
  if (!value) {
    return "image"
  }

  return /\.(mp4|webm)(\?.*)?$/i.test(value) ? "video" : "image"
}

export function getVideoMimeTypeFromPath(value: string | null | undefined) {
  if (!value) {
    return "video/mp4"
  }

  return /\.webm(\?.*)?$/i.test(value) ? "video/webm" : "video/mp4"
}
