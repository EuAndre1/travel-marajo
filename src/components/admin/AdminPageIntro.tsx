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
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white/95 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-[1.9rem] font-display leading-tight text-[#0B1C2C] sm:text-[2.35rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            {description}
          </p>
        </div>
        {actions ? <div className="shrink-0 self-start lg:self-center">{actions}</div> : null}
      </div>
    </div>
  )
}
