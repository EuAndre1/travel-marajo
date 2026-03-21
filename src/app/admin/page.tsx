import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import {
  DocumentTextIcon,
  GlobeAltIcon,
  MapIcon,
  PhotoIcon,
  SparklesIcon,
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
    href: "/admin/experiences",
    title: "Experiencias",
    body: "Titulos, descricoes e imagem de referencia do catalogo.",
    icon: SparklesIcon,
  },
  {
    href: "/admin/packages",
    title: "Pacotes",
    body: "Roteiros, copy comercial e landing premium do pacote principal.",
    icon: MapIcon,
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
        description="Entrada unica para editar textos, organizar a biblioteca de midia e preparar atualizacoes do site sem depender de ajustes manuais no codigo."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Como operar</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">1. Editar</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Escolha a area do site, revise o texto atual e salve a nova versao no painel.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Como operar</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">2. Revisar</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Veja o texto atual do site ao lado do novo rascunho para evitar duvida na edicao.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Como operar</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">3. Publicar</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Onde a persistencia ja existe, o site usa o novo conteudo mantendo fallback seguro.
          </p>
        </div>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Atalhos</p>
            <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">
              O que voce pode fazer agora
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Comece pelas areas mais frequentes: homepage, conteudo geral e biblioteca de midia.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-slate-200"
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
