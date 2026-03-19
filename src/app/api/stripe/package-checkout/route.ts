import { NextResponse } from "next/server"
import { z } from "zod"
import { buildLocalizedAbsoluteUrl, resolveRequestLocale } from "@/lib/env"
import { getStripe } from "@/lib/stripe"
import { getPackageBySlug } from "@/data/pacotes"

const schema = z.object({
  slug: z.string().min(1),
  locale: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, locale } = schema.parse(body)

    const packageItem = getPackageBySlug(slug)
    if (!packageItem) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }
    const packageDisplay = packageItem.translations.pt

    const requestLocale = resolveRequestLocale(locale ?? request.headers.get("referer") ?? request.url)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            unit_amount: Math.round(packageItem.startingPrice * 100),
            product_data: {
              name: packageDisplay.title,
              description: packageDisplay.summary,
            },
          },
        },
      ],
      success_url:
        `${buildLocalizedAbsoluteUrl(requestLocale, "checkoutSuccess", undefined, {
          item: slug,
          type: "pacote",
        })}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: buildLocalizedAbsoluteUrl(requestLocale, "checkoutCancel", undefined, {
        item: slug,
        type: "pacote",
      }),
      metadata: {
        itemType: "package",
        slug,
        locale: requestLocale,
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
