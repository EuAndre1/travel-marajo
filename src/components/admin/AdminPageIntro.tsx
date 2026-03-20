import type { ReactNode } from "react"

export default function AdminPageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-display leading-tight text-[#0B1C2C] sm:text-4xl">{title}</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </div>
  )
}
