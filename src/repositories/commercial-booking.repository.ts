import { BookingItemType, BookingStatus, BookingType, Prisma, type Booking, type BookingItem } from '@prisma/client'
import { db } from '@/database/client'
import type { SupportedCurrency } from '@/config/currency'

type NewCommercialBookingInput = {
  userId?: string
  leadId?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  startDate: Date
  endDate?: Date | null
  totalPrice: number
  currency: SupportedCurrency
  item: {
    type: BookingItemType
    referenceId: string
    slugSnapshot?: string
    titleSnapshot: string
    descriptionSnapshot?: string
    imageSnapshot?: string
    quantity: number
    unitPrice: number
    totalPrice: number
    currency: SupportedCurrency
    metadata?: Prisma.InputJsonValue
  }
}

export async function createCommercialBooking(
  input: NewCommercialBookingInput
): Promise<Booking & { bookingItems: BookingItem[] }> {
  const bookingType = input.item.type === BookingItemType.PACKAGE ? BookingType.PACKAGE : BookingType.ACTIVITY

  return db.booking.create({
    data: {
      userId: input.userId,
      leadId: input.leadId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      startDate: input.startDate,
      endDate: input.endDate ?? null,
      totalPrice: input.totalPrice,
      currency: input.currency,
      status: BookingStatus.PENDING,
      bookingType,
      bookingItems: {
        create: {
          type: input.item.type,
          referenceId: input.item.referenceId,
          slugSnapshot: input.item.slugSnapshot,
          titleSnapshot: input.item.titleSnapshot,
          descriptionSnapshot: input.item.descriptionSnapshot,
          imageSnapshot: input.item.imageSnapshot,
          quantity: input.item.quantity,
          unitPrice: input.item.unitPrice,
          totalPrice: input.item.totalPrice,
          currency: input.item.currency,
          metadata: input.item.metadata,
        },
      },
    },
    include: { bookingItems: true },
  })
}
