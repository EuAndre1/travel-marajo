import { BlobNotFoundError } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-studio/api-access"
import {
  deleteMediaAssetRecord,
  findMediaAssetById,
} from "@/lib/media-library/persistence"
import {
  deleteImageFromStorage,
  getMediaStorageErrorResponse,
} from "@/lib/media-library/storage"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function DELETE(
  _request: Request,
  context: { params: { id: string } },
) {
  const { response } = await requireAdminApiSession()

  if (response) {
    return response
  }

  const asset = await findMediaAssetById(context.params.id)

  if (!asset) {
    return NextResponse.json({ error: "MEDIA_NOT_FOUND" }, { status: 404 })
  }

  try {
    await deleteImageFromStorage(asset.url)
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      const { message, status } = getMediaStorageErrorResponse(error)

      return NextResponse.json(
        {
          error: "MEDIA_DELETE_FAILED",
          message,
        },
        { status },
      )
    }
  }

  try {
    await deleteMediaAssetRecord(asset.id)

    return NextResponse.json({
      ok: true,
      id: asset.id,
    })
  } catch (error) {
    console.error("[admin/media/delete] failed to remove database record", {
      id: asset.id,
      message: error instanceof Error ? error.message : "unknown_error",
    })

    return NextResponse.json(
      {
        error: "MEDIA_DELETE_FAILED",
        message: "A imagem foi removida do storage, mas o registro local nao foi atualizado.",
      },
      { status: 500 },
    )
  }
}
