"use client"

import { useMemo, useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import {
  adminExperiencesInitialDraft,
  type AdminExperienceDraftItem,
  type AdminExperienceLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-experiences-draft"

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

function SnapshotCard({
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
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Ao vivo no projeto
      </p>
      <p className="mt-1 text-sm leading-6 text-[#0B1C2C]">{liveValue}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Rascunho local
      </p>
      <p className={`mt-1 text-sm leading-6 ${changed ? "text-[#0B1C2C]" : "text-slate-500"}`}>
        {draftValue}
      </p>
      <span
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          changed ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {changed ? "Rascunho diferente do live" : "Sem mudanca local"}
      </span>
    </div>
  )
}

function ExperienceListButton({
  item,
  locale,
  selected,
  onSelect,
}: {
  item: AdminExperienceDraftItem
  locale: AppLocale
  selected: boolean
  onSelect: () => void
}) {
  const localized = item.locales[locale]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
        selected
          ? "border-[#0B1C2C] bg-[#0B1C2C] text-white shadow-[0_18px_40px_rgba(11,28,44,0.16)]"
          : "border-slate-200 bg-white text-[#0B1C2C] hover:border-slate-300"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
        <span className={selected ? "text-white/70" : "text-slate-400"}>{item.slug}</span>
        {item.featured ? (
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
              selected ? "bg-white/10 text-white" : "bg-[#FFF1E8] text-[#b25d18]"
            }`}
          >
            Destaque
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-semibold leading-6">{localized.title}</p>
      <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
        {localized.durationLabel} • {localized.locationLabel}
      </p>
    </button>
  )
}

function updateExperienceField(
  items: AdminExperienceDraftItem[],
  slug: string,
  locale: AppLocale,
  field: keyof AdminExperienceLocaleDraft,
  value: string,
) {
  return items.map((item) =>
    item.slug === slug
      ? {
          ...item,
          locales: {
            ...item.locales,
            [locale]: {
              ...item.locales[locale],
              [field]: value,
            },
          },
        }
      : item,
  )
}

export default function ExperiencesStudioEditor() {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [selectedSlug, setSelectedSlug] = useState(adminExperiencesInitialDraft.items[0]?.slug ?? "")
  const { draft, setDraft, saveDraft, resetDraft, exportDraft, savedAtLabel, statusMessage } =
    useAdminDraft(STORAGE_KEY, adminExperiencesInitialDraft)

  const selectedDraft = useMemo(
    () => draft.items.find((item) => item.slug === selectedSlug) ?? draft.items[0],
    [draft.items, selectedSlug],
  )
  const selectedLive = useMemo(
    () =>
      adminExperiencesInitialDraft.items.find((item) => item.slug === selectedDraft?.slug) ??
      adminExperiencesInitialDraft.items[0],
    [selectedDraft],
  )

  if (!selectedDraft || !selectedLive) {
    return null
  }

  const localeDraft = selectedDraft.locales[activeLocale]
  const liveLocale = selectedLive.locales[activeLocale]

  const updateField = (field: keyof AdminExperienceLocaleDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      items: updateExperienceField(current.items, selectedDraft.slug, activeLocale, field, value),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Experiencias"
        title="Editor das experiencias"
        description="Selecione uma experiencia, revise o texto visivel por idioma e monte um rascunho local antes de qualquer futura camada de publicacao. Slugs, rotas e checkout permanecem intactos."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        savedAtLabel={savedAtLabel}
        statusMessage={statusMessage}
        scopeNote="Este editor salva apenas rascunhos locais neste navegador. Nada daqui altera as paginas publicas ou publica mudancas ao vivo nesta fase."
        onSave={saveDraft}
        onExport={() => exportDraft(`travel-marajo-experiences-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[280px,minmax(0,1.08fr),360px]">
        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Selecao</p>
            <h2 className="mt-3 text-xl font-display text-[#0B1C2C]">Experiencias do catalogo</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Escolha a experiencia para revisar texto, descricao longa, highlights e inclusoes no
              idioma ativo.
            </p>
          </section>

          <div className="space-y-3">
            {draft.items.map((item) => (
              <ExperienceListButton
                key={item.slug}
                item={item}
                locale={activeLocale}
                selected={item.slug === selectedDraft.slug}
                onSelect={() => setSelectedSlug(item.slug)}
              />
            ))}
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Resumo visivel</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Titulo da experiencia"
                value={localeDraft.title}
                onChange={(value) => updateField("title", value)}
              />
              <EditorField
                label="Descricao curta"
                value={localeDraft.shortDescription}
                onChange={(value) => updateField("shortDescription", value)}
                multiline
              />
              <EditorField
                label="Descricao longa"
                value={localeDraft.fullDescription}
                onChange={(value) => updateField("fullDescription", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Dados visiveis da ficha
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <EditorField
                label="Local exibido"
                value={localeDraft.locationLabel}
                onChange={(value) => updateField("locationLabel", value)}
              />
              <EditorField
                label="Duracao exibida"
                value={localeDraft.durationLabel}
                onChange={(value) => updateField("durationLabel", value)}
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Highlights e inclusoes
            </p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Highlights visiveis (1 por linha)"
                value={localeDraft.highlightsText}
                onChange={(value) => updateField("highlightsText", value)}
                multiline
              />
              <EditorField
                label="Itens incluidos (1 por linha)"
                value={localeDraft.includedText}
                onChange={(value) => updateField("includedText", value)}
                multiline
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              O que fica fora deste editor
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Os textos genericos de reserva, checkout seguro e suporte comercial continuam
              centralizados no editor de conteudo global. Aqui voce edita apenas o texto proprio de
              cada experiencia.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Leitura operacional</p>
            <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">O que esta sendo editado</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>Slug fixo: {selectedDraft.slug}</li>
              <li>Categoria atual: {selectedDraft.categoryKey}</li>
              <li>{selectedDraft.featured ? "Experiencia em destaque" : "Experiencia de catalogo"}</li>
              <li>Todos os idiomas usam a mesma estrutura de campos</li>
            </ul>
          </section>

          <SnapshotCard
            title="Titulo"
            liveValue={liveLocale.title}
            draftValue={localeDraft.title}
          />
          <SnapshotCard
            title="Descricao curta"
            liveValue={liveLocale.shortDescription}
            draftValue={localeDraft.shortDescription}
          />
          <SnapshotCard
            title="Highlights"
            liveValue={liveLocale.highlightsText}
            draftValue={localeDraft.highlightsText}
          />
        </aside>
      </div>
    </div>
  )
}
