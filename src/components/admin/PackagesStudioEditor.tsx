"use client"

import { useMemo, useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import {
  adminPackagesInitialDraft,
  type AdminPackageDraftItem,
  type AdminPackageLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-packages-draft"

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

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
        <span className={selected ? "text-white/70" : "text-slate-400"}>{item.slug}</span>
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
        {localized.duration} • {formatPrice(item.startingPrice)}
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

export default function PackagesStudioEditor() {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [selectedSlug, setSelectedSlug] = useState(adminPackagesInitialDraft.items[0]?.slug ?? "")
  const { draft, setDraft, saveDraft, resetDraft, exportDraft, savedAtLabel, statusMessage } =
    useAdminDraft(STORAGE_KEY, adminPackagesInitialDraft)

  const selectedDraft = useMemo(
    () => draft.items.find((item) => item.slug === selectedSlug) ?? draft.items[0],
    [draft.items, selectedSlug],
  )
  const selectedLive = useMemo(
    () =>
      adminPackagesInitialDraft.items.find((item) => item.slug === selectedDraft?.slug) ??
      adminPackagesInitialDraft.items[0],
    [selectedDraft],
  )

  if (!selectedDraft || !selectedLive) {
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
        description="Edite o texto visivel de cada pacote sem tocar nos slugs, no checkout ou na estrutura publica. O fluxo abaixo trabalha apenas com rascunhos locais por enquanto."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        savedAtLabel={savedAtLabel}
        statusMessage={statusMessage}
        scopeNote="Este editor salva rascunhos locais neste navegador. Nenhuma alteracao daqui e publicada ao vivo nesta fase, e o checkout dos pacotes continua igual."
        onSave={saveDraft}
        onExport={() => exportDraft(`travel-marajo-packages-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-6 xl:grid-cols-[280px,minmax(0,1.08fr),360px]">
        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Selecao</p>
            <h2 className="mt-3 text-xl font-display text-[#0B1C2C]">Pacotes atuais</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Escolha um pacote para revisar titulo, resumo, inclusoes, itinerario e, quando
              existir, a copy premium da landing dedicada.
            </p>
          </section>

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
        </aside>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Resumo do pacote</p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Titulo do pacote"
                value={localeDraft.title}
                onChange={(value) => updateField("title", value)}
              />
              <EditorField
                label="Resumo curto"
                value={localeDraft.summary}
                onChange={(value) => updateField("summary", value)}
                multiline
              />
              <EditorField
                label="Duracao exibida"
                value={localeDraft.duration}
                onChange={(value) => updateField("duration", value)}
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Inclusoes e fluxo da jornada
            </p>
            <div className="mt-5 space-y-5">
              <EditorField
                label="Inclusoes visiveis (1 por linha)"
                value={localeDraft.includedText}
                onChange={(value) => updateField("includedText", value)}
                multiline
              />
              <EditorField
                label="Itinerario visivel (1 por linha)"
                value={localeDraft.itineraryText}
                onChange={(value) => updateField("itineraryText", value)}
                multiline
              />
            </div>
          </section>

          {selectedDraft.isFlagship ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Camada premium da landing
              </p>
              <div className="mt-5 space-y-5">
                <EditorField
                  label="Headline comercial da landing"
                  value={localeDraft.premiumHeroTitle}
                  onChange={(value) => updateField("premiumHeroTitle", value)}
                  multiline
                />
                <EditorField
                  label="Texto de apoio da landing"
                  value={localeDraft.premiumHeroBody}
                  onChange={(value) => updateField("premiumHeroBody", value)}
                  multiline
                />
                <EditorField
                  label="Titulo do bloco de valor"
                  value={localeDraft.premiumWhyTitle}
                  onChange={(value) => updateField("premiumWhyTitle", value)}
                />
                <EditorField
                  label="Texto do bloco de valor"
                  value={localeDraft.premiumWhyBody}
                  onChange={(value) => updateField("premiumWhyBody", value)}
                  multiline
                />
                <EditorField
                  label="Titulo do bloco por que reservar"
                  value={localeDraft.premiumWhyBookTitle}
                  onChange={(value) => updateField("premiumWhyBookTitle", value)}
                />
                <EditorField
                  label="Texto do bloco por que reservar"
                  value={localeDraft.premiumWhyBookSubtitle}
                  onChange={(value) => updateField("premiumWhyBookSubtitle", value)}
                  multiline
                />
                <EditorField
                  label="Titulo do destaque na listagem"
                  value={localeDraft.premiumListingTitle}
                  onChange={(value) => updateField("premiumListingTitle", value)}
                />
                <EditorField
                  label="Texto do destaque na listagem"
                  value={localeDraft.premiumListingBody}
                  onChange={(value) => updateField("premiumListingBody", value)}
                  multiline
                />
                <EditorField
                  label="Sinais de confianca da hero (1 por linha)"
                  value={localeDraft.premiumTrustNotes}
                  onChange={(value) => updateField("premiumTrustNotes", value)}
                  multiline
                />
                <EditorField
                  label="Titulo do CTA final"
                  value={localeDraft.premiumFinalTitle}
                  onChange={(value) => updateField("premiumFinalTitle", value)}
                  multiline
                />
                <EditorField
                  label="Texto do CTA final"
                  value={localeDraft.premiumFinalSubtitle}
                  onChange={(value) => updateField("premiumFinalSubtitle", value)}
                  multiline
                />
              </div>
            </section>
          ) : (
            <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Camada premium dedicada
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Este pacote ainda nao tem uma landing premium propria mapeada no projeto. Nesta
                fase, o editor cobre apenas o texto base exibido nas listagens e na pagina do
                pacote.
              </p>
            </section>
          )}

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              O que fica fora deste editor
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Os rotulos globais de reservar, consultar e outros textos de navegacao continuam
              centralizados no editor de conteudo. Aqui voce revisa o texto proprio de cada pacote.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Leitura operacional</p>
            <h2 className="mt-3 text-2xl font-display text-[#0B1C2C]">O que esta sendo editado</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              <li>Slug fixo: {selectedDraft.slug}</li>
              <li>Preco de referencia: {formatPrice(selectedDraft.startingPrice)}</li>
              <li>
                {selectedDraft.isFlagship
                  ? "Pacote com landing premium dedicada"
                  : "Pacote sem landing premium dedicada"}
              </li>
              <li>Checkout e rota publica permanecem iguais</li>
            </ul>
          </section>

          <SnapshotCard
            title="Titulo"
            liveValue={liveLocale.title}
            draftValue={localeDraft.title}
          />
          <SnapshotCard
            title="Resumo"
            liveValue={liveLocale.summary}
            draftValue={localeDraft.summary}
          />
          <SnapshotCard
            title={selectedDraft.isFlagship ? "Headline premium" : "Inclusoes"}
            liveValue={
              selectedDraft.isFlagship ? liveLocale.premiumHeroTitle : liveLocale.includedText
            }
            draftValue={
              selectedDraft.isFlagship ? localeDraft.premiumHeroTitle : localeDraft.includedText
            }
          />
        </aside>
      </div>
    </div>
  )
}
