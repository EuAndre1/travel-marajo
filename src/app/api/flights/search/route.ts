import { NextResponse } from 'next/server'
import { z } from 'zod'
import { DEFAULT_CURRENCY } from '@/config/currency'
import { DEFAULT_LOCALE } from '@/config/i18n'
import { searchFlights } from '@/services/amadeus-flight.service'
import { normalizeCurrency } from '@/lib/money'

const flightQuerySchema = z.object({
  origin: z.string().min(3).max(3).toUpperCase(),
  destination: z.string().min(3).max(3).toUpperCase(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(9).default(1),
  currency: z.string().length(3).toUpperCase().default(DEFAULT_CURRENCY),
  locale: z.enum(['pt', 'en', 'fr', 'es']).default(DEFAULT_LOCALE),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = flightQuerySchema.parse({
      origin: searchParams.get('origin'),
      destination: searchParams.get('destination'),
      departureDate: searchParams.get('departureDate'),
      adults: searchParams.get('adults') ?? '1',
      currency: searchParams.get('currency') ?? DEFAULT_CURRENCY,
      locale: searchParams.get('locale') ?? DEFAULT_LOCALE,
      page: searchParams.get('page') ?? '1',
      pageSize: searchParams.get('pageSize') ?? '10',
    })

    const result = await searchFlights(
      {
        origin: parsed.origin,
        destination: parsed.destination,
        departureDate: parsed.departureDate,
        adults: parsed.adults,
        currency: normalizeCurrency(parsed.currency),
        page: parsed.page,
        pageSize: parsed.pageSize,
      },
      parsed.locale
    )

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid flight search query',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Flight search failed'
    const status = message.includes('Missing required environment variable') ? 503 : 500

    return NextResponse.json({ error: message }, { status })
  }
}
