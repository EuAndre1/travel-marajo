"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction,
} from "react"

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

export function useAdminDraft<T>(
  storageKey: string,
  initialValue: T,
  options?: { normalizeValue?: (value: unknown) => T },
) {
  const normalizeValueRef = useRef<(value: unknown) => T>(
    options?.normalizeValue ?? ((value: unknown) => value as T),
  )
  normalizeValueRef.current = options?.normalizeValue ?? ((value: unknown) => value as T)

  const normalizeDraft = useCallback((value: unknown) => {
    return cloneValue(normalizeValueRef.current(value))
  }, [])

  const pristineValue = useMemo(() => normalizeDraft(initialValue), [initialValue, normalizeDraft])
  const [baselineValue, setBaselineValue] = useState<T>(pristineValue)
  const [draftState, setDraftState] = useState<T>(pristineValue)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [hasStoredDraft, setHasStoredDraft] = useState(false)
  const draftRef = useRef<T>(pristineValue)
  const baselineRef = useRef<T>(pristineValue)

  const setDraft = useCallback(
    (valueOrUpdater: SetStateAction<T>) => {
      const currentDraft = draftRef.current
      const nextDraft =
        typeof valueOrUpdater === "function"
          ? normalizeDraft((valueOrUpdater as (value: T) => T)(cloneValue(currentDraft)))
          : normalizeDraft(valueOrUpdater)

      draftRef.current = nextDraft
      setDraftState(nextDraft)
    },
    [normalizeDraft],
  )

  useEffect(() => {
    const nextBaseline = normalizeDraft(pristineValue)
    baselineRef.current = nextBaseline
    setBaselineValue(nextBaseline)

    try {
      const rawValue = window.localStorage.getItem(storageKey)

      if (!rawValue) {
        draftRef.current = cloneValue(nextBaseline)
        setDraftState(cloneValue(nextBaseline))
        setSavedAt(null)
        setHasStoredDraft(false)
        return
      }

      const stored = JSON.parse(rawValue) as StoredDraft<T> | T

      if (typeof stored === "object" && stored && "value" in stored) {
        const nextDraft = normalizeDraft(stored.value)
        draftRef.current = nextDraft
        setDraftState(nextDraft)
        setSavedAt(typeof stored.savedAt === "string" ? stored.savedAt : null)
      } else {
        const nextDraft = normalizeDraft(stored as T)
        draftRef.current = nextDraft
        setDraftState(nextDraft)
        setSavedAt(null)
      }

      setHasStoredDraft(true)
    } catch {
      draftRef.current = cloneValue(nextBaseline)
      setDraftState(cloneValue(nextBaseline))
      setSavedAt(null)
      setHasStoredDraft(false)
    }
  }, [normalizeDraft, pristineValue, storageKey])

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draftState) !== JSON.stringify(baselineValue),
    [baselineValue, draftState],
  )

  const saveDraft = useCallback((value?: T) => {
    const nextSavedAt = new Date().toISOString()
    const nextDraft = value === undefined ? draftRef.current : normalizeDraft(value)
    const payload: StoredDraft<T> = {
      value: nextDraft,
      savedAt: nextSavedAt,
    }

    window.localStorage.setItem(storageKey, JSON.stringify(payload))
    draftRef.current = nextDraft
    setDraftState(nextDraft)
    setSavedAt(nextSavedAt)
    setHasStoredDraft(true)
    setStatusMessage("Rascunho salvo neste navegador.")
  }, [normalizeDraft, storageKey])

  const resetDraft = useCallback(() => {
    window.localStorage.removeItem(storageKey)
    const nextDraft = cloneValue(baselineRef.current)
    draftRef.current = nextDraft
    setDraftState(nextDraft)
    setSavedAt(null)
    setHasStoredDraft(false)
    setStatusMessage("Rascunho local removido. O editor voltou para a versao ativa deste ambiente.")
  }, [storageKey])

  const exportDraft = useCallback(
    (fileName: string) => {
      const blob = new Blob([JSON.stringify(draftRef.current, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.click()
      URL.revokeObjectURL(url)
      setStatusMessage("JSON exportado com sucesso.")
    },
    [],
  )

  const markPersisted = useCallback(
    (value: T, message = "Camada persistida atualizada com sucesso.") => {
      const nextSavedAt = new Date().toISOString()
      const clonedValue = normalizeDraft(value)
      const payload: StoredDraft<T> = {
        value: clonedValue,
        savedAt: nextSavedAt,
      }

      window.localStorage.setItem(storageKey, JSON.stringify(payload))
      baselineRef.current = clonedValue
      draftRef.current = clonedValue
      setBaselineValue(clonedValue)
      setDraftState(clonedValue)
      setSavedAt(nextSavedAt)
      setHasStoredDraft(true)
      setStatusMessage(message)
    },
    [normalizeDraft, storageKey],
  )

  return {
    draft: draftState,
    setDraft,
    saveDraft,
    markPersisted,
    resetDraft,
    exportDraft,
    hasUnsavedChanges,
    hasStoredDraft,
    savedAtLabel: formatSavedAt(savedAt),
    statusMessage,
  }
}
