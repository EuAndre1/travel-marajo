"use client"
/* eslint-disable @next/next/no-img-element */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline"
import AdminMediaPickerDialog from "@/components/admin/AdminMediaPickerDialog"
import type { MediaAssetItem, MediaAssetType } from "@/lib/media-library/shared"

type EditableType = "text" | "textarea" | "image"

const EditableModeContext = createContext<{ enabled: boolean }>({ enabled: false })

export function EditableModeProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: ReactNode
}) {
  const contextValue = useMemo(() => ({ enabled }), [enabled])

  return (
    <EditableModeContext.Provider value={contextValue}>
      {children}
    </EditableModeContext.Provider>
  )
}

function useEditableMode() {
  const pathname = usePathname()
  const context = useContext(EditableModeContext)

  return context.enabled || Boolean(pathname?.startsWith("/admin"))
}

function stopEvent(event: MouseEvent<HTMLElement>) {
  event.preventDefault()
  event.stopPropagation()
}

export default function Editable({
  value,
  onChange,
  type = "text",
  disabled = false,
  label = "Campo editavel",
  acceptedTypes = ["image"],
  onMediaSelect,
  children,
  className = "",
}: {
  value: string
  onChange?: (value: string) => void
  type?: EditableType
  disabled?: boolean
  label?: string
  acceptedTypes?: MediaAssetType[]
  onMediaSelect?: (item: MediaAssetItem) => void
  children: ReactNode
  className?: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const isAdminMode = useEditableMode()
  const canEdit = isAdminMode && !disabled && (Boolean(onChange) || Boolean(onMediaSelect))

  if (!canEdit) {
    return <>{children}</>
  }

  if (type === "image") {
    return (
      <div className={`relative ${className}`}>
        {children}
        <button
          type="button"
          onClick={(event) => {
            stopEvent(event)
            setPickerOpen(true)
          }}
          className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full bg-[#0B1C2C]/88 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-[#10283d]"
        >
          <PhotoIcon className="mr-2 h-4 w-4" />
          Trocar midia
        </button>

        <AdminMediaPickerDialog
          open={pickerOpen}
          title={label}
          description="Escolha uma imagem ou um video persistido para usar nesta area da homepage."
          selectedUrl={value}
          acceptedTypes={acceptedTypes}
          onClose={() => setPickerOpen(false)}
          onSelect={(item) => {
            onMediaSelect?.(item)
            onChange?.(item.url)
          }}
        />
      </div>
    )
  }

  return (
    <div className={`group relative ${className}`}>
      {children}

      <button
        type="button"
        onClick={(event) => {
          stopEvent(event)
          setIsEditing((current) => !current)
        }}
        className="absolute right-0 top-0 z-20 translate-y-[-110%] rounded-full bg-[#0B1C2C]/88 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100"
      >
        <PencilSquareIcon className="mr-2 inline h-4 w-4" />
        Editar
      </button>

      {isEditing ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-3 rounded-[1.2rem] border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {label}
          </p>

          {type === "textarea" ? (
            <textarea
              autoFocus
              rows={4}
              value={value}
              onChange={(event) => onChange?.(event.target.value)}
              className="min-h-[120px] w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#0B1C2C]"
            />
          ) : (
            <input
              autoFocus
              value={value}
              onChange={(event) => onChange?.(event.target.value)}
              className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"
            />
          )}

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Concluir
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
