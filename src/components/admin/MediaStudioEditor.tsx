"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import {
  ArrowsRightLeftIcon,
  FilmIcon,
  LinkIcon,
  PhotoIcon,
  PlayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import {
  MAX_MEDIA_IMAGE_BYTES,
  MAX_MEDIA_VIDEO_BYTES,
  getVideoMimeTypeFromPath,
  type MediaAssetItem,
  type MediaAssetType,
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
      return "Selecione um arquivo antes de enviar."
    default:
      return rawMessage
  }
}

function MediaPreview({ item }: { item: MediaAssetItem }) {
  if (item.type === "video") {
    return (
      <div className="relative h-full w-full bg-black">
        <video className="h-full w-full object-cover" muted playsInline preload="metadata">
          <source src={item.url} type={getVideoMimeTypeFromPath(item.url || item.filename)} />
        </video>
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

function MediaCard({
  title,
  subtitle,
  badge,
  selected,
  onSelect,
  preview,
}: {
  title: string
  subtitle: string
  badge: string
  selected: boolean
  onSelect: () => void
  preview: ReactNode
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
      <div className="relative h-44 overflow-hidden">{preview}</div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
          <span className={selected ? "text-white/70" : "text-slate-400"}>{badge}</span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6">{title}</p>
        <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
          {subtitle}
        </p>
      </div>
    </button>
  )
}

export default function MediaStudioEditor() {
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const videoInputRef = useRef<HTMLInputElement | null>(null)
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
  const [replaceTargetName, setReplaceTargetName] = useState("")

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
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

      const nextItems: MediaAssetItem[] = Array.isArray(result?.items) ? result.items : []
      setItems(nextItems)
      setStorage(result?.storage ?? null)
      setSelectedId((current) => current || nextItems[0]?.id || "")
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Nao foi possivel carregar a biblioteca de midia.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void reloadMedia()
  }, [])

  useEffect(() => {
    if (selectedId && items.some((item) => item.id === selectedId)) {
      return
    }

    if (items[0]) {
      setSelectedId(items[0].id)
      return
    }

    if (selectedId) {
      setSelectedId("")
    }
  }, [items, selectedId])

  const resetUploadState = () => {
    setSelectedFile(null)
    setAltText("")
    setUploadProgress(0)
    setReplaceTargetName("")

    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }

    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  const uploadSelectedFile = async () => {
    if (!selectedFile) {
      setActionMessage("Selecione um arquivo antes de enviar.")
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
                "Nao foi possivel concluir o upload da midia.",
              ),
            ),
          )
        }

        xhr.onerror = () => {
          reject(new Error("Falha de rede ao enviar a midia."))
        }

        xhr.send(payload)
      })

      setItems((current) => [result.item, ...current])
      setSelectedId(result.item.id)
      setActionMessage(
        replaceTargetName
          ? `Nova midia enviada. Ela entrou como um novo item da biblioteca para substituir ${replaceTargetName} quando voce quiser.`
          : `${result.item.type === "video" ? "Video" : "Imagem"} enviada com sucesso para o storage persistente.`,
      )
      resetUploadState()
      setUploadProgress(100)
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Nao foi possivel concluir o upload da midia.",
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
      "Remover esta midia da biblioteca? A exclusao apaga o registro persistido.",
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
          resolveUiMessage(result?.message ?? result?.error, "Nao foi possivel remover a midia agora."),
        )
      }

      const remainingItems = items.filter((item) => item.id !== selectedItem.id)
      setItems(remainingItems)
      setSelectedId(remainingItems[0]?.id ?? "")
      setActionMessage("Midia removida da biblioteca.")
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Nao foi possivel remover a midia agora.",
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
      setActionMessage("URL copiada. Agora voce pode usar a midia nos editores visuais.")
    } catch {
      setActionMessage("Nao foi possivel copiar a URL automaticamente.")
    }
  }

  const handleFileChoice = (file: File | null) => {
    setSelectedFile(file)
    setActionMessage("")
  }

  const triggerReplaceInput = (kind: MediaAssetType) => {
    setReplaceTargetName(selectedItem?.filename ?? "")
    setAltText(selectedItem?.alt ?? "")

    if (kind === "video") {
      videoInputRef.current?.click()
      return
    }

    imageInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Midia"
        title="Biblioteca visual do projeto"
        description="Envie imagens e videos persistentes para o Vercel Blob, reutilize a URL em todo o site e mantenha a operacao visual do projeto em um unico lugar."
      />

      <AdminSectionCard
        eyebrow="Upload"
        title="Adicionar novos arquivos"
        description="As imagens e os videos enviados aqui ficam persistidos com URL publica para reuse em homepage, hoteis, experiencias e pacotes."
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr),340px]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
              >
                <PhotoIcon className="mr-2 h-5 w-5" />
                Upload image
              </button>
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                <FilmIcon className="mr-2 h-5 w-5" />
                Upload video
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),220px]">
              <label className="block">
                <span className="text-sm font-semibold text-[#0B1C2C]">Legenda opcional</span>
                <input
                  value={altText}
                  onChange={(event) => setAltText(event.target.value)}
                  placeholder="Nome amigavel para o arquivo"
                  className="mt-2 w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"
                />
              </label>

              <button
                type="button"
                onClick={uploadSelectedFile}
                disabled={!selectedFile || isUploading}
                className="inline-flex items-center justify-center rounded-full bg-[#E57A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? "Enviando..." : "Salvar no Blob"}
              </button>
            </div>

            {selectedFile ? (
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                <strong className="text-[#0B1C2C]">Arquivo selecionado:</strong> {selectedFile.name}
                <br />
                <strong className="text-[#0B1C2C]">Tipo:</strong> {selectedFile.type || "desconhecido"}
                <br />
                <strong className="text-[#0B1C2C]">Tamanho:</strong> {formatFileSize(selectedFile.size)}
              </div>
            ) : null}

            {uploadProgress > 0 ? (
              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#0B1C2C] transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Upload {uploadProgress}%
                </p>
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
            <p className="font-semibold text-[#0B1C2C]">Limites atuais</p>
            <p className="mt-2">Imagens ate {formatFileSize(MAX_MEDIA_IMAGE_BYTES)}</p>
            <p>Videos MP4/WEBM ate {formatFileSize(MAX_MEDIA_VIDEO_BYTES)}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Storage</p>
            <p
              className={`mt-2 rounded-[1rem] px-3 py-3 text-sm leading-6 ${
                storage?.configured
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-800"
              }`}
            >
              {storage?.note ?? "Carregando status do storage..."}
            </p>
          </div>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(event) => handleFileChoice(event.target.files?.[0] ?? null)}
        />

        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4,video/webm"
          className="hidden"
          onChange={(event) => handleFileChoice(event.target.files?.[0] ?? null)}
        />

        {actionMessage ? (
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">
            {actionMessage}
          </div>
        ) : null}
      </AdminSectionCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr),360px]">
        <div className="space-y-6">
          <AdminSectionCard
            eyebrow="Biblioteca"
            title="Midias persistidas"
            description="Clique em um item para copiar a URL, excluir ou usar o arquivo em outros editores."
          >
            {isLoading ? (
              <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Carregando biblioteca de midia...
              </div>
            ) : loadError ? (
              <div className="rounded-[1.6rem] border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm leading-7 text-rose-700">
                {loadError}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Nenhuma midia persistida ainda. Envie a primeira imagem ou o primeiro video para criar a biblioteca compartilhada do projeto.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MediaCard
                    key={item.id}
                    title={item.alt || item.filename}
                    subtitle={`${item.filename} - ${formatDate(item.createdAt)}`}
                    badge={item.type === "video" ? "Video persistido" : "Imagem persistida"}
                    selected={selectedId === item.id}
                    onSelect={() => setSelectedId(item.id)}
                    preview={<MediaPreview item={item} />}
                  />
                ))}
              </div>
            )}
          </AdminSectionCard>
        </div>

        <aside className="space-y-6">
          <AdminSectionCard
            eyebrow="Como usar"
            title="Fluxo simples para o time"
            description="A biblioteca agora funciona com o mesmo storage persistente para imagem e video."
          >
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>1. Envie imagem ou video para ganhar uma URL publica persistente.</li>
              <li>2. Selecione o item para copiar a URL ou reutilizar nos editores.</li>
              <li>3. Se precisar trocar um arquivo, use Replace media e depois apague a antiga.</li>
              <li>4. Use videos com leveza: fundo da home ou galerias, sem exagerar no peso.</li>
            </ul>
          </AdminSectionCard>

          {selectedItem ? (
            <AdminSectionCard
              eyebrow="Item selecionado"
              title={selectedItem.alt || selectedItem.filename}
              description="Midia persistida pronta para homepage, hoteis, experiencias e pacotes."
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                {selectedItem.type === "video" ? (
                  <video className="h-56 w-full bg-black object-cover" controls playsInline preload="metadata">
                    <source src={selectedItem.url} type={getVideoMimeTypeFromPath(selectedItem.url || selectedItem.filename)} />
                  </video>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.alt || selectedItem.filename}
                    className="h-56 w-full object-cover"
                  />
                )}
              </div>

              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Nome:</span> {selectedItem.filename}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Tipo:</span>{" "}
                  {selectedItem.type === "video" ? "Video persistido" : "Imagem persistida"}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Enviado por:</span>{" "}
                  {selectedItem.uploadedBy}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Criado em:</span>{" "}
                  {formatDate(selectedItem.createdAt)}
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
                    <LinkIcon className="mr-2 h-5 w-5" />
                    Use this media / Copy URL
                  </button>
                </div>
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => triggerReplaceInput(selectedItem.type)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  <ArrowsRightLeftIcon className="mr-2 h-5 w-5" />
                  Replace media
                </button>
                <button
                  type="button"
                  onClick={deleteSelectedItem}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <TrashIcon className="mr-2 h-5 w-5" />
                  {isDeleting ? "Removendo..." : "Delete"}
                </button>
              </div>
            </AdminSectionCard>
          ) : (
            <AdminSectionCard
              eyebrow="Selecao"
              title="Escolha um item da biblioteca"
              description="Ao selecionar uma imagem ou video, os detalhes e as acoes aparecem aqui."
            >
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Selecione um item da grade para copiar URL, preparar substituicao ou excluir o arquivo.
              </div>
            </AdminSectionCard>
          )}
        </aside>
      </div>
    </div>
  )
}
