"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ContentStudioSurface } from "@/lib/content-studio/resolvers"

export function useAdminPersistedSave<T>({
  surface,
  draft,
  saveDraft,
  markPersisted,
}: {
  surface: ContentStudioSurface
  draft: T
  saveDraft: (value?: T) => void
  markPersisted: (value: T, statusMessage?: string) => void
}) {
  const [isPersisting, setIsPersisting] = useState(false)
  const [persistMessage, setPersistMessage] = useState("")
  const [persistState, setPersistState] = useState<"idle" | "saving" | "success" | "error">("idle")
  const draftRef = useRef(draft)

  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  const saveAndPersist = useCallback(async () => {
    const currentDraft = draftRef.current
    saveDraft(currentDraft)
    setIsPersisting(true)
    setPersistState("saving")
    setPersistMessage("Sincronizando com a camada persistida do site...")

    try {
      const response = await fetch(`/api/admin/content-overrides/${surface}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft: currentDraft }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Nao foi possivel persistir este conteudo agora.",
        )
      }

      const persistedDraft = (result?.draft ?? currentDraft) as T

      markPersisted(
        persistedDraft,
        "Conteudo persistido no banco com fallback seguro para os arquivos do projeto.",
      )
      setPersistState("success")
      setPersistMessage(
        "Override salvo no banco e pronto para refletir no site publico quando esta superficie for renderizada.",
      )
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nao foi possivel persistir este conteudo agora."

      setPersistMessage(
        `O rascunho local foi salvo neste navegador, mas houve falha ao persistir no site: ${message}`,
      )
      setPersistState("error")
    } finally {
      setIsPersisting(false)
    }
  }, [markPersisted, saveDraft, surface])

  return {
    isPersisting,
    persistState,
    persistMessage,
    saveAndPersist,
  }
}
