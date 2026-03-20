"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import {
  adminMediaInitialDraft,
  type AdminMediaDraftItem,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-media-draft"

function formatFileSize(sizeBytes: number) {
  if (sizeBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
}

function createMediaId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function buildDisplayName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}

function MediaField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}) {
  const className =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"

  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#0B1C2C]">{label}</span>
      {multiline ? (
        <textarea
          className={`${className} min-h-[120px]`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={className}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  )
}

function EmptyPreview({ kind }: { kind: "image" | "video" }) {
  return (
    <div className="flex h-full min-h-[180px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 text-center text-sm leading-6 text-slate-500">
      <div className="max-w-[240px] px-6">
        <p className="font-semibold text-slate-600">
          {kind === "image" ? "Imagem sem preview" : "Video sem preview"}
        </p>
        <p className="mt-2">
          O rascunho salvo manteve apenas os metadados. Reenvie o arquivo neste navegador para ver a
          previa novamente.
        </p>
      </div>
    </div>
  )
}

function MediaCard({
  item,
  previewUrl,
  selected,
  onSelect,
}: {
  item: AdminMediaDraftItem
  previewUrl?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`overflow-hidden rounded-[1.65rem] border text-left transition ${
        selected
          ? "border-[#0B1C2C] bg-[#0B1C2C] text-white shadow-[0_20px_40px_rgba(11,28,44,0.16)]"
          : "border-slate-200 bg-white text-[#0B1C2C] hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="relative h-44 overflow-hidden">
        {previewUrl ? (
          item.kind === "image" ? (
            <img src={previewUrl} alt={item.displayName} className="h-full w-full object-cover" />
          ) : (
            <video src={previewUrl} className="h-full w-full object-cover" muted playsInline />
          )
        ) : (
          <EmptyPreview kind={item.kind} />
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
          <span className={selected ? "text-white/70" : "text-slate-400"}>
            {item.kind === "image" ? "Imagem" : "Video"}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
              selected ? "bg-white/10 text-white" : "bg-amber-100 text-amber-800"
            }`}
          >
            Rascunho local
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6">{item.displayName || item.fileName}</p>
        <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
          {formatFileSize(item.sizeBytes)} • {item.fileName}
        </p>
      </div>
    </button>
  )
}

export default function MediaStudioEditor() {
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const videoInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})
  const [selectedId, setSelectedId] = useState("")
  const { draft, setDraft, saveDraft, resetDraft, exportDraft, savedAtLabel, statusMessage } =
    useAdminDraft(STORAGE_KEY, adminMediaInitialDraft)

  const selectedItem = useMemo(
    () => draft.items.find((item) => item.id === selectedId) ?? draft.items[0],
    [draft.items, selectedId],
  )

  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const clearAllPreviewUrls = () => {
    Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url))
    setPreviewUrls({})
  }

  const queueFiles = (files: FileList | null, kind: "image" | "video") => {
    if (!files || files.length === 0) {
      return
    }

    const nextItems: AdminMediaDraftItem[] = []
    const nextPreviewUrls: Record<string, string> = {}

    Array.from(files).forEach((file) => {
      const id = createMediaId()

      nextItems.push({
        id,
        kind,
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        displayName: buildDisplayName(file.name),
        usageNote: "",
        persisted: false,
        addedAt: new Date().toISOString(),
      })

      nextPreviewUrls[id] = URL.createObjectURL(file)
    })

    setDraft((current) => ({
      ...current,
      items: [...nextItems, ...current.items],
    }))
    setPreviewUrls((current) => ({
      ...current,
      ...nextPreviewUrls,
    }))
    setSelectedId(nextItems[0]?.id ?? selectedId)
  }

  const updateSelectedField = (field: "displayName" | "usageNote", value: string) => {
    if (!selectedItem) {
      return
    }

    setDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }))
  }

  const removeSelectedItem = () => {
    if (!selectedItem) {
      return
    }

    const previewUrl = previewUrls[selectedItem.id]
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setDraft((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== selectedItem.id),
    }))
    setPreviewUrls((current) => {
      const next = { ...current }
      delete next[selectedItem.id]
      return next
    })
    setSelectedId("")
  }

  const handleReset = () => {
    clearAllPreviewUrls()
    setSelectedId("")
    resetDraft()
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Midia"
        title="Biblioteca de midia em modo seguro"
        description="Envie imagens e videos para montar uma biblioteca operacional de rascunho. Nesta fase, a tela serve para selecionar, visualizar, nomear e organizar arquivos sem publicar nada ao vivo."
      />

      <AdminDraftToolbar
        savedAtLabel={savedAtLabel}
        statusMessage={statusMessage}
        scopeNote="Os uploads abaixo nao sao publicados nem armazenados permanentemente no projeto. O salvar grava apenas um rascunho local com metadados; a previa binaria fica disponivel somente nesta sessao do navegador."
        onSave={saveDraft}
        onExport={() => exportDraft("travel-marajo-media-draft.json")}
        onReset={handleReset}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr),360px]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Entrada de arquivos</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
              >
                Selecionar imagens
              </button>
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full border border-[#0B1C2C]/15 px-5 py-3 text-sm font-semibold text-[#0B1C2C] transition hover:border-[#0B1C2C]"
              >
                Selecionar videos
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Imagens e videos podem ser enviados para revisao visual. Nesta etapa, o navegador
              mostra a previa e guarda somente metadados no rascunho local.
            </p>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                queueFiles(event.target.files, "image")
                event.target.value = ""
              }}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={(event) => {
                queueFiles(event.target.files, "video")
                event.target.value = ""
              }}
            />
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Biblioteca</p>
                <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">Itens carregados</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {draft.items.length} item(ns)
              </span>
            </div>

            {draft.items.length === 0 ? (
              <div className="mt-6 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Nenhum arquivo foi carregado neste navegador ainda. Comece por imagens ou videos para
                montar uma biblioteca de rascunho.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {draft.items.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    previewUrl={previewUrls[item.id]}
                    selected={item.id === selectedItem?.id}
                    onSelect={() => setSelectedId(item.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Como funciona agora</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>Os arquivos ficam em modo de rascunho local.</li>
              <li>Salvar grava apenas nome, tipo, tamanho e observacoes neste navegador.</li>
              <li>A previa visual some se o arquivo nao for reenviado nesta sessao.</li>
              <li>Nada e publicado no site publico a partir desta tela.</li>
            </ul>
          </section>

          {selectedItem ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Item selecionado</p>
              <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">
                {selectedItem.displayName || selectedItem.fileName}
              </h2>
              <div className="mt-4 space-y-5">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                  {previewUrls[selectedItem.id] ? (
                    selectedItem.kind === "image" ? (
                      <img
                        src={previewUrls[selectedItem.id]}
                        alt={selectedItem.displayName || selectedItem.fileName}
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <video
                        src={previewUrls[selectedItem.id]}
                        controls
                        playsInline
                        className="h-56 w-full object-cover"
                      />
                    )
                  ) : (
                    <EmptyPreview kind={selectedItem.kind} />
                  )}
                </div>

                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Arquivo:</span> {selectedItem.fileName}
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Tipo:</span>{" "}
                    {selectedItem.kind === "image" ? "Imagem" : "Video"} • {selectedItem.mimeType}
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Tamanho:</span>{" "}
                    {formatFileSize(selectedItem.sizeBytes)}
                  </div>
                </div>

                <MediaField
                  label="Nome amigavel"
                  value={selectedItem.displayName}
                  onChange={(value) => updateSelectedField("displayName", value)}
                />
                <MediaField
                  label="Observacao de uso"
                  value={selectedItem.usageNote}
                  onChange={(value) => updateSelectedField("usageNote", value)}
                  multiline
                />

                <button
                  type="button"
                  onClick={removeSelectedItem}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                >
                  Remover item do rascunho
                </button>
              </div>
            </section>
          ) : (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Item selecionado</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Selecione um item da biblioteca para revisar a previa, renomear e registrar uma
                observacao de uso.
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
