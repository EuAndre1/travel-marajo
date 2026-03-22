import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-studio/api-access"
import { createMediaAsset } from "@/lib/media-library/persistence"
import { getMediaStorageStatus } from "@/lib/media-library/storage"
import {
  getMediaTypeFromMimeType,
  getMediaTypeFromUrl,
  isMediaAssetType,
  type MediaAssetType,
} from "@/lib/media-library/shared"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type UploadCompleteRequest = {
  assetId?: string
  url?: string
  filename?: string
  alt?: string | null
  contentType?: string
  type?: MediaAssetType
}

function isNonEmptyString(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function resolveMediaType(payload: UploadCompleteRequest) {
  if (isMediaAssetType(payload.type)) {
    return payload.type
  }

  if (payload.contentType) {
    return getMediaTypeFromMimeType(payload.contentType)
  }

  return getMediaTypeFromUrl(payload.url)
}

export async function POST(request: Request) {
  const { response, session } = await requireAdminApiSession()

  if (response) {
    return response
  }

  const payload = (await request.json().catch(() => null)) as UploadCompleteRequest | null
  const safePayload: UploadCompleteRequest = payload ?? {}
  const assetId = payload?.assetId?.trim()
  const url = payload?.url?.trim()
  const filename = payload?.filename?.trim()
  const alt = payload?.alt?.trim() || null

  if (!isNonEmptyString(assetId) || !isNonEmptyString(url) || !isNonEmptyString(filename)) {
    return NextResponse.json(
      {
        error: "MEDIA_UPLOAD_COMPLETE_INVALID",
        message: "Nao foi possivel finalizar o upload desta midia.",
      },
      { status: 400 },
    )
  }

  try {
    const item = await createMediaAsset({
      id: assetId,
      url,
      type: resolveMediaType(safePayload),
      filename,
      alt,
      uploadedBy: session?.user?.email ?? "unknown@travelmarajo.local",
    })

    if (!item) {
      throw new Error("Nao foi possivel registrar esta midia na biblioteca.")
    }

    return NextResponse.json(
      {
        item,
        storage: getMediaStorageStatus(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[admin/media/upload:complete] failed", {
      message: error instanceof Error ? error.message : "unknown_error",
      assetId,
    })

    return NextResponse.json(
      {
        error: "MEDIA_UPLOAD_COMPLETE_FAILED",
        message: "O arquivo foi enviado, mas nao entrou na biblioteca agora. Tente novamente.",
      },
      { status: 500 },
    )
  }
}
