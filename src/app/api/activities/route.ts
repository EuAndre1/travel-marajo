export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { getActivitiesCatalog } from '@/services/catalog.service'

export async function GET() {
  try {
    const activities = await getActivitiesCatalog()
    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Failed to fetch activities', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}
