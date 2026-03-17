import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { DEFAULT_LOCALE } from "@/config/i18n"
import { getSafeAuthSecret } from "@/lib/env"
import {
  getLocaleFromCookie,
  getLocalizedPath,
  resolveCanonicalRoute,
  resolveLegacyRoute,
  resolveLocalizedAliasRoute,
  stripLocalePrefix,
} from "@/i18n/routing"

const LOCALE_COOKIE = "travel_marajo_locale"

const protectedRouteKeys = new Set(["profile", "bookingConfirmation"])

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/stripe/webhook") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public") ||
    pathname.includes(".")
  )
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (isPublicAsset(pathname)) {
    return NextResponse.next()
  }

  const cookieLocale = getLocaleFromCookie(request.cookies.get(LOCALE_COOKIE)?.value)
  const { locale, segments } = stripLocalePrefix(pathname)

  if (!locale) {
    const legacyMatch = resolveLegacyRoute(pathname)
    const nextLocale = legacyMatch?.locale ?? cookieLocale ?? DEFAULT_LOCALE

    if (legacyMatch) {
      const canonicalPath = getLocalizedPath(nextLocale, legacyMatch.key, legacyMatch.params)
      if (canonicalPath !== pathname) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = canonicalPath
        redirectUrl.search = search
        return NextResponse.redirect(redirectUrl)
      }
    }

    const homepagePath = getLocalizedPath(nextLocale, "home")
    if (homepagePath !== pathname) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = homepagePath
      redirectUrl.search = search
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (!locale) {
    return NextResponse.next()
  }

  const localizedAliasMatch = resolveLocalizedAliasRoute(locale, segments)
  if (localizedAliasMatch) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = getLocalizedPath(locale, localizedAliasMatch.key, localizedAliasMatch.params)
    redirectUrl.search = search
    return NextResponse.redirect(redirectUrl)
  }

  const canonicalMatch = resolveCanonicalRoute(locale, segments)
  if (!canonicalMatch) {
    return NextResponse.next()
  }

  if (protectedRouteKeys.has(canonicalMatch.key)) {
    const token = await getToken({ req: request, secret: getSafeAuthSecret() })

    if (!token) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = getLocalizedPath(locale, "login")
      loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`)
      return NextResponse.redirect(loginUrl)
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-site-locale", locale)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" })
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)"],
}
