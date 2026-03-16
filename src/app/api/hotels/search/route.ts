import { NextResponse } from 'next/server'
import { z } from 'zod'
import { DEFAULT_CURRENCY } from '@/config/currency'
import { searchHotels } from '@/services/booking-hotel.service'
import { normalizeCurrency } from '@/lib/money'

const hotelQuerySchema = z.object({
  destination: z.string().min(1),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  minRating: z.coerce.number().min(0).max(10).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  currency: z.string().length(3).toUpperCase().default(DEFAULT_CURRENCY),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const parsed = hotelQuerySchema.parse({
      destination: searchParams.get('destination'),
      minPrice: searchParams.get('minPrice') ?? undefined,
      maxPrice: searchParams.get('maxPrice') ?? undefined,
      minRating: searchParams.get('minRating') ?? undefined,
      page: searchParams.get('page') ?? '1',
      pageSize: searchParams.get('pageSize') ?? '10',
      currency: searchParams.get('currency') ?? DEFAULT_CURRENCY,
    })

    if (parsed.minPrice && parsed.maxPrice && parsed.minPrice > parsed.maxPrice) {
      return NextResponse.json(
        { error: 'minPrice cannot be greater than maxPrice' },
        { status: 400 }
      )
    }

    const result = await searchHotels({ ...parsed, currency: normalizeCurrency(parsed.currency) })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid hotel search query', details: error.errors },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Hotel search failed'
    const status = message.includes('Missing required environment variable') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
