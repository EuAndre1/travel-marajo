'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { siteContent } from '@/config/site-content'
import { getLocalizedPath } from '@/i18n/routing'
import { useSiteLanguage } from '@/lib/use-site-language'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const profileWelcomeUrl = `${getLocalizedPath(lang, 'profile')}?welcome=1`
  const routeError = useMemo(
    () => resolveRegisterErrorMessage(searchParams.get('error'), content),
    [content, searchParams]
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const visibleError = error || routeError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const trimmedName = name.trim()
      const normalizedEmail = email.trim().toLowerCase()

      if (trimmedName.length < 2) {
        setError(content.registerNameValidation)
        return
      }

      if (password !== confirmPassword) {
        setError(content.registerPasswordMismatch)
        return
      }

      if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        setError(content.registerPasswordStrength)
        return
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, email: normalizedEmail, password, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(resolveRegisterErrorMessage(data.error, content))
        return
      }

      const loginResult = await signIn('credentials', {
        email: normalizedEmail,
        password,
        redirect: false,
        callbackUrl: profileWelcomeUrl,
      })

      if (loginResult?.error) {
        setError(resolveRegisterErrorMessage(loginResult.error, content))
        return
      }

      router.push(loginResult?.url ?? profileWelcomeUrl)
      router.refresh()
    } catch {
      setError(content.registerUnexpectedError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: profileWelcomeUrl })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-800">{content.registerTitle}</h1>
            <p className="mt-1 text-neutral-600">{content.registerSubtitle}</p>
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
            {content.registerGoogle}
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
              <label className="mb-1 block text-sm font-medium text-neutral-700">{content.registerName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
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
                minLength={8}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">{content.registerConfirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {isLoading ? content.registerSubmitting : content.registerSubmit}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              {content.registerHasAccount}{" "}
              <Link href={getLocalizedPath(lang, 'login')} className="font-medium text-primary hover:text-primary-dark">
                {content.registerLogin}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function resolveRegisterErrorMessage(
  rawError: string | null | undefined,
  content: (typeof siteContent)[keyof typeof siteContent]
) {
  if (!rawError) {
    return ''
  }

  switch (rawError.toLowerCase()) {
    case 'email already in use':
      return content.registerEmailInUse
    case 'passwords do not match':
      return content.registerPasswordMismatch
    case 'password must include letters and numbers':
      return content.registerPasswordStrength
    case 'invalid data':
    case 'invalid json payload':
    case 'data_invalid':
      return content.registerInvalidData
    case 'credentialssignin':
      return content.loginInvalid
    default:
      return content.registerError
  }
}
