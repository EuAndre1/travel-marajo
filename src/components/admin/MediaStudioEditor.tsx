"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import {
  ArrowsRightLeftIcon,
  FilmIcon,
  LinkIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import {
  MAX_MEDIA_IMAGE_BYTES,
  type MediaAssetItem,
  type MediaStorageStatus,
} from "@/lib/media-library/shared"

const MAX_LOCAL_VIDEO_BYTES = 25 * 1024 * 1024

type LocalVideoDraft = {
  id: string
  previewUrl: string
  filename: string
  mimeType: string
  sizeBytes: number
  addedAt: string
}

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
  const stagedVideosRef = useRef<LocalVideoDraft[]>([])
  const [items, setItems] = useState<MediaAssetItem[]>([])
  const [storage, setStorage] = useState<MediaStorageStatus | null>(null)
  const [selectedTarget, setSelectedTarget] = useState<{ kind: "image" | "video"; id: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [altText, setAltText] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionMessage, setActionMessage] = useState("")
  const [replaceTargetName, setReplaceTargetName] = useState("")
  const [stagedVideos, setStagedVideos] = useState<LocalVideoDraft[]>([])

  const selectedImage = useMemo(
    () =>
      selectedTarget?.kind === "image"
        ? items.find((item) => item.id === selectedTarget.id) ?? null
        : null,
    [items, selectedTarget],
  )
  const selectedVideo = useMemo(
    () =>
      selectedTarget?.kind === "video"
        ? stagedVideos.find((item) => item.id === selectedTarget.id) ?? null
        : null,
    [selectedTarget, stagedVideos],
  )

  useEffect(() => {
    stagedVideosRef.current = stagedVideos
  }, [stagedVideos])

  useEffect(() => {
    return () => {
      stagedVideosRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    }
  }, [])

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
      setSelectedTarget((current) =>
        current ?? (nextItems[0] ? { kind: "image", id: nextItems[0].id } : null),
      )
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

  const resetUploadState = () => {
    setSelectedFile(null)
    setAltText("")
    setUploadProgress(0)
    setReplaceTargetName("")
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
      setSelectedTarget({ kind: "image", id: result.item.id })
      setActionMessage(
        replaceTargetName
          ? `Nova imagem enviada. Ela entrou como um novo item da biblioteca para substituir ${replaceTargetName} quando voce quiser.`
          : "Imagem enviada com sucesso para o storage persistente.",
      )
      resetUploadState()
      setUploadProgress(100)
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Nao foi possivel concluir o upload da imagem.",
      )
    } finally {
      setIsUploading(false)
    }
  }

  const deleteSelectedImage = async () => {
    if (!selectedImage) {
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
      const response = await fetch(`/api/admin/media/${selectedImage.id}`, {
        method: "DELETE",
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          resolveUiMessage(result?.message ?? result?.error, "Nao foi possivel remover a imagem agora."),
        )
      }

      const remainingItems = items.filter((item) => item.id !== selectedImage.id)
      setItems(remainingItems)
      setSelectedTarget(
        remainingItems[0]
          ? { kind: "image", id: remainingItems[0].id }
          : stagedVideos[0]
            ? { kind: "video", id: stagedVideos[0].id }
            : null,
      )
      setActionMessage("Imagem removida da biblioteca.")
    } catch (error) {
      setActionMessage(
        error instanceof Error ? error.message : "Nao foi possivel remover a imagem agora.",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const copySelectedUrl = async () => {
    if (!selectedImage) {
      return
    }

    try {
      await navigator.clipboard.writeText(selectedImage.url)
      setActionMessage("URL copiada. Agora voce pode usar a imagem nos editores visuais.")
    } catch {
      setActionMessage("Nao foi possivel copiar a URL automaticamente.")
    }
  }

  const stageVideo = (file: File) => {
    if (!file.type.startsWith("video/")) {
      setActionMessage("Selecione um arquivo de video valido.")
      return
    }

    if (file.size > MAX_LOCAL_VIDEO_BYTES) {
      setActionMessage("Video muito grande para o rascunho local. Limite atual: 25 MB.")
      return
    }

    const draftItem: LocalVideoDraft = {
      id: crypto.randomUUID(),
      previewUrl: URL.createObjectURL(file),
      filename: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      addedAt: new Date().toISOString(),
    }

    setStagedVideos((current) => [draftItem, ...current])
    setSelectedTarget({ kind: "video", id: draftItem.id })
    setActionMessage(
      "Video carregado apenas neste navegador para avaliacao visual. Ele ainda nao recebe URL publica nem storage persistente.",
    )

    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  const deleteSelectedVideo = () => {
    if (!selectedVideo) {
      return
    }

    URL.revokeObjectURL(selectedVideo.previewUrl)
    const nextVideos = stagedVideos.filter((item) => item.id !== selectedVideo.id)
    setStagedVideos(nextVideos)
    setSelectedTarget(items[0] ? { kind: "image", id: items[0].id } : nextVideos[0] ? { kind: "video", id: nextVideos[0].id } : null)
    setActionMessage("Video removido do rascunho local deste navegador.")
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Midia"
        title="Biblioteca visual do projeto"
        description="Envie imagens reais para o storage persistente, visualize a biblioteca como uma grade e prepare videos de forma honesta sem prometer publicacao automatica."
      />

      <AdminSectionCard
        eyebrow="Upload e preparo"
        title="Adicionar novos arquivos"
        description="Imagens entram na biblioteca persistente com URL publica. Videos ficam em modo de preparo visual apenas neste navegador ate a proxima etapa do sistema."
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
              <button
                type="button"
                onClick={() => {
                  if (!selectedImage) {
                    setActionMessage("Selecione uma imagem persistida para preparar a substituicao.")
                    return
                  }

                  setReplaceTargetName(selectedImage.filename)
                  setAltText(selectedImage.alt ?? "")
                  imageInputRef.current?.click()
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                <ArrowsRightLeftIcon className="mr-2 h-5 w-5" />
                Replace image
              </button>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-[#0B1C2C]">Imagens:</strong> ficam salvas no storage persistente e podem ser reutilizadas em varios editores.
              </p>
              <p className="mt-2">
                <strong className="text-[#0B1C2C]">Videos:</strong> nesta fase servem como preparo visual local. Voce pode revisar o arquivo, mas ele ainda nao recebe URL publica.
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-[#0B1C2C]">
                Texto alternativo da imagem (opcional)
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"
                value={altText}
                onChange={(event) => setAltText(event.target.value)}
                placeholder="Ex.: Bufalos na fazenda ao entardecer"
              />
            </label>

            {(selectedFile || replaceTargetName) ? (
              <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                {selectedFile ? (
                  <>
                    <strong className="text-[#0B1C2C]">Arquivo pronto para envio:</strong>{" "}
                    {selectedFile.name}
                  </>
                ) : null}
                {replaceTargetName ? (
                  <p className="mt-2">
                    Esta substituicao cria um novo item na biblioteca. Depois voce pode escolher a
                    nova imagem nos editores e excluir a antiga se quiser.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status do envio</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#0B1C2C] transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {isUploading ? `Upload em andamento: ${uploadProgress}%` : "Aguardando nova imagem."}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Limite atual por imagem: {formatFileSize(storage?.maxFileSizeBytes ?? MAX_MEDIA_IMAGE_BYTES)}.
            </p>
            <button
              type="button"
              onClick={uploadSelectedFile}
              disabled={!selectedFile || !storage?.configured || isUploading}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#E57A1F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c96815] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isUploading ? "Enviando imagem..." : "Enviar imagem para a biblioteca"}
            </button>
            <p
              className={`mt-4 rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
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
          onChange={(event) => {
            setSelectedFile(event.target.files?.[0] ?? null)
            setActionMessage("")
          }}
        />

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(event) => {
            const nextFile = event.target.files?.[0]
            if (nextFile) {
              stageVideo(nextFile)
            }
          }}
        />

        {actionMessage ? (
          <div className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm text-slate-700">
            {actionMessage}
          </div>
        ) : null}
      </AdminSectionCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr),360px]">
        <div className="space-y-6">
          <AdminSectionCard
            eyebrow="Imagens persistidas"
            title="Biblioteca pronta para reuso"
            description="Clique em uma imagem para copiar a URL, apagar ou usar nos editores sem colar links manualmente."
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
                Nenhuma imagem persistida ainda. Envie a primeira imagem para criar a biblioteca compartilhada do projeto.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MediaCard
                    key={item.id}
                    title={item.alt || item.filename}
                    subtitle={item.filename}
                    badge="Imagem persistida"
                    selected={selectedTarget?.kind === "image" && selectedTarget.id === item.id}
                    onSelect={() => setSelectedTarget({ kind: "image", id: item.id })}
                    preview={
                      <img
                        src={item.url}
                        alt={item.alt ?? item.filename}
                        className="h-full w-full object-cover"
                      />
                    }
                  />
                ))}
              </div>
            )}
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Videos em preparo"
            title="Rascunhos visuais locais"
            description="Aqui o colaborador pode carregar videos para revisar visualmente nesta sessao. Eles ainda nao sao persistidos nem recebem URL publica."
          >
            {stagedVideos.length === 0 ? (
              <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm leading-7 text-slate-500">
                Nenhum video preparado ainda. Use o botao Upload video para revisar um arquivo neste navegador.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stagedVideos.map((item) => (
                  <MediaCard
                    key={item.id}
                    title={item.filename}
                    subtitle={`${formatFileSize(item.sizeBytes)} - ${formatDate(item.addedAt)}`}
                    badge="Video local"
                    selected={selectedTarget?.kind === "video" && selectedTarget.id === item.id}
                    onSelect={() => setSelectedTarget({ kind: "video", id: item.id })}
                    preview={
                      <video
                        src={item.previewUrl}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                      />
                    }
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
            description="A biblioteca agora foi organizada para quem precisa operar o conteudo no dia a dia."
          >
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>1. Envie uma imagem para ganhar uma URL publica persistente.</li>
              <li>2. Selecione o item para copiar a URL ou usar a imagem nos editores.</li>
              <li>3. Se precisar trocar um arquivo, use Replace image e depois apague a antiga.</li>
              <li>4. Videos ficam como preparo local ate a camada persistente entrar no proximo pass.</li>
            </ul>
          </AdminSectionCard>

          {selectedImage ? (
            <AdminSectionCard
              eyebrow="Item selecionado"
              title={selectedImage.alt || selectedImage.filename}
              description="Imagem persistida pronta para ser usada em homepage, experiencias e pacotes."
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt || selectedImage.filename}
                  className="h-56 w-full object-cover"
                />
              </div>

              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Nome:</span> {selectedImage.filename}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Tipo:</span> Imagem persistida
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Enviado por:</span>{" "}
                  {selectedImage.uploadedBy}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Criado em:</span>{" "}
                  {formatDate(selectedImage.createdAt)}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-[#0B1C2C]">URL publica</span>
                <div className="mt-2 flex gap-3">
                  <input
                    readOnly
                    value={selectedImage.url}
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                  />
                  <button
                    type="button"
                    onClick={copySelectedUrl}
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#0B1C2C]/15 px-4 py-2.5 text-sm font-semibold text-[#0B1C2C] transition hover:border-[#0B1C2C]"
                  >
                    <LinkIcon className="mr-2 h-5 w-5" />
                    Use this media
                  </button>
                </div>
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReplaceTargetName(selectedImage.filename)
                    setAltText(selectedImage.alt ?? "")
                    imageInputRef.current?.click()
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  <ArrowsRightLeftIcon className="mr-2 h-5 w-5" />
                  Replace image
                </button>
                <button
                  type="button"
                  onClick={deleteSelectedImage}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <TrashIcon className="mr-2 h-5 w-5" />
                  {isDeleting ? "Removendo..." : "Delete"}
                </button>
              </div>
            </AdminSectionCard>
          ) : selectedVideo ? (
            <AdminSectionCard
              eyebrow="Video selecionado"
              title={selectedVideo.filename}
              description="Video preparado somente neste navegador para avaliacao visual."
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-black">
                <video src={selectedVideo.previewUrl} className="h-56 w-full" controls playsInline />
              </div>

              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Nome:</span> {selectedVideo.filename}
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Tipo:</span> Video local
                </div>
                <div className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-[#0B1C2C]">Tamanho:</span>{" "}
                  {formatFileSize(selectedVideo.sizeBytes)}
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                Este video serve apenas como preparo visual local. Ainda nao existe URL publica nem salvamento permanente para video nesta fase.
              </div>

              <button
                type="button"
                onClick={deleteSelectedVideo}
                className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
              >
                <TrashIcon className="mr-2 h-5 w-5" />
                Delete
              </button>
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
