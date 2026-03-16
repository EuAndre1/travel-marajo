import type { AssistantProfile } from "@/types/assistant-profile"
import type { AssistantIntent } from "@/lib/assistant-rules"
import { assistantCopy } from "@/data/assistant-copy"
import { getRouteContext } from "@/lib/assistant-rules"

export interface AssistantDecisionContext {
  lang: "pt" | "en" | "es" | "fr"
  currency: string
  pathname: string
  secondsOnPage: number
  openedCount: number
}

export interface AssistantDecision {
  action: "none" | "message" | "whatsapp" | "lead"
  intent?: AssistantIntent
  message?: string
}

export function decideAssistantAction(context: AssistantDecisionContext, profile: AssistantProfile): AssistantDecision {
  const copy = assistantCopy[context.lang]
  const route = getRouteContext(context.pathname)
  const isInternational = profile.travelerType === "international" || context.currency !== "BRL" || context.lang !== "pt"

  if (context.pathname.startsWith("/checkout") && context.secondsOnPage >= 8) {
    return { action: "message", intent: "support", message: copy.intents.support }
  }

  if (route.section === "packages" && context.secondsOnPage >= 25) {
    return { action: "message", intent: "packages", message: copy.proactive.packages }
  }

  if (route.section === "experiences" && context.secondsOnPage >= 18) {
    return { action: "message", intent: "experiences", message: copy.proactive.experiences }
  }

  if (isInternational && context.secondsOnPage >= 12) {
    return { action: "message", intent: "international", message: copy.proactive.international }
  }

  if (context.openedCount >= 2 && !profile.whatsappIntent) {
    return { action: "message", intent: "support", message: copy.intents.support }
  }

  return { action: "none" }
}