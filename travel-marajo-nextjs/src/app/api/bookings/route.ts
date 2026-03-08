import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import stripe from '@/lib/stripe'
import { z } from 'zod'

const bookingSchema = z.object({
  type: z.enum(['FLIGHT', 'HOTEL', 'PACKAGE']),
  details: z.any(),
  totalPrice: z.number().positive(),
  currency: z.string().min(3).max(3).toUpperCase(),
  paymentMethodId: z.string().optional(),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedBooking = bookingSchema.parse(body)

    const { type, details, totalPrice, currency, paymentMethodId } = validatedBooking

    // Criar intenção de pagamento com Stripe
    let paymentIntent
    if (paymentMethodId) {
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100),
        currency: currency.toLowerCase(),
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        return_url: `${process.env.NEXTAUTH_URL}/booking-confirmation`,
        metadata: {
          userId: session.user.id,
          bookingType: type,
        },
      })
    }

    // Criar a reserva no banco de dados
    const newBooking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        startDate: new Date(details.startDate),
        endDate: details.endDate ? new Date(details.endDate) : undefined,
        totalPrice: totalPrice,
        currency: currency,
        status: paymentIntent?.status === 'succeeded' ? 'CONFIRMED' : 'PENDING',
        payment: paymentIntent
          ? {
              create: {
                amount: totalPrice,
                currency: currency,
                method: 'Credit Card',
                transactionId: paymentIntent.id,
                status: paymentIntent.status === 'succeeded' ? 'COMPLETED' : 'PENDING',
              },
            }
          : undefined,
        ...(type === 'FLIGHT' && {
          flightBooking: {
            create: {
              flightId: details.flightId,
              numPassengers: details.numPassengers,
              seatNumbers: details.seatNumbers || [],
              priceAtBooking: totalPrice,
              currencyAtBooking: currency,
            },
          },
        }),
      },
      include: {
        payment: true,
        flightBooking: true,
      },
    })

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        booking: newBooking,
        paymentIntent: paymentIntent,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid booking data', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Erro ao criar reserva:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        payment: true,
        flightBooking: {
          include: {
            flight: true,
          },
        },
        hotelBooking: {
          include: {
            accommodation: true,
          },
        },
        packageBooking: {
          include: {
            package: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Erro ao buscar reservas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
