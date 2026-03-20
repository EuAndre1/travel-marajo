import { del, put } from "@vercel/blob"
import {
  ACCEPTED_MEDIA_IMAGE_TYPES,
  MAX_MEDIA_IMAGE_BYTES,
  type MediaStorageStatus,
} from "@/lib/media-library/shared"

class MediaStorageError extends Error {
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

function buildBlobPath(fileName: string) {
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
    maxFileSizeBytes: MAX_MEDIA_IMAGE_BYTES,
    acceptedMimeTypes: ACCEPTED_MEDIA_IMAGE_TYPES,
    note: configured
      ? "Armazenamento persistente ativo via Vercel Blob."
      : "Defina BLOB_READ_WRITE_TOKEN no ambiente para habilitar uploads persistentes.",
  }
}

function assertStorageReady() {
  const token = getBlobToken()

  if (!token) {
    throw new MediaStorageError(
      "Armazenamento de imagens nao configurado. Defina BLOB_READ_WRITE_TOKEN.",
      503,
    )
  }

  return token
}

export function validateImageFile(file: File) {
  if (
    !ACCEPTED_MEDIA_IMAGE_TYPES.includes(
      file.type as (typeof ACCEPTED_MEDIA_IMAGE_TYPES)[number],
    )
  ) {
    throw new MediaStorageError(
      "Formato invalido. Envie JPG, PNG, WEBP, GIF ou AVIF.",
      415,
    )
  }

  if (file.size > MAX_MEDIA_IMAGE_BYTES) {
    throw new MediaStorageError("Arquivo muito grande. O limite atual e 5 MB.", 413)
  }
}

export function getMediaStorageErrorResponse(error: unknown) {
  if (error instanceof MediaStorageError) {
    return {
      message: error.message,
      status: error.status,
    }
  }

  return {
    message: "Nao foi possivel processar esta imagem agora.",
    status: 500,
  }
}

export async function uploadImageToStorage(file: File) {
  validateImageFile(file)

  const token = assertStorageReady()
  const pathname = buildBlobPath(file.name)

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 30,
    contentType: file.type,
    token,
  })
}

export async function deleteImageFromStorage(url: string) {
  const token = assertStorageReady()
  await del(url, { token })
}
