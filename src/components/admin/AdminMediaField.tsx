"use client"
/* eslint-disable @next/next/no-img-element */

import { useState } from "react"
import { FilmIcon, PhotoIcon } from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"
import type { MediaAssetItem, MediaAssetType } from "@/lib/media-library/shared"
import { getVideoMimeTypeFromPath } from "@/lib/media-library/shared"

function MediaPreview({
  title,
  description,
  mediaUrl,
  mediaType,
}: {
  title: string
  description: string
  mediaUrl: string
  mediaType: MediaAssetType
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {mediaUrl ? (
          mediaType === "video" ? (
            <video className="h-full w-full object-cover" controls playsInline preload="metadata">
              <source src={mediaUrl} type={getVideoMimeTypeFromPath(mediaUrl)} />
            </video>
          ) : (
            <img src={mediaUrl} alt={title} className="h-full w-full object-cover" />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Nenhuma midia selecionada
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

export default function AdminMediaField({
  label,
  helper,
  liveImageUrl,
  draftImageUrl,
  onChange,
  pendingNote,
  liveMediaUrl,
  draftMediaUrl,
  liveMediaType = "image",
  draftMediaType = "image",
  acceptedTypes = ["image"],
  onMediaChange,
}: {
  label: string
  helper: string
  liveImageUrl: string
  draftImageUrl: string
  onChange?: (value: string) => void
  pendingNote: string
  liveMediaUrl?: string
  draftMediaUrl?: string
  liveMediaType?: MediaAssetType
  draftMediaType?: MediaAssetType
  acceptedTypes?: MediaAssetType[]
  onMediaChange?: (value: { url: string; type: MediaAssetType }) => void
}) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const effectiveLiveMediaUrl = liveMediaUrl ?? liveImageUrl
  const effectiveDraftMediaUrl = draftMediaUrl ?? draftImageUrl
  const changed =
    effectiveLiveMediaUrl !== effectiveDraftMediaUrl || liveMediaType !== draftMediaType

  const applyMedia = (item: MediaAssetItem) => {
    if (onMediaChange) {
      onMediaChange({ url: item.url, type: item.type })
      return
    }

    onChange?.(item.url)
  }

  const resetMedia = () => {
    if (onMediaChange) {
      onMediaChange({
        url: effectiveLiveMediaUrl,
        type: liveMediaType,
      })
      return
    }

    onChange?.(liveImageUrl)
  }

  return (
    <div className="rounded-[1.45rem] border border-slate-200 bg-slate-50/75 p-4">
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
          {changed ? "Nova midia escolhida no estudio" : "Nenhuma troca preparada ainda"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <MediaPreview
          title="Midia atual da pagina"
          description="Referencia visual do que ja esta aparecendo no site hoje."
          mediaUrl={effectiveLiveMediaUrl}
          mediaType={liveMediaType}
        />
        <MediaPreview
          title="Midia selecionada no estudio"
          description={
            changed
              ? "Esta selecao fica salva no Admin Studio como referencia visual para a equipe."
              : "Nenhuma troca preparada no rascunho ate o momento."
          }
          mediaUrl={effectiveDraftMediaUrl || effectiveLiveMediaUrl}
          mediaType={effectiveDraftMediaUrl ? draftMediaType : liveMediaType}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
        >
          {acceptedTypes.includes("video") ? (
            <FilmIcon className="mr-2 h-5 w-5" />
          ) : (
            <PhotoIcon className="mr-2 h-5 w-5" />
          )}
          {acceptedTypes.includes("video")
            ? "Escolher imagem ou video da biblioteca"
            : "Escolher imagem da biblioteca"}
        </button>
        <button
          type="button"
          onClick={resetMedia}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Voltar para a midia atual
        </button>
      </div>

      <div className="mt-4 rounded-[1.15rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
        {pendingNote}
      </div>

      <AdminMediaPickerDialog
        open={pickerOpen}
        acceptedTypes={acceptedTypes}
        selectedUrl={effectiveDraftMediaUrl}
        onClose={() => setPickerOpen(false)}
        onSelect={applyMedia}
      />
    </div>
  )
}
