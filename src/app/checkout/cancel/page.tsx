import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"

export default function CheckoutCancelPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="Checkout cancelado"
              title="Nenhum pagamento foi processado"
              subtitle="Se precisar de ajuda para finalizar sua reserva, nosso concierge pode acompanhar todo o processo."
            />

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/experiencias"
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                >
                  Voltar para experiÃªncias
                </Link>
                <Link
                  href="/planejar-viagem"
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-[#003366] font-semibold hover:bg-[#003366] hover:text-white transition"
                >
                  Falar com concierge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
