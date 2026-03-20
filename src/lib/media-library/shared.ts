export const MAX_MEDIA_IMAGE_BYTES = 5 * 1024 * 1024

export const ACCEPTED_MEDIA_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const

export type MediaAssetType = "image"

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
  acceptedMimeTypes: readonly string[]
  note: string
}
