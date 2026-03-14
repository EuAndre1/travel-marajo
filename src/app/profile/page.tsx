'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteContent } from '@/config/site-content'
import { useSiteLanguage } from '@/lib/use-site-language'
import { getLocalizedPath } from '@/i18n/routing'

interface Booking {
  id: string
  bookingDate: string
  startDate: string
  endDate: string | null
  totalPrice: number
  currency: string
  status: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(getLocalizedPath(lang, 'login'))
    }
  }, [lang, router, status])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          setBookings(data.bookings || [])
        }
      } catch (error) {
        console.error('Error while fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchBookings()
    }
  }, [session])

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(lang === 'pt' ? 'pt-BR' : lang, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : lang, {
      style: 'currency',
      currency,
    }).format(price)

  const getStatusColor = (bookingStatus: string) => {
    switch (bookingStatus) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative">
                <Image
                  src={session.user?.image || '/images/default-avatar.png'}
                  alt={session.user?.name || 'User'}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-neutral-800">{session.user?.name}</h1>
                <p className="text-neutral-600">{session.user?.email}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {content.profileTravelerBadge}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {content.profileMemberBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-neutral-800">{content.profileBookingsTitle}</h2>

            {bookings.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-neutral-600">{content.profileEmptyTitle}</p>
                <p className="mt-1 text-sm text-neutral-500">{content.profileEmptySubtitle}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-xl border border-gray-100 p-4 transition-colors hover:border-primary">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="text-xs text-neutral-500">#{booking.id.slice(-6)}</span>
                        </div>
                        <p className="font-medium text-neutral-800">
                          {formatDate(booking.startDate)}
                          {booking.endDate ? ` - ${formatDate(booking.endDate)}` : ''}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {content.profileReservedOn} {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{formatPrice(booking.totalPrice, booking.currency)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
