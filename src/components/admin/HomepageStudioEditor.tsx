"use client"

import { useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import {
  adminHomepageInitialDraft,
  type AdminHomepageLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-homepage-draft"

function EditorField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}) {
  const className =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0B1C2C]"

  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#0B1C2C]">{label}</span>
      {multiline ? (
        <textarea
          className={`${className} min-h-[120px]`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={className}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  )
}

function LiveSnapshot({
  title,
  liveValue,
  draftValue,
}: {
  title: string
  liveValue: string
  draftValue: string
}) {
  const changed = liveValue !== draftValue

  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{title}</p>
      <div className="mt-3 space-y-3 text-sm leading-6">
        <div>
          <p className="font-semibold text-slate-500">Ao vivo no projeto</p>
          <p className="mt-1 text-[#0B1C2C]">{liveValue}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-500">Rascunho do editor</p>
          <p className={`mt-1 ${changed ? "text-[#0B1C2C]" : "text-slate-500"}`}>{draftValue}</p>
        </div>
      </div>
      <span
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          changed ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {changed ? "Alterado no rascunho" : "Sem mudança local"}
      </span>
    </div>
  )
}

export default function HomepageStudioEditor() {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const { draft, setDraft, saveDraft, resetDraft, exportDraft, savedAtLabel, statusMessage } =
    useAdminDraft(STORAGE_KEY, adminHomepageInitialDraft)

  const localeDraft = draft.locales[activeLocale]
  const liveLocale = adminHomepageInitialDraft.locales[activeLocale]

  const updateField = (field: keyof AdminHomepageLocaleDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      locales: {
        ...current.locales,
        [activeLocale]: {
          ...current.locales[activeLocale],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Homepage"
        title="Editor da homepage"
        description="Edite a primeira dobra, a camada de confiança e a mensagem final da home sem depender de alteração manual em código. Nesta fase, tudo é salvo como rascunho local neste navegador."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        savedAtLabel={savedAtLabel}
        statusMessage={statusMessage}
        scopeNote="Os campos abaixo refletem a fonte real de conteúdo da homepage. O botão de salvar armazena apenas um rascunho local neste navegador; nenhuma mudança vai ao ar automaticamente."
        onSave={saveDraft}
        onExport={() => exportDraft(`travel-marajo-homepage-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Hero principal</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Headline principal"
                value={localeDraft.heroHeadline}
                onChange={(value) => updateField("heroHeadline", value)}
                multiline
              />
              <EditorField
                label="Subheadline"
                value={localeDraft.heroSubheadline}
                onChange={(value) => updateField("heroSubheadline", value)}
                multiline
              />
              <div className="grid gap-5 md:grid-cols-2">
                <EditorField
                  label="CTA primário"
                  value={localeDraft.primaryCtaLabel}
                  onChange={(value) => updateField("primaryCtaLabel", value)}
                />
                <EditorField
                  label="CTA secundário"
                  value={localeDraft.secondaryCtaLabel}
                  onChange={(value) => updateField("secondaryCtaLabel", value)}
                />
              </div>
              <EditorField
                label="Texto da trust strip"
                value={localeDraft.trustStripLabel}
                onChange={(value) => updateField("trustStripLabel", value)}
              />
              <EditorField
                label="Sinais de confiança do hero (1 por linha)"
                value={localeDraft.trustItems}
                onChange={(value) => updateField("trustItems", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Narrativa editorial</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Título introdutório de Why Marajó"
                value={localeDraft.whyMarajoTitle}
                onChange={(value) => updateField("whyMarajoTitle", value)}
                multiline
              />
              <EditorField
                label="Texto introdutório de Why Marajó"
                value={localeDraft.whyMarajoIntro}
                onChange={(value) => updateField("whyMarajoIntro", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Concierge e CTA final</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Título do bloco de concierge"
                value={localeDraft.conciergeTitle}
                onChange={(value) => updateField("conciergeTitle", value)}
                multiline
              />
              <EditorField
                label="Texto do bloco de concierge"
                value={localeDraft.conciergeText}
                onChange={(value) => updateField("conciergeText", value)}
                multiline
              />
              <EditorField
                label="Título do CTA final"
                value={localeDraft.finalCtaTitle}
                onChange={(value) => updateField("finalCtaTitle", value)}
                multiline
              />
              <EditorField
                label="Texto do CTA final"
                value={localeDraft.finalCtaText}
                onChange={(value) => updateField("finalCtaText", value)}
                multiline
              />
              <div className="grid gap-5 md:grid-cols-2">
                <EditorField
                  label="CTA final primário"
                  value={localeDraft.finalPrimaryLabel}
                  onChange={(value) => updateField("finalPrimaryLabel", value)}
                />
                <EditorField
                  label="CTA final secundário"
                  value={localeDraft.finalSecondaryLabel}
                  onChange={(value) => updateField("finalSecondaryLabel", value)}
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Leitura operacional</p>
            <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">O que este editor controla</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>Headline e subheadline do hero</li>
              <li>Rótulos principais de CTA</li>
              <li>Texto da trust strip</li>
              <li>Introdução do bloco Why Marajó</li>
              <li>Mensagem de concierge</li>
              <li>Bloco final de conversão</li>
            </ul>
          </section>

          <LiveSnapshot
            title="Hero"
            liveValue={liveLocale.heroHeadline}
            draftValue={localeDraft.heroHeadline}
          />
          <LiveSnapshot
            title="Why Marajó"
            liveValue={liveLocale.whyMarajoIntro}
            draftValue={localeDraft.whyMarajoIntro}
          />
          <LiveSnapshot
            title="CTA final"
            liveValue={liveLocale.finalCtaText}
            draftValue={localeDraft.finalCtaText}
          />
        </aside>
      </div>
    </div>
  )
}
