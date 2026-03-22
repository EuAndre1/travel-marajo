"use client"

import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import { EditableModeProvider } from "@/components/admin/Editable"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminMediaField from "@/components/admin/AdminMediaField"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import {
  ContentOverridesProvider,
  ResolvedContentLocaleProvider,
  useContentOverridesState,
} from "@/components/content/ContentOverridesProvider"
import HomeDestinations from "@/components/home/HomeDestinations"
import HomeFinalCta from "@/components/home/HomeFinalCta"
import HomeHero from "@/components/home/HomeHero"
import HomePartnerHotels from "@/components/home/HomePartnerHotels"
import HomeRoutesPackages from "@/components/home/HomeRoutesPackages"
import HomeServices from "@/components/home/HomeServices"
import HomeTrustStrip from "@/components/home/HomeTrustStrip"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import { useAdminPersistedSave } from "@/components/admin/use-admin-persisted-save"
import {
  normalizeHotelCardCollectionDraft,
  type AdminCardCollectionDraft,
  type AdminCardLocaleDraft,
  type AdminHotelCardLocaleDraft,
} from "@/lib/admin-studio/card-collections"
import {
  adminHomepageInitialDraft,
  type AdminHomepageDraft,
  type AdminHomepageLocaleDraft,
} from "@/lib/admin-studio/defaults"
import type { MediaAssetType } from "@/lib/media-library/shared"

const HOMEPAGE_STORAGE_KEY = "travel-marajo-admin-homepage-draft"
const DESTINATION_STORAGE_KEY = "travel-marajo-admin-destination-cards-draft"
const ROUTE_STORAGE_KEY = "travel-marajo-admin-route-cards-draft"
const HOTEL_STORAGE_KEY = "travel-marajo-admin-hotel-cards-draft"
const SERVICE_STORAGE_KEY = "travel-marajo-admin-service-cards-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function downloadJson(fileName: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export default function HomepageStudioEditor({
  initialDraft = adminHomepageInitialDraft,
}: {
  initialDraft?: AdminHomepageDraft
}) {
  const persistedContentState = useContentOverridesState()
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
  const [liveDraft, setLiveDraft] = useState(initialDraft)
  const [previewPersistState, setPreviewPersistState] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [previewPersistMessage, setPreviewPersistMessage] = useState("")

  const {
    draft,
    setDraft,
    saveDraft,
    markPersisted,
    resetDraft,
    savedAtLabel,
    statusMessage,
    hasUnsavedChanges,
  } = useAdminDraft(HOMEPAGE_STORAGE_KEY, initialDraft)

  const {
    draft: destinationCardsDraft,
    setDraft: setDestinationCardsDraft,
    saveDraft: saveDestinationCardsDraft,
    markPersisted: markDestinationCardsPersisted,
    resetDraft: resetDestinationCardsDraft,
    savedAtLabel: destinationSavedAtLabel,
    hasUnsavedChanges: hasDestinationUnsavedChanges,
  } = useAdminDraft(
    DESTINATION_STORAGE_KEY,
    persistedContentState.destinationCards,
  )

  const {
    draft: routeCardsDraft,
    setDraft: setRouteCardsDraft,
    saveDraft: saveRouteCardsDraft,
    markPersisted: markRouteCardsPersisted,
    resetDraft: resetRouteCardsDraft,
    savedAtLabel: routeSavedAtLabel,
    hasUnsavedChanges: hasRouteUnsavedChanges,
  } = useAdminDraft(
    ROUTE_STORAGE_KEY,
    persistedContentState.routeCards,
  )

  const {
    draft: hotelCardsDraft,
    setDraft: setHotelCardsDraft,
    saveDraft: saveHotelCardsDraft,
    markPersisted: markHotelCardsPersisted,
    resetDraft: resetHotelCardsDraft,
    savedAtLabel: hotelSavedAtLabel,
    hasUnsavedChanges: hasHotelUnsavedChanges,
  } = useAdminDraft(HOTEL_STORAGE_KEY, persistedContentState.hotelCards, {
    normalizeValue: (value) =>
      normalizeHotelCardCollectionDraft(value, persistedContentState.hotelCards),
  })

  const {
    draft: serviceCardsDraft,
    setDraft: setServiceCardsDraft,
    saveDraft: saveServiceCardsDraft,
    markPersisted: markServiceCardsPersisted,
    resetDraft: resetServiceCardsDraft,
    savedAtLabel: serviceSavedAtLabel,
    hasUnsavedChanges: hasServiceUnsavedChanges,
  } = useAdminDraft(
    SERVICE_STORAGE_KEY,
    persistedContentState.serviceCards,
  )

  const localeDraft = draft.locales[activeLocale]
  const liveLocale = liveDraft.locales[activeLocale]

  const previewState = useMemo(
    () => ({
      ...persistedContentState,
      homepage: draft,
      destinationCards: destinationCardsDraft,
      routeCards: routeCardsDraft,
      hotelCards: hotelCardsDraft,
      serviceCards: serviceCardsDraft,
    }),
    [
      destinationCardsDraft,
      draft,
      hotelCardsDraft,
      persistedContentState,
      routeCardsDraft,
      serviceCardsDraft,
    ],
  )

  const updateField = useCallback((field: keyof AdminHomepageLocaleDraft, value: string) => {
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
  }, [activeLocale, setDraft])

  const updateTrustItem = useCallback((index: number, value: string) => {
    setDraft((current) => {
      const nextItems = splitLines(current.locales[activeLocale].trustItems)

      while (nextItems.length <= index) {
        nextItems.push("")
      }

      nextItems[index] = value

      return {
        ...current,
        locales: {
          ...current.locales,
          [activeLocale]: {
            ...current.locales[activeLocale],
            trustItems: nextItems
              .map((item) => item.trim())
              .filter(Boolean)
              .join("\n"),
          },
        },
      }
    })
  }, [activeLocale, setDraft])

  const updateCardField = useCallback((
    setCollectionDraft: Dispatch<SetStateAction<AdminCardCollectionDraft>>,
    id: string,
    field: keyof AdminCardLocaleDraft,
    value: string,
  ) => {
    setCollectionDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
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
  }, [activeLocale])

  const updateHotelField = useCallback((
    id: string,
    field: keyof AdminHotelCardLocaleDraft,
    value: string,
  ) => {
    setHotelCardsDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
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
  }, [activeLocale, setHotelCardsDraft])

  const updateCardImage = useCallback((
    setCollectionDraft: Dispatch<SetStateAction<AdminCardCollectionDraft>>,
    id: string,
    imageUrl: string,
  ) => {
    setCollectionDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
          ? {
              ...item,
              imageUrl,
            }
          : item,
      ),
    }))
  }, [])

  const updateHotelMedia = useCallback((id: string, media: { url: string; type: MediaAssetType }) => {
    setHotelCardsDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
          ? {
              ...item,
              mediaUrl: media.url,
              mediaType: media.type,
              imageUrl: media.type === "image" ? media.url : item.imageUrl,
            }
          : item,
      ),
    }))
  }, [setHotelCardsDraft])

  const homepageSave = useAdminPersistedSave({
    surface: "homepage",
    draft,
    saveDraft,
    markPersisted: (value, message) => {
      markPersisted(value, message)
      setLiveDraft(cloneDraft(value))
    },
  })

  const destinationSave = useAdminPersistedSave({
    surface: "destinationCards",
    draft: destinationCardsDraft,
    saveDraft: saveDestinationCardsDraft,
    markPersisted: markDestinationCardsPersisted,
  })

  const routeSave = useAdminPersistedSave({
    surface: "routeCards",
    draft: routeCardsDraft,
    saveDraft: saveRouteCardsDraft,
    markPersisted: markRouteCardsPersisted,
  })

  const hotelSave = useAdminPersistedSave({
    surface: "hotelCards",
    draft: hotelCardsDraft,
    saveDraft: saveHotelCardsDraft,
    markPersisted: markHotelCardsPersisted,
  })

  const serviceSave = useAdminPersistedSave({
    surface: "serviceCards",
    draft: serviceCardsDraft,
    saveDraft: saveServiceCardsDraft,
    markPersisted: markServiceCardsPersisted,
  })

  const hasPreviewUnsavedChanges =
    hasUnsavedChanges ||
    hasDestinationUnsavedChanges ||
    hasRouteUnsavedChanges ||
    hasHotelUnsavedChanges ||
    hasServiceUnsavedChanges

  const previewSavedAtLabel =
    savedAtLabel ||
    destinationSavedAtLabel ||
    routeSavedAtLabel ||
    hotelSavedAtLabel ||
    serviceSavedAtLabel

  const saveAllAndPersist = useCallback(async () => {
    const operations = [
      {
        label: "homepage",
        shouldSave: hasUnsavedChanges,
        save: homepageSave.saveAndPersist,
      },
      {
        label: "destinos",
        shouldSave: hasDestinationUnsavedChanges,
        save: destinationSave.saveAndPersist,
      },
      {
        label: "roteiros e pacotes",
        shouldSave: hasRouteUnsavedChanges,
        save: routeSave.saveAndPersist,
      },
      {
        label: "hoteis parceiros",
        shouldSave: hasHotelUnsavedChanges,
        save: hotelSave.saveAndPersist,
      },
      {
        label: "servicos",
        shouldSave: hasServiceUnsavedChanges,
        save: serviceSave.saveAndPersist,
      },
    ].filter((operation) => operation.shouldSave)

    if (operations.length === 0) {
      setPreviewPersistState("idle")
      setPreviewPersistMessage("Nao ha alteracoes pendentes nestes blocos da homepage.")
      return
    }

    setPreviewPersistState("saving")
    setPreviewPersistMessage("Salvando os blocos editados da homepage...")

    const results = await Promise.all(
      operations.map(async (operation) => ({
        label: operation.label,
        ...(await operation.save()),
      })),
    )

    const failed = results.filter((result) => !result.ok)

    if (failed.length > 0) {
      setPreviewPersistState("error")
      setPreviewPersistMessage(
        `Alguns blocos nao puderam ser salvos agora: ${failed.map((item) => item.label).join(", ")}.`,
      )
      return
    }

    setPreviewPersistState("success")
    setPreviewPersistMessage("Homepage, cards e CTA final salvos com sucesso.")
  }, [
    destinationSave.saveAndPersist,
    hasDestinationUnsavedChanges,
    hasHotelUnsavedChanges,
    hasRouteUnsavedChanges,
    hasServiceUnsavedChanges,
    hasUnsavedChanges,
    homepageSave.saveAndPersist,
    hotelSave.saveAndPersist,
    routeSave.saveAndPersist,
    serviceSave.saveAndPersist,
  ])

  const resetAllDrafts = useCallback(() => {
    resetDraft()
    resetDestinationCardsDraft()
    resetRouteCardsDraft()
    resetHotelCardsDraft()
    resetServiceCardsDraft()
    setPreviewPersistState("idle")
    setPreviewPersistMessage("Os rascunhos locais desta visualizacao foram removidos.")
  }, [
    resetDestinationCardsDraft,
    resetDraft,
    resetHotelCardsDraft,
    resetRouteCardsDraft,
    resetServiceCardsDraft,
  ])

  const exportAllDrafts = useCallback(() => {
    downloadJson(`travel-marajo-homepage-preview-${activeLocale}.json`, {
      homepage: draft,
      destinationCards: destinationCardsDraft,
      routeCards: routeCardsDraft,
      hotelCards: hotelCardsDraft,
      serviceCards: serviceCardsDraft,
    })
    setPreviewPersistMessage("Preview da homepage exportado em JSON.")
    setPreviewPersistState("success")
  }, [activeLocale, destinationCardsDraft, draft, hotelCardsDraft, routeCardsDraft, serviceCardsDraft])

  const canInlineEdit = Boolean(localeDraft)

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Homepage"
        title="Editor da homepage"
        description="A homepage agora pode ser revisada como um espelho visual da pagina publica. Clique nos textos, botoes e imagens principais para ajustar o rascunho sem sair da visualizacao."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={previewPersistState === "saving" ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={previewSavedAtLabel}
        statusMessage={previewPersistMessage || statusMessage}
        hasUnsavedChanges={hasPreviewUnsavedChanges}
        persistState={previewPersistState}
        scopeNote="Este botao salva os blocos editados inline desta homepage: hero, trust strip, destinos, roteiros, hoteis parceiros, servicos e CTA final. Os titulos de secao ainda exibidos como referencia visual continuam no fluxo dedicado."
        onSave={saveAllAndPersist}
        onExport={exportAllDrafts}
        onReset={resetAllDrafts}
      />

      <AdminSectionCard
        eyebrow="Preview visual"
        title="Edite a homepage direto sobre a pagina"
        description="Os blocos abaixo reutilizam os mesmos componentes publicos da homepage. Os cards e textos principais ja podem ser editados inline; alguns titulos de secao continuam apenas como referencia visual nesta etapa."
      >
        <p className="mb-4 rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          Neste preview, os blocos de Destinos, Roteiros, Hoteis e Servicos permitem editar o conteudo visivel dos cards.
          Os titulos gerais dessas secoes continuam como referencia visual e seguem no fluxo dedicado quando precisarem de mapeamento proprio.
        </p>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
          <EditableModeProvider enabled={canInlineEdit}>
            <ResolvedContentLocaleProvider locale={activeLocale}>
              <ContentOverridesProvider initialState={previewState}>
                <HomeHero
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onHeroHeadlineChange: (value) => updateField("heroHeadline", value),
                    onHeroSubheadlineChange: (value) => updateField("heroSubheadline", value),
                    onPrimaryCtaLabelChange: (value) => updateField("primaryCtaLabel", value),
                    onSecondaryCtaLabelChange: (value) => updateField("secondaryCtaLabel", value),
                    onHeroMediaChange: (media) =>
                      setDraft((current) => ({
                        ...current,
                        locales: {
                          ...current.locales,
                          [activeLocale]: {
                            ...current.locales[activeLocale],
                            heroMediaUrl: media.url,
                            heroMediaType: media.type,
                            heroImageUrl:
                              media.type === "image"
                                ? media.url
                                : current.locales[activeLocale].heroImageUrl,
                          },
                        },
                      })),
                  }}
                />
                <HomeTrustStrip
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onTrustStripLabelChange: (value) => updateField("trustStripLabel", value),
                    onTrustItemChange: updateTrustItem,
                  }}
                />
                <HomeDestinations
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onCardImageChange: (id, imageUrl) =>
                      updateCardImage(setDestinationCardsDraft, id, imageUrl),
                    onCardEyebrowChange: (id, value) =>
                      updateCardField(setDestinationCardsDraft, id, "eyebrow", value),
                    onCardTitleChange: (id, value) =>
                      updateCardField(setDestinationCardsDraft, id, "title", value),
                    onCardDescriptionChange: (id, value) =>
                      updateCardField(setDestinationCardsDraft, id, "description", value),
                    onCardCtaLabelChange: (id, value) =>
                      updateCardField(setDestinationCardsDraft, id, "ctaLabel", value),
                  }}
                />
                <HomeRoutesPackages
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onCardImageChange: (id, imageUrl) => updateCardImage(setRouteCardsDraft, id, imageUrl),
                    onCardTitleChange: (id, value) =>
                      updateCardField(setRouteCardsDraft, id, "title", value),
                    onCardEyebrowChange: (id, value) =>
                      updateCardField(setRouteCardsDraft, id, "eyebrow", value),
                    onCardMetaPrimaryChange: (id, value) =>
                      updateCardField(setRouteCardsDraft, id, "metaPrimary", value),
                    onCardMetaSecondaryChange: (id, value) =>
                      updateCardField(setRouteCardsDraft, id, "metaSecondary", value),
                    onCardCtaLabelChange: (id, value) =>
                      updateCardField(setRouteCardsDraft, id, "ctaLabel", value),
                  }}
                />
                <HomePartnerHotels
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onCardMediaChange: updateHotelMedia,
                    onCardEyebrowChange: (id, value) => updateHotelField(id, "eyebrow", value),
                    onCardTitleChange: (id, value) => updateHotelField(id, "title", value),
                    onCardDescriptionChange: (id, value) => updateHotelField(id, "description", value),
                    onCardMetaPrimaryChange: (id, value) => updateHotelField(id, "metaPrimary", value),
                    onCardCtaLabelChange: (id, value) => updateHotelField(id, "ctaLabel", value),
                  }}
                />
                <HomeServices
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onCardImageChange: (id, imageUrl) => updateCardImage(setServiceCardsDraft, id, imageUrl),
                    onCardEyebrowChange: (id, value) =>
                      updateCardField(setServiceCardsDraft, id, "eyebrow", value),
                    onCardTitleChange: (id, value) =>
                      updateCardField(setServiceCardsDraft, id, "title", value),
                    onCardDescriptionChange: (id, value) =>
                      updateCardField(setServiceCardsDraft, id, "description", value),
                    onCardCtaLabelChange: (id, value) =>
                      updateCardField(setServiceCardsDraft, id, "ctaLabel", value),
                  }}
                />
                <HomeFinalCta
                  inlineEditing={{
                    enabled: true,
                    canEdit: canInlineEdit,
                    onTitleChange: (value) => updateField("finalCtaTitle", value),
                    onSubtitleChange: (value) => updateField("finalCtaText", value),
                    onPrimaryLabelChange: (value) => updateField("finalPrimaryLabel", value),
                    onSecondaryLabelChange: (value) => updateField("finalSecondaryLabel", value),
                  }}
                />
              </ContentOverridesProvider>
            </ResolvedContentLocaleProvider>
          </EditableModeProvider>
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Hero principal"
        title="Primeira dobra da homepage"
        description="Edite o que aparece logo na chegada do visitante: titulo principal, texto de apoio, botoes e sinais de confianca."
      >
        <AdminMediaField
          label="Imagem ou video de fundo"
          helper="Escolha uma imagem ou um video da biblioteca para representar a primeira dobra do site."
          liveImageUrl={liveLocale.heroImageUrl}
          draftImageUrl={localeDraft.heroImageUrl}
          liveMediaUrl={liveLocale.heroMediaUrl}
          draftMediaUrl={localeDraft.heroMediaUrl}
          liveMediaType={liveLocale.heroMediaType}
          draftMediaType={localeDraft.heroMediaType}
          acceptedTypes={["image", "video"]}
          onMediaChange={(media) =>
            setDraft((current) => ({
              ...current,
              locales: {
                ...current.locales,
                [activeLocale]: {
                  ...current.locales[activeLocale],
                  heroMediaUrl: media.url,
                  heroMediaType: media.type,
                  heroImageUrl:
                    media.type === "image"
                      ? media.url
                      : current.locales[activeLocale].heroImageUrl,
                },
              },
            }))
          }
          pendingNote="A homepage publica passa a usar esta midia depois do save. Se o fundo for video e ele falhar, a imagem fallback atual continua protegendo o layout."
        />

        <AdminTextFieldCard
          label="Titulo principal da homepage"
          helper="Este e o texto mais forte da primeira dobra. O visitante deve entender o valor da Travel Marajo logo aqui."
          liveValue={liveLocale.heroHeadline}
          value={localeDraft.heroHeadline}
          onChange={(value) => updateField("heroHeadline", value)}
          multiline
        />

        <AdminTextFieldCard
          label="Texto curto logo abaixo do titulo"
          helper="Explique em poucas linhas o que a plataforma ajuda o visitante a descobrir, planejar e reservar."
          liveValue={liveLocale.heroSubheadline}
          value={localeDraft.heroSubheadline}
          onChange={(value) => updateField("heroSubheadline", value)}
          multiline
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <AdminTextFieldCard
            label="Texto do botao principal"
            helper="Acao principal que voce quer incentivar no hero."
            liveValue={liveLocale.primaryCtaLabel}
            value={localeDraft.primaryCtaLabel}
            onChange={(value) => updateField("primaryCtaLabel", value)}
          />
          <AdminTextFieldCard
            label="Texto do botao secundario"
            helper="Segunda acao disponivel para quem ainda quer explorar melhor."
            liveValue={liveLocale.secondaryCtaLabel}
            value={localeDraft.secondaryCtaLabel}
            onChange={(value) => updateField("secondaryCtaLabel", value)}
          />
        </div>

        <AdminTextFieldCard
          label="Frase de confianca abaixo do hero"
          helper="Linha curta que reforca seguranca, apoio local ou curadoria logo abaixo da primeira dobra."
          liveValue={liveLocale.trustStripLabel}
          value={localeDraft.trustStripLabel}
          onChange={(value) => updateField("trustStripLabel", value)}
        />

        <AdminTextFieldCard
          label="Pontos de confianca abaixo do hero"
          helper="Escreva um ponto por linha. Eles aparecem como sinais rapidos de confianca."
          liveValue={liveLocale.trustItems}
          value={localeDraft.trustItems}
          onChange={(value) => updateField("trustItems", value)}
          multiline
        />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Why Marajo"
        title="Bloco editorial sobre o destino"
        description="Este bloco ajuda o visitante a entender por que Marajo merece a viagem."
      >
        <AdminTextFieldCard
          label="Titulo do bloco Why Marajo"
          helper="Apresenta o bloco editorial sobre a ilha e prepara a leitura do visitante."
          liveValue={liveLocale.whyMarajoTitle}
          value={localeDraft.whyMarajoTitle}
          onChange={(value) => updateField("whyMarajoTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto introdutorio do bloco Why Marajo"
          helper="Contextualize natureza, cultura e identidade da ilha em um paragrafo curto."
          liveValue={liveLocale.whyMarajoIntro}
          value={localeDraft.whyMarajoIntro}
          onChange={(value) => updateField("whyMarajoIntro", value)}
          multiline
        />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Concierge e fechamento"
        title="Ajuda humana e chamada final"
        description="Ajuste a mensagem do suporte local e o convite final para reservar ou falar com um especialista."
      >
        <AdminTextFieldCard
          label="Titulo do bloco de suporte humano"
          helper="Nome do bloco que apresenta o concierge e o atendimento local."
          liveValue={liveLocale.conciergeTitle}
          value={localeDraft.conciergeTitle}
          onChange={(value) => updateField("conciergeTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto de apoio do concierge"
          helper="Explique como a equipe ajuda antes, durante e depois da viagem."
          liveValue={liveLocale.conciergeText}
          value={localeDraft.conciergeText}
          onChange={(value) => updateField("conciergeText", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Titulo do ultimo bloco de conversao"
          helper="Mensagem final para levar o visitante a reservar ou falar com a equipe."
          liveValue={liveLocale.finalCtaTitle}
          value={localeDraft.finalCtaTitle}
          onChange={(value) => updateField("finalCtaTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto de apoio do ultimo bloco de conversao"
          helper="Complemento do fechamento da homepage com orientacao clara para a proxima acao."
          liveValue={liveLocale.finalCtaText}
          value={localeDraft.finalCtaText}
          onChange={(value) => updateField("finalCtaText", value)}
          multiline
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminTextFieldCard
            label="Botao principal do fechamento"
            helper="Acao principal do ultimo bloco da homepage."
            liveValue={liveLocale.finalPrimaryLabel}
            value={localeDraft.finalPrimaryLabel}
            onChange={(value) => updateField("finalPrimaryLabel", value)}
          />
          <AdminTextFieldCard
            label="Botao secundario do fechamento"
            helper="Acao secundaria do ultimo bloco da homepage."
            liveValue={liveLocale.finalSecondaryLabel}
            value={localeDraft.finalSecondaryLabel}
            onChange={(value) => updateField("finalSecondaryLabel", value)}
          />
        </div>
      </AdminSectionCard>
    </div>
  )
}
