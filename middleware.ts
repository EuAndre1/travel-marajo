import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPaths = ['/profile', '/booking-confirmation']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (token) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('callbackUrl', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/profile/:path*', '/booking-confirmation/:path*'],
}