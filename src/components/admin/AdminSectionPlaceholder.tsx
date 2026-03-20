import Link from "next/link"
import AdminPageIntro from "@/components/admin/AdminPageIntro"

export default function AdminSectionPlaceholder({
  eyebrow,
  title,
  description,
  routeLabel,
}: {
  eyebrow: string
  title: string
  description: string
  routeLabel: string
}) {
  return (
    <div className="space-y-6">
      <AdminPageIntro eyebrow={eyebrow} title={title} description={description} />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Status da seção</p>
        <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">Rota criada e protegida</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Esta etapa entrega o shell real do Admin Studio: acesso protegido, navegação estável e destino pronto para a fase seguinte de formulários e persistência. Nenhuma lógica pública foi alterada neste pass.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-sm font-semibold text-[#0B1C2C]">O que já está pronto</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>Proteção por sessão admin</li>
              <li>Entrada pela rota {routeLabel}</li>
              <li>Navegação lateral integrada</li>
              <li>Base pronta para o editor da próxima fase</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-sm font-semibold text-[#0B1C2C]">Próximo passo seguro</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A próxima fase pode se concentrar apenas nos formulários dessa área, sem reabrir a camada de autenticação nem a estrutura de navegação.
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-flex rounded-full border border-[#0B1C2C]/15 px-4 py-2.5 text-sm font-semibold text-[#0B1C2C] transition hover:border-[#0B1C2C]"
            >
              Voltar ao painel geral
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
