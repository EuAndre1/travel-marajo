import { NextResponse } from "next/server"
import { z } from "zod"
import { buildLocalizedAbsoluteUrl, resolveRequestLocale } from "@/lib/env"
import { getStripe } from "@/lib/stripe"

const roomItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  price: z.number().positive(),
  subtotal: z.number().positive(),
})

const checkoutSchema = z.object({
  hotelName: z.string().min(1),
  hotelSlug: z.string().min(1).optional(),
  locale: z.string().optional(),
  total: z.number().positive().optional(),
  selectedRooms: z.array(roomItemSchema).min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { hotelName, hotelSlug, locale, selectedRooms } = checkoutSchema.parse(body)
    const requestLocale = resolveRequestLocale(locale ?? request.headers.get("referer") ?? request.url)
    const stripe = getStripe()
    const computedTotal = selectedRooms.reduce(
      (sum, room) => sum + room.price * room.quantity,
      0,
    )

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: selectedRooms.map((room) => ({
        quantity: room.quantity,
        price_data: {
          currency: "brl",
          unit_amount: Math.round(room.price * 100),
          product_data: {
            name: `${hotelName} — ${room.name}`,
            description: `Reserva estimada para ${room.quantity} quarto(s) deste tipo.`,
          },
        },
      })),
      success_url:
        `${buildLocalizedAbsoluteUrl(requestLocale, "checkoutSuccess", undefined, {
          item: hotelSlug ?? hotelName,
          type: "hotel",
        })}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: buildLocalizedAbsoluteUrl(requestLocale, "checkoutCancel", undefined, {
        item: hotelSlug ?? hotelName,
        type: "hotel",
      }),
      metadata: {
        itemType: "hotel",
        hotelName,
        hotelSlug: hotelSlug ?? "",
        locale: requestLocale,
        selectedRoomsCount: selectedRooms.length.toString(),
        totalAmount: computedTotal.toString(),
        roomSummary: selectedRooms
          .map((room) => `${room.name} x${room.quantity}`)
          .join(" | ")
          .slice(0, 450),
      },
    })

    return NextResponse.json({ checkoutUrl: session.url }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.errors }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Failed to create checkout session"
    const status = message.includes("Missing required environment variable") ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
