"use client"

import { useSearchParams } from "next/navigation"

export default function CheckoutClient(){

const params = useSearchParams()
const plan = params.get("plan")

return (

<div className="min-h-screen bg-cover bg-center flex items-center justify-center"
style={{backgroundImage:"url('/hero-bg.jpg')"}}>

<div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-xl">

<h1 className="text-3xl font-bold text-[#003366] mb-6 text-center">
Finalizar Reserva
</h1>

<div className="space-y-4">

<div className="border rounded-lg p-4">
<p className="text-sm text-gray-500">Experiência selecionada</p>
<p className="text-lg font-semibold">{plan}</p>
</div>

<input className="w-full border rounded-lg p-3" placeholder="Nome completo" />

<input className="w-full border rounded-lg p-3" placeholder="Email" />

<input className="w-full border rounded-lg p-3" placeholder="Data da experiência" />

<button className="w-full bg-[#FF6600] text-white py-3 rounded-lg font-semibold hover:bg-[#e65c00]">
Finalizar reserva
</button>

</div>

</div>

</div>

)

}
