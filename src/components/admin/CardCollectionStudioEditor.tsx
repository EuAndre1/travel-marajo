"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import type { AppLocale } from "@/config/i18n"
import type {
  AdminCardCollectionDraft,
  AdminCardDraftItem,
  AdminCardLocaleDraft,
} from "@/lib/admin-studio/card-collections"
import type { ContentStudioSurface } from "@/lib/content-studio/resolvers"
import AdminCardImageField from "@/components/admin/AdminCardImageField"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import { useAdminPersistedSave } from "@/components/admin/use-admin-persisted-save"

interface FieldCopy {
  label: string
  helper: string
  multiline?: boolean
}

interface CardCollectionEditorCopy {
  eyebrow: string
  title: string
  description: string
  scopeNote: string
  addButtonLabel: string
  listTitle: string
  listDescription: string
  imageLabel: string
  imageHelper: string
  sharedInfoTitle: string
  sharedInfoDescription: string
  fieldCopy: {
    title: FieldCopy
    eyebrow: FieldCopy
    description: FieldCopy
    metaPrimary: FieldCopy
    metaSecondary: FieldCopy
    ctaLabel: FieldCopy
    ctaTarget: FieldCopy
  }
}

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function createEmptyLocaleDraft(): AdminCardLocaleDraft {
  return {
    title: "",
    eyebrow: "",
    description: "",
    metaPrimary: "",
    metaSecondary: "",
    ctaLabel: "",
  }
}

function createNewCard(sortOrder: number): AdminCardDraftItem {
  return {
    id: crypto.randomUUID(),
    linkedSlug: "",
    imageUrl: "",
    ctaTarget: "",
    visible: false,
    sortOrder,
    locales: {
      pt: createEmptyLocaleDraft(),
      en: createEmptyLocaleDraft(),
      es: createEmptyLocaleDraft(),
      fr: createEmptyLocaleDraft(),
    },
  }
}

function createEmptyLiveCard(card: AdminCardDraftItem): AdminCardDraftItem {
  return {
    ...card,
    imageUrl: "",
    ctaTarget: "",
    visible: false,
    locales: {
      pt: createEmptyLocaleDraft(),
      en: createEmptyLocaleDraft(),
      es: createEmptyLocaleDraft(),
      fr: createEmptyLocaleDraft(),
    },
  }
}

function normalizeOrder(items: AdminCardDraftItem[]) {
  return items.map((item, index) => ({
    ...item,
    sortOrder: index,
  }))
}

function CardListButton({
  item,
  locale,
  selected,
  onSelect,
}: {
  item: AdminCardDraftItem
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
        <span className={selected ? "text-white/72" : "text-slate-400"}>
          Posicao {item.sortOrder + 1}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            item.visible
              ? selected
                ? "bg-white/10 text-white"
                : "bg-emerald-100 text-emerald-800"
              : selected
                ? "bg-white/10 text-white/80"
                : "bg-slate-200 text-slate-600"
          }`}
        >
          {item.visible ? "Visivel no site" : "Oculto no site"}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6">
        {localized.title || "Novo card sem titulo"}
      </p>
      <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
        {localized.eyebrow || localized.metaPrimary || item.ctaTarget || "Preencha este card para publicar."}
      </p>
    </button>
  )
}

function CardVisualPreview({
  item,
  locale,
}: {
  item: AdminCardDraftItem
  locale: AppLocale
}) {
  const localized = item.locales[locale]

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
      <div className="relative h-52 bg-slate-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={localized.title || "Card selecionado"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Escolha uma imagem para este card
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        {localized.eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {localized.eyebrow}
          </p>
        ) : null}
        <h3 className="text-2xl font-display leading-tight text-[#0B1C2C]">
          {localized.title || "Titulo do card"}
        </h3>
        {localized.description ? (
          <p className="text-sm leading-6 text-slate-600">{localized.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {localized.metaPrimary ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {localized.metaPrimary}
            </span>
          ) : null}
          {localized.metaSecondary ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {localized.metaSecondary}
            </span>
          ) : null}
        </div>
        <div className="inline-flex rounded-full bg-[#0B1C2C] px-4 py-2 text-sm font-semibold text-white">
          {localized.ctaLabel || "Botao do card"}
        </div>
      </div>
    </div>
  )
}

export default function CardCollectionStudioEditor({
  surface,
  storageKey,
  initialDraft,
  copy,
}: {
  surface: Extract<
    ContentStudioSurface,
    "destinationCards" | "routeCards" | "hotelCards" | "serviceCards"
  >
  storageKey: string
  initialDraft: AdminCardCollectionDraft
  copy: CardCollectionEditorCopy
}) {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [selectedId, setSelectedId] = useState(initialDraft.items[0]?.id ?? "")
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
  } = useAdminDraft(storageKey, initialDraft)

  const selectedDraft = useMemo(
    () => draft.items.find((item) => item.id === selectedId) ?? draft.items[0] ?? null,
    [draft.items, selectedId],
  )
  const selectedLive = useMemo(
    () =>
      liveDraft.items.find((item) => item.id === selectedDraft?.id) ??
      (selectedDraft ? createEmptyLiveCard(selectedDraft) : null),
    [liveDraft.items, selectedDraft],
  )

  const { isPersisting, persistMessage, persistState, saveAndPersist } = useAdminPersistedSave({
    surface,
    draft,
    saveDraft,
    markPersisted: (value, message) => {
      markPersisted(value, message)
      setLiveDraft(cloneDraft(value))
    },
  })

  const localeDraft = selectedDraft?.locales[activeLocale] ?? null
  const liveLocale = selectedLive?.locales[activeLocale] ?? null

  useEffect(() => {
    if (draft.items.length === 0) {
      if (selectedId) {
        setSelectedId("")
      }
      return
    }

    if (!draft.items.some((item) => item.id === selectedId)) {
      setSelectedId(draft.items[0].id)
    }
  }, [draft.items, selectedId])

  const updateLocaleField = (field: keyof AdminCardLocaleDraft, value: string) => {
    if (!selectedDraft) {
      return
    }

    setDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === selectedDraft.id
          ? {
              ...item,
              locales: {
                ...item.locales,
                [activeLocale]: {
                  ...item.locales[activeLocale],
                  [field]: value,
                },
              },
            }
          : item,
      ),
    }))
  }

  const updateSharedField = (
    field: keyof Pick<AdminCardDraftItem, "imageUrl" | "ctaTarget" | "visible">,
    value: string | boolean,
  ) => {
    if (!selectedDraft) {
      return
    }

    setDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === selectedDraft.id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }))
  }

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedDraft) {
      return
    }

    const currentIndex = draft.items.findIndex((item) => item.id === selectedDraft.id)
    const nextIndex = currentIndex + direction

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= draft.items.length) {
      return
    }

    const nextItems = [...draft.items]
    ;[nextItems[currentIndex], nextItems[nextIndex]] = [nextItems[nextIndex], nextItems[currentIndex]]

    setDraft((current) => ({
      ...current,
      items: normalizeOrder(nextItems),
    }))
  }

  const addCard = () => {
    const nextCard = createNewCard(draft.items.length)

    setDraft((current) => ({
      ...current,
      items: [...current.items, nextCard],
    }))
    setSelectedId(nextCard.id)
  }

  const deleteCard = () => {
    if (!selectedDraft) {
      return
    }

    const confirmed = window.confirm("Remover este card da colecao?")

    if (!confirmed) {
      return
    }

    const nextItems = normalizeOrder(draft.items.filter((item) => item.id !== selectedDraft.id))
    setDraft((current) => ({
      ...current,
      items: nextItems,
    }))
    setSelectedId(nextItems[0]?.id ?? "")
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        hasUnsavedChanges={hasUnsavedChanges}
        persistState={persistState}
        scopeNote={copy.scopeNote}
        onSave={saveAndPersist}
        onExport={() => exportDraft(`${surface}-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-5 xl:grid-cols-[300px,minmax(0,1fr)]">
        <aside className="space-y-4">
          <AdminSectionCard
            eyebrow="Colecao"
            title={copy.listTitle}
            description={copy.listDescription}
          >
            <button
              type="button"
              onClick={addCard}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#10283d]"
            >
              {copy.addButtonLabel}
            </button>

            <div className="mt-4 space-y-3">
              {draft.items.map((item) => (
                <CardListButton
                  key={item.id}
                  item={item}
                  locale={activeLocale}
                  selected={item.id === selectedDraft?.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </AdminSectionCard>
        </aside>

        <div className="space-y-6">
          {selectedDraft && selectedLive && localeDraft && liveLocale ? (
            <>
              <AdminSectionCard
                eyebrow="Preview do card"
                title="Como este bloco aparece na vitrine"
                description="Veja primeiro a leitura visual do card antes de ajustar texto, imagem e acao."
              >
                <CardVisualPreview item={selectedDraft} locale={activeLocale} />
              </AdminSectionCard>

              <AdminSectionCard
                eyebrow="Imagem"
                title={copy.imageLabel}
                description={copy.imageHelper}
              >
                <AdminCardImageField
                  label="Imagem do card"
                  helper="Escolha uma imagem da biblioteca persistente para este card."
                  liveImageUrl={selectedLive.imageUrl}
                  draftImageUrl={selectedDraft.imageUrl}
                  onChange={(value) => updateSharedField("imageUrl", value)}
                />
              </AdminSectionCard>

              <AdminSectionCard
                eyebrow="Texto do card"
                title="Conteudo principal"
                description="Cada campo abaixo mostra o valor atual do site e a nova versao que sera publicada ao salvar."
              >
                <AdminTextFieldCard
                  label={copy.fieldCopy.title.label}
                  helper={copy.fieldCopy.title.helper}
                  liveValue={liveLocale.title}
                  value={localeDraft.title}
                  onChange={(value) => updateLocaleField("title", value)}
                  multiline={copy.fieldCopy.title.multiline}
                />
                <AdminTextFieldCard
                  label={copy.fieldCopy.eyebrow.label}
                  helper={copy.fieldCopy.eyebrow.helper}
                  liveValue={liveLocale.eyebrow}
                  value={localeDraft.eyebrow}
                  onChange={(value) => updateLocaleField("eyebrow", value)}
                  multiline={copy.fieldCopy.eyebrow.multiline}
                />
                <AdminTextFieldCard
                  label={copy.fieldCopy.description.label}
                  helper={copy.fieldCopy.description.helper}
                  liveValue={liveLocale.description}
                  value={localeDraft.description}
                  onChange={(value) => updateLocaleField("description", value)}
                  multiline
                />
                <div className="grid gap-5 lg:grid-cols-2">
                  <AdminTextFieldCard
                    label={copy.fieldCopy.metaPrimary.label}
                    helper={copy.fieldCopy.metaPrimary.helper}
                    liveValue={liveLocale.metaPrimary}
                    value={localeDraft.metaPrimary}
                    onChange={(value) => updateLocaleField("metaPrimary", value)}
                    multiline={copy.fieldCopy.metaPrimary.multiline}
                  />
                  <AdminTextFieldCard
                    label={copy.fieldCopy.metaSecondary.label}
                    helper={copy.fieldCopy.metaSecondary.helper}
                    liveValue={liveLocale.metaSecondary}
                    value={localeDraft.metaSecondary}
                    onChange={(value) => updateLocaleField("metaSecondary", value)}
                    multiline={copy.fieldCopy.metaSecondary.multiline}
                  />
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  <AdminTextFieldCard
                    label={copy.fieldCopy.ctaLabel.label}
                    helper={copy.fieldCopy.ctaLabel.helper}
                    liveValue={liveLocale.ctaLabel}
                    value={localeDraft.ctaLabel}
                    onChange={(value) => updateLocaleField("ctaLabel", value)}
                  />
                  <AdminTextFieldCard
                    label={copy.fieldCopy.ctaTarget.label}
                    helper={copy.fieldCopy.ctaTarget.helper}
                    liveValue={selectedLive.ctaTarget}
                    value={selectedDraft.ctaTarget}
                    onChange={(value) => updateSharedField("ctaTarget", value)}
                  />
                </div>
              </AdminSectionCard>

              <AdminSectionCard
                eyebrow="Operacao do card"
                title={copy.sharedInfoTitle}
                description={copy.sharedInfoDescription}
              >
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  <strong className="text-[#0B1C2C]">Identificador:</strong> {selectedDraft.id}
                  <br />
                  <strong className="text-[#0B1C2C]">Slug de referencia:</strong>{" "}
                  {selectedDraft.linkedSlug || "Sem slug vinculado"}
                  <br />
                  <strong className="text-[#0B1C2C]">Posicao atual:</strong>{" "}
                  {selectedDraft.sortOrder + 1}
                </div>

                <label className="flex items-center gap-3 rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedDraft.visible}
                    onChange={(event) => updateSharedField("visible", event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0B1C2C] focus:ring-[#0B1C2C]"
                  />
                  <span className="font-semibold text-[#0B1C2C]">Show on site</span>
                  <span className="text-slate-500">
                    {selectedDraft.visible
                      ? "Este card esta visivel na pagina publica."
                      : "Este card fica salvo, mas nao aparece no site."}
                  </span>
                </label>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => moveSelected(-1)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    Mover para cima
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSelected(1)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    Mover para baixo
                  </button>
                  <button
                    type="button"
                    onClick={deleteCard}
                    className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              </AdminSectionCard>
            </>
          ) : (
            <AdminSectionCard
              eyebrow="Colecao"
              title="Nenhum card selecionado"
              description="Use o botao de adicionar para criar o primeiro card desta colecao."
            >
              <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-7 text-slate-600">
                Quando voce adicionar o primeiro card, os campos de imagem, texto, ordem e
                visibilidade aparecem aqui.
              </div>
            </AdminSectionCard>
          )}
        </div>
      </div>
    </div>
  )
}
