"use client"

import { useMemo, useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminMediaField from "@/components/admin/AdminMediaField"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import { useAdminPersistedSave } from "@/components/admin/use-admin-persisted-save"
import {
  adminExperiencesInitialDraft,
  type AdminExperienceDraftItem,
  type AdminExperiencesDraft,
  type AdminExperienceLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-experiences-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
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
        <span className={selected ? "text-white/72" : "text-slate-400"}>{item.slug}</span>
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
        {localized.locationLabel} - {localized.durationLabel}
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

function updateSelectedMediaUrl(items: AdminExperienceDraftItem[], slug: string, value: string) {
  return items.map((item) =>
    item.slug === slug
      ? {
          ...item,
          selectedMediaUrl: value,
        }
      : item,
  )
}

export default function ExperiencesStudioEditor({
  initialDraft = adminExperiencesInitialDraft,
}: {
  initialDraft?: AdminExperiencesDraft
}) {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [selectedSlug, setSelectedSlug] = useState(initialDraft.items[0]?.slug ?? "")
  const [liveDraft, setLiveDraft] = useState(initialDraft)
  const {
    draft,
    setDraft,
    saveDraft,
    markPersisted,
    resetDraft,
    exportDraft,
    hasUnsavedChanges,
    savedAtLabel,
    statusMessage,
  } = useAdminDraft(STORAGE_KEY, initialDraft)

  const selectedDraft = useMemo(
    () => draft.items.find((item) => item.slug === selectedSlug) ?? draft.items[0],
    [draft.items, selectedSlug],
  )
  const selectedLive = useMemo(
    () => liveDraft.items.find((item) => item.slug === selectedDraft?.slug) ?? liveDraft.items[0],
    [liveDraft.items, selectedDraft],
  )
  const selectedBase = useMemo(
    () =>
      adminExperiencesInitialDraft.items.find((item) => item.slug === selectedDraft?.slug) ??
      adminExperiencesInitialDraft.items[0],
    [selectedDraft],
  )

  const { isPersisting, persistMessage, persistState, saveAndPersist } = useAdminPersistedSave({
    surface: "experiences",
    draft,
    saveDraft,
    markPersisted: (value, message) => {
      markPersisted(value, message)
      setLiveDraft(cloneDraft(value))
    },
  })

  if (!selectedDraft || !selectedLive || !selectedBase) {
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
        title="Editor do catalogo de experiencias"
        description="Escolha uma experiencia, veja o texto que esta no ar e escreva a nova versao logo abaixo. Slugs, rotas e checkout continuam intactos."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        hasUnsavedChanges={hasUnsavedChanges}
        persistState={persistState}
        scopeNote="Os textos desta area sao persistidos e podem refletir no site. A imagem escolhida aqui fica registrada no Admin Studio como referencia visual para a proxima fase de publicacao de midia."
        onSave={saveAndPersist}
        onExport={() => exportDraft(`travel-marajo-experiences-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[300px,minmax(0,1fr)]">
        <aside className="space-y-4">
          <AdminSectionCard
            eyebrow="Selecao"
            title="Experiencias do catalogo"
            description="Clique em uma experiencia para editar o texto e preparar a imagem de referencia."
          >
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
          </AdminSectionCard>
        </aside>

        <div className="space-y-6">
          <AdminSectionCard
            eyebrow="Imagem"
            title={`Imagem e apresentacao de ${localeDraft.title}`}
            description="A imagem abaixo serve como preparo visual. O texto desta pagina continua sendo a parte efetivamente publicada."
          >
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
              <strong className="text-[#0B1C2C]">Slug fixo:</strong> {selectedDraft.slug}
              <br />
              <strong className="text-[#0B1C2C]">Categoria:</strong> {selectedDraft.categoryKey}
              <br />
              <strong className="text-[#0B1C2C]">Destaque:</strong>{" "}
              {selectedDraft.featured ? "Sim" : "Nao"}
            </div>

            <AdminMediaField
              label="Imagem principal desta experiencia"
              helper="Escolha uma imagem da biblioteca para representar esta experiencia de forma visual no estudio."
              liveImageUrl={selectedBase.selectedMediaUrl}
              draftImageUrl={selectedDraft.selectedMediaUrl}
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  items: updateSelectedMediaUrl(current.items, selectedDraft.slug, value),
                }))
              }
              pendingNote="A imagem selecionada fica salva na camada do Admin Studio como referencia editorial. A pagina publica continua usando a imagem atual ate a integracao visual dedicada."
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Texto principal"
            title="O que o viajante le primeiro"
            description="Mantenha o texto claro, facil de comparar e direto para quem esta decidindo qual experiencia reservar."
          >
            <AdminTextFieldCard
              label="Titulo principal da experiencia"
              helper="Nome que aparece nos cards e na pagina desta experiencia."
              liveValue={liveLocale.title}
              value={localeDraft.title}
              onChange={(value) => updateField("title", value)}
            />
            <AdminTextFieldCard
              label="Descricao curta para convencer rapidamente"
              helper="Texto curto usado para apresentar o valor da experiencia de forma imediata."
              liveValue={liveLocale.shortDescription}
              value={localeDraft.shortDescription}
              onChange={(value) => updateField("shortDescription", value)}
              multiline
            />
            <AdminTextFieldCard
              label="Descricao completa da pagina"
              helper="Texto mais detalhado para quem quer entender melhor a experiencia antes de reservar."
              liveValue={liveLocale.fullDescription}
              value={localeDraft.fullDescription}
              onChange={(value) => updateField("fullDescription", value)}
              multiline
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Informacoes praticas"
            title="Dados que ajudam a comparar opcoes"
            description="Estes campos aparecem como pistas rapidas para o viajante."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminTextFieldCard
                label="Local exibido ao viajante"
                helper="Nome do lugar usado nos cards e na pagina."
                liveValue={liveLocale.locationLabel}
                value={localeDraft.locationLabel}
                onChange={(value) => updateField("locationLabel", value)}
              />
              <AdminTextFieldCard
                label="Duracao exibida ao viajante"
                helper="Duracao resumida para comparacao rapida."
                liveValue={liveLocale.durationLabel}
                value={localeDraft.durationLabel}
                onChange={(value) => updateField("durationLabel", value)}
              />
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Ajuda para decidir"
            title="Destaques e inclusoes"
            description="Use listas claras e objetivas para facilitar a leitura."
          >
            <AdminTextFieldCard
              label="Destaques para ajudar na decisao"
              helper="Escreva um destaque por linha."
              liveValue={liveLocale.highlightsText}
              value={localeDraft.highlightsText}
              onChange={(value) => updateField("highlightsText", value)}
              multiline
            />
            <AdminTextFieldCard
              label="O que esta incluido"
              helper="Liste um item incluido por linha."
              liveValue={liveLocale.includedText}
              value={localeDraft.includedText}
              onChange={(value) => updateField("includedText", value)}
              multiline
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
