"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import {
  ArrowPathIcon,
  CheckCircleIcon,
  FilmIcon,
  PhotoIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import type { MediaAssetItem, MediaAssetType } from "@/lib/media-library/shared"
import { getVideoMimeTypeFromPath } from "@/lib/media-library/shared"

function resolveErrorMessage(raw: unknown) {
  if (typeof raw === "string" && raw.trim()) {
    return raw
  }

  return "Nao foi possivel carregar a biblioteca de midia."
}

function MediaThumb({ item }: { item: MediaAssetItem }) {
  if (item.type === "video") {
    return (
      <div className="relative h-full w-full bg-black">
        <video
          src={item.url}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/18">
          <span className="inline-flex items-center justify-center rounded-full bg-white/88 p-2 text-[#0B1C2C]">
            <PlayIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={item.url}
      alt={item.alt ?? item.filename}
      className="h-full w-full object-cover"
    />
  )
}

function MediaDetailPreview({ item }: { item: MediaAssetItem }) {
  if (item.type === "video") {
    return (
      <video
        className="h-56 w-full bg-black object-cover"
        controls
        playsInline
        preload="metadata"
      >
        <source src={item.url} type={getVideoMimeTypeFromPath(item.url || item.filename)} />
      </video>
    )
  }

  return (
    <img
      src={item.url}
      alt={item.alt ?? item.filename}
      className="h-56 w-full object-cover"
    />
  )
}

export default function AdminMediaPickerDialog({
  open,
  title = "Selecionar midia da biblioteca",
  description = "Escolha um arquivo persistido para usar neste editor.",
  selectedUrl,
  acceptedTypes = ["image"],
  onClose,
  onSelect,
}: {
  open: boolean
  title?: string
  description?: string
  selectedUrl?: string
  acceptedTypes?: MediaAssetType[]
  onClose: () => void
  onSelect: (item: MediaAssetItem) => void
}) {
  const [items, setItems] = useState<MediaAssetItem[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!open) {
      return
    }

    let cancelled = false

    const loadItems = async () => {
      setIsLoading(true)
      setErrorMessage("")

      try {
        const response = await fetch("/api/admin/media", { cache: "no-store" })
        const result = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(resolveErrorMessage(result?.message ?? result?.error))
        }

        if (cancelled) {
          return
        }

        const rawItems: MediaAssetItem[] = Array.isArray(result?.items) ? result.items : []
        const nextItems = rawItems.filter((item) => acceptedTypes.includes(item.type))
        setItems(nextItems)

        const selectedMatch = nextItems.find((item) => item.url === selectedUrl)
        setSelectedId(selectedMatch?.id ?? nextItems[0]?.id ?? "")
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Nao foi possivel carregar a biblioteca de midia.",
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadItems()

    return () => {
      cancelled = true
    }
  }, [acceptedTypes, open, selectedUrl])

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  )

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#04101b]/65 p-4">
      <div className="flex max-h-[min(92vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_90px_rgba(4,16,27,0.32)]">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Biblioteca de midia
            </p>
            <h2 className="mt-2 text-2xl font-display text-[#0B1C2C]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            aria-label="Fechar biblioteca"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1fr),360px]">
          <div className="min-h-0 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center text-sm text-slate-500">
                  <ArrowPathIcon className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                  <p className="mt-3">Carregando midias persistidas...</p>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm leading-7 text-rose-700">
                {errorMessage}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Ainda nao existe nenhuma midia persistida deste tipo. Envie o primeiro arquivo em{" "}
                <strong>/admin/media</strong> para reutiliza-lo aqui.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => {
                  const active = item.id === selectedId

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`overflow-hidden rounded-[1.5rem] border text-left transition ${
                        active
                          ? "border-[#0B1C2C] bg-[#0B1C2C] text-white shadow-[0_20px_40px_rgba(11,28,44,0.18)]"
                          : "border-slate-200 bg-white text-[#0B1C2C] hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <MediaThumb item={item} />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
                          <span className={active ? "text-white/72" : "text-slate-400"}>
                            {item.type === "video" ? "Video" : "Imagem"}
                          </span>
                          {item.url === selectedUrl ? (
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                active
                                  ? "bg-white/10 text-white"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              Em uso no rascunho
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 text-sm font-semibold leading-6">
                          {item.alt || item.filename}
                        </p>
                        <p
                          className={`mt-2 text-xs leading-5 ${
                            active ? "text-white/72" : "text-slate-500"
                          }`}
                        >
                          {item.filename}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <aside className="border-t border-slate-200 bg-slate-50/80 p-6 lg:border-l lg:border-t-0">
            {selectedItem ? (
              <div className="space-y-5">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                  <MediaDetailPreview item={selectedItem} />
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Midia selecionada
                  </p>
                  <p className="mt-3 text-base font-semibold text-[#0B1C2C]">
                    {selectedItem.alt || selectedItem.filename}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedItem.filename}</p>
                  <div className="mt-4 rounded-[1rem] bg-slate-50 px-3 py-3 text-xs leading-6 text-slate-500">
                    URL publica pronta para reutilizacao. Ao escolher, o editor recebe a midia
                    sem precisar colar link manualmente.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelect(selectedItem)
                    onClose()
                  }}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
                >
                  <CheckCircleIcon className="mr-2 h-5 w-5" />
                  Usar esta midia
                </button>

                <a
                  href="/admin/media"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  {selectedItem.type === "video" ? (
                    <FilmIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <PhotoIcon className="mr-2 h-5 w-5" />
                  )}
                  Abrir biblioteca completa
                </a>
              </div>
            ) : (
              <div className="flex h-full min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-white text-center text-sm leading-6 text-slate-500">
                <div className="max-w-[220px] px-4">
                  <PhotoIcon className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="mt-3 font-semibold text-slate-600">Selecione uma midia</p>
                  <p className="mt-2">
                    Escolha um item da grade para ver a previa e usar o arquivo neste editor.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
