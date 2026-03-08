import { BookingStatus, BookingType, PaymentMethod, PaymentProvider, PaymentStatus, Prisma } from '@prisma/client'
import type Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { normalizeCurrency } from '@/lib/money'
import prisma from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'

const dateStringSchema = z
  .string()
  .min(1)
  .refine((value) => !Number.isNaN(Date.parse(value)), { message: 'Invalid date' })

const flightDetailsSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema.optional(),
  flightId: z.string().min(1),
  numPassengers: z.coerce.number().int().min(1),
  seatNumbers: z.array(z.string()).optional().default([]),
})

const hotelDetailsSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  accommodationId: z.string().min(1),
  numGuests: z.coerce.number().int().min(1),
  numRooms: z.coerce.number().int().min(1),
})

const packageDetailsSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema.optional(),
  packageId: z.string().min(1),
  numTravelers: z.coerce.number().int().min(1),
})

const bookingSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('FLIGHT'),
    details: flightDetailsSchema,
    totalPrice: z.number().positive(),
    currency: z.string().min(3).max(3).toUpperCase(),
    paymentMethodId: z.string().optional(),
  }),
  z.object({
    type: z.literal('HOTEL'),
    details: hotelDetailsSchema,
    totalPrice: z.number().positive(),
    currency: z.string().min(3).max(3).toUpperCase(),
    paymentMethodId: z.string().optional(),
  }),
  z.object({
    type: z.literal('PACKAGE'),
    details: packageDetailsSchema,
    totalPrice: z.number().positive(),
    currency: z.string().min(3).max(3).toUpperCase(),
    paymentMethodId: z.string().optional(),
  }),
])

function mapToBookingType(type: z.infer<typeof bookingSchema>['type']): BookingType {
  if (type === 'PACKAGE') {
    return BookingType.PACKAGE
  }

  // Legacy FLIGHT/HOTEL flows are grouped as MIXED in the new commercial enum.
  return BookingType.MIXED
}

function buildBaseData(
  userId: string,
  totalPrice: number,
  currency: ReturnType<typeof normalizeCurrency>,
  details: { startDate: string; endDate?: string },
  bookingType: BookingType,
  paymentIntent?: Stripe.PaymentIntent
): Prisma.BookingCreateInput {
  const paymentStatus = paymentIntent?.status === 'succeeded' ? PaymentStatus.COMPLETED : PaymentStatus.PENDING
  const bookingStatus = paymentIntent?.status === 'succeeded' ? BookingStatus.CONFIRMED : BookingStatus.PENDING

  return {
    user: { connect: { id: userId } },
    startDate: new Date(details.startDate),
    endDate: details.endDate ? new Date(details.endDate) : null,
    totalPrice,
    currency,
    status: bookingStatus,
    bookingType,
    payment: paymentIntent
      ? {
          create: {
            amount: totalPrice,
            currency,
            paymentMethod: PaymentMethod.CARD,
            paymentProvider: PaymentProvider.STRIPE,
            transactionId: paymentIntent.id,
            status: paymentStatus,
          },
        }
      : undefined,
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedBooking = bookingSchema.parse(body)
    const normalizedCurrency = normalizeCurrency(validatedBooking.currency)

    let paymentIntent: Stripe.PaymentIntent | undefined
    if (validatedBooking.paymentMethodId) {
      const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin
      paymentIntent = await getStripe().paymentIntents.create({
        amount: Math.round(validatedBooking.totalPrice * 100),
        currency: normalizedCurrency.toLowerCase(),
        payment_method: validatedBooking.paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        return_url: `${appUrl}/booking-confirmation`,
        metadata: {
          userId: session.user.id,
          bookingType: validatedBooking.type,
        },
      })
    }

    const baseData = buildBaseData(
      session.user.id,
      validatedBooking.totalPrice,
      normalizedCurrency,
      {
        startDate: validatedBooking.details.startDate,
        endDate: validatedBooking.details.endDate,
      },
      mapToBookingType(validatedBooking.type),
      paymentIntent
    )

    const newBooking =
      validatedBooking.type === 'FLIGHT'
        ? await prisma.booking.create({
            data: {
              ...baseData,
              flightBookings: {
                create: {
                  flight: { connect: { id: validatedBooking.details.flightId } },
                  numPassengers: validatedBooking.details.numPassengers,
                  seatNumbers: validatedBooking.details.seatNumbers,
                  priceAtBooking: validatedBooking.totalPrice,
                  currencyAtBooking: normalizedCurrency,
                },
              },
            },
            include: {
              payment: true,
              flightBookings: true,
              hotelBookings: true,
              packageBookings: true,
            },
          })
        : validatedBooking.type === 'HOTEL'
          ? await prisma.booking.create({
              data: {
                ...baseData,
                hotelBookings: {
                  create: {
                    accommodation: { connect: { id: validatedBooking.details.accommodationId } },
                    checkInDate: new Date(validatedBooking.details.startDate),
                    checkOutDate: new Date(validatedBooking.details.endDate),
                    numGuests: validatedBooking.details.numGuests,
                    numRooms: validatedBooking.details.numRooms,
                    priceAtBooking: validatedBooking.totalPrice,
                    currencyAtBooking: normalizedCurrency,
                  },
                },
              },
              include: {
                payment: true,
                flightBookings: true,
                hotelBookings: true,
                packageBookings: true,
              },
            })
          : await prisma.booking.create({
              data: {
                ...baseData,
                packageBookings: {
                  create: {
                    package: { connect: { id: validatedBooking.details.packageId } },
                    numTravelers: validatedBooking.details.numTravelers,
                    priceAtBooking: validatedBooking.totalPrice,
                    currencyAtBooking: normalizedCurrency,
                  },
                },
              },
              include: {
                payment: true,
                flightBookings: true,
                hotelBookings: true,
                packageBookings: true,
              },
            })

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        booking: newBooking,
        paymentIntent,
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
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        payment: true,
        flightBookings: {
          include: {
            flight: true,
          },
        },
        hotelBookings: {
          include: {
            accommodation: true,
          },
        },
        packageBookings: {
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
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}



