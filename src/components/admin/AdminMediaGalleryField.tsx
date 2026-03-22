"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  FilmIcon,
  PlayIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"
import type { MediaAssetType, MediaReference } from "@/lib/media-library/shared"
import { getMediaTypeFromUrl, getVideoMimeTypeFromPath } from "@/lib/media-library/shared"

function normalizeMediaItems(items: MediaReference[] | undefined) {
  return Array.isArray(items)
    ? items.filter(
        (item): item is MediaReference =>
          Boolean(item) &&
          typeof item.url === "string" &&
          item.url.trim().length > 0 &&
          (item.type === "image" || item.type === "video"),
      )
    : []
}

function convertLegacyUrls(items: string[] | undefined): MediaReference[] {
  return Array.isArray(items)
    ? items
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .map((url) => ({
          url,
          type: getMediaTypeFromUrl(url),
        }))
    : []
}

function mediaKey(item: MediaReference, index: number) {
  return `${item.type}:${item.url}:${index}`
}

function MediaThumb({ item, alt }: { item: MediaReference; alt: string }) {
  if (item.type === "video") {
    return (
      <div className="relative h-full w-full bg-black">
        <video className="h-full w-full object-cover" muted playsInline preload="metadata">
          <source src={item.url} type={getVideoMimeTypeFromPath(item.url)} />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/18">
          <span className="inline-flex items-center justify-center rounded-full bg-white/88 p-2 text-[#0B1C2C]">
            <PlayIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    )
  }

  return <img src={item.url} alt={alt} className="h-full w-full object-cover" />
}

function GalleryPreview({
  title,
  description,
  items,
  previewItem,
  onSelect,
  onOpen,
}: {
  title: string
  description: string
  items: MediaReference[]
  previewItem: MediaReference | null
  onSelect: (value: MediaReference) => void
  onOpen: (value: MediaReference) => void
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#0B1C2C]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length} arquivo{items.length === 1 ? "" : "s"}
        </span>
      </div>

      {previewItem ? (
        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-50">
          <div className="relative h-52">
            {previewItem.type === "video" ? (
              <video className="h-full w-full object-cover bg-black" controls playsInline preload="metadata">
                <source src={previewItem.url} type={getVideoMimeTypeFromPath(previewItem.url)} />
              </video>
            ) : (
              <img src={previewItem.url} alt={title} className="h-full w-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => onOpen(previewItem)}
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-[#04101b]/70 p-2 text-white transition hover:bg-[#04101b]"
              aria-label={`Abrir ${title} em destaque`}
            >
              <ArrowsPointingOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500">
          Nenhuma midia selecionada ainda.
        </div>
      )}

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((item, index) => {
            const selected = previewItem?.url === item.url && previewItem.type === item.type

            return (
              <button
                key={mediaKey(item, index)}
                type="button"
                onClick={() => onSelect(item)}
                className={`overflow-hidden rounded-[1rem] border transition ${
                  selected ? "border-[#0B1C2C] shadow-sm" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="relative h-24 overflow-hidden bg-slate-100">
                  <MediaThumb item={item} alt={`${title} ${index + 1}`} />
                </div>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default function AdminMediaGalleryField({
  label,
  helper,
  liveItems,
  draftItems,
  onItemsChange,
  liveImageUrls,
  draftImageUrls,
  onChange,
}: {
  label: string
  helper: string
  liveItems?: MediaReference[]
  draftItems?: MediaReference[]
  onItemsChange?: (value: MediaReference[]) => void
  liveImageUrls?: string[]
  draftImageUrls?: string[]
  onChange?: (value: string[]) => void
}) {
  const safeLiveItems = useMemo(
    () => (liveItems ? normalizeMediaItems(liveItems) : convertLegacyUrls(liveImageUrls)),
    [liveImageUrls, liveItems],
  )
  const safeDraftItems = useMemo(
    () => (draftItems ? normalizeMediaItems(draftItems) : convertLegacyUrls(draftImageUrls)),
    [draftImageUrls, draftItems],
  )
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activePreviewKey, setActivePreviewKey] = useState("")
  const [modalItem, setModalItem] = useState<MediaReference | null>(null)
  const changed = JSON.stringify(safeLiveItems) !== JSON.stringify(safeDraftItems)

  const previewItem = useMemo(() => {
    const allItems = [...safeDraftItems, ...safeLiveItems]

    return (
      allItems.find((item) => `${item.type}:${item.url}` === activePreviewKey) ??
      safeDraftItems[0] ??
      safeLiveItems[0] ??
      null
    )
  }, [activePreviewKey, safeDraftItems, safeLiveItems])

  useEffect(() => {
    if (previewItem) {
      const nextKey = `${previewItem.type}:${previewItem.url}`
      if (nextKey !== activePreviewKey) {
        setActivePreviewKey(nextKey)
      }
      return
    }

    if (activePreviewKey) {
      setActivePreviewKey("")
    }
  }, [activePreviewKey, previewItem])

  const applyChange = (nextItems: MediaReference[]) => {
    if (onItemsChange) {
      onItemsChange(nextItems)
      return
    }

    onChange?.(nextItems.filter((item) => item.type === "image").map((item) => item.url))
  }

  const addMedia = (item: { url: string; type: MediaAssetType }) => {
    if (safeDraftItems.some((draftItem) => draftItem.url === item.url && draftItem.type === item.type)) {
      setActivePreviewKey(`${item.type}:${item.url}`)
      return
    }

    const nextItems = [...safeDraftItems, { url: item.url, type: item.type }]
    applyChange(nextItems)
    setActivePreviewKey(`${item.type}:${item.url}`)
  }

  const moveMedia = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction

    if (nextIndex < 0 || nextIndex >= safeDraftItems.length) {
      return
    }

    const nextItems = [...safeDraftItems]
    const [selected] = nextItems.splice(index, 1)
    nextItems.splice(nextIndex, 0, selected)
    applyChange(nextItems)
  }

  const removeMedia = (index: number) => {
    const nextItems = safeDraftItems.filter((_, currentIndex) => currentIndex !== index)
    applyChange(nextItems)

    const removedItem = safeDraftItems[index]
    if (removedItem && `${removedItem.type}:${removedItem.url}` === activePreviewKey) {
      const nextPreview = nextItems[0] ?? safeLiveItems[0] ?? null
      setActivePreviewKey(nextPreview ? `${nextPreview.type}:${nextPreview.url}` : "")
    }
  }

  return (
    <div
      className={`rounded-[1.45rem] border p-4 ${
        changed ? "border-amber-200 bg-amber-50/70" : "border-slate-200 bg-slate-50/80"
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
          {changed ? "Galeria pronta para publicar" : "Galeria igual ao site"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <GalleryPreview
          title="Galeria atual no site"
          description="Estas midias representam a galeria publicada agora."
          items={safeLiveItems}
          previewItem={safeLiveItems.find((item) => item.url === previewItem?.url && item.type === previewItem?.type) ?? safeLiveItems[0] ?? null}
          onSelect={(item) => setActivePreviewKey(`${item.type}:${item.url}`)}
          onOpen={setModalItem}
        />

        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-[#0B1C2C]">Galeria em edicao</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Escolha fotos ou videos da biblioteca, defina a ordem e abra qualquer arquivo para conferir melhor.
          </p>

          {safeDraftItems.length > 0 ? (
            <div className="mt-4 space-y-3">
              {safeDraftItems.map((item, index) => (
                <div
                  key={mediaKey(item, index)}
                  className={`flex flex-col gap-3 rounded-[1rem] border p-3 sm:flex-row sm:items-center ${
                    `${item.type}:${item.url}` === activePreviewKey
                      ? "border-[#0B1C2C] bg-[#0B1C2C]/[0.03]"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setModalItem(item)}
                    className="h-20 w-full overflow-hidden rounded-[0.9rem] bg-slate-200 sm:w-28"
                  >
                    <MediaThumb item={item} alt={`Midia ${index + 1}`} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0B1C2C]">
                      {item.type === "video" ? "Video" : "Imagem"} {index + 1}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">{item.url}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePreviewKey(`${item.type}:${item.url}`)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMedia(index, -1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300"
                      aria-label={`Mover midia ${index + 1} para a esquerda`}
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMedia(index, 1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300"
                      aria-label={`Mover midia ${index + 1} para a direita`}
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="inline-flex items-center justify-center rounded-full border border-rose-200 p-2 text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                      aria-label={`Remover midia ${index + 1}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
              Nenhuma foto ou video adicional foi escolhido para a galeria ainda.
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
        >
          <FilmIcon className="mr-2 h-5 w-5" />
          Adicionar foto ou video
        </button>
        <button
          type="button"
          onClick={() => applyChange([...safeLiveItems])}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Voltar para a galeria atual
        </button>
      </div>

      <div className="mt-4 rounded-[1.15rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
        A capa fica no topo da pagina. A galeria abaixo mostra as fotos e videos extras da hospedagem.
      </div>

      <AdminMediaPickerDialog
        open={pickerOpen}
        acceptedTypes={["image", "video"]}
        selectedUrl={previewItem?.url}
        onClose={() => setPickerOpen(false)}
        onSelect={addMedia}
      />

      {modalItem ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#04101b]/78 p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_80px_rgba(4,16,27,0.4)]">
            <button
              type="button"
              onClick={() => setModalItem(null)}
              className="absolute right-4 top-4 z-10 inline-flex items-center justify-center rounded-full bg-[#04101b]/75 p-2 text-white transition hover:bg-[#04101b]"
              aria-label="Fechar preview da midia"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="bg-slate-100">
              {modalItem.type === "video" ? (
                <video className="max-h-[82vh] w-full bg-black object-contain" controls playsInline preload="metadata">
                  <source src={modalItem.url} type={getVideoMimeTypeFromPath(modalItem.url)} />
                </video>
              ) : (
                <img
                  src={modalItem.url}
                  alt="Preview da galeria"
                  className="max-h-[82vh] w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
