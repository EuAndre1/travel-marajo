"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

interface StoredDraft<T> {
  value: T
  savedAt: string
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function formatSavedAt(savedAt: string | null) {
  if (!savedAt) {
    return null
  }

  return new Date(savedAt).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

export function useAdminDraft<T>(storageKey: string, initialValue: T) {
  const pristineValue = useMemo(() => cloneValue(initialValue), [initialValue])
  const [draft, setDraft] = useState<T>(pristineValue)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [hasStoredDraft, setHasStoredDraft] = useState(false)

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(storageKey)

      if (!rawValue) {
        setDraft(cloneValue(pristineValue))
        setSavedAt(null)
        setHasStoredDraft(false)
        return
      }

      const stored = JSON.parse(rawValue) as StoredDraft<T> | T

      if (typeof stored === "object" && stored && "value" in stored) {
        setDraft(stored.value)
        setSavedAt(typeof stored.savedAt === "string" ? stored.savedAt : null)
      } else {
        setDraft(stored as T)
        setSavedAt(null)
      }

      setHasStoredDraft(true)
    } catch {
      setDraft(cloneValue(pristineValue))
      setSavedAt(null)
      setHasStoredDraft(false)
    }
  }, [pristineValue, storageKey])

  const saveDraft = useCallback(() => {
    const nextSavedAt = new Date().toISOString()
    const payload: StoredDraft<T> = {
      value: draft,
      savedAt: nextSavedAt,
    }

    window.localStorage.setItem(storageKey, JSON.stringify(payload))
    setSavedAt(nextSavedAt)
    setHasStoredDraft(true)
    setStatusMessage("Rascunho salvo neste navegador.")
  }, [draft, storageKey])

  const resetDraft = useCallback(() => {
    window.localStorage.removeItem(storageKey)
    setDraft(cloneValue(pristineValue))
    setSavedAt(null)
    setHasStoredDraft(false)
    setStatusMessage("Rascunho local removido. O editor voltou para a versão atual do projeto.")
  }, [pristineValue, storageKey])

  const exportDraft = useCallback(
    (fileName: string) => {
      const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.click()
      URL.revokeObjectURL(url)
      setStatusMessage("JSON exportado com sucesso.")
    },
    [draft],
  )

  return {
    draft,
    setDraft,
    saveDraft,
    resetDraft,
    exportDraft,
    hasStoredDraft,
    savedAtLabel: formatSavedAt(savedAt),
    statusMessage,
  }
}
