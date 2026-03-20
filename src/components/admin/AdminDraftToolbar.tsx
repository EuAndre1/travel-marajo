"use client"

export default function AdminDraftToolbar({
  saveLabel = "Salvar rascunho",
  exportLabel = "Exportar JSON",
  resetLabel = "Resetar rascunho",
  savedAtLabel,
  statusMessage,
  scopeNote,
  onSave,
  onExport,
  onReset,
}: {
  saveLabel?: string
  exportLabel?: string
  resetLabel?: string
  savedAtLabel: string | null
  statusMessage: string
  scopeNote: string
  onSave: () => void
  onExport: () => void
  onReset: () => void
}) {
  return (
    <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50/80 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-900">Fluxo seguro de edição</p>
          <p className="mt-2 text-sm leading-6 text-amber-900/85">{scopeNote}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-amber-900/70">
            <span>{savedAtLabel ? `Último save local: ${savedAtLabel}` : "Sem save local neste navegador."}</span>
            {statusMessage ? <span>{statusMessage}</span> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
          >
            {saveLabel}
          </button>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center justify-center rounded-full border border-[#0B1C2C]/15 px-4 py-2.5 text-sm font-semibold text-[#0B1C2C] transition hover:border-[#0B1C2C]"
          >
            {exportLabel}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
          >
            {resetLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
