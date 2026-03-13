"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import SectionHeader from "@/components/home/SectionHeader"
import { getExperienceBySlug } from "@/data/experiencias"
import { getPackageBySlug } from "@/data/pacotes"

function buildWhatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  const normalized = number.replace(/\D/g, "")
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export default function CheckoutSuccessClient() {
  const params = useSearchParams()
  const slug = params.get("item")
  const type = params.get("type")

  const experience = slug ? getExperienceBySlug(slug) : null
  const packageItem = slug ? getPackageBySlug(slug) : null

  const itemName = type === "pacote" ? packageItem?.title : experience?.title

  const message = itemName
    ? `OlÃ¡! ConcluÃ­ o checkout da experiÃªncia/pacote: ${itemName}. Pode confirmar os prÃ³ximos passos?`
    : "OlÃ¡! ConcluÃ­ o checkout e gostaria de confirmar os prÃ³ximos passos da minha reserva."

  const whatsappLink = buildWhatsappLink(message)

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="Reserva confirmada"
              title="Pagamento aprovado. Estamos preparando sua experiÃªncia"
              subtitle="Nossa equipe concierge jÃ¡ recebeu seu pedido e entrarÃ¡ em contato para alinhar detalhes e logÃ­stica."
            />

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-600">
                {itemName ? `ExperiÃªncia/Pacote: ${itemName}` : "Seu pedido foi registrado com sucesso."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Continuar no WhatsApp
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">
                    Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` para habilitar o contato.
                  </span>
                )}
                <Link
                  href="/experiencias"
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition"
                >
                  Ver mais experiÃªncias
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
