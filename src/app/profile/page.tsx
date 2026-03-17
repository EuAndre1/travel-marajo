'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
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
  const searchParams = useSearchParams()
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isWelcomeState = searchParams.get('welcome') === '1'
  const supportMessage = content.pages.planTrip.whatsappMessage
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(supportMessage)}`
    : null

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

  const firstName = (session.user?.name ?? content.profileTravelerBadge).split(' ')[0]
  const bookingCount = bookings.length
  const nextPrimaryAction = bookingCount > 0 ? getLocalizedPath(lang, 'packages') : getLocalizedPath(lang, 'experiences')
  const quickActions = [
    {
      title: content.profileActionExperiences,
      description: content.pages.experiences.subtitle,
      href: getLocalizedPath(lang, 'experiences'),
      tone: 'bg-[#0B1C2C] text-white',
    },
    {
      title: content.profileActionPackages,
      description: content.pages.packages.subtitle,
      href: getLocalizedPath(lang, 'packages'),
      tone: 'bg-white text-[#0B1C2C] border border-slate-200',
    },
    {
      title: content.profileActionPlanTrip,
      description: content.pages.planTrip.subtitle,
      href: getLocalizedPath(lang, 'planTrip'),
      tone: 'bg-white text-[#0B1C2C] border border-slate-200',
    },
  ]
  const mochilaCards = [
    {
      title: content.profileReservationsCardTitle,
      body: content.profileReservationsCardBody,
      empty: bookingCount > 0 ? `${bookingCount} ${content.profileBookingsTitle.toLowerCase()}` : content.profileReservationsCardEmpty,
      href: nextPrimaryAction,
      cta: content.profileReservationsCardCta,
    },
    {
      title: content.profileSavedCardTitle,
      body: content.profileSavedCardBody,
      empty: content.profileSavedCardEmpty,
      href: getLocalizedPath(lang, 'experiences'),
      cta: content.profileSavedCardCta,
    },
    {
      title: content.profilePackagesCardTitle,
      body: content.profilePackagesCardBody,
      empty: content.profilePackagesCardEmpty,
      href: getLocalizedPath(lang, 'packages'),
      cta: content.profilePackagesCardCta,
    },
  ]
  const recentBookingsLabel = useMemo(() => {
    if (bookingCount === 0) {
      return content.profileEmptySubtitle
    }

    return `${bookingCount} ${content.profileBookingsTitle.toLowerCase()}`
  }, [bookingCount, content.profileBookingsTitle, content.profileEmptySubtitle])

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(13,91,145,0.14),_transparent_35%),linear-gradient(180deg,#f6efe4_0%,#f7f7f8_35%,#ffffff_100%)] py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="overflow-hidden rounded-[2rem] bg-[#0B1C2C] text-white shadow-2xl">
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[auto,1fr] md:px-8 lg:px-10">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 md:mx-0">
                <Image
                  src={session.user?.image || '/images/default-avatar.png'}
                  alt={session.user?.name || 'User'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/60">{content.profileHubTitle}</p>
                  <h1 className="text-3xl font-display leading-tight md:text-4xl">
                    {isWelcomeState ? content.profileWelcomeTitle : `${firstName}, ${content.profileHubTitle}`}
                  </h1>
                  <p className="max-w-3xl text-sm text-white/80 md:text-base">
                    {isWelcomeState ? content.profileWelcomeSubtitle : content.profileHubSubtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    {content.profileTravelerBadge}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-light">
                    {content.profileMemberBadge}
                  </span>
                  {session.user?.isAdmin ? (
                    <span className="inline-flex items-center rounded-full bg-amber-300/20 px-3 py-1 text-xs font-medium text-amber-200">
                      {content.profileAdminBadge}
                    </span>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      href={action.href}
                      className={`rounded-2xl px-4 py-4 transition hover:-translate-y-0.5 ${action.tone}`}
                    >
                      <div className="text-sm font-semibold">{action.title}</div>
                      <div className={`mt-1 text-xs ${action.tone.includes('text-white') ? 'text-white/75' : 'text-slate-500'}`}>
                        {action.description}
                      </div>
                    </Link>
                  ))}
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 transition hover:-translate-y-0.5"
                    >
                      <div className="text-sm font-semibold">{content.profileActionWhatsapp}</div>
                      <div className="mt-1 text-xs text-white/75">{content.pages.planTrip.responseText}</div>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-lg">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{content.profileMochilaTitle}</p>
                    <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">{content.profileBookingsTitle}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">{recentBookingsLabel}</p>
                  </div>
                  <Link
                    href={getLocalizedPath(lang, 'experiences')}
                    className="inline-flex rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary"
                  >
                    {content.profileReservationsCardCta}
                  </Link>
                </div>

                {bookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                    <p className="text-lg font-semibold text-[#0B1C2C]">{content.profileEmptyTitle}</p>
                    <p className="mt-2 text-sm text-slate-500">{content.profileReservationsCardBody}</p>
                    <p className="mt-3 text-sm text-slate-400">{content.profileEmptySubtitle}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="rounded-2xl border border-slate-100 p-5 transition-colors hover:border-primary/30">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <span className="text-xs text-slate-400">#{booking.id.slice(-6)}</span>
                            </div>
                            <p className="font-medium text-[#0B1C2C]">
                              {formatDate(booking.startDate)}
                              {booking.endDate ? ` - ${formatDate(booking.endDate)}` : ''}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {content.profileReservedOn} {formatDate(booking.bookingDate)}
                            </p>
                          </div>
                          <div className="text-left md:text-right">
                            <p className="text-xl font-bold text-primary">{formatPrice(booking.totalPrice, booking.currency)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[1.75rem] bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{content.profileQuickActionsTitle}</p>
                  <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">{content.profileMochilaTitle}</h2>
                  <p className="mt-2 text-sm text-slate-500">{content.profileMochilaSubtitle}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {mochilaCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                      <h3 className="text-lg font-semibold text-[#0B1C2C]">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{card.body}</p>
                      <p className="mt-5 text-sm text-slate-400">{card.empty}</p>
                      <Link
                        href={card.href}
                        className="mt-5 inline-flex text-sm font-semibold text-primary transition hover:text-primary-dark"
                      >
                        {card.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-lg">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{content.profileSupportTitle}</p>
                <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">{content.profileSupportSubtitle}</h2>

                <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{content.profileSupportEmailLabel}</p>
                    <p className="mt-1 text-sm font-medium text-[#0B1C2C]">{session.user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{content.profileTravelerBadge}</p>
                    <p className="mt-1 text-sm font-medium text-[#0B1C2C]">{session.user?.name}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href={getLocalizedPath(lang, 'profile')}
                    className="inline-flex justify-center rounded-full border border-primary/20 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary"
                  >
                    {content.profileSupportProfileCta}
                  </Link>
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                    >
                      {content.profileSupportWhatsappCta}
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: getLocalizedPath(lang, 'home') })}
                    className="inline-flex justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    {content.profileLogoutCta}
                  </button>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-gradient-to-br from-[#d98a2b] to-[#b85f16] p-6 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">{content.pages.planTrip.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-display">{content.pages.planTrip.title}</h2>
                <p className="mt-3 text-sm text-white/80">{content.pages.planTrip.subtitle}</p>
                <Link
                  href={getLocalizedPath(lang, 'planTrip')}
                  className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#b85f16] transition hover:bg-white/90"
                >
                  {content.profileActionPlanTrip}
                </Link>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </div>
  )
}
