import type { MediaAssetItem, MediaStorageStatus } from "@/lib/media-library/shared"

const MEDIA_LIBRARY_CACHE_TTL_MS = 30_000

export interface AdminMediaLibrarySnapshot {
  items: MediaAssetItem[]
  storage: MediaStorageStatus | null
}

let cachedSnapshot: (AdminMediaLibrarySnapshot & { cachedAt: number }) | null = null
let inflightRequest: Promise<AdminMediaLibrarySnapshot> | null = null

function isCacheFresh() {
  return Boolean(cachedSnapshot && Date.now() - cachedSnapshot.cachedAt < MEDIA_LIBRARY_CACHE_TTL_MS)
}

export function readAdminMediaLibraryCache() {
  if (!isCacheFresh()) {
    return null
  }

  return {
    items: cachedSnapshot?.items ?? [],
    storage: cachedSnapshot?.storage ?? null,
  }
}

export function primeAdminMediaLibraryCache(snapshot: AdminMediaLibrarySnapshot) {
  cachedSnapshot = {
    ...snapshot,
    cachedAt: Date.now(),
  }
}

export function invalidateAdminMediaLibraryCache() {
  cachedSnapshot = null
}

export async function fetchAdminMediaLibrarySnapshot(force = false) {
  if (!force) {
    const cached = readAdminMediaLibraryCache()

    if (cached) {
      return cached
    }
  }

  if (inflightRequest) {
    return inflightRequest
  }

  inflightRequest = (async () => {
    const response = await fetch("/api/admin/media", {
      cache: "no-store",
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(
        typeof result?.message === "string"
          ? result.message
          : typeof result?.error === "string"
            ? result.error
            : "MEDIA_LIST_FAILED",
      )
    }

    const snapshot: AdminMediaLibrarySnapshot = {
      items: Array.isArray(result?.items) ? result.items : [],
      storage: result?.storage ?? null,
    }

    primeAdminMediaLibraryCache(snapshot)
    return snapshot
  })()

  try {
    return await inflightRequest
  } finally {
    inflightRequest = null
  }
}
