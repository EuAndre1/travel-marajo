'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { siteContent } from '@/config/site-content'
import { normalizeLocalizedAppPath } from '@/lib/env'
import { useSiteLanguage } from '@/lib/use-site-language'
import { getLocalizedPath } from '@/i18n/routing'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const callbackUrl = normalizeLocalizedAppPath(searchParams.get('callbackUrl'), lang)
  const routeError = useMemo(
    () => resolveLoginErrorMessage(searchParams.get('error'), content),
    [content, searchParams]
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const visibleError = error || routeError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError(resolveLoginErrorMessage(result.error, content))
      } else {
        router.push(result?.url ?? callbackUrl)
        router.refresh()
      }
    } catch {
      setError(content.loginGenericError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-800">{content.loginTitle}</h1>
            <p className="mt-1 text-neutral-600">{content.loginSubtitle}</p>
          </div>

          {visibleError ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {visibleError}
            </div>
          ) : null}

          <button
            onClick={handleGoogleSignIn}
            className="mb-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-neutral-700 transition-colors hover:bg-gray-50"
          >
            {content.loginGoogle}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-neutral-500">{content.loginDivider}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">{content.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">{content.loginPassword}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? content.loginSubmitting : content.loginSubmit}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              {content.loginNoAccount}{" "}
              <Link href={getLocalizedPath(lang, 'register')} className="font-medium text-primary hover:text-primary-dark">
                {content.loginRegister}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function resolveLoginErrorMessage(
  rawError: string | null | undefined,
  content: (typeof siteContent)[keyof typeof siteContent]
) {
  if (!rawError) {
    return ''
  }

  switch (rawError.toLowerCase()) {
    case 'credentialssignin':
      return content.loginInvalid
    case 'data_invalid':
    case 'invalid data':
    case 'callback':
    case 'configuration':
    case 'oauthsignin':
    case 'oauthcallback':
    case 'accessdenied':
    default:
      return content.loginGenericError
  }
}
