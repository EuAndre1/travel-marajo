import type { ReactNode } from "react"

export default function AdminSectionCard({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-[1.6rem] border border-slate-200/80 bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>

      <div className="mt-5 space-y-4">{children}</div>
    </section>
  )
}
