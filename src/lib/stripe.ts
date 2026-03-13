import Stripe from "stripe"
import { getRequiredEnv } from "@/lib/env"

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  const secretKey = getRequiredEnv("STRIPE_SECRET_KEY")

  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2023-10-16",
    })
  }

  return stripeInstance
}
