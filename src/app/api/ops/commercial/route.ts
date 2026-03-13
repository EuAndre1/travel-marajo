import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getOptionalEnv } from '@/lib/env'
import { parseJsonBodyWithLimit, RequestValidationError } from '@/lib/request-security'
import { getCommercialHealth, runCommercialCleanup } from '@/services/commercial-ops.service'

export const dynamic = 'force-dynamic'

const cleanupSchema = z.object({
  olderThanHours: z.coerce.number().int().min(1).max(24 * 30).optional(),
  limit: z.coerce.number().int().min(1).max(5000).optional(),
})

function isAuthorized(request: Request): boolean {
  const token = getOptionalEnv('OPS_RUNBOOK_TOKEN')
  if (!token) {
    return false
  }

  const received = request.headers.get('x-ops-token')
  return Boolean(received && received === token)
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const health = await getCommercialHealth()
  return NextResponse.json({ health })
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await parseJsonBodyWithLimit<unknown>(request, 4 * 1024)
    const parsed = cleanupSchema.parse(body)
    const result = await runCommercialCleanup(parsed)

    return NextResponse.json({ result })
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid cleanup payload', details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to run cleanup' }, { status: 500 })
  }
}
