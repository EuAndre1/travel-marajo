import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { homeContent } from "@/data/homepage"

export default function GuidePage() {
  const { travelGuide } = homeContent

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Guia"
              title={travelGuide.title}
              subtitle={travelGuide.subtitle}
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {travelGuide.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {item.tag}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[#0B1C2C]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.readTime} de leitura</span>
                    <Link href="/planejar-viagem" className="text-primary font-semibold">
                      Planejar viagem
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
