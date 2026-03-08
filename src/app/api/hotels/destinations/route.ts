import { NextResponse } from 'next/server'
import { z } from 'zod'
import { searchBookingDestinations } from '@/services/booking-hotel.service'

const destinationQuerySchema = z.object({
  query: z.string().min(2),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = destinationQuerySchema.parse({
      query: searchParams.get('query'),
    })

    const destinations = await searchBookingDestinations(parsed.query)
    return NextResponse.json({ destinations })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid destination query', details: error.errors },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Destination search failed'
    const status = message.includes('Missing required environment variable') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}