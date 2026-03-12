import { Suspense } from "react"
import CheckoutClient from "./CheckoutClient"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

function Loading(){
return(
<main className="min-h-screen flex items-center justify-center p-8">
<p className="text-gray-600">Carregando checkout...</p>
</main>
)
}

export default function Page(){
return(
<Suspense fallback={<Loading/>}>
<CheckoutClient/>
</Suspense>
)
}
