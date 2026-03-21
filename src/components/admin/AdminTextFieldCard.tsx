"use client"

export default function AdminTextFieldCard({
  label,
  helper,
  liveValue,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string
  helper: string
  liveValue: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  const changed = liveValue !== value
  const inputClassName =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#0B1C2C]"

  return (
    <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-base font-semibold text-[#0B1C2C]">{label}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{helper}</p>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            changed ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {changed ? "Rascunho diferente do site" : "Igual ao site"}
        </span>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Valor atual no site
        </p>
        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#0B1C2C]">
          {liveValue || "Sem texto preenchido nesta superficie."}
        </p>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-[#0B1C2C]">Novo texto</span>
        {multiline ? (
          <textarea
            className={`${inputClassName} min-h-[120px]`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input
            className={inputClassName}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
          />
        )}
      </label>
    </div>
  )
}
