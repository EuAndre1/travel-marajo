import Image from "next/image"
import Link from "next/link"

export default function PackagesPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full bg-[#FFF1E8] px-4 py-2 text-sm font-medium text-[#FF6600] mb-4">
                Pacotes em destaque
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
                Pacotes de Viagem
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experiências selecionadas para viajantes que desejam viver o melhor da Ilha de Marajó.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="relative min-h-[320px] lg:min-h-[100%]">
                <Image
                  src="/pesqueiro-1.png"
                  alt="Praia do Pesqueiro"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-8 md:p-10">
                <span className="inline-flex items-center rounded-full bg-[#FFF1E8] px-3 py-1 text-sm font-medium text-[#FF6600] mb-4">
                  Oferta premium
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                  Praia do Pesqueiro
                </h2>

                <p className="text-gray-600 text-lg mb-6">
                  Uma das experiências mais emblemáticas de Soure, com paisagem marajoara, forte apelo fotográfico e conexão autêntica com a cultura local.
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Investimento</p>
                  <p className="text-2xl font-bold text-[#FF6600]">A partir de R$ 250 por pessoa</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/experiences/pesqueiro"
                    className="inline-flex items-center justify-center rounded-xl bg-[#003366] px-6 py-3 text-white font-semibold hover:bg-[#00264d] transition"
                  >
                    Ver detalhes
                  </Link>

                  <Link
                    href="/checkout?plan=pesqueiro-premium"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                  >
                    Reservar agora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
