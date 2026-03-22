import { del, put } from "@vercel/blob"
import {
  ACCEPTED_MEDIA_TYPES,
  ACCEPTED_MEDIA_IMAGE_TYPES,
  ACCEPTED_MEDIA_VIDEO_TYPES,
  MAX_MEDIA_IMAGE_BYTES,
  MAX_MEDIA_VIDEO_BYTES,
  getMediaTypeFromMimeType,
  type MediaStorageStatus,
} from "@/lib/media-library/shared"

export class MediaStorageError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = "MediaStorageError"
    this.status = status
  }
}

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? ""
}

function sanitizeFileStem(fileName: string) {
  const stem = fileName.replace(/\.[^.]+$/, "")

  return stem
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 80) || "upload"
}

function getFileExtension(fileName: string) {
  const match = fileName.toLowerCase().match(/\.[a-z0-9]+$/)
  return match?.[0] ?? ""
}

export function buildMediaBlobPath(fileName: string) {
  const now = new Date()
  const year = String(now.getUTCFullYear())
  const month = String(now.getUTCMonth() + 1).padStart(2, "0")
  const stem = sanitizeFileStem(fileName)
  const extension = getFileExtension(fileName)

  return `travel-marajo/media/${year}/${month}/${crypto.randomUUID()}-${stem}${extension}`
}

export function getMediaStorageStatus(): MediaStorageStatus {
  const configured = Boolean(getBlobToken())

  return {
    provider: "vercel-blob",
    configured,
    maxFileSizeBytes: MAX_MEDIA_VIDEO_BYTES,
    maxImageFileSizeBytes: MAX_MEDIA_IMAGE_BYTES,
    maxVideoFileSizeBytes: MAX_MEDIA_VIDEO_BYTES,
    acceptedMimeTypes: ACCEPTED_MEDIA_TYPES,
    note: configured
      ? "Armazenamento persistente ativo via Vercel Blob para imagens e videos."
      : "Defina BLOB_READ_WRITE_TOKEN no ambiente para habilitar uploads persistentes.",
  }
}

export function getMediaBlobToken() {
  const token = getBlobToken()

  if (!token) {
    throw new MediaStorageError(
      "Armazenamento de imagens nao configurado. Defina BLOB_READ_WRITE_TOKEN.",
      503,
    )
  }

  return token
}

export function getMaxMediaBytesForMimeType(mimeType: string | null | undefined) {
  return getMediaTypeFromMimeType(mimeType) === "video"
    ? MAX_MEDIA_VIDEO_BYTES
    : MAX_MEDIA_IMAGE_BYTES
}

function assertValidMediaType(mimeType: string | null | undefined) {
  const mediaType = getMediaTypeFromMimeType(mimeType)

  if (mediaType === "image") {
    if (
      !ACCEPTED_MEDIA_IMAGE_TYPES.includes(
        mimeType as (typeof ACCEPTED_MEDIA_IMAGE_TYPES)[number],
      )
    ) {
      throw new MediaStorageError(
        "Formato invalido. Envie JPG, PNG, WEBP, GIF ou AVIF.",
        415,
      )
    }

    return
  }

  if (
    !ACCEPTED_MEDIA_VIDEO_TYPES.includes(
      mimeType as (typeof ACCEPTED_MEDIA_VIDEO_TYPES)[number],
    )
  ) {
    throw new MediaStorageError("Formato invalido. Envie video MP4 ou WEBM.", 415)
  }
}

export function validateMediaFileMetadata(input: {
  mimeType: string | null | undefined
  size: number
}) {
  assertValidMediaType(input.mimeType)

  const maxSize = getMaxMediaBytesForMimeType(input.mimeType)

  if (!Number.isFinite(input.size) || input.size <= 0) {
    throw new MediaStorageError("Arquivo invalido. Escolha outro arquivo para enviar.", 400)
  }

  if (input.size > maxSize) {
    if (getMediaTypeFromMimeType(input.mimeType) === "video") {
      throw new MediaStorageError(
        "Arquivo muito grande. O limite atual para video e 50 MB.",
        413,
      )
    }

    throw new MediaStorageError("Arquivo muito grande. O limite atual para imagem e 5 MB.", 413)
  }
}

export function validateMediaFile(file: File) {
  validateMediaFileMetadata({
    mimeType: file.type,
    size: file.size,
  })
}

export function getMediaStorageErrorResponse(error: unknown) {
  if (error instanceof MediaStorageError) {
    return {
      message: error.message,
      status: error.status,
    }
  }

  return {
    message: "Nao foi possivel processar esta midia agora.",
    status: 500,
  }
}

export async function uploadMediaToStorage(file: File) {
  validateMediaFile(file)

  const token = getMediaBlobToken()
  const pathname = buildMediaBlobPath(file.name)

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 30,
    contentType: file.type,
    token,
  })
}

export async function deleteMediaFromStorage(url: string) {
  const token = getMediaBlobToken()
  await del(url, { token })
}

export async function uploadImageToStorage(file: File) {
  return uploadMediaToStorage(file)
}

export async function deleteImageFromStorage(url: string) {
  return deleteMediaFromStorage(url)
}
