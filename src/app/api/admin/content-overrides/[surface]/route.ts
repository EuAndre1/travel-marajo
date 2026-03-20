import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { authOptions } from "@/lib/auth/options"
import {
  contentStudioSurfaces,
  mergeContentStudioState,
  type ContentStudioSurface,
} from "@/lib/content-studio/resolvers"
import { savePersistedContentStudioSurface } from "@/lib/content-studio/persistence"

function isContentStudioSurface(value: string): value is ContentStudioSurface {
  return contentStudioSurfaces.includes(value as ContentStudioSurface)
}

export async function PUT(
  request: Request,
  context: { params: { surface: string } },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 })
  }

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 })
  }

  const surfaceParam = context.params.surface

  if (!isContentStudioSurface(surfaceParam)) {
    return NextResponse.json({ error: "INVALID_SURFACE" }, { status: 400 })
  }

  const body = await request.json().catch(() => null)
  const draft = body?.draft

  if (!draft) {
    return NextResponse.json({ error: "MISSING_DRAFT" }, { status: 400 })
  }

  try {
    const mergedState = mergeContentStudioState({
      [surfaceParam]: draft,
    })

    await savePersistedContentStudioSurface(
      surfaceParam,
      mergedState[surfaceParam],
      session.user.email ?? null,
    )

    revalidatePath("/", "layout")

    return NextResponse.json({
      ok: true,
      surface: surfaceParam,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[admin/content-overrides] failed to persist surface", {
      surface: surfaceParam,
      message: error instanceof Error ? error.message : "unknown_error",
    })

    return NextResponse.json({ error: "PERSISTENCE_FAILED" }, { status: 500 })
  }
}
