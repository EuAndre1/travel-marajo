'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ActivityModel } from '@/types'
import { formatPrice } from '@/lib/utils'

type ActivitiesResponse = {
  activities: ActivityModel[]
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities')
        const data = (await response.json()) as ActivitiesResponse | { error: string }

        if (!response.ok) {
          setError('error' in data ? data.error : 'Falha ao carregar atividades')
          return
        }

        setActivities((data as ActivitiesResponse).activities)
      } catch {
        setError('Falha ao carregar atividades')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchActivities()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 py-12" id="atividades">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-[#003366] mb-6">Atividades</h1>

        {isLoading && <p className="text-neutral-600">Carregando atividades...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && !error && activities.length === 0 && (
          <p className="text-neutral-600">Nenhuma atividade ativa no momento.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <article key={activity.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#003366]/10 to-[#FF6600]/10">
                {activity.images[0] ? (
                  <img src={activity.images[0]} alt={activity.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#003366]">Travel Marajó</div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#003366] mb-2">{activity.name}</h2>
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {activity.shortDescription ?? activity.description}
                </p>
                <p className="text-sm text-neutral-500 mb-4">
                  {activity.durationMinutes ? `${activity.durationMinutes} minutos` : 'Duração a confirmar'}
                </p>
                <p className="text-2xl font-bold text-[#003366] mb-4">
                  {formatPrice(activity.price, activity.currency, 'pt')}
                </p>
                <Link
                  href={`/checkout?type=ACTIVITY&id=${activity.id}&source=ACTIVITIES_PAGE`}
                  className="inline-flex items-center justify-center w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Reservar atividade
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
