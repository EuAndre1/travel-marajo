"use client"
/* eslint-disable @next/next/no-img-element */

import { useState } from "react"
import { PhotoIcon } from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"
import type { MediaAssetItem } from "@/lib/media-library/shared"

function ImagePreview({
  title,
  description,
  imageUrl,
}: {
  title: string
  description: string
  imageUrl: string
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Nenhuma imagem selecionada
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-[#0B1C2C]">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  )
}

export default function AdminCardImageField({
  label,
  helper,
  liveImageUrl,
  draftImageUrl,
  onChange,
}: {
  label: string
  helper: string
  liveImageUrl: string
  draftImageUrl: string
  onChange: (value: string) => void
}) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const changed = liveImageUrl !== draftImageUrl

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
          {changed ? "Nova imagem pronta para publicar" : "Usando a imagem atual"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ImagePreview
          title="Imagem atual no site"
          description="Esta e a imagem que o visitante ve agora."
          imageUrl={liveImageUrl}
        />
        <ImagePreview
          title="Imagem do rascunho"
          description="Esta imagem entra no site quando voce salvar e aplicar as alteracoes."
          imageUrl={draftImageUrl}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
        >
          <PhotoIcon className="mr-2 h-5 w-5" />
          Selecionar imagem da biblioteca
        </button>
        <button
          type="button"
          onClick={() => onChange(liveImageUrl)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Voltar para a imagem atual
        </button>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Como esta imagem funciona
        </p>
        <p className="mt-2">
          A imagem escolhida aqui vem da biblioteca persistente e pode ser publicada de verdade
          neste card quando voce salvar.
        </p>
      </div>

      <AdminMediaPickerDialog
        open={pickerOpen}
        selectedUrl={draftImageUrl}
        onClose={() => setPickerOpen(false)}
        onSelect={(item: MediaAssetItem) => onChange(item.url)}
      />
    </div>
  )
}
