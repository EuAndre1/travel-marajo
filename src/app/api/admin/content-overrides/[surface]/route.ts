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

function revalidateSurfacePaths(surface: ContentStudioSurface, draft: unknown) {
  revalidatePath("/", "layout")

  switch (surface) {
    case "homepage":
    case "content":
      revalidatePath("/planejar-viagem")
      revalidatePath("/destinos")
      revalidatePath("/services")
      revalidatePath("/pacotes")
      revalidatePath("/hotels")
      return
    case "experiences":
      revalidatePath("/experiencias")
      revalidatePath("/experiences/pesqueiro")
      return
    case "packages":
    case "routeCards":
      revalidatePath("/pacotes")
      revalidatePath("/packages")
      return
    case "destinationCards":
      revalidatePath("/destinos")
      return
    case "serviceCards":
      revalidatePath("/services")
      return
    case "hotelCards":
      revalidatePath("/hotels")

      if (
        draft &&
        typeof draft === "object" &&
        "items" in draft &&
        Array.isArray((draft as { items?: unknown[] }).items)
      ) {
        for (const item of (draft as { items: unknown[] }).items) {
          if (
            item &&
            typeof item === "object" &&
            "linkedSlug" in item &&
            typeof (item as { linkedSlug?: unknown }).linkedSlug === "string" &&
            (item as { linkedSlug: string }).linkedSlug
          ) {
            revalidatePath(`/hotels/${(item as { linkedSlug: string }).linkedSlug}`)
          }
        }
      }
      return
  }
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
    console.log("[admin/content-overrides] incoming draft", {
      surface: surfaceParam,
      email: session.user.email ?? null,
      draft,
    })

    const mergedState = mergeContentStudioState({
      [surfaceParam]: draft,
    })
    const persistedDraft = mergedState[surfaceParam]

    console.log("[admin/content-overrides] normalized draft", {
      surface: surfaceParam,
      draft: persistedDraft,
    })

    await savePersistedContentStudioSurface(
      surfaceParam,
      persistedDraft,
      session.user.email ?? null,
    )

    revalidateSurfacePaths(surfaceParam, persistedDraft)

    return NextResponse.json({
      ok: true,
      surface: surfaceParam,
      updatedAt: new Date().toISOString(),
      draft: persistedDraft,
    })
  } catch (error) {
    console.error("[admin/content-overrides] failed to persist surface", {
      surface: surfaceParam,
      message: error instanceof Error ? error.message : "unknown_error",
    })

    return NextResponse.json({ error: "PERSISTENCE_FAILED" }, { status: 500 })
  }
}
