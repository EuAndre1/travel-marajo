import {
  BookingStatus,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  type Booking,
  type Payment,
} from '@prisma/client'
import { db } from '@/database/client'

type SupportedCurrency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'AOA'

type BookingWithPayment = Booking & { payment: Payment | null }

export type FinalizeStripePaymentInput = {
  bookingId: string
  amount: number
  currency: SupportedCurrency
  transactionId: string
  paymentIntentId?: string
  checkoutSessionId?: string
  rawStatus?: string
}

export type FinalizeStripePaymentResult = {
  booking: BookingWithPayment
  payment: Payment
  bookingAlreadyConfirmed: boolean
  paymentAlreadyCompleted: boolean
}

export async function createPendingBooking(data: {
  userId: string
  totalPrice: number
  currency: SupportedCurrency
}): Promise<Booking> {
  return db.booking.create({
    data: {
      userId: data.userId,
      startDate: new Date(),
      totalPrice: data.totalPrice,
      currency: data.currency,
      status: BookingStatus.PENDING,
    },
  })
}

export async function findBookingWithPayment(bookingId: string) {
  return db.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true, lead: true },
  })
}

export async function createPendingStripePayment(data: {
  bookingId: string
  amount: number
  currency: SupportedCurrency
  checkoutSessionId: string
  transactionId: string
}): Promise<Payment> {
  return db.payment.upsert({
    where: { bookingId: data.bookingId },
    update: {
      amount: data.amount,
      currency: data.currency,
      paymentProvider: PaymentProvider.STRIPE,
      paymentMethod: PaymentMethod.CARD,
      checkoutSessionId: data.checkoutSessionId,
      transactionId: data.transactionId,
      rawStatus: 'checkout_created',
      status: PaymentStatus.PENDING,
    },
    create: {
      bookingId: data.bookingId,
      amount: data.amount,
      currency: data.currency,
      paymentProvider: PaymentProvider.STRIPE,
      paymentMethod: PaymentMethod.CARD,
      checkoutSessionId: data.checkoutSessionId,
      transactionId: data.transactionId,
      rawStatus: 'checkout_created',
      status: PaymentStatus.PENDING,
    },
  })
}

export async function finalizeStripePaymentAndBooking(
  input: FinalizeStripePaymentInput
): Promise<FinalizeStripePaymentResult> {
  return db.$transaction(async (tx) => {
    const existingBooking = await tx.booking.findUnique({
      where: { id: input.bookingId },
      include: { payment: true },
    })

    if (!existingBooking) {
      throw new Error('Booking not found for webhook event')
    }

    const bookingAlreadyConfirmed =
      existingBooking.status === BookingStatus.CONFIRMED || existingBooking.status === BookingStatus.COMPLETED
    const paymentAlreadyCompleted = existingBooking.payment?.status === PaymentStatus.COMPLETED

    const payment = await tx.payment.upsert({
      where: { bookingId: input.bookingId },
      update: {
        amount: input.amount,
        currency: input.currency,
        paymentMethod: PaymentMethod.CARD,
        paymentProvider: PaymentProvider.STRIPE,
        transactionId: input.transactionId,
        paymentIntentId: input.paymentIntentId,
        checkoutSessionId: input.checkoutSessionId,
        rawStatus: input.rawStatus,
        status: PaymentStatus.COMPLETED,
      },
      create: {
        bookingId: input.bookingId,
        amount: input.amount,
        currency: input.currency,
        paymentMethod: PaymentMethod.CARD,
        paymentProvider: PaymentProvider.STRIPE,
        transactionId: input.transactionId,
        paymentIntentId: input.paymentIntentId,
        checkoutSessionId: input.checkoutSessionId,
        rawStatus: input.rawStatus,
        status: PaymentStatus.COMPLETED,
      },
    })

    const booking = await tx.booking.update({
      where: { id: input.bookingId },
      data: {
        status: bookingAlreadyConfirmed ? existingBooking.status : BookingStatus.CONFIRMED,
      },
      include: { payment: true },
    })

    return {
      booking,
      payment,
      bookingAlreadyConfirmed,
      paymentAlreadyCompleted,
    }
  })
}

export async function cleanupExpiredPendingCommerce(input: {
  olderThanHours: number
  limit?: number
}) {
  const limit = input.limit ?? 500
  const cutoff = new Date(Date.now() - input.olderThanHours * 60 * 60 * 1000)

  return db.$transaction(async (tx) => {
    const staleBookings = await tx.booking.findMany({
      where: {
        status: BookingStatus.PENDING,
        createdAt: { lt: cutoff },
      },
      include: { payment: true },
      orderBy: { createdAt: 'asc' },
      take: limit,
    })

    const staleIds = staleBookings
      .filter((booking) => !booking.payment || booking.payment.status === PaymentStatus.PENDING)
      .map((booking) => booking.id)

    if (staleIds.length === 0) {
      return {
        staleCount: 0,
        cancelledBookings: 0,
        failedPayments: 0,
        bookingIds: [] as string[],
      }
    }

    const paymentUpdate = await tx.payment.updateMany({
      where: {
        bookingId: { in: staleIds },
        status: PaymentStatus.PENDING,
      },
      data: {
        status: PaymentStatus.FAILED,
        rawStatus: 'expired_cleanup',
      },
    })

    const bookingUpdate = await tx.booking.updateMany({
      where: {
        id: { in: staleIds },
        status: BookingStatus.PENDING,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
    })

    return {
      staleCount: staleIds.length,
      cancelledBookings: bookingUpdate.count,
      failedPayments: paymentUpdate.count,
      bookingIds: staleIds,
    }
  })
}

export async function getCommercialHealthSnapshot(input: { staleHours: number; sampleSize?: number }) {
  const staleCutoff = new Date(Date.now() - input.staleHours * 60 * 60 * 1000)
  const sampleSize = input.sampleSize ?? 20

  const [stalePendingBookings, completedPaymentWithoutConfirmedBooking, confirmedBookingWithoutCompletedPayment] =
    await Promise.all([
      db.booking.findMany({
        where: {
          status: BookingStatus.PENDING,
          createdAt: { lt: staleCutoff },
        },
        select: {
          id: true,
          createdAt: true,
          customerEmail: true,
          payment: { select: { status: true, checkoutSessionId: true, paymentIntentId: true } },
        },
        orderBy: { createdAt: 'asc' },
        take: sampleSize,
      }),
      db.booking.findMany({
        where: {
          status: { notIn: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
          payment: { is: { status: PaymentStatus.COMPLETED } },
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
          payment: { select: { status: true, paymentIntentId: true } },
        },
        orderBy: { updatedAt: 'desc' },
        take: sampleSize,
      }),
      db.booking.findMany({
        where: {
          status: { in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] },
          OR: [{ payment: { is: null } }, { payment: { is: { status: { not: PaymentStatus.COMPLETED } } } }],
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
          payment: { select: { status: true, paymentIntentId: true } },
        },
        orderBy: { updatedAt: 'desc' },
        take: sampleSize,
      }),
    ])

  return {
    stalePendingBookings,
    completedPaymentWithoutConfirmedBooking,
    confirmedBookingWithoutCompletedPayment,
  }
}
