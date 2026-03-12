import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Praia do Pesqueiro | Travel Marajó",
  description: "Experiência premium na Praia do Pesqueiro, em Soure, Ilha de Marajó.",
}

const images = [
  "/pesqueiro-1.png",
  "/pesqueiro-2.png",
  "/pesqueiro-3.png",
  "/pesqueiro-4.png",
  "/pesqueiro-5.jpg",
  "/soure-bufalo.png",
]

export default function PesqueiroExperiencePage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/pesqueiro-1.png"
            alt="Praia do Pesqueiro"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/85" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white mb-4 backdrop-blur-sm">
              Experiência premium
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Praia do Pesqueiro
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              Uma das experiências mais emblemáticas do Marajó, com paisagem única, forte apelo visual, cultura local e a presença marcante dos búfalos em Soure.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
              <span className="rounded-full bg-white/10 px-4 py-2">Soure • Ilha de Marajó</span>
              <span className="rounded-full bg-[#FF6600] px-4 py-2 text-white">A partir de R$ 250 por pessoa</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/checkout?plan=pesqueiro-premium"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              >
                Reservar agora
              </Link>

              <Link
                href="/packages"
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-[#003366] transition"
              >
                Ver pacotes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                  Uma experiência de alto valor visual e emocional
                </h2>

                <p className="text-gray-600 text-lg leading-8 mb-8">
                  A Praia do Pesqueiro é um dos cenários mais desejados do Marajó. Areia ampla, mar, cultura local e a experiência única de ver búfalos integrados à paisagem fazem deste destino uma escolha premium para viajantes que buscam algo autêntico na Amazônia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium">Praia icônica de Soure</div>
                  <div className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium">Experiência com búfalos</div>
                  <div className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium">Paisagem autêntica do Marajó</div>
                  <div className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium">Pôr do sol inesquecível</div>
                </div>

                <h3 className="text-2xl font-bold text-[#003366] mb-4">
                  Galeria
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                      <Image
                        src={img}
                        alt={`Praia do Pesqueiro ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl border border-gray-200 shadow-xl p-6 bg-white">
                  <p className="text-sm text-gray-500 mb-2">Experiência</p>
                  <h3 className="text-2xl font-bold text-[#003366] mb-2">
                    Praia do Pesqueiro
                  </h3>
                  <p className="text-gray-600 mb-4">Soure • Ilha de Marajó</p>

                  <div className="rounded-2xl bg-[#FFF1E8] p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Investimento</p>
                    <p className="text-xl font-bold text-[#FF6600]">A partir de R$ 250 por pessoa</p>
                  </div>

                  <Link
                    href="/checkout?plan=pesqueiro-premium"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                  >
                    Continuar para reserva
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
