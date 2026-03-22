import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-studio/api-access"
import {
  getMaxMediaBytesForMimeType,
  getMediaBlobToken,
  getMediaStorageErrorResponse,
  getMediaStorageStatus,
  validateMediaFileMetadata,
  buildMediaBlobPath,
} from "@/lib/media-library/storage"
import { getMediaTypeFromMimeType } from "@/lib/media-library/shared"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type UploadInitRequest = {
  filename?: string
  contentType?: string
  size?: number
}

const CLIENT_UPLOAD_TOKEN_TTL_MS = 30 * 60 * 1000
const MULTIPART_RECOMMENDATION_BYTES = 5 * 1024 * 1024

function getFileNameFromInput(value: string | undefined) {
  const sanitized = value?.trim()

  if (!sanitized) {
    return "upload"
  }

  return sanitized.split(/[\\/]/).pop() || "upload"
}

export async function POST(request: Request) {
  const { response } = await requireAdminApiSession()

  if (response) {
    return response
  }

  const payload = (await request.json().catch(() => null)) as UploadInitRequest | null

  const filename = getFileNameFromInput(payload?.filename)
  const contentType = payload?.contentType?.trim() ?? ""
  const size = Number(payload?.size)

  try {
    validateMediaFileMetadata({
      mimeType: contentType,
      size,
    })

    const pathname = buildMediaBlobPath(filename)
    const maxFileSizeBytes = getMaxMediaBytesForMimeType(contentType)
    const mediaType = getMediaTypeFromMimeType(contentType)
    const clientToken = await generateClientTokenFromReadWriteToken({
      token: getMediaBlobToken(),
      pathname,
      addRandomSuffix: false,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
      allowedContentTypes: [contentType],
      maximumSizeInBytes: maxFileSizeBytes,
      validUntil: Date.now() + CLIENT_UPLOAD_TOKEN_TTL_MS,
    })

    return NextResponse.json({
      upload: {
        assetId: crypto.randomUUID(),
        clientToken,
        pathname,
        contentType,
        type: mediaType,
        maxFileSizeBytes,
        multipartRecommended: size >= MULTIPART_RECOMMENDATION_BYTES,
      },
      storage: getMediaStorageStatus(),
    })
  } catch (error) {
    const { message, status } = getMediaStorageErrorResponse(error)

    console.error("[admin/media/upload:init] failed", {
      message,
      status,
    })

    return NextResponse.json(
      {
        error: "MEDIA_UPLOAD_INIT_FAILED",
        message,
      },
      { status },
    )
  }
}
