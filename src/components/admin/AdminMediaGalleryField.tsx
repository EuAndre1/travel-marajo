"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"

function GalleryPreview({
  title,
  description,
  images,
  previewUrl,
  onSelect,
  onOpen,
}: {
  title: string
  description: string
  images: string[]
  previewUrl: string
  onSelect: (value: string) => void
  onOpen: (value: string) => void
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#0B1C2C]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {images.length} foto{images.length === 1 ? "" : "s"}
        </span>
      </div>

      {previewUrl ? (
        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-50">
          <div className="relative h-52">
            <img src={previewUrl} alt={title} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onOpen(previewUrl)}
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-[#04101b]/70 p-2 text-white transition hover:bg-[#04101b]"
              aria-label={`Abrir ${title} em destaque`}
            >
              <ArrowsPointingOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500">
          Nenhuma imagem selecionada ainda.
        </div>
      )}

      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((imageUrl, index) => {
            const selected = imageUrl === previewUrl

            return (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => onSelect(imageUrl)}
                className={`overflow-hidden rounded-[1rem] border transition ${
                  selected ? "border-[#0B1C2C] shadow-sm" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="relative h-24 overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={`${title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
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
  const [activePreviewUrl, setActivePreviewUrl] = useState("")
  const [modalImageUrl, setModalImageUrl] = useState("")
  const changed = JSON.stringify(safeLiveImageUrls) !== JSON.stringify(safeDraftImageUrls)
  const selectedUrl = safeDraftImageUrls[0] ?? safeLiveImageUrls[0] ?? ""

  useEffect(() => {
    const availableImages = [...safeDraftImageUrls, ...safeLiveImageUrls]
    const nextPreview =
      availableImages.find((imageUrl) => imageUrl === activePreviewUrl) ??
      safeDraftImageUrls[0] ??
      safeLiveImageUrls[0] ??
      ""

    if (nextPreview !== activePreviewUrl) {
      setActivePreviewUrl(nextPreview)
    }
  }, [activePreviewUrl, safeDraftImageUrls, safeLiveImageUrls])

  const addImage = (item: { url: string }) => {
    if (safeDraftImageUrls.includes(item.url)) {
      setActivePreviewUrl(item.url)
      return
    }

    onChange([...safeDraftImageUrls, item.url])
    setActivePreviewUrl(item.url)
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
    const nextImages = safeDraftImageUrls.filter((_, currentIndex) => currentIndex !== index)
    onChange(nextImages)

    if (safeDraftImageUrls[index] === activePreviewUrl) {
      setActivePreviewUrl(nextImages[0] ?? safeLiveImageUrls[0] ?? "")
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
          description="Estas imagens representam a galeria publicada agora."
          images={safeLiveImageUrls}
          previewUrl={
            safeLiveImageUrls.includes(activePreviewUrl) ? activePreviewUrl : safeLiveImageUrls[0] ?? ""
          }
          onSelect={setActivePreviewUrl}
          onOpen={setModalImageUrl}
        />

        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-[#0B1C2C]">Galeria em edicao</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Escolha fotos da biblioteca, defina a ordem e abra qualquer imagem para conferir melhor.
          </p>

          {safeDraftImageUrls.length > 0 ? (
            <div className="mt-4 space-y-3">
              {safeDraftImageUrls.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className={`flex flex-col gap-3 rounded-[1rem] border p-3 sm:flex-row sm:items-center ${
                    imageUrl === activePreviewUrl
                      ? "border-[#0B1C2C] bg-[#0B1C2C]/[0.03]"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setModalImageUrl(imageUrl)}
                    className="h-20 w-full overflow-hidden rounded-[0.9rem] bg-slate-200 sm:w-28"
                  >
                    <img
                      src={imageUrl}
                      alt={`Imagem ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0B1C2C]">Imagem {index + 1}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">{imageUrl}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePreviewUrl(imageUrl)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      Ver
                    </button>
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
          Adicionar foto na galeria
        </button>
        <button
          type="button"
          onClick={() => onChange([...safeLiveImageUrls])}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Voltar para a galeria atual
        </button>
      </div>

      <div className="mt-4 rounded-[1.15rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
        A imagem principal fica no card e no topo da pagina. A galeria abaixo mostra as fotos
        extras da hospedagem.
      </div>

      <AdminMediaPickerDialog
        open={pickerOpen}
        selectedUrl={selectedUrl}
        onClose={() => setPickerOpen(false)}
        onSelect={addImage}
      />

      {modalImageUrl ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#04101b]/78 p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_80px_rgba(4,16,27,0.4)]">
            <button
              type="button"
              onClick={() => setModalImageUrl("")}
              className="absolute right-4 top-4 z-10 inline-flex items-center justify-center rounded-full bg-[#04101b]/75 p-2 text-white transition hover:bg-[#04101b]"
              aria-label="Fechar preview da imagem"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="bg-slate-100">
              <img
                src={modalImageUrl}
                alt="Preview da galeria"
                className="max-h-[82vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
