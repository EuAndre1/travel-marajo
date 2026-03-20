"use client"

import type { AssistantIntent } from "@/lib/assistant-rules"
import type { InterestFocus, TravelerType } from "@/types/assistant-profile"

interface AssistantMessage {
  id: string
  role: "assistant" | "user"
  text: string
}

interface AssistantQuickReply {
  label: string
  intent: AssistantIntent
}

interface LeadFormValues {
  name: string
  email: string
  whatsapp: string
  travelerType: TravelerType | ""
  interestFocus: InterestFocus | ""
}

interface AssistantPanelProps {
  title: string
  messages: AssistantMessage[]
  quickReplies: AssistantQuickReply[]
  onSelectReply: (intent: AssistantIntent) => void
  onClose: () => void
  onMinimize: () => void
  onWhatsApp: () => void
  onLeadToggle: () => void
  onLeadChange: (field: keyof LeadFormValues, value: string) => void
  onLeadSubmit: () => void
  showLeadForm: boolean
  leadValues: LeadFormValues
  labels: {
    close: string
    minimize: string
    whatsapp: string
    leadCta: string
    leadSubmit: string
    leadTitle: string
    leadDescription: string
    optional: string
    name: string
    email: string
    whatsappLabel: string
    travelerType: string
    travelerBrasil: string
    travelerInternational: string
    interestFocus: string
    focusNature: string
    focusCulture: string
    focusComfort: string
    focusValue: string
  }
}

export default function AssistantPanel({
  title,
  messages,
  quickReplies,
  onSelectReply,
  onClose,
  onMinimize,
  onWhatsApp,
  onLeadToggle,
  onLeadChange,
  onLeadSubmit,
  showLeadForm,
  leadValues,
  labels,
}: AssistantPanelProps) {
  return (
    <div className="w-[min(88vw,360px)] rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden sm:w-[360px]">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1C2C] text-white">
        <div className="text-sm font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMinimize}
            aria-label={labels.minimize}
            className="text-xs text-white/80 hover:text-white"
          >
            -
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="text-xs text-white/80 hover:text-white"
          >
            x
          </button>
        </div>
      </div>

      <div className="max-h-[54vh] space-y-3 overflow-y-auto bg-white px-4 py-4 sm:max-h-[320px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "assistant" ? "flex justify-start" : "flex justify-end"}
          >
            <div
              className={
                message.role === "assistant"
                  ? "rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 max-w-[85%]"
                  : "rounded-2xl bg-primary text-white px-4 py-2 text-sm max-w-[85%]"
              }
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 pt-2 bg-white space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply.intent}
              type="button"
              onClick={() => onSelectReply(reply.intent)}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-primary/40"
            >
              {reply.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
          <div className="text-xs font-semibold text-slate-700">{labels.leadTitle}</div>
          <div className="mt-1 text-[11px] text-slate-500">{labels.leadDescription}</div>
          {showLeadForm ? (
            <div className="mt-3 grid gap-2">
              <label className="text-xs text-slate-500">
                {labels.name} ({labels.optional})
                <input
                  value={leadValues.name}
                  onChange={(event) => onLeadChange("name", event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs"
                />
              </label>
              <label className="text-xs text-slate-500">
                {labels.email} ({labels.optional})
                <input
                  value={leadValues.email}
                  onChange={(event) => onLeadChange("email", event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs"
                />
              </label>
              <label className="text-xs text-slate-500">
                {labels.whatsappLabel} ({labels.optional})
                <input
                  value={leadValues.whatsapp}
                  onChange={(event) => onLeadChange("whatsapp", event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs"
                />
              </label>
              <label className="text-xs text-slate-500">
                {labels.travelerType}
                <select
                  value={leadValues.travelerType}
                  onChange={(event) => onLeadChange("travelerType", event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2 text-xs"
                >
                  <option value="">{labels.optional}</option>
                  <option value="brasil">{labels.travelerBrasil}</option>
                  <option value="international">{labels.travelerInternational}</option>
                </select>
              </label>
              <label className="text-xs text-slate-500">
                {labels.interestFocus}
                <select
                  value={leadValues.interestFocus}
                  onChange={(event) => onLeadChange("interestFocus", event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2 text-xs"
                >
                  <option value="">{labels.optional}</option>
                  <option value="nature">{labels.focusNature}</option>
                  <option value="culture">{labels.focusCulture}</option>
                  <option value="comfort">{labels.focusComfort}</option>
                  <option value="value">{labels.focusValue}</option>
                </select>
              </label>
              <button
                type="button"
                onClick={onLeadSubmit}
                className="mt-2 h-9 rounded-full bg-primary text-xs font-semibold text-white"
              >
                {labels.leadSubmit}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLeadToggle}
              className="mt-2 inline-flex h-8 items-center justify-center rounded-full border border-primary/30 px-3 text-xs font-semibold text-primary"
            >
              {labels.leadCta}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onWhatsApp}
          className="w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          {labels.whatsapp}
        </button>
      </div>
    </div>
  )
}
