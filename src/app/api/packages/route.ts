export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { getPackagesCatalog } from '@/services/catalog.service'

export async function GET() {
  try {
    const packages = await getPackagesCatalog()
    return NextResponse.json({ packages })
  } catch (error) {
    console.error('Failed to fetch packages', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}
