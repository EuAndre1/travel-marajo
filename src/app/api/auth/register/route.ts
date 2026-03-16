import { NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { createRequestContext, parseJsonBodyWithLimit, RequestValidationError } from '@/lib/request-security'
import { isUniqueEmailError, registerUser } from '@/services/user.service'

const registerSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(160),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
    website: z.string().max(0).optional(), // honeypot
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => /[A-Za-z]/.test(data.password) && /\d/.test(data.password), {
    message: 'Password must include letters and numbers',
    path: ['password'],
  })

const REGISTER_PAYLOAD_LIMIT_BYTES = 6 * 1024

export async function POST(request: Request) {
  const context = createRequestContext(request)

  const ipLimit = checkRateLimit({
    scope: 'api_register_ip',
    key: context.ip,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  })

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } }
    )
  }

  try {
    const body = await parseJsonBodyWithLimit<unknown>(request, REGISTER_PAYLOAD_LIMIT_BYTES)
    const data = registerSchema.parse(body)

    if (data.website) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const email = data.email.trim().toLowerCase()
    const emailLimit = checkRateLimit({
      scope: 'api_register_email',
      key: email,
      limit: 3,
      windowMs: 60 * 60 * 1000,
    })

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts for this email. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(emailLimit.retryAfterSeconds) } }
      )
    }

    await registerUser({
      name: data.name,
      email,
      password: data.password,
    })

    console.info('[api/auth/register] user registered', { requestId: context.requestId, email })
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }

    if (isUniqueEmailError(error)) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    console.error('[api/auth/register] failed', {
      requestId: context.requestId,
      message: error instanceof Error ? error.message : 'unknown',
    })
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
