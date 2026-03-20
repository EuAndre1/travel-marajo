import { BlobNotFoundError } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-studio/api-access"
import { createMediaAsset } from "@/lib/media-library/persistence"
import {
  deleteImageFromStorage,
  getMediaStorageErrorResponse,
  getMediaStorageStatus,
  uploadImageToStorage,
} from "@/lib/media-library/storage"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const { response, session } = await requireAdminApiSession()

  if (response) {
    return response
  }

  if (!session?.user) {
    return NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 })
  }

  const formData = await request.formData().catch(() => null)
  const fileCandidate = formData?.get("file")
  const altCandidate = formData?.get("alt")

  if (!(fileCandidate instanceof File)) {
    return NextResponse.json({ error: "FILE_REQUIRED" }, { status: 400 })
  }

  const alt = typeof altCandidate === "string" ? altCandidate.trim() : ""
  let uploadedUrl = ""

  try {
    const blob = await uploadImageToStorage(fileCandidate)
    uploadedUrl = blob.url

    const item = await createMediaAsset({
      id: crypto.randomUUID(),
      url: blob.url,
      type: "image",
      filename: fileCandidate.name,
      alt: alt || null,
      uploadedBy: session.user.email ?? "unknown@travelmarajo.local",
    })

    if (!item) {
      throw new Error("Nao foi possivel registrar a imagem persistida no banco.")
    }

    return NextResponse.json(
      {
        item,
        storage: getMediaStorageStatus(),
      },
      { status: 201 },
    )
  } catch (error) {
    if (uploadedUrl) {
      try {
        await deleteImageFromStorage(uploadedUrl)
      } catch (cleanupError) {
        if (!(cleanupError instanceof BlobNotFoundError)) {
          console.error("[admin/media/upload] failed to cleanup uploaded blob", {
            message:
              cleanupError instanceof Error ? cleanupError.message : "unknown_cleanup_error",
          })
        }
      }
    }

    const { message, status } = getMediaStorageErrorResponse(error)

    console.error("[admin/media/upload] failed", {
      message,
      status,
    })

    return NextResponse.json(
      {
        error: "MEDIA_UPLOAD_FAILED",
        message,
      },
      { status },
    )
  }
}
