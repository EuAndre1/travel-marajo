import type { AssistantSessionState, AssistantProfile, AssistantLeadCapture } from "@/types/assistant-profile"

const STORAGE_KEY = "tm_assistant_session"

function defaultProfile(): AssistantProfile {
  return {
    language: "pt",
    currency: "BRL",
    travelerType: "unknown",
    intent: null,
    interestFocus: "unspecified",
    currentRoute: "/",
    checkoutIntent: false,
    whatsappIntent: false,
  }
}

export function getAssistantSession(): AssistantSessionState {
  if (typeof window === "undefined") {
    return {
      profile: defaultProfile(),
      conversation: { stage: "intro", openedCount: 0 },
    }
  }

  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return {
      profile: defaultProfile(),
      conversation: { stage: "intro", openedCount: 0 },
    }
  }

  try {
    const parsed = JSON.parse(raw) as AssistantSessionState
    return {
      profile: { ...defaultProfile(), ...parsed.profile },
      lead: parsed.lead,
      conversation: {
        stage: parsed.conversation?.stage ?? "intro",
        openedCount: parsed.conversation?.openedCount ?? 0,
        lastIntent: parsed.conversation?.lastIntent,
      },
    }
  } catch {
    return {
      profile: defaultProfile(),
      conversation: { stage: "intro", openedCount: 0 },
    }
  }
}

export function saveAssistantSession(session: AssistantSessionState): void {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function updateAssistantProfile(partial: Partial<AssistantProfile>): AssistantSessionState {
  const current = getAssistantSession()
  const updated: AssistantSessionState = {
    ...current,
    profile: {
      ...current.profile,
      ...partial,
      lastInteractionAt: new Date().toISOString(),
    },
  }
  saveAssistantSession(updated)
  return updated
}

export function updateAssistantLead(lead: AssistantLeadCapture): AssistantSessionState {
  const current = getAssistantSession()
  const updated: AssistantSessionState = {
    ...current,
    lead: {
      ...current.lead,
      ...lead,
    },
  }
  saveAssistantSession(updated)
  return updated
}

export function updateAssistantConversation(partial: Partial<AssistantSessionState["conversation"]>): AssistantSessionState {
  const current = getAssistantSession()
  const updated: AssistantSessionState = {
    ...current,
    conversation: {
      ...current.conversation,
      ...partial,
    },
  }
  saveAssistantSession(updated)
  return updated
}

export function resetAssistantSession(): void {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem(STORAGE_KEY)
}