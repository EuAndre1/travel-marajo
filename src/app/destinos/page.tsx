import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { destinations } from "@/data/destinos"

export default function DestinationsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Destinos"
              title="Bases estratÃ©gicas para explorar o MarajÃ³"
              subtitle="Escolha sua base e conecte experiÃªncias, hospedagens e logÃ­stica com curadoria local."
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map((destination) => (
                <article
                  key={destination.slug}
                  className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="relative h-56 sm:h-64">
                    <Image
                      src={destination.heroImage}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/70 via-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {destination.tagline}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0B1C2C]">
                      {destination.name}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600">
                      {destination.overview}
                    </p>
                    <Link
                      href={`/destinos/${destination.slug}`}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-primary"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
