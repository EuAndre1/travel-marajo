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
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">{title}</h2>
          {description ? (
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>

      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}
