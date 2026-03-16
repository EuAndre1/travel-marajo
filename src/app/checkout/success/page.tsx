import { Suspense } from "react"
import CheckoutSuccessClient from "./SuccessClient"

function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <p className="text-gray-600">Carregando confirmação...</p>
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutSuccessClient />
    </Suspense>
  )
}
