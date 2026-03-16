import { NextResponse } from 'next/server'
import { z } from 'zod'

const flightSearchSchema = z.object({
  origin: z.string().min(2).toUpperCase().optional(),
  destination: z.string().min(2).toUpperCase().optional(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  adults: z.coerce.number().min(1).max(9).default(1),
  currency: z.string().min(3).max(3).toUpperCase().default('BRL'),
})

// Voos simulados para demonstraÃ§Ã£o
const mockFlights = [
  {
    id: 'FL001',
    airline: 'TAAG Angola Airlines',
    flightNumber: 'DT746',
    origin: 'LAD',
    destination: 'BEL',
    departureTime: '08:00',
    arrivalTime: '18:00',
    price: 850,
    currency: 'USD',
    stops: 1,
    duration: '10h00m',
  },
  {
    id: 'FL002',
    airline: 'TAP Air Portugal',
    flightNumber: 'TP201',
    origin: 'LIS',
    destination: 'BEL',
    departureTime: '10:00',
    arrivalTime: '20:00',
    price: 720,
    currency: 'EUR',
    stops: 0,
    duration: '9h00m',
  },
  {
    id: 'FL003',
    airline: 'LATAM Airlines',
    flightNumber: 'LA3456',
    origin: 'GRU',
    destination: 'BEL',
    departureTime: '14:00',
    arrivalTime: '17:30',
    price: 1200,
    currency: 'BRL',
    stops: 0,
    duration: '3h30m',
  },
  {
    id: 'FL004',
    airline: 'GOL Linhas AÃ©reas',
    flightNumber: 'G31234',
    origin: 'BSB',
    destination: 'BEL',
    departureTime: '09:30',
    arrivalTime: '12:00',
    price: 450,
    currency: 'BRL',
    stops: 0,
    duration: '2h30m',
  },
  {
    id: 'FL005',
    airline: 'Azul Linhas AÃ©reas',
    flightNumber: 'AD4567',
    origin: 'CNF',
    destination: 'BEL',
    departureTime: '11:00',
    arrivalTime: '14:30',
    price: 380,
    currency: 'BRL',
    stops: 1,
    duration: '3h30m',
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = {
      origin: searchParams.get('origin') || undefined,
      destination: searchParams.get('destination') || undefined,
      departureDate: searchParams.get('departureDate') || undefined,
      returnDate: searchParams.get('returnDate') || undefined,
      adults: searchParams.get('adults') || '1',
      currency: searchParams.get('currency') || 'BRL',
    }

    const validatedQuery = flightSearchSchema.parse(query)

    // Filtrar voos baseado nos parÃ¢metros
    let filteredFlights = [...mockFlights]

    if (validatedQuery.origin) {
      filteredFlights = filteredFlights.filter(
        (f) => f.origin.toUpperCase() === validatedQuery.origin?.toUpperCase()
      )
    }

    if (validatedQuery.destination) {
      filteredFlights = filteredFlights.filter(
        (f) => f.destination.toUpperCase() === validatedQuery.destination?.toUpperCase()
      )
    }

    // Se nÃ£o houver filtros ou nenhum resultado, retornar todos
    if (filteredFlights.length === 0) {
      filteredFlights = mockFlights
    }

    // Adicionar data aos voos
    const flightsWithDates = filteredFlights.map((flight) => ({
      ...flight,
      departureTime: validatedQuery.departureDate
        ? `${validatedQuery.departureDate}T${flight.departureTime}:00Z`
        : `2026-03-15T${flight.departureTime}:00Z`,
      arrivalTime: validatedQuery.departureDate
        ? `${validatedQuery.departureDate}T${flight.arrivalTime}:00Z`
        : `2026-03-15T${flight.arrivalTime}:00Z`,
      price: flight.price * validatedQuery.adults,
    }))

    return NextResponse.json({
      flights: flightsWithDates,
      total: flightsWithDates.length,
      query: validatedQuery,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Erro ao buscar voos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flights' },
      { status: 500 }
    )
  }
}
