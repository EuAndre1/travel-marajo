"use client"
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import type { AppLocale } from "@/config/i18n"
import AdminCardImageField from "@/components/admin/AdminCardImageField"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminMediaGalleryField from "@/components/admin/AdminMediaGalleryField"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import { useAdminPersistedSave } from "@/components/admin/use-admin-persisted-save"
import {
  adminHotelCardsInitialDraft,
  createEmptyAdminHotelCardLocaleDraft,
  createStudioSlug,
  normalizeHotelCardCollectionDraft,
  type AdminHotelCardCollectionDraft,
  type AdminHotelCardDraftItem,
  type AdminHotelCardLocaleDraft,
} from "@/lib/admin-studio/card-collections"

const STORAGE_KEY = "travel-marajo-admin-hotel-cards-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function createNewHotelCard(items: AdminHotelCardDraftItem[]) {
  const nextIndex = items.length + 1
  const nextId = `hotel-card-${crypto.randomUUID()}`
  const defaultTitle = `Novo hotel ${nextIndex}`

  return {
    id: nextId,
    linkedSlug: createStudioSlug(defaultTitle, nextId),
    imageUrl: "",
    ctaTarget: "",
    visible: false,
    sortOrder: items.length,
    galleryImageUrls: [],
    locales: {
      pt: { ...createEmptyAdminHotelCardLocaleDraft(), title: defaultTitle, ctaLabel: "Ver hospedagem" },
      en: { ...createEmptyAdminHotelCardLocaleDraft(), ctaLabel: "View stay" },
      es: { ...createEmptyAdminHotelCardLocaleDraft(), ctaLabel: "Ver alojamiento" },
      fr: { ...createEmptyAdminHotelCardLocaleDraft(), ctaLabel: "Voir l'hebergement" },
    },
  } satisfies AdminHotelCardDraftItem
}

function normalizeHotelItems(items: AdminHotelCardDraftItem[]) {
  return [...items]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item, index) => ({
      ...item,
      sortOrder: index,
    }))
}

function HotelListButton({
  item,
  locale,
  selected,
  onSelect,
}: {
  item: AdminHotelCardDraftItem
  locale: AppLocale
  selected: boolean
  onSelect: () => void
}) {
  const localized = item.locales[locale] ?? createEmptyAdminHotelCardLocaleDraft()

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
          {item.linkedSlug || "slug-pendente"}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            item.visible
              ? selected
                ? "bg-white/10 text-white"
                : "bg-emerald-100 text-emerald-700"
              : selected
                ? "bg-white/10 text-white/85"
                : "bg-slate-200 text-slate-600"
          }`}
        >
          {item.visible ? "No site" : "Oculto"}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6">{localized.title || "Hotel sem titulo"}</p>
      <p className={`mt-2 text-xs leading-5 ${selected ? "text-white/72" : "text-slate-500"}`}>
        {localized.eyebrow || "Localizacao pendente"}
        {localized.metaPrimary ? ` - ${localized.metaPrimary}` : ""}
      </p>
    </button>
  )
}

function HotelVisualPreview({
  item,
  locale,
}: {
  item: AdminHotelCardDraftItem
  locale: AppLocale
}) {
  const localized = item.locales[locale] ?? createEmptyAdminHotelCardLocaleDraft()
  const galleryCount = item.galleryImageUrls.length

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
      <div className="relative h-64 bg-slate-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={localized.title || "Hospedagem selecionada"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Escolha uma imagem de capa para esta hospedagem
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        {localized.eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {localized.eyebrow}
          </p>
        ) : null}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-2xl font-display leading-tight text-[#0B1C2C]">
              {localized.title || "Nome da hospedagem"}
            </h3>
            {localized.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{localized.description}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {localized.metaPrimary ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {localized.metaPrimary}
              </span>
            ) : null}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {galleryCount} foto{galleryCount === 1 ? "" : "s"} na galeria
            </span>
          </div>
        </div>
        <div className="inline-flex rounded-full bg-[#0B1C2C] px-4 py-2 text-sm font-semibold text-white">
          {localized.ctaLabel || "Ver hospedagem"}
        </div>
      </div>
    </div>
  )
}

function updateHotelLocaleField(
  items: AdminHotelCardDraftItem[],
  hotelId: string,
  locale: AppLocale,
  field: keyof AdminHotelCardLocaleDraft,
  value: string,
) {
  return items.map((item) =>
    item.id === hotelId
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

function updateHotelItemField(
  items: AdminHotelCardDraftItem[],
  hotelId: string,
  field: keyof Pick<
    AdminHotelCardDraftItem,
    "linkedSlug" | "imageUrl" | "ctaTarget" | "visible" | "galleryImageUrls"
  >,
  value: string | boolean | string[],
) {
  return items.map((item) =>
    item.id === hotelId
      ? {
          ...item,
          [field]: value,
        }
      : item,
  )
}

function moveHotelItem(items: AdminHotelCardDraftItem[], hotelId: string, direction: -1 | 1) {
  const currentIndex = items.findIndex((item) => item.id === hotelId)
  const nextIndex = currentIndex + direction

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= items.length) {
    return items
  }

  const nextItems = [...items]
  const [selected] = nextItems.splice(currentIndex, 1)
  nextItems.splice(nextIndex, 0, selected)
  return normalizeHotelItems(nextItems)
}

function deleteHotelItem(items: AdminHotelCardDraftItem[], hotelId: string) {
  return normalizeHotelItems(items.filter((item) => item.id !== hotelId))
}

export default function HotelsStudioEditor({
  initialDraft = adminHotelCardsInitialDraft,
}: {
  initialDraft?: AdminHotelCardCollectionDraft
}) {
  const normalizedInitialDraft = useMemo(
    () => normalizeHotelCardCollectionDraft(initialDraft, adminHotelCardsInitialDraft),
    [initialDraft],
  )
  const normalizeHotelDraft = useCallback(
    (value: unknown) => normalizeHotelCardCollectionDraft(value, normalizedInitialDraft),
    [normalizedInitialDraft],
  )
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [selectedId, setSelectedId] = useState(normalizedInitialDraft.items[0]?.id ?? "")
  const [liveDraft, setLiveDraft] = useState(normalizedInitialDraft)
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
  } = useAdminDraft(STORAGE_KEY, normalizedInitialDraft, {
    normalizeValue: normalizeHotelDraft,
  })

  const selectedDraft = useMemo(
    () => draft.items.find((item) => item.id === selectedId) ?? draft.items[0],
    [draft.items, selectedId],
  )
  const selectedLive = useMemo(
    () =>
      liveDraft.items.find((item) => item.id === selectedDraft?.id) ??
      (selectedDraft
        ? {
            ...selectedDraft,
            imageUrl: "",
            ctaTarget: "",
            galleryImageUrls: [],
            locales: {
              pt: createEmptyAdminHotelCardLocaleDraft(),
              en: createEmptyAdminHotelCardLocaleDraft(),
              es: createEmptyAdminHotelCardLocaleDraft(),
              fr: createEmptyAdminHotelCardLocaleDraft(),
            },
          }
        : liveDraft.items[0]),
    [liveDraft.items, selectedDraft],
  )

  const { isPersisting, persistMessage, persistState, saveAndPersist } = useAdminPersistedSave({
    surface: "hotelCards",
    draft,
    saveDraft,
    markPersisted: (value, message) => {
      markPersisted(value, message)
      setLiveDraft(cloneDraft(value))
    },
  })

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

  if (!selectedDraft || !selectedLive) {
    return (
      <div className="space-y-6">
        <AdminPageIntro
          eyebrow="Hoteis"
          title="Editor de hospedagens parceiras"
          description="Nenhuma hospedagem esta pronta para edicao agora. Crie o primeiro hotel para montar a vitrine e as paginas dedicadas."
          actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
        />

        <AdminDraftToolbar
          saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
          savedAtLabel={savedAtLabel}
          statusMessage={persistMessage || statusMessage}
          hasUnsavedChanges={hasUnsavedChanges}
          persistState={persistState}
          scopeNote="As hospedagens desta area sao persistidas no banco. Quando voce salvar, os cards e as paginas dedicadas passam a refletir o novo conteudo."
          onSave={saveAndPersist}
          onExport={() => exportDraft(`travel-marajo-hotels-${activeLocale}.json`)}
          onReset={resetDraft}
        />

        <AdminSectionCard
          eyebrow="Colecao"
          title="Nenhuma hospedagem carregada"
          description="Use o botao abaixo para criar a primeira hospedagem de forma segura."
          actions={
            <button
              type="button"
              onClick={() => {
                const nextItem = createNewHotelCard([])
                setDraft({ items: [nextItem] })
                setSelectedId(nextItem.id)
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Adicionar hotel
            </button>
          }
        >
          <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-7 text-slate-600">
            O editor foi carregado com seguranca, mas nenhum item valido foi encontrado nesta colecao. Voce pode criar um novo hotel ou resetar para a versao ativa do ambiente.
          </div>
        </AdminSectionCard>
      </div>
    )
  }

  const localeDraft = selectedDraft.locales[activeLocale] ?? createEmptyAdminHotelCardLocaleDraft()
  const liveLocale = selectedLive.locales[activeLocale] ?? createEmptyAdminHotelCardLocaleDraft()

  const updateLocaleField = (field: keyof AdminHotelCardLocaleDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      items: updateHotelLocaleField(current.items, selectedDraft.id, activeLocale, field, value),
    }))
  }

  const updateItemField = (
    field: keyof Pick<
      AdminHotelCardDraftItem,
      "linkedSlug" | "imageUrl" | "ctaTarget" | "visible" | "galleryImageUrls"
    >,
    value: string | boolean | string[],
  ) => {
    setDraft((current) => ({
      ...current,
      items: updateHotelItemField(current.items, selectedDraft.id, field, value),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Hoteis"
        title="Editor de hospedagens parceiras"
        description="Edite uma hospedagem como se estivesse montando a pagina dela: capa, galeria, texto, botao e visibilidade em um fluxo visual simples."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        hasUnsavedChanges={hasUnsavedChanges}
        persistState={persistState}
        scopeNote="Quando voce salvar, a vitrine publica e a pagina desta hospedagem passam a usar o novo conteudo."
        onSave={saveAndPersist}
        onExport={() => exportDraft(`travel-marajo-hotels-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <div className="grid gap-5 xl:grid-cols-[300px,minmax(0,1fr)]">
        <aside className="space-y-4">
          <AdminSectionCard
            eyebrow="Colecao"
            title="Hospedagens parceiras"
            description="Escolha uma hospedagem, troque a ordem da vitrine e crie novos parceiros quando precisar."
            actions={
              <button
                type="button"
                onClick={() => {
                  const nextItem = createNewHotelCard(draft.items)
                  setDraft((current) => {
                    return {
                      ...current,
                      items: normalizeHotelItems([...current.items, nextItem]),
                    }
                  })
                  setSelectedId(nextItem.id)
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Adicionar hotel
              </button>
            }
          >
            <div className="space-y-3">
              {draft.items.map((item) => (
                <HotelListButton
                  key={item.id}
                  item={item}
                  locale={activeLocale}
                  selected={item.id === selectedDraft.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </AdminSectionCard>
        </aside>

        <div className="space-y-6">
          <AdminSectionCard
            eyebrow="Preview da hospedagem"
            title="Como o viajante percebe este hotel"
            description="Veja a capa, a localizacao e a chamada principal antes de entrar nos campos detalhados."
            actions={
              selectedDraft.linkedSlug ? (
                <Link
                  href={`/hotels/${selectedDraft.linkedSlug}`}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  Ver pagina do hotel
                </Link>
              ) : null
            }
          >
            <HotelVisualPreview item={selectedDraft} locale={activeLocale} />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Publicacao"
            title="Visibilidade, ordem e rota"
            description="Estes controles definem se o hotel aparece no site, em que ordem ele entra e qual endereco a pagina dedicada usa."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-[#0B1C2C]">Card atual:</strong>{" "}
                  {localeDraft.title || "Hotel sem titulo"}
                </p>
                <p className="mt-2">
                  <strong className="text-[#0B1C2C]">Posicao na vitrine:</strong>{" "}
                  {selectedDraft.sortOrder + 1}
                </p>
                <p className="mt-2">
                  <strong className="text-[#0B1C2C]">Slug da pagina:</strong>{" "}
                  {selectedDraft.linkedSlug || "slug-pendente"}
                </p>
              </div>

              <div className="space-y-3 rounded-[1.4rem] border border-slate-200 bg-white p-4">
                <label className="flex items-center justify-between gap-4 rounded-[1rem] border border-slate-200 px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-[#0B1C2C]">Mostrar no site</span>
                    <span className="block text-xs leading-5 text-slate-500">
                      Quando desligado, o hotel nao aparece nem na home nem na pagina de detalhe.
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => updateItemField("visible", !selectedDraft.visible)}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedDraft.visible
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {selectedDraft.visible ? (
                      <>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        Visivel
                      </>
                    ) : (
                      <>
                        <EyeSlashIcon className="mr-2 h-4 w-4" />
                        Oculto
                      </>
                    )}
                  </button>
                </label>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        items: moveHotelItem(current.items, selectedDraft.id, -1),
                      }))
                    }
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    <ArrowUpIcon className="mr-2 h-4 w-4" />
                    Subir
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        items: moveHotelItem(current.items, selectedDraft.id, 1),
                      }))
                    }
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    <ArrowDownIcon className="mr-2 h-4 w-4" />
                    Descer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Remover esta hospedagem do estudio? O conteudo salvo desta colecao sera atualizado.",
                      )

                      if (!confirmed) {
                        return
                      }

                      setDraft((current) => {
                        const nextItems = deleteHotelItem(current.items, selectedDraft.id)
                        setSelectedId(nextItems[0]?.id ?? "")
                        return {
                          ...current,
                          items: nextItems,
                        }
                      })
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Excluir hotel
                  </button>
                </div>
              </div>
            </div>

            <AdminTextFieldCard
              label="Slug da pagina de hospedagem"
              helper="Este trecho entra na URL da pagina dedicada. Use palavras curtas, sem espacos nem acentos."
              liveValue={selectedLive.linkedSlug}
              value={selectedDraft.linkedSlug}
              onChange={(value) => updateItemField("linkedSlug", createStudioSlug(value, selectedDraft.id))}
              placeholder="ex.: pousada-soure-centro"
            />

            <AdminTextFieldCard
              label="Link alternativo do botao"
              helper="Use este campo apenas se quiser um fallback para WhatsApp, site externo ou outra pagina. Quando houver slug, o card principal vai para a pagina dedicada."
              liveValue={selectedLive.ctaTarget}
              value={selectedDraft.ctaTarget}
              onChange={(value) => updateItemField("ctaTarget", value)}
              placeholder="https://wa.me/... ou /hotels"
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Imagens"
            title={`Imagem principal e galeria de ${localeDraft.title || "hotel selecionado"}`}
            description="Primeiro ajuste a capa. Depois monte a galeria com as fotos extras que vao aparecer na pagina do hotel."
          >
            <AdminCardImageField
              label="Imagem principal da hospedagem"
              helper="Escolha a foto de capa que representa melhor o hotel na vitrine publica."
              liveImageUrl={selectedLive.imageUrl}
              draftImageUrl={selectedDraft.imageUrl}
              onChange={(value) => updateItemField("imageUrl", value)}
            />

            <AdminMediaGalleryField
              label="Galeria da pagina de hospedagem"
              helper="Monte a sequencia de fotos do estabelecimento sem precisar colar URL manualmente."
              liveImageUrls={selectedLive.galleryImageUrls}
              draftImageUrls={selectedDraft.galleryImageUrls}
              onChange={(value) => updateItemField("galleryImageUrls", value)}
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Card publico"
            title="O que aparece na vitrine da hospedagem"
            description="Esses campos montam a leitura rapida do hotel na home e nas vitrines publicas."
          >
            <AdminTextFieldCard
              label="Nome do hotel"
              helper="Titulo principal exibido no card e na pagina dedicada."
              liveValue={liveLocale.title}
              value={localeDraft.title}
              onChange={(value) => updateLocaleField("title", value)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminTextFieldCard
                label="Localizacao"
                helper="Cidade, praia ou base principal da hospedagem."
                liveValue={liveLocale.eyebrow}
                value={localeDraft.eyebrow}
                onChange={(value) => updateLocaleField("eyebrow", value)}
              />
              <AdminTextFieldCard
                label="Faixa de preco"
                helper="Campo opcional. Ex.: A partir de R$ 420/noite."
                liveValue={liveLocale.metaPrimary}
                value={localeDraft.metaPrimary}
                onChange={(value) => updateLocaleField("metaPrimary", value)}
              />
            </div>
            <AdminTextFieldCard
              label="Descricao curta do card"
              helper="Texto breve para o visitante entender rapidamente o perfil da hospedagem."
              liveValue={liveLocale.description}
              value={localeDraft.description}
              onChange={(value) => updateLocaleField("description", value)}
              multiline
            />
            <AdminTextFieldCard
              label="Texto do botao"
              helper="Ex.: Ver hospedagem, Falar no WhatsApp ou Consultar disponibilidade."
              liveValue={liveLocale.ctaLabel}
              value={localeDraft.ctaLabel}
              onChange={(value) => updateLocaleField("ctaLabel", value)}
            />
          </AdminSectionCard>

          <AdminSectionCard
            eyebrow="Pagina dedicada"
            title="Conteudo completo da hospedagem"
            description="Aqui entra o texto mais completo para a pagina dedicada da hospedagem."
          >
            <AdminTextFieldCard
              label="Descricao completa da hospedagem"
              helper="Texto mais rico para a pagina dedicada, com atmosfera, proposta e contexto local."
              liveValue={liveLocale.fullDescription}
              value={localeDraft.fullDescription}
              onChange={(value) => updateLocaleField("fullDescription", value)}
              multiline
            />
            <AdminTextFieldCard
              label="Diferenciais e comodidades"
              helper="Escreva um item por linha para montar a lista de comodidades e destaques."
              liveValue={liveLocale.amenitiesText}
              value={localeDraft.amenitiesText}
              onChange={(value) => updateLocaleField("amenitiesText", value)}
              multiline
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
