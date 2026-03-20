"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

const adminLinks = [
  {
    href: "/admin",
    label: "Painel geral",
    description: "Visão rápida do estúdio e atalhos.",
  },
  {
    href: "/admin/homepage",
    label: "Homepage",
    description: "Hero, narrativa principal e CTA final.",
  },
  {
    href: "/admin/content",
    label: "Conteúdo global",
    description: "Marca, rótulos e frases estruturais.",
  },
  {
    href: "/admin/experiences",
    label: "Experiências",
    description: "Catálogo editorial e gestão futura.",
  },
  {
    href: "/admin/packages",
    label: "Pacotes",
    description: "Roteiros, posicionamento e apresentação.",
  },
  {
    href: "/admin/media",
    label: "Biblioteca de mídia",
    description: "Entrada para imagens e vídeos.",
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60">Admin Studio</p>
        <h2 className="mt-3 text-2xl font-display">Travel Marajó</h2>
        <p className="mt-3 text-sm leading-6 text-white/75">
          Ambiente protegido para operação editorial, mídia e organização de conteúdo.
        </p>

        <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">Conta autenticada</p>
          <p className="mt-2 text-sm font-semibold">{userName}</p>
          <p className="mt-1 text-sm text-white/70">{userEmail}</p>
          <p className="mt-3 text-xs leading-5 text-white/58">
            Este acesso admin esta liberado para a conta atual. Cada colaborador entra com o proprio
            login, e o email precisa estar autorizado em ADMIN_EMAILS.
          </p>
        </div>

        <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">Como liberar outro editor</p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            O fundador e colaboradores usam logins separados. Para permitir acesso ao Admin Studio,
            adicione o email da pessoa na variavel ADMIN_EMAILS do ambiente e ela podera entrar com
            a propria conta.
          </p>
        </div>
      </div>

      <nav className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid gap-2">
          {adminLinks.map((item) => {
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[1.25rem] px-4 py-3 transition ${
                  active
                    ? "bg-[#0B1C2C] text-white"
                    : "bg-slate-50 text-[#0B1C2C] hover:bg-slate-100"
                }`}
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className={`mt-1 text-xs leading-5 ${active ? "text-white/75" : "text-slate-500"}`}>
                  {item.description}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Ações rápidas</p>
        <div className="mt-4 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Ver site público
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c96815]"
          >
            Encerrar sessão
          </button>
        </div>
      </div>
    </aside>
  )
}
