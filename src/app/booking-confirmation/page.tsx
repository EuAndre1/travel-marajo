'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { siteContent } from '@/config/site-content'
import { getLocalizedPath } from '@/i18n/routing'
import { useSiteLanguage } from '@/lib/use-site-language'

export default function BookingConfirmationPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSessionId(params.get('session_id'))
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-neutral-800">{content.bookingProcessingTitle}</h1>
          <p className="mb-6 text-neutral-600">{content.bookingProcessingSubtitle}</p>

          {sessionId ? (
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="mb-1 text-sm text-neutral-500">{content.bookingSessionLabel}</p>
              <p className="break-all text-sm font-mono font-bold text-neutral-800">{sessionId}</p>
            </div>
          ) : null}

          <div className="space-y-3">
            <Link
              href={getLocalizedPath(lang, 'profile')}
              className="block w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {content.bookingViewReservations}
            </Link>
            <Link
              href={getLocalizedPath(lang, 'home')}
              className="block w-full rounded-lg border border-gray-200 py-3 font-semibold text-neutral-700 transition-colors hover:bg-gray-50"
            >
              {content.bookingBackHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
