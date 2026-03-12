import { Duffel } from '@duffel/api'

export const runtime = 'nodejs'

const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN!,
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const departureDate = searchParams.get('departureDate')
    const adults = Number(searchParams.get('adults') || '1')

    if (!origin || !destination || !departureDate) {
      return Response.json(
        { error: 'origin, destination and departureDate are required' },
        { status: 400 }
      )
    }

    const offerRequest = await duffel.offerRequests.create({
      slices: [
        {
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departure_date: departureDate,
        },
      ],
      passengers: Array.from({ length: adults }, () => ({ type: 'adult' })),
      cabin_class: 'economy',
    })

    return Response.json({
      data: offerRequest.data.offers ?? [],
    })
  } catch (error: any) {
    return Response.json(
      {
        error: 'Failed to fetch flights from Duffel',
        details: error?.errors || error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
