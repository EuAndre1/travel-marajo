import Link from "next/link"
import AdminPageIntro from "@/components/admin/AdminPageIntro"

const quickLinks = [
  {
    href: "/admin/homepage",
    title: "Homepage",
    body: "Entrada segura para hero, prova de confiança e CTA final.",
  },
  {
    href: "/admin/content",
    title: "Conteúdo global",
    body: "Marca, navegação, frases institucionais e mensagens estruturais.",
  },
  {
    href: "/admin/experiences",
    title: "Experiências",
    body: "Ponto de partida para catálogo editorial e futuras edições.",
  },
  {
    href: "/admin/packages",
    title: "Pacotes",
    body: "Base segura para operar jornadas e ofertas principais.",
  },
  {
    href: "/admin/media",
    title: "Biblioteca de mídia",
    body: "Entrada planejada para fotos, vídeos e organização visual.",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Painel administrativo"
        title="Admin Studio da Travel Marajó"
        description="Acesso central para o ambiente de administração do projeto. Esta primeira fase entrega shell protegido, navegação interna e pontos de entrada prontos para os módulos de edição."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Acesso</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">Admin</p>
          <p className="mt-2 text-sm text-slate-500">Proteção reaproveitando o `session.user.isAdmin` já existente.</p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Rotas</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">6</p>
          <p className="mt-2 text-sm text-slate-500">Dashboard + 5 seções preparadas para o próximo pass.</p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Escopo desta fase</p>
          <p className="mt-3 text-3xl font-display text-[#0B1C2C]">Shell</p>
          <p className="mt-2 text-sm text-slate-500">Sem uploads, sem CMS completo e sem alterar rotas públicas.</p>
        </div>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Atalhos</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-slate-200"
            >
              <h2 className="text-lg font-semibold text-[#0B1C2C]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#0B1C2C]">Abrir seção</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
