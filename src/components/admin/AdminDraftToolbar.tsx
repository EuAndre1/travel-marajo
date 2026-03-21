"use client"

export default function AdminDraftToolbar({
  saveLabel = "Salvar rascunho",
  exportLabel = "Exportar JSON",
  resetLabel = "Resetar rascunho",
  savedAtLabel,
  statusMessage,
  scopeNote,
  hasUnsavedChanges = false,
  persistState = "idle",
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
  hasUnsavedChanges?: boolean
  persistState?: "idle" | "saving" | "success" | "error"
  onSave: () => void
  onExport: () => void
  onReset: () => void
}) {
  const statusTone =
    persistState === "error"
      ? "bg-rose-100 text-rose-700"
      : persistState === "saving"
        ? "bg-sky-100 text-sky-700"
        : hasUnsavedChanges
          ? "bg-amber-100 text-amber-800"
          : persistState === "success"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-600"

  const statusLabel =
    persistState === "error"
      ? "Falha ao salvar no site"
      : persistState === "saving"
          ? "Salvando agora"
      : hasUnsavedChanges
        ? "Alteracoes pendentes"
        : persistState === "success"
          ? "Salvo com sucesso"
          : "Sem alteracoes pendentes"

  return (
    <div className="sticky top-4 z-20 rounded-[1.75rem] border border-amber-200 bg-amber-50/95 p-5 shadow-[0_14px_36px_rgba(175,98,24,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-amber-900">Fluxo seguro de edicao</p>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone}`}>
              {statusLabel}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-amber-900/85">{scopeNote}</p>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-amber-900/70">
            <span>
              {savedAtLabel
                ? `Ultimo rascunho salvo neste navegador: ${savedAtLabel}`
                : "Nenhum rascunho salvo ainda neste navegador."}
            </span>
            <span>
              {hasUnsavedChanges
                ? "Ha alteracoes prontas para revisao e publicacao."
                : "O editor esta alinhado com a ultima versao salva."}
            </span>
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
