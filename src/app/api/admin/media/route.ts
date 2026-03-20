import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-studio/api-access"
import { listMediaAssets } from "@/lib/media-library/persistence"
import { getMediaStorageStatus } from "@/lib/media-library/storage"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const { response } = await requireAdminApiSession()

  if (response) {
    return response
  }

  try {
    const items = await listMediaAssets()

    return NextResponse.json({
      items,
      storage: getMediaStorageStatus(),
    })
  } catch (error) {
    console.error("[admin/media] failed to list media assets", {
      message: error instanceof Error ? error.message : "unknown_error",
    })

    return NextResponse.json(
      {
        error: "MEDIA_LIST_FAILED",
        storage: getMediaStorageStatus(),
      },
      { status: 500 },
    )
  }
}
