"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import AssistantPanel from "./AssistantPanel"
import AssistantLauncher from "./AssistantLauncher"
import { assistantCopy } from "@/data/assistant-copy"
import { useSiteLanguage } from "@/lib/use-site-language"
import {
  getIntentResponse,
  getQuickReplies,
  resolveAssistantTitle,
  getRouteContext,
  type AssistantIntent,
  type AssistantContext,
} from "@/lib/assistant-rules"
import { decideAssistantAction } from "@/lib/assistant-decision-engine"
import { buildWhatsAppHandoffMessage, buildWhatsAppUrl } from "@/lib/assistant-whatsapp-handoff"
import { trackAssistantEvent } from "@/lib/assistant-events"
import {
  getAssistantSession,
  updateAssistantConversation,
  updateAssistantLead,
  updateAssistantProfile,
} from "@/lib/assistant-session"
import type { AssistantProfile, InterestFocus, TravelerType } from "@/types/assistant-profile"

interface AssistantMessage {
  id: string
  role: "assistant" | "user"
  text: string
}

const defaultProfile: AssistantProfile = {
  language: "pt",
  currency: "BRL",
  travelerType: "unknown",
  intent: null,
  interestFocus: "unspecified",
  currentRoute: "/",
  checkoutIntent: false,
  whatsappIntent: false,
}

export default function TravelAssistantWidget() {
  const { lang } = useSiteLanguage()
  const copy = assistantCopy[lang]
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [secondsOnPage, setSecondsOnPage] = useState(0)
  const [currency, setCurrency] = useState("BRL")
  const [profile, setProfile] = useState<AssistantProfile>(defaultProfile)
  const [openedCount, setOpenedCount] = useState(0)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadValues, setLeadValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    travelerType: "" as TravelerType | "",
    interestFocus: "" as InterestFocus | "",
  })
  const proactiveRef = useRef(false)
  const introShownRef = useRef(false)

  useEffect(() => {
    const session = getAssistantSession()
    setProfile(session.profile)
    setOpenedCount(session.conversation.openedCount)
    setLeadValues({
      name: session.lead?.name ?? "",
      email: session.lead?.email ?? "",
      whatsapp: session.lead?.whatsapp ?? "",
      travelerType: session.lead?.travelerType ?? "",
      interestFocus: session.lead?.interestFocus ?? "",
    })
  }, [])

  const ensureIntroMessages = useCallback((origin: "user") => {
    setMessages((prev) => {
      if (prev.length > 0) return prev
      return [
        { id: cryptoId(), role: "assistant", text: copy.greeting },
        { id: cryptoId(), role: "assistant", text: copy.consent },
        { id: cryptoId(), role: "assistant", text: copy.question },
      ]
    })

    if (!introShownRef.current) {
      introShownRef.current = true
      trackAssistantEvent("first_prompt_shown", {
        language: lang,
        currency,
        route: pathname,
        origin,
      })
      updateAssistantConversation({ stage: "qualify" })
    }
  }, [copy.consent, copy.greeting, copy.question, currency, lang, pathname])

  const handleOpen = useCallback((origin: "user") => {
    setIsOpen(true)
    ensureIntroMessages(origin)

    const nextOpenedCount = openedCount + 1
    setOpenedCount(nextOpenedCount)
    updateAssistantConversation({ openedCount: nextOpenedCount })

    trackAssistantEvent("widget_opened", {
      language: lang,
      currency,
      route: pathname,
      origin,
    })
  }, [currency, ensureIntroMessages, lang, openedCount, pathname])

  useEffect(() => {
    const stored =
      window.localStorage.getItem("site-currency") ||
      window.localStorage.getItem("currency") ||
      "BRL"
    setCurrency(stored)
  }, [])

  useEffect(() => {
    setSecondsOnPage(0)
    proactiveRef.current = false
    const interval = window.setInterval(() => {
      setSecondsOnPage((prev) => prev + 1)
    }, 1000)
    return () => window.clearInterval(interval)
  }, [pathname])

  useEffect(() => {
    const route = getRouteContext(pathname)
    const updated = updateAssistantProfile({
      language: lang,
      currency,
      currentRoute: pathname,
      selectedItemSlug: route.slug,
      checkoutIntent: pathname.startsWith("/checkout"),
      travelerType:
        profile.travelerType === "unknown" && (lang !== "pt" || currency !== "BRL")
          ? "international"
          : profile.travelerType,
    })
    setProfile(updated.profile)

    if (route.section === "experiences") {
      trackAssistantEvent("experience_interest_detected", {
        language: lang,
        currency,
        route: pathname,
        slug: route.slug,
        origin: "auto",
      })
    }

    if (route.section === "packages") {
      trackAssistantEvent("package_interest_detected", {
        language: lang,
        currency,
        route: pathname,
        slug: route.slug,
        origin: "auto",
      })
    }
  }, [currency, lang, pathname, profile.travelerType])

  useEffect(() => {
    if (!isOpen) return

    const decision = decideAssistantAction(
      {
        lang,
        currency,
        pathname,
        secondsOnPage,
        openedCount,
      },
      profile
    )

    const message = decision.message
    if (decision.action !== "message" || !message || proactiveRef.current) return
    proactiveRef.current = true

    setMessages((prev) => {
      if (prev.find((item) => item.text === message)) return prev
      return [...prev, { id: cryptoId(), role: "assistant", text: message }]
    })

    const trackedIntent = decision.intent === "whatsapp" ? "support" : decision.intent

    trackAssistantEvent("recommendation_shown", {
      language: lang,
      currency,
      route: pathname,
      intent: trackedIntent,
      origin: "auto",
    })

    if (trackedIntent === "support" && pathname.startsWith("/checkout")) {
      trackAssistantEvent("checkout_help_prompted", {
        language: lang,
        currency,
        route: pathname,
        intent: "support",
        origin: "auto",
      })
    }
  }, [currency, isOpen, lang, openedCount, pathname, profile, secondsOnPage])

  const quickReplies = useMemo(() => getQuickReplies(lang), [lang])

  const context: AssistantContext = useMemo(
    () => ({ lang, currency, pathname, secondsOnPage }),
    [lang, currency, pathname, secondsOnPage]
  )

  const onSelectReply = (intent: AssistantIntent) => {
    const replyLabel = quickReplies.find((item) => item.intent === intent)?.label ?? intent
    setMessages((prev) => [
      ...prev,
      { id: cryptoId(), role: "user", text: replyLabel },
      { id: cryptoId(), role: "assistant", text: getIntentResponse(intent, context) },
    ])

    const mappedIntent = intent === "whatsapp" ? "support" : intent
    const updated = updateAssistantProfile({ intent: mappedIntent })
    setProfile(updated.profile)
    updateAssistantConversation({ lastIntent: mappedIntent, stage: "recommend" })

    trackAssistantEvent("quick_reply_clicked", {
      language: lang,
      currency,
      route: pathname,
      intent: mappedIntent,
      origin: "user",
    })

    if (intent === "whatsapp") {
      handleWhatsApp()
    }
  }

  const handleWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
    if (!phone) {
      setMessages((prev) => [
        ...prev,
        { id: cryptoId(), role: "assistant", text: copy.intents.support },
      ])
      return
    }

    const updated = updateAssistantProfile({ whatsappIntent: true })
    setProfile(updated.profile)

    const message = buildWhatsAppHandoffMessage({ lang, pathname, profile: updated.profile })
    const url = buildWhatsAppUrl(phone, message)
    trackAssistantEvent("whatsapp_cta_clicked", {
      language: lang,
      currency,
      route: pathname,
      intent: updated.profile.intent ?? undefined,
      origin: "user",
    })
    window.open(url, "_blank")
  }

  const handleLeadToggle = () => {
    const next = !showLeadForm
    setShowLeadForm(next)
    if (next) {
      trackAssistantEvent("lead_capture_started", {
        language: lang,
        currency,
        route: pathname,
        origin: "user",
      })
      updateAssistantConversation({ stage: "lead" })
    }
  }

  const handleLeadChange = (field: keyof typeof leadValues, value: string) => {
    setLeadValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleLeadSubmit = () => {
    const updatedSession = updateAssistantLead({
      name: leadValues.name || undefined,
      email: leadValues.email || undefined,
      whatsapp: leadValues.whatsapp || undefined,
      travelerType: leadValues.travelerType || undefined,
      interestFocus: leadValues.interestFocus || undefined,
    })

    if (leadValues.travelerType) {
      updateAssistantProfile({ travelerType: leadValues.travelerType as TravelerType })
    }

    if (leadValues.interestFocus) {
      updateAssistantProfile({ interestFocus: leadValues.interestFocus as InterestFocus })
    }

    setProfile(updatedSession.profile)

    trackAssistantEvent("lead_capture_completed", {
      language: lang,
      currency,
      route: pathname,
      intent: updatedSession.profile.intent ?? undefined,
      origin: "user",
    })

    setShowLeadForm(false)
  }

  if (isHidden) return null

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] right-4 z-50 flex max-w-[calc(100vw-1rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:max-w-[420px]">
      {isOpen ? (
        <AssistantPanel
          title={resolveAssistantTitle(lang)}
          messages={messages}
          quickReplies={quickReplies}
          onSelectReply={onSelectReply}
          onClose={() => {
            setIsHidden(true)
            trackAssistantEvent("assistant_dismissed", {
              language: lang,
              currency,
              route: pathname,
              origin: "user",
            })
          }}
          onMinimize={() => {
            setIsOpen(false)
            trackAssistantEvent("widget_closed", {
              language: lang,
              currency,
              route: pathname,
              origin: "user",
            })
          }}
          onWhatsApp={handleWhatsApp}
          onLeadToggle={handleLeadToggle}
          onLeadChange={handleLeadChange}
          onLeadSubmit={handleLeadSubmit}
          showLeadForm={showLeadForm}
          leadValues={leadValues}
          labels={{
            close: copy.labels.close,
            minimize: copy.labels.minimize,
            whatsapp: copy.ctas.whatsapp,
            leadCta: copy.ctas.lead,
            leadSubmit: copy.ctas.leadSubmit,
            leadTitle: copy.lead.title,
            leadDescription: copy.lead.description,
            optional: copy.lead.optional,
            name: copy.lead.name,
            email: copy.lead.email,
            whatsappLabel: copy.lead.whatsapp,
            travelerType: copy.lead.travelerType,
            travelerBrasil: copy.lead.travelerBrasil,
            travelerInternational: copy.lead.travelerInternational,
            interestFocus: copy.lead.interestFocus,
            focusNature: copy.lead.focusNature,
            focusCulture: copy.lead.focusCulture,
            focusComfort: copy.lead.focusComfort,
            focusValue: copy.lead.focusValue,
          }}
        />
      ) : (
        <AssistantLauncher
          label={copy.labels.open}
          text={copy.title}
          onClick={() => handleOpen("user")}
          unreadCount={messages.length > 0 ? 1 : 0}
        />
      )}
    </div>
  )
}

function cryptoId() {
  return typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)
}
