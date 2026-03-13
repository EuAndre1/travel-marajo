'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          setBookings(data.bookings || [])
        }
      } catch (error) {
        console.error('Erro ao buscar reservas:', error)
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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmada'
      case 'PENDING':
        return 'Pendente'
      case 'CANCELLED':
        return 'Cancelada'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
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
                <h1 className="text-2xl font-bold text-neutral-800">
                  {session.user?.name}
                </h1>
                <p className="text-neutral-600">{session.user?.email}</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Viajante
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    Membro desde 2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">
              Minhas Reservas
            </h2>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-neutral-600">Voc ainda no tem reservas.</p>
                <p className="text-neutral-500 text-sm mt-1">
                  Explore nossos voos, hotis e pacotes!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                          <span className="text-xs text-neutral-500">
                            Reserva #{booking.id.slice(-6)}
                          </span>
                        </div>
                        <p className="font-medium text-neutral-800">
                          {formatDate(booking.startDate)}
                          {booking.endDate && ` - ${formatDate(booking.endDate)}`}
                        </p>
                        <p className="text-sm text-neutral-500">
                          Reservado em {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(booking.totalPrice, booking.currency)}
                        </p>
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
