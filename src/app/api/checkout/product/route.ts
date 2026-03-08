export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCheckoutProduct } from '@/services/catalog.service'

const productSchema = z.object({
  type: z.enum(['PACKAGE', 'ACTIVITY']),
  id: z.string().min(1),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = productSchema.parse({
      type: searchParams.get('type'),
      id: searchParams.get('id'),
    })

    const product = await getCheckoutProduct({ type: query.type, idOrSlug: query.id })
    return NextResponse.json({ product })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid checkout query', details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : 'Failed to fetch checkout product'
    return NextResponse.json({ error: message }, { status: 404 })
  }
}
