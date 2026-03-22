"use client"

import Link from "next/link"
import type { ComponentType, SVGProps } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  ChartBarSquareIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HomeModernIcon,
  MapIcon,
  PhotoIcon,
  RectangleGroupIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"

const adminLinks: Array<{
  href: string
  label: string
  description: string
  section: "overview" | "content" | "collections" | "library"
  icon: ComponentType<SVGProps<SVGSVGElement>>
}> = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Atalhos do estudio e leitura rapida do que pode ser operado.",
    section: "overview",
    icon: ChartBarSquareIcon,
  },
  {
    href: "/admin/homepage",
    label: "Homepage",
    description: "Primeira dobra, prova de confianca e chamada final.",
    section: "content",
    icon: GlobeAltIcon,
  },
  {
    href: "/admin/content",
    label: "Site Content",
    description: "Marca, navegacao, rodape e frases compartilhadas.",
    section: "content",
    icon: DocumentTextIcon,
  },
  {
    href: "/admin/destinations",
    label: "Destinations",
    description: "Cards de destinos com imagem, texto, CTA e visibilidade.",
    section: "collections",
    icon: RectangleGroupIcon,
  },
  {
    href: "/admin/experiences",
    label: "Experiencias",
    description: "Titulos, descricoes e imagem de referencia do catalogo.",
    section: "collections",
    icon: SparklesIcon,
  },
  {
    href: "/admin/packages",
    label: "Pacotes",
    description: "Cards de roteiros, jornadas e copy comercial dos pacotes.",
    section: "collections",
    icon: MapIcon,
  },
  {
    href: "/admin/hotels",
    label: "Partner Hotels",
    description: "Cards de hospedagem parceira com imagem e CTA.",
    section: "collections",
    icon: HomeModernIcon,
  },
  {
    href: "/admin/services",
    label: "Services",
    description: "Cards de servicos com imagem, preco e CTA.",
    section: "collections",
    icon: WrenchScrewdriverIcon,
  },
  {
    href: "/admin/media",
    label: "Media Library",
    description: "Imagens persistidas, videos em preparo e selecao visual.",
    section: "library",
    icon: PhotoIcon,
  },
]

const sections = [
  { key: "overview", label: "Visao geral" },
  { key: "content", label: "Textos e estrutura" },
  { key: "collections", label: "Cards e vitrines" },
  { key: "library", label: "Biblioteca visual" },
] as const

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
    <aside className="relative z-20 pointer-events-auto xl:sticky xl:top-4 xl:h-fit">
      <div className="rounded-[1.6rem] border border-slate-200/90 bg-white/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="rounded-[1.35rem] bg-[linear-gradient(145deg,#071521,#0B1C2C_56%,#10283d_100%)] px-4 py-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
            Admin Studio
          </p>
          <h2 className="mt-2 text-2xl font-display">Travel Marajo</h2>
          <p className="mt-2 text-sm leading-6 text-white/76">
            Edite o site com blocos visuais, imagens e cards sem depender de telas tecnicas.
          </p>
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-slate-200 bg-slate-50/85 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Conta atual
          </p>
          <p className="mt-2 text-sm font-semibold text-[#0B1C2C]">{userName}</p>
          <p className="mt-1 text-sm text-slate-500">{userEmail}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            O acesso do admin segue esta conta. Para liberar outro colaborador, adicione o email
            dele em <strong>ADMIN_EMAILS</strong>.
          </p>
        </div>

        <nav className="mt-4 space-y-4">
          {sections.map((section) => {
            const links = adminLinks.filter((item) => item.section === section.key)

            return (
              <div key={section.key}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {section.label}
                </p>
                <div className="mt-2 space-y-1.5">
                  {links.map((item) => {
                    const active = isActive(pathname, item.href)
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.description}
                        className={`group block rounded-[1.1rem] border px-3 py-3 transition ${
                          active
                            ? "border-[#0B1C2C] bg-[#0B1C2C] text-white shadow-[0_10px_24px_rgba(11,28,44,0.16)]"
                            : "border-slate-200 bg-white text-[#0B1C2C] hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              active
                                ? "bg-white/10 text-white"
                                : "bg-slate-100 text-[#0B1C2C] group-hover:bg-white"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">{item.label}</div>
                            <div className={`mt-1 text-xs leading-5 ${active ? "text-white/75" : "text-slate-500"}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="mt-5 grid gap-2">
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
            Sair do admin
          </button>
        </div>
      </div>
    </aside>
  )
}
