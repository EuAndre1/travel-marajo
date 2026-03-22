"use client"
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"
import type { MediaAssetItem } from "@/lib/media-library/shared"

function GalleryPreview({
  title,
  description,
  images,
}: {
  title: string
  description: string
  images: string[]
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-[#0B1C2C]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((imageUrl, index) => (
            <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-[1rem] border border-slate-200 bg-slate-50">
              <div className="relative h-24 overflow-hidden">
                <img src={imageUrl} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Nenhuma imagem selecionada.
        </div>
      )}
    </div>
  )
}

export default function AdminMediaGalleryField({
  label,
  helper,
  liveImageUrls,
  draftImageUrls,
  onChange,
}: {
  label: string
  helper: string
  liveImageUrls: string[]
  draftImageUrls: string[]
  onChange: (value: string[]) => void
}) {
  const safeLiveImageUrls = useMemo(
    () =>
      Array.isArray(liveImageUrls)
        ? liveImageUrls.filter((item) => typeof item === "string" && item.trim().length > 0)
        : [],
    [liveImageUrls],
  )
  const safeDraftImageUrls = useMemo(
    () =>
      Array.isArray(draftImageUrls)
        ? draftImageUrls.filter((item) => typeof item === "string" && item.trim().length > 0)
        : [],
    [draftImageUrls],
  )
  const [pickerOpen, setPickerOpen] = useState(false)
  const changed = JSON.stringify(safeLiveImageUrls) !== JSON.stringify(safeDraftImageUrls)

  const selectedUrl = useMemo(
    () =>
      safeDraftImageUrls[safeDraftImageUrls.length - 1] ?? safeLiveImageUrls[0] ?? "",
    [safeDraftImageUrls, safeLiveImageUrls],
  )

  const addImage = (item: MediaAssetItem) => {
    if (safeDraftImageUrls.includes(item.url)) {
      return
    }

    onChange([...safeDraftImageUrls, item.url])
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction

    if (nextIndex < 0 || nextIndex >= safeDraftImageUrls.length) {
      return
    }

    const nextImages = [...safeDraftImageUrls]
    const [selected] = nextImages.splice(index, 1)
    nextImages.splice(nextIndex, 0, selected)
    onChange(nextImages)
  }

  const removeImage = (index: number) => {
    onChange(safeDraftImageUrls.filter((_, currentIndex) => currentIndex !== index))
  }

  return (
    <div
      className={`rounded-[1.6rem] border p-5 ${
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
          description="Estas imagens representam a galeria publicada agora."
          images={safeLiveImageUrls}
        />
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-[#0B1C2C]">Galeria do rascunho</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Escolha varias fotos da biblioteca, remova o que nao fizer sentido e ajuste a ordem da exibicao.
          </p>

          {safeDraftImageUrls.length > 0 ? (
            <div className="mt-4 space-y-3">
              {safeDraftImageUrls.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="flex flex-col gap-3 rounded-[1rem] border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center"
                >
                  <div className="h-20 w-full overflow-hidden rounded-[0.9rem] bg-slate-200 sm:w-28">
                    <img src={imageUrl} alt={`Imagem ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0B1C2C]">Imagem {index + 1}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">{imageUrl}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => moveImage(index, -1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300"
                      aria-label={`Mover imagem ${index + 1} para a esquerda`}
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, 1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300"
                      aria-label={`Mover imagem ${index + 1} para a direita`}
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="inline-flex items-center justify-center rounded-full border border-rose-200 p-2 text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                      aria-label={`Remover imagem ${index + 1}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
              Nenhuma foto adicional foi escolhida para a galeria ainda.
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
          <PhotoIcon className="mr-2 h-5 w-5" />
          Adicionar imagem na galeria
        </button>
        <button
          type="button"
          onClick={() => onChange([...safeLiveImageUrls])}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Voltar para a galeria atual
        </button>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Como esta galeria funciona
        </p>
        <p className="mt-2">
          As imagens escolhidas aqui usam a biblioteca persistente do projeto. Quando voce salvar,
          a galeria da pagina de hospedagem passa a refletir esta selecao.
        </p>
      </div>

      <AdminMediaPickerDialog
        open={pickerOpen}
        selectedUrl={selectedUrl}
        onClose={() => setPickerOpen(false)}
        onSelect={addImage}
      />
    </div>
  )
}
