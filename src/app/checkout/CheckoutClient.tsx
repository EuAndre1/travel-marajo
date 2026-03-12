"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { experiences } from "@/data/experiences"

export default function CheckoutClient() {
  const params = useSearchParams()
  const slug = (params.get("experience") || "pesqueiro") as keyof typeof experiences
  const experience = experiences[slug] || experiences.pesqueiro

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('${experience.heroImage}')` }}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-[#FF6600] font-semibold mb-2">Finalizar reserva</p>
          <h1 className="text-3xl font-bold text-[#003366] mb-3">
            {experience.title}
          </h1>
          <p className="text-gray-600 mb-4">{experience.location}</p>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-4">
            <Image
              src={experience.heroImage}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="rounded-2xl bg-[#FFF1E8] p-4 mb-4">
            <p className="text-sm text-gray-500 mb-1">Investimento</p>
            <p className="text-xl font-bold text-[#FF6600]">{experience.price}</p>
          </div>

          <p className="text-gray-600 leading-7">
            {experience.description}
          </p>
        </div>

        <div>
          <div className="space-y-4">
            <input className="w-full border rounded-lg p-3" placeholder="Nome completo" />
            <input className="w-full border rounded-lg p-3" placeholder="Email" />
            <input className="w-full border rounded-lg p-3" placeholder="Telefone / WhatsApp" />
            <input className="w-full border rounded-lg p-3" placeholder="Data da experiência" />
            <input className="w-full border rounded-lg p-3" placeholder="Número de viajantes" />
            <textarea className="w-full border rounded-lg p-3 min-h-[120px]" placeholder="Observações da reserva" />

            <button className="w-full bg-[#FF6600] text-white py-3 rounded-lg font-semibold hover:bg-[#e65c00]">
              Solicitar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
