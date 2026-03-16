type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

type RateLimitOptions = {
  scope: string
  key: string
  limit: number
  windowMs: number
}

type GlobalRateLimitStore = {
  map: Map<string, RateLimitEntry>
  ops: number
}

const globalStore = globalThis as typeof globalThis & {
  __travelMarajoRateLimitStore?: GlobalRateLimitStore
}

const store = globalStore.__travelMarajoRateLimitStore
  ?? (globalStore.__travelMarajoRateLimitStore = { map: new Map(), ops: 0 })

function cleanupExpired(now: number) {
  store.map.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.map.delete(key)
    }
  })
}

export function checkRateLimit(options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const bucketKey = `${options.scope}:${options.key}`
  store.ops += 1

  if (store.ops % 200 === 0) {
    cleanupExpired(now)
  }

  const existing = store.map.get(bucketKey)
  if (!existing || existing.resetAt <= now) {
    const next: RateLimitEntry = { count: 1, resetAt: now + options.windowMs }
    store.map.set(bucketKey, next)

    return {
      allowed: true,
      remaining: Math.max(0, options.limit - 1),
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    }
  }

  existing.count += 1
  store.map.set(bucketKey, existing)

  const allowed = existing.count <= options.limit
  return {
    allowed,
    remaining: Math.max(0, options.limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  }
}
