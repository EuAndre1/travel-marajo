import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import {
  DocumentTextIcon,
  GlobeAltIcon,
  HomeModernIcon,
  MapIcon,
  PhotoIcon,
  RectangleGroupIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import AdminPageIntro from "@/components/admin/AdminPageIntro"

const quickLinks: Array<{
  href: string
  title: string
  body: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}> = [
  {
    href: "/admin/homepage",
    title: "Homepage",
    body: "Hero, prova de confianca e a primeira decisao do visitante.",
    icon: GlobeAltIcon,
  },
  {
    href: "/admin/content",
    title: "Site Content",
    body: "Marca, navegacao, rodape e frases usadas em varias paginas.",
    icon: DocumentTextIcon,
  },
  {
    href: "/admin/destinations",
    title: "Destinations",
    body: "Cards de destinos com imagem, CTA, ordem e visibilidade.",
    icon: RectangleGroupIcon,
  },
  {
    href: "/admin/experiences",
    title: "Experiencias",
    body: "Titulos, descricoes e imagem de referencia do catalogo.",
    icon: SparklesIcon,
  },
  {
    href: "/admin/packages",
    title: "Pacotes",
    body: "Cards de roteiros, copy comercial e landing premium do pacote principal.",
    icon: MapIcon,
  },
  {
    href: "/admin/hotels",
    title: "Partner Hotels",
    body: "Cards de hospedagens parceiras com imagem, preco e CTA.",
    icon: HomeModernIcon,
  },
  {
    href: "/admin/services",
    title: "Services",
    body: "Cards de servicos com imagem, preco e destino do botao.",
    icon: WrenchScrewdriverIcon,
  },
  {
    href: "/admin/media",
    title: "Media Library",
    body: "Imagens persistidas, videos em preparo e biblioteca visual.",
    icon: PhotoIcon,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Painel administrativo"
        title="Admin Studio da Travel Marajo"
        description="Escolha a parte do site que voce quer atualizar e trabalhe em blocos visuais parecidos com a vitrine publica."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["1. Escolha", "Abra a area do site que quer editar."],
          ["2. Ajuste", "Troque texto, imagem e visibilidade no proprio bloco."],
          ["3. Salve", "Publique as mudancas quando terminar a revisao."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold text-[#0B1C2C]">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
          </div>
        ))}
      </div>

      <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Atalhos</p>
            <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">Abrir um bloco do site</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Comece pelo que muda mais no dia a dia: homepage, cards comerciais e biblioteca de imagem.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.35rem] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B1C2C] shadow-sm">
                  <item.icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-[#0B1C2C]">{item.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#0B1C2C]">
                Abrir secao
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
