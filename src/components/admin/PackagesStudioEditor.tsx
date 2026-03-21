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
  adminPackagesInitialDraft,
  type AdminPackageDraftItem,
  type AdminPackagesDraft,
  type AdminPackageLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-packages-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

function PackageListButton({
  item,
  locale,
  selected,
  onSelect,
}: {
  item: AdminPackageDraftItem
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
        {item.isFlagship ? (
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
              selected ? "bg-white/10 text-white" : "bg-[#FFF1E8] text-[#b25d18]"
            }`}
          >
            Landing premium
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-semibold leading-6">{localized.title}</p>
      <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
        {localized.duration} - {formatPrice(item.startingPrice)}
      </p>
    </button>
  )
}

function updatePackageField(
  items: AdminPackageDraftItem[],
  slug: string,
  locale: AppLocale,
  field: keyof AdminPackageLocaleDraft,
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

function updateSelectedMediaUrl(items: AdminPackageDraftItem[], slug: string, value: string) {
  return items.map((item) =>
    item.slug === slug
      ? {
          ...item,
          selectedMediaUrl: value,
        }
      : item,
  )
}

export default function PackagesStudioEditor({
  initialDraft = adminPackagesInitialDraft,
}: {
  initialDraft?: AdminPackagesDraft
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
      adminPackagesInitialDraft.items.find((item) => item.slug === selectedDraft?.slug) ??
      adminPackagesInitialDraft.items[0],
    [selectedDraft],
  )

  const { isPersisting, persistMessage, saveAndPersist } = useAdminPersistedSave({
    surface: "packages",
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

  const updateField = (field: keyof AdminPackageLocaleDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      items: updatePackageField(current.items, selectedDraft.slug, activeLocale, field, value),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Pacotes"
        title="Editor dos pacotes e jornadas"
        description="Aqui o operador revisa a apresentacao comercial dos pacotes sem alterar slug, rota, checkout ou qualquer regra de negocio."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        scopeNote="Os textos desta area sao persistidos e podem refletir no site. A imagem escolhida aqui fica registrada no Admin Studio como referencia visual para a proxima fase de publicacao de midia."
        onSave={saveAndPersist}
        onExport={() => exportDraft(`travel-marajo-packages-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[300px,minmax(0,1fr)]">
        <aside className="space-y-4">
          <AdminSectionCard
            eyebrow="Selecao"
            title="Pacotes disponiveis"
            description="Escolha o pacote que deseja revisar. Os slugs e a logica de reserva continuam fixos."
          >
            <div className="space-y-3">
              {draft.items.map((item) => (
                <PackageListButton
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
            title={`Imagem e resumo de ${localeDraft.title}`}
            description="Use a biblioteca para preparar uma imagem de referencia mais forte para a equipe editorial."
          >
            <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
              <strong className="text-[#0B1C2C]">Slug fixo:</strong> {selectedDraft.slug}
              <br />
              <strong className="text-[#0B1C2C]">Preco de referencia:</strong>{" "}
              {formatPrice(selectedDraft.startingPrice)}
              <br />
              <strong className="text-[#0B1C2C]">Landing premium:</strong>{" "}
              {selectedDraft.isFlagship ? "Sim" : "Nao"}
            </div>

            <AdminMediaField
              label="Main image for this package"
              helper="Selecione uma imagem da biblioteca para representar o pacote de forma mais visual no estudio."
              liveImageUrl={selectedBase.selectedMediaUrl}
              draftImageUrl={selectedDraft.selectedMediaUrl}
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  items: updateSelectedMediaUrl(current.items, selectedDraft.slug, value),
                }))
              }
              pendingNote="A imagem selecionada fica salva na camada do Admin Studio como referencia editorial. As paginas publicas continuam usando a imagem atual ate a integracao visual dedicada."
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Base do pacote"
            title="Resumo comercial visivel"
            description="Estes campos aparecem nas listagens e ajudam o visitante a comparar opcoes."
          >
            <AdminTextFieldCard
              label="Package title shown in listings and pages"
              helper="Nome principal do pacote."
              liveValue={liveLocale.title}
              value={localeDraft.title}
              onChange={(value) => updateField("title", value)}
            />
            <AdminTextFieldCard
              label="Short package summary"
              helper="Resumo curto que apresenta o valor da jornada."
              liveValue={liveLocale.summary}
              value={localeDraft.summary}
              onChange={(value) => updateField("summary", value)}
              multiline
            />
            <AdminTextFieldCard
              label="Duration shown to the traveler"
              helper="Duracao curta para comparacao rapida."
              liveValue={liveLocale.duration}
              value={localeDraft.duration}
              onChange={(value) => updateField("duration", value)}
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="O que esta incluido"
            title="Itens e fluxo da jornada"
            description="Organize o conteudo em listas curtas, uma linha por item."
          >
            <AdminTextFieldCard
              label="Included items"
              helper="Liste um item por linha para mostrar o que entra no pacote."
              liveValue={liveLocale.includedText}
              value={localeDraft.includedText}
              onChange={(value) => updateField("includedText", value)}
              multiline
            />
            <AdminTextFieldCard
              label="Journey or itinerary highlights"
              helper="Descreva a ordem principal da jornada, um ponto por linha."
              liveValue={liveLocale.itineraryText}
              value={localeDraft.itineraryText}
              onChange={(value) => updateField("itineraryText", value)}
              multiline
            />
          </AdminSectionCard>

          {selectedDraft.isFlagship ? (
            <AdminSectionCard
              eyebrow="Landing premium"
              title="Texto comercial da landing dedicada"
              description="Campos usados na apresentacao premium do pacote principal."
            >
              <AdminTextFieldCard
                label="Premium landing headline"
                helper="Titulo principal da landing premium."
                liveValue={liveLocale.premiumHeroTitle}
                value={localeDraft.premiumHeroTitle}
                onChange={(value) => updateField("premiumHeroTitle", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Premium landing supporting text"
                helper="Texto de apoio logo abaixo do titulo principal."
                liveValue={liveLocale.premiumHeroBody}
                value={localeDraft.premiumHeroBody}
                onChange={(value) => updateField("premiumHeroBody", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Why this package title"
                helper="Titulo do bloco de valor da landing."
                liveValue={liveLocale.premiumWhyTitle}
                value={localeDraft.premiumWhyTitle}
                onChange={(value) => updateField("premiumWhyTitle", value)}
              />
              <AdminTextFieldCard
                label="Why this package text"
                helper="Texto que explica por que esta jornada vale a reserva."
                liveValue={liveLocale.premiumWhyBody}
                value={localeDraft.premiumWhyBody}
                onChange={(value) => updateField("premiumWhyBody", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Why book with Travel Marajo title"
                helper="Titulo do bloco de confianca da landing."
                liveValue={liveLocale.premiumWhyBookTitle}
                value={localeDraft.premiumWhyBookTitle}
                onChange={(value) => updateField("premiumWhyBookTitle", value)}
              />
              <AdminTextFieldCard
                label="Why book with Travel Marajo text"
                helper="Texto que reforca suporte local, curadoria e seguranca."
                liveValue={liveLocale.premiumWhyBookSubtitle}
                value={localeDraft.premiumWhyBookSubtitle}
                onChange={(value) => updateField("premiumWhyBookSubtitle", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Listing highlight title"
                helper="Titulo usado quando o pacote aparece em destaque na listagem."
                liveValue={liveLocale.premiumListingTitle}
                value={localeDraft.premiumListingTitle}
                onChange={(value) => updateField("premiumListingTitle", value)}
              />
              <AdminTextFieldCard
                label="Listing highlight text"
                helper="Texto curto que acompanha o destaque do pacote."
                liveValue={liveLocale.premiumListingBody}
                value={localeDraft.premiumListingBody}
                onChange={(value) => updateField("premiumListingBody", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Hero trust notes"
                helper="Liste um sinal de confianca por linha para a hero da landing."
                liveValue={liveLocale.premiumTrustNotes}
                value={localeDraft.premiumTrustNotes}
                onChange={(value) => updateField("premiumTrustNotes", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Final call-to-action title"
                helper="Titulo do ultimo bloco de conversao da landing."
                liveValue={liveLocale.premiumFinalTitle}
                value={localeDraft.premiumFinalTitle}
                onChange={(value) => updateField("premiumFinalTitle", value)}
                multiline
              />
              <AdminTextFieldCard
                label="Final call-to-action supporting text"
                helper="Texto de apoio do fechamento premium."
                liveValue={liveLocale.premiumFinalSubtitle}
                value={localeDraft.premiumFinalSubtitle}
                onChange={(value) => updateField("premiumFinalSubtitle", value)}
                multiline
              />
            </AdminSectionCard>
          ) : (
            <AdminSectionCard
              eyebrow="Landing premium"
              title="Pacote sem landing dedicada"
              description="Este pacote ainda nao tem uma landing premium propria. Nesta fase, foque no titulo, resumo, inclusoes e imagem de referencia."
            >
              <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                Quando uma landing premium for criada para este pacote, ela podera reaproveitar a
                mesma biblioteca de midia e a mesma base editorial preparada aqui.
              </div>
            </AdminSectionCard>
          )}
        </div>
      </div>
    </div>
  )
}
