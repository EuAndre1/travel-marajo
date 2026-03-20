"use client"

import { useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import {
  adminContentInitialDraft,
  type AdminContentLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-content-draft"

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

function Snapshot({
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
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ao vivo no projeto</p>
      <p className="mt-1 text-sm leading-6 text-[#0B1C2C]">{liveValue}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rascunho local</p>
      <p className={`mt-1 text-sm leading-6 ${changed ? "text-[#0B1C2C]" : "text-slate-500"}`}>{draftValue}</p>
      <span
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          changed ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {changed ? "Rascunho diferente do live" : "Sem mudança local"}
      </span>
    </div>
  )
}

export default function ContentStudioEditor() {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const { draft, setDraft, saveDraft, resetDraft, exportDraft, savedAtLabel, statusMessage } =
    useAdminDraft(STORAGE_KEY, adminContentInitialDraft)

  const localeDraft = draft.locales[activeLocale]
  const liveLocale = adminContentInitialDraft.locales[activeLocale]

  const updateField = (field: keyof AdminContentLocaleDraft, value: string) => {
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
        eyebrow="Conteúdo global"
        title="Editor do conteúdo estrutural do site"
        description="Organize a voz principal da marca, sinais de confiança, CTA globais e a linguagem de concierge em um único lugar. Nesta fase, os saves são rascunhos locais neste navegador."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        savedAtLabel={savedAtLabel}
        statusMessage={statusMessage}
        scopeNote="Este editor não publica nada ao vivo ainda. Ele cria rascunhos locais usando a estrutura real de copy global do projeto, para a operação revisar texto sem tocar manualmente nos arquivos."
        onSave={saveDraft}
        onExport={() => exportDraft(`travel-marajo-content-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Marca e posicionamento</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Tagline da marca"
                value={localeDraft.brandTagline}
                onChange={(value) => updateField("brandTagline", value)}
              />
              <EditorField
                label="Frase principal de autoridade"
                value={localeDraft.authorityStatement}
                onChange={(value) => updateField("authorityStatement", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Rodapé e suporte</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Headline do rodapé"
                value={localeDraft.footerHeadline}
                onChange={(value) => updateField("footerHeadline", value)}
                multiline
              />
              <EditorField
                label="Texto de suporte do rodapé"
                value={localeDraft.footerSupportCopy}
                onChange={(value) => updateField("footerSupportCopy", value)}
                multiline
              />
              <EditorField
                label="Destaques do rodapé (1 por linha)"
                value={localeDraft.footerHighlights}
                onChange={(value) => updateField("footerHighlights", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Confiança e conversão</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Título da camada de confiança"
                value={localeDraft.trustHeadline}
                onChange={(value) => updateField("trustHeadline", value)}
                multiline
              />
              <EditorField
                label="Texto da camada de confiança"
                value={localeDraft.trustBody}
                onChange={(value) => updateField("trustBody", value)}
                multiline
              />
              <EditorField
                label="Destaques de confiança (1 por linha)"
                value={localeDraft.trustHighlights}
                onChange={(value) => updateField("trustHighlights", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Concierge e CTA globais</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Título de concierge"
                value={localeDraft.conciergeTitle}
                onChange={(value) => updateField("conciergeTitle", value)}
                multiline
              />
              <EditorField
                label="Texto de concierge"
                value={localeDraft.conciergeBody}
                onChange={(value) => updateField("conciergeBody", value)}
                multiline
              />
              <EditorField
                label="Tempo / resposta de suporte"
                value={localeDraft.conciergeResponseText}
                onChange={(value) => updateField("conciergeResponseText", value)}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <EditorField
                  label="Rótulo de entrar"
                  value={localeDraft.signInLabel}
                  onChange={(value) => updateField("signInLabel", value)}
                />
                <EditorField
                  label="Rótulo de perfil"
                  value={localeDraft.profileLabel}
                  onChange={(value) => updateField("profileLabel", value)}
                />
                <EditorField
                  label="CTA planejar viagem"
                  value={localeDraft.planTripLabel}
                  onChange={(value) => updateField("planTripLabel", value)}
                />
                <EditorField
                  label="CTA reservar direto"
                  value={localeDraft.bookDirectLabel}
                  onChange={(value) => updateField("bookDirectLabel", value)}
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Leitura operacional</p>
            <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">O que este editor cobre</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>Posicionamento principal da marca</li>
              <li>Copy de rodapé e apoio institucional</li>
              <li>Linguagem de confiança e prova</li>
              <li>Mensagem de concierge</li>
              <li>Rótulos centrais de CTA e navegação</li>
            </ul>
          </section>

          <Snapshot
            title="Marca"
            liveValue={liveLocale.authorityStatement}
            draftValue={localeDraft.authorityStatement}
          />
          <Snapshot
            title="Rodapé"
            liveValue={liveLocale.footerSupportCopy}
            draftValue={localeDraft.footerSupportCopy}
          />
          <Snapshot
            title="Concierge"
            liveValue={liveLocale.conciergeBody}
            draftValue={localeDraft.conciergeBody}
          />
        </aside>
      </div>
    </div>
  )
}
