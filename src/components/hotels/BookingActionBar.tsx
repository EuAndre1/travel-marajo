"use client"

export default function BookingActionBar({
  totalLabel,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  onPrimaryAction,
  primaryLoading = false,
  primaryDisabled = false,
  helperText,
}: {
  totalLabel: string
  primaryLabel: string
  secondaryLabel: string
  secondaryHref: string
  onPrimaryAction: () => void
  primaryLoading?: boolean
  primaryDisabled?: boolean
  helperText?: string
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[1.7rem] border border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-10px_40px_rgba(15,23,42,0.16)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Total estimado
          </p>
          <p className="mt-1 text-2xl font-semibold text-[#0B1C2C]">{totalLabel}</p>
          {helperText ? (
            <p className="mt-1 text-xs leading-5 text-slate-500">{helperText}</p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:min-w-[420px] md:flex-row">
          <button
            type="button"
            onClick={onPrimaryAction}
            disabled={primaryDisabled || primaryLoading}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {primaryLoading ? "Preparando checkout..." : primaryLabel}
          </button>

          <a
            href={secondaryHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
