"use client"

import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  ChartBarSquareIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MapIcon,
  PhotoIcon,
  RectangleGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

const adminLinks: Array<{
  href: string
  label: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}> = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Atalhos do estudio e leitura rapida do que pode ser operado.",
    icon: ChartBarSquareIcon,
  },
  {
    href: "/admin/homepage",
    label: "Homepage",
    description: "Primeira dobra, prova de confianca e chamada final.",
    icon: GlobeAltIcon,
  },
  {
    href: "/admin/content",
    label: "Site Content",
    description: "Marca, navegacao, rodape e frases compartilhadas.",
    icon: DocumentTextIcon,
  },
  {
    href: "/admin/experiences",
    label: "Experiencias",
    description: "Titulos, descricoes e imagem de referencia do catalogo.",
    icon: SparklesIcon,
  },
  {
    href: "/admin/packages",
    label: "Pacotes",
    description: "Jornadas, copy comercial e landing premium.",
    icon: MapIcon,
  },
  {
    href: "/admin/media",
    label: "Media Library",
    description: "Imagens persistidas, videos em preparo e selecao visual.",
    icon: PhotoIcon,
  },
]

function isActive(pathname: string | null, href: string) {
  if (!pathname) {
    return false
  }

  if (href === "/admin") {
    return pathname === href
  }

  return pathname.startsWith(href)
}

export default function AdminSidebar({
  userName,
  userEmail,
}: {
  userName: string
  userEmail: string
}) {
  const pathname = usePathname()

  return (
    <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
      <div className="rounded-[2rem] bg-[linear-gradient(145deg,#071521,#0B1C2C_56%,#10283d_100%)] p-6 text-white shadow-[0_24px_60px_rgba(11,28,44,0.18)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60">
          Admin Studio
        </p>
        <h2 className="mt-3 text-2xl font-display">Travel Marajo</h2>
        <p className="mt-3 text-sm leading-6 text-white/75">
          Estudio protegido para editar textos, organizar imagens e operar o conteudo do site com
          seguranca.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">Conta atual</p>
            <p className="mt-2 text-sm font-semibold">{userName}</p>
            <p className="mt-1 text-sm text-white/70">{userEmail}</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Como funciona o acesso
            </p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              O admin segue a conta logada. Quem estiver em ADMIN_EMAILS entra com o proprio login.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
          <div className="flex items-start gap-3">
            <RectangleGroupIcon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                Liberar outro colaborador
              </p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Adicione o email da pessoa em ADMIN_EMAILS. Ela usa o proprio login e recebe o
                mesmo acesso ao estudio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Navegacao do estudio
        </p>
        <div className="grid gap-2">
          {adminLinks.map((item) => {
            const active = isActive(pathname, item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.description}
                className={`rounded-[1.25rem] px-4 py-3 transition ${
                  active
                    ? "bg-[#0B1C2C] text-white"
                    : "bg-slate-50 text-[#0B1C2C] hover:bg-slate-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full ${
                      active ? "bg-white/10 text-white" : "bg-white text-[#0B1C2C]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div
                      className={`mt-1 text-xs leading-5 ${active ? "text-white/75" : "text-slate-500"}`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Acoes rapidas</p>
        <div className="mt-4 space-y-3">
          <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
            Os campos mostram o que esta no site e o novo rascunho. Assim o colaborador edita com
            mais confianca e menos duvida tecnica.
          </div>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Ver site publico
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#E57A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c96815]"
          >
            Encerrar sessao
          </button>
        </div>
      </div>
    </aside>
  )
}
