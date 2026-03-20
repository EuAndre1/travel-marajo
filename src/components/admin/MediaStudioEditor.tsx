"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import {
  MAX_MEDIA_IMAGE_BYTES,
  type MediaAssetItem,
  type MediaStorageStatus,
} from "@/lib/media-library/shared"

function formatFileSize(sizeBytes: number) {
  if (sizeBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

function resolveUiMessage(rawMessage: string | null | undefined, fallback: string) {
  if (!rawMessage) {
    return fallback
  }

  switch (rawMessage) {
    case "AUTH_REQUIRED":
      return "Sua sessao expirou. Entre novamente para continuar."
    case "ADMIN_REQUIRED":
      return "Esta conta nao tem permissao para usar a biblioteca de midia."
    case "FILE_REQUIRED":
      return "Selecione uma imagem antes de enviar."
    default:
      return rawMessage
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-[180px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 text-center text-sm leading-6 text-slate-500">
      <div className="max-w-[240px] px-6">
        <p className="font-semibold text-slate-600">Nenhuma imagem selecionada</p>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  )
}

function MediaCard({
  item,
  selected,
  onSelect,
}: {
  item: MediaAssetItem
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
        <img src={item.url} alt={item.alt ?? item.filename} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
          <span className={selected ? "text-white/70" : "text-slate-400"}>Imagem</span>
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
              selected ? "bg-white/10 text-white" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            Persistida
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6">{item.alt || item.filename}</p>
        <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
          {item.filename}
        </p>
      </div>
    </button>
  )
}

export default function MediaStudioEditor() {
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<MediaAssetItem[]>([])
  const [storage, setStorage] = useState<MediaStorageStatus | null>(null)
  const [selectedId, setSelectedId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [altText, setAltText] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0] ?? null,
    [items, selectedId],
  )

  const reloadMedia = async () => {
    setIsLoading(true)
    setLoadError("")

    try {
      const response = await fetch("/api/admin/media", {
        cache: "no-store",
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          resolveUiMessage(result?.message ?? result?.error, "Nao foi possivel carregar a biblioteca."),
        )
      }

      const nextItems = Array.isArray(result?.items) ? result.items : []
      setItems(nextItems)
      setStorage(result?.storage ?? null)
      setSelectedId((current) => current || nextItems[0]?.id || "")
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar a biblioteca de midia.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void reloadMedia()
  }, [])

  const resetUploadState = () => {
    setSelectedFile(null)
    setAltText("")
    setUploadProgress(0)
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const uploadSelectedFile = async () => {
    if (!selectedFile) {
      setActionMessage("Selecione uma imagem antes de enviar.")
      return
    }

    setIsUploading(true)
    setActionMessage("")
    setUploadProgress(0)

    const payload = new FormData()
    payload.append("file", selectedFile)
    if (altText.trim()) {
      payload.append("alt", altText.trim())
    }

    try {
      const result = await new Promise<{ item: MediaAssetItem }>((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("POST", "/api/admin/media/upload")
        xhr.responseType = "json"

        xhr.upload.onprogress = (event) => {
          if (!event.lengthComputable) {
            return
          }

          setUploadProgress(Math.round((event.loaded / event.total) * 100))
        }

        xhr.onload = () => {
          const response = xhr.response

          if (xhr.status >= 200 && xhr.status < 300 && response?.item) {
            resolve(response)
            return
          }

          reject(
            new Error(
              resolveUiMessage(
                response?.message ?? response?.error,
                "Nao foi possivel concluir o upload da imagem.",
              ),
            ),
          )
        }

        xhr.onerror = () => {
          reject(new Error("Falha de rede ao enviar a imagem."))
        }

        xhr.send(payload)
      })

      setItems((current) => [result.item, ...current])
      setSelectedId(result.item.id)
      setActionMessage("Imagem enviada com sucesso para o storage persistente.")
      resetUploadState()
      setUploadProgress(100)
    } catch (error) {
      setActionMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel concluir o upload da imagem.",
      )
    } finally {
      setIsUploading(false)
    }
  }

  const deleteSelectedItem = async () => {
    if (!selectedItem) {
      return
    }

    const confirmed = window.confirm(
      "Remover esta imagem da biblioteca? A exclusao apaga o registro persistido.",
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setActionMessage("")

    try {
      const response = await fetch(`/api/admin/media/${selectedItem.id}`, {
        method: "DELETE",
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          resolveUiMessage(
            result?.message ?? result?.error,
            "Nao foi possivel remover a imagem agora.",
          ),
        )
      }

      setItems((current) => current.filter((item) => item.id !== selectedItem.id))
      setSelectedId("")
      setActionMessage("Imagem removida da biblioteca.")
    } catch (error) {
      setActionMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel remover a imagem agora.",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const copySelectedUrl = async () => {
    if (!selectedItem) {
      return
    }

    try {
      await navigator.clipboard.writeText(selectedItem.url)
      setActionMessage("URL copiada. Voce ja pode reutilizar a imagem nos campos do admin.")
    } catch {
      setActionMessage("Nao foi possivel copiar a URL automaticamente.")
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Midia"
        title="Biblioteca de midia persistente"
        description="Envie imagens reais para o storage persistente do projeto, organize a biblioteca visual e copie URLs para reaproveitar nos editores de homepage, experiencias e pacotes."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr),360px]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Upload real</p>
                <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">Nova imagem da biblioteca</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Esta area salva imagens em storage persistente. Cada item ganha URL publica, pode
                  ser copiado e reutilizado em varias superficies do site.
                </p>
              </div>
              <div
                className={`rounded-[1.25rem] px-4 py-3 text-sm ${
                  storage?.configured
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}
              >
                {storage?.note ?? "Carregando status do storage..."}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr),220px]">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-[#0B1C2C]">Arquivo de imagem</span>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                    >
                      Escolher imagem
                    </button>
                    {selectedFile ? (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        {selectedFile.name}
                      </span>
                    ) : null}
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#0B1C2C]">Texto alternativo (opcional)</span>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"
                    value={altText}
                    onChange={(event) => setAltText(event.target.value)}
                    placeholder="Ex.: Bufalos na fazenda ao entardecer"
                  />
                </label>

                <div className="rounded-[1.5rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  <p>
                    Formatos aceitos: JPG, PNG, WEBP, GIF e AVIF. Limite atual por arquivo:{" "}
                    {formatFileSize(storage?.maxFileSizeBytes ?? MAX_MEDIA_IMAGE_BYTES)}.
                  </p>
                  <p className="mt-2">
                    O upload nao publica a imagem automaticamente em nenhuma pagina. Ele apenas cria
                    uma URL reutilizavel dentro do Admin Studio.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Envio</p>
                <div className="mt-4 space-y-4">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#0B1C2C] transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600">
                    {isUploading ? `Upload em andamento: ${uploadProgress}%` : "Aguardando envio."}
                  </p>
                  <button
                    type="button"
                    onClick={uploadSelectedFile}
                    disabled={!selectedFile || !storage?.configured || isUploading}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#E57A1F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {isUploading ? "Enviando..." : "Enviar para biblioteca"}
                  </button>
                </div>
              </div>
            </div>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={(event) => {
                setSelectedFile(event.target.files?.[0] ?? null)
                setActionMessage("")
              }}
            />

            {actionMessage ? (
              <div className="mt-4 rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm text-slate-700">
                {actionMessage}
              </div>
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Biblioteca</p>
                <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">Imagens persistidas</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {items.length} item(ns)
              </span>
            </div>

            {isLoading ? (
              <div className="mt-6 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Carregando biblioteca de midia...
              </div>
            ) : loadError ? (
              <div className="mt-6 rounded-[1.6rem] border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm leading-7 text-rose-700">
                {loadError}
              </div>
            ) : items.length === 0 ? (
              <div className="mt-6 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Nenhuma imagem persistida ainda. Envie a primeira imagem para construir a biblioteca
                compartilhada do projeto.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
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
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Como usar a biblioteca</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>Envie a imagem uma unica vez para gerar uma URL publica persistente.</li>
              <li>Selecione um item da grade para copiar a URL e reutilizar em outros editores.</li>
              <li>Excluir remove o item da biblioteca e apaga o registro persistido.</li>
              <li>As imagens nao entram automaticamente no site ate serem referenciadas por algum conteudo.</li>
            </ul>
          </section>

          {selectedItem ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Item selecionado</p>
              <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">
                {selectedItem.alt || selectedItem.filename}
              </h2>
              <div className="mt-4 space-y-5">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.alt || selectedItem.filename}
                    className="h-56 w-full object-cover"
                  />
                </div>

                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Arquivo:</span> {selectedItem.filename}
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Tipo:</span> Imagem persistida
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Enviado por:</span>{" "}
                    {selectedItem.uploadedBy}
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Criado em:</span>{" "}
                    {formatDate(selectedItem.createdAt)}
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-[#0B1C2C]">Alt:</span>{" "}
                    {selectedItem.alt || "Sem texto alternativo"}
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-[#0B1C2C]">URL publica</span>
                  <div className="mt-2 flex gap-3">
                    <input
                      readOnly
                      value={selectedItem.url}
                      className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                    />
                    <button
                      type="button"
                      onClick={copySelectedUrl}
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#0B1C2C]/15 px-4 py-2.5 text-sm font-semibold text-[#0B1C2C] transition hover:border-[#0B1C2C]"
                    >
                      Copiar URL
                    </button>
                  </div>
                </label>

                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  Abrir imagem em nova aba
                </a>

                <button
                  type="button"
                  onClick={deleteSelectedItem}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? "Removendo..." : "Excluir imagem"}
                </button>
              </div>
            </section>
          ) : (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Item selecionado</p>
              <EmptyState message="Selecione uma imagem da grade para copiar a URL, revisar detalhes ou excluir o item." />
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
