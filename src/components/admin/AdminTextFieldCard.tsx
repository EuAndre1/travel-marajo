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
    "mt-3 w-full rounded-[1.1rem] border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#0B1C2C] focus:ring-4 focus:ring-[#0B1C2C]/10"

  return (
    <div
      className={`rounded-[1.45rem] border p-4 transition ${
        changed
          ? "border-amber-200 bg-amber-50/70"
          : "border-slate-200 bg-slate-50/80"
      }`}
    >
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

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)]">
        <div className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            No site agora
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#0B1C2C]">
            {liveValue || "Sem texto preenchido nesta parte do site."}
          </p>
        </div>

        <label className="block rounded-[1.2rem] border border-dashed border-slate-300 bg-white/85 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Editar agora
          </p>
          <p className="mt-2 text-sm font-semibold text-[#0B1C2C]">Nova versao deste texto</p>
          {multiline ? (
            <textarea
              className={`${inputClassName} min-h-[132px]`}
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
    </div>
  )
}
