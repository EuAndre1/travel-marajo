import type { AssistantIntentType } from "@/types/assistant-profile"

export type AssistantEventName =
  | "widget_opened"
  | "widget_closed"
  | "first_prompt_shown"
  | "quick_reply_clicked"
  | "recommendation_shown"
  | "whatsapp_cta_clicked"
  | "lead_capture_started"
  | "lead_capture_completed"
  | "assistant_dismissed"
  | "package_interest_detected"
  | "experience_interest_detected"
  | "checkout_help_prompted"

export interface AssistantEventContext {
  language: string
  currency: string
  route: string
  slug?: string
  intent?: AssistantIntentType
  origin?: "auto" | "user"
  timestamp?: string
}

const STORAGE_KEY = "tm_assistant_events"
const MAX_EVENTS = 200

export function trackAssistantEvent(name: AssistantEventName, context: AssistantEventContext): void {
  if (typeof window === "undefined") return

  const payload = {
    name,
    context: {
      ...context,
      timestamp: new Date().toISOString(),
    },
  }

  const current = getStoredEvents()
  const next = [...current, payload].slice(-MAX_EVENTS)
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))

  if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    ;(window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: "assistant_event",
      assistant_event: payload.name,
      ...payload.context,
    })
  }

  if (typeof (window as unknown as { tmAssistantAnalytics?: (event: unknown) => void }).tmAssistantAnalytics === "function") {
    ;(window as unknown as { tmAssistantAnalytics: (event: unknown) => void }).tmAssistantAnalytics(payload)
  }
}

export function getStoredEvents(): { name: AssistantEventName; context: AssistantEventContext }[] {
  if (typeof window === "undefined") return []
  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as { name: AssistantEventName; context: AssistantEventContext }[]
  } catch {
    return []
  }
}

export function clearStoredEvents(): void {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem(STORAGE_KEY)
}