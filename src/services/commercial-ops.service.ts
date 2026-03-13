import { cleanupExpiredPendingCommerce, getCommercialHealthSnapshot } from '@/repositories/booking.repository'

export async function runCommercialCleanup(input?: { olderThanHours?: number; limit?: number }) {
  return cleanupExpiredPendingCommerce({
    olderThanHours: input?.olderThanHours ?? 24,
    limit: input?.limit ?? 500,
  })
}

export async function getCommercialHealth(input?: { staleHours?: number; sampleSize?: number }) {
  return getCommercialHealthSnapshot({
    staleHours: input?.staleHours ?? 24,
    sampleSize: input?.sampleSize ?? 20,
  })
}
