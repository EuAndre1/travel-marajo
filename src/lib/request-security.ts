import { randomUUID } from 'crypto'

export class RequestValidationError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

export type RequestContext = {
  requestId: string
  ip: string
}

export function createRequestContext(request: Request): RequestContext {
  return {
    requestId: randomUUID(),
    ip: getClientIp(request),
  }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return (
    request.headers.get('x-real-ip')
    ?? request.headers.get('cf-connecting-ip')
    ?? request.headers.get('true-client-ip')
    ?? 'unknown'
  )
}

export async function readBodyWithLimit(request: Request, maxBytes: number): Promise<string> {
  const body = await request.text()
  const bytes = Buffer.byteLength(body, 'utf8')

  if (bytes > maxBytes) {
    throw new RequestValidationError('Payload too large', 413)
  }

  return body
}

export async function parseJsonBodyWithLimit<T>(request: Request, maxBytes: number): Promise<T> {
  const body = await readBodyWithLimit(request, maxBytes)

  try {
    return JSON.parse(body) as T
  } catch {
    throw new RequestValidationError('Invalid JSON payload', 400)
  }
}
