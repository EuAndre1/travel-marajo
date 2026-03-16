import SectionHeader from "@/components/home/SectionHeader"
import { homeContent } from "@/data/homepage"
import { testimonials } from "@/data/depoimentos"

export default function PartnersPage() {
  const { partners } = homeContent

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Parceiros"
              title={partners.title}
              subtitle={partners.subtitle}
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.items.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#0B1C2C]">{partner.name}</div>
                    <div className="text-xs text-slate-500">{partner.type}</div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Parceiro</span>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <SectionHeader
                eyebrow="Prova social"
                title="Quem viaja com a Travel Marajó recomenda"
                subtitle="Depoimentos preparados para substituição por casos reais assim que disponíveis."
              />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                  <article key={item.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {item.country}  {item.destination}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">{item.name}</h3>
                    <p className="mt-3 text-sm text-slate-600">{item.quote}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
