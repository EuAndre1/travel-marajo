"use client"

import { useState } from "react"
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
  adminHomepageInitialDraft,
  type AdminHomepageDraft,
  type AdminHomepageLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-homepage-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export default function HomepageStudioEditor({
  initialDraft = adminHomepageInitialDraft,
}: {
  initialDraft?: AdminHomepageDraft
}) {
  const [activeLocale, setActiveLocale] = useState<AppLocale>("pt")
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

  const localeDraft = draft.locales[activeLocale]
  const liveLocale = liveDraft.locales[activeLocale]
  const baseLocale = adminHomepageInitialDraft.locales[activeLocale]

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

  const { isPersisting, persistMessage, saveAndPersist } = useAdminPersistedSave({
    surface: "homepage",
    draft,
    saveDraft,
    markPersisted: (value, message) => {
      markPersisted(value, message)
      setLiveDraft(cloneDraft(value))
    },
  })

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Homepage"
        title="Editor da homepage"
        description="Cada campo mostra o texto atual da home e o novo rascunho logo abaixo. Assim o colaborador edita com seguranca, sem precisar interpretar nomes tecnicos."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        scopeNote="Os textos desta pagina podem ser persistidos e refletidos no site. A imagem escolhida aqui fica salva no Admin Studio como referencia editorial para a proxima etapa de publicacao visual."
        onSave={saveAndPersist}
        onExport={() => exportDraft(`travel-marajo-homepage-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <AdminSectionCard
        eyebrow="Hero principal"
        title="Primeira dobra da homepage"
        description="Edite o que aparece logo na chegada do visitante: titulo principal, texto de apoio, botoes e sinais de confianca."
      >
        <AdminMediaField
          label="Imagem principal da homepage"
          helper="Escolha uma imagem da biblioteca para representar a primeira dobra do site de forma mais visual."
          liveImageUrl={baseLocale.heroImageUrl}
          draftImageUrl={localeDraft.heroImageUrl}
          onChange={(value) => updateField("heroImageUrl", value)}
          pendingNote="A selecao de imagem fica salva no Admin Studio para a equipe editorial. A homepage publica ainda continua usando a imagem atual ate a etapa dedicada de publicacao visual."
        />

        <AdminTextFieldCard
          label="Main title of the homepage"
          helper="Titulo mais importante da home, mostrado em destaque no primeiro bloco."
          liveValue={liveLocale.heroHeadline}
          value={localeDraft.heroHeadline}
          onChange={(value) => updateField("heroHeadline", value)}
          multiline
        />

        <AdminTextFieldCard
          label="Short text below the main title"
          helper="Texto de apoio logo abaixo do titulo. Ele deve explicar o valor da Travel Marajo em poucas linhas."
          liveValue={liveLocale.heroSubheadline}
          value={localeDraft.heroSubheadline}
          onChange={(value) => updateField("heroSubheadline", value)}
          multiline
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <AdminTextFieldCard
            label="Primary button label"
            helper="Botao principal do hero."
            liveValue={liveLocale.primaryCtaLabel}
            value={localeDraft.primaryCtaLabel}
            onChange={(value) => updateField("primaryCtaLabel", value)}
          />
          <AdminTextFieldCard
            label="Secondary button label"
            helper="Segundo botao visivel no hero."
            liveValue={liveLocale.secondaryCtaLabel}
            value={localeDraft.secondaryCtaLabel}
            onChange={(value) => updateField("secondaryCtaLabel", value)}
          />
        </div>

        <AdminTextFieldCard
          label="Trust line shown below the hero"
          helper="Frase curta usada para reforcar confianca logo abaixo da area principal."
          liveValue={liveLocale.trustStripLabel}
          value={localeDraft.trustStripLabel}
          onChange={(value) => updateField("trustStripLabel", value)}
        />

        <AdminTextFieldCard
          label="Trust points shown below the hero"
          helper="Liste um ponto por linha. Eles aparecem como sinais rapidos de confianca."
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
          label="Section title for Why Marajo"
          helper="Titulo que apresenta o bloco sobre o destino."
          liveValue={liveLocale.whyMarajoTitle}
          value={localeDraft.whyMarajoTitle}
          onChange={(value) => updateField("whyMarajoTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Introductory text for Why Marajo"
          helper="Texto introdutorio curto para contextualizar natureza, cultura e identidade da ilha."
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
          label="Concierge block title"
          helper="Titulo do bloco de suporte humano."
          liveValue={liveLocale.conciergeTitle}
          value={localeDraft.conciergeTitle}
          onChange={(value) => updateField("conciergeTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Concierge support text"
          helper="Texto que explica como a equipe local ajuda antes, durante e depois da viagem."
          liveValue={liveLocale.conciergeText}
          value={localeDraft.conciergeText}
          onChange={(value) => updateField("conciergeText", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Final call-to-action title"
          helper="Titulo do ultimo bloco de conversao da homepage."
          liveValue={liveLocale.finalCtaTitle}
          value={localeDraft.finalCtaTitle}
          onChange={(value) => updateField("finalCtaTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Final call-to-action supporting text"
          helper="Texto de apoio que fecha a pagina e orienta o visitante para a acao."
          liveValue={liveLocale.finalCtaText}
          value={localeDraft.finalCtaText}
          onChange={(value) => updateField("finalCtaText", value)}
          multiline
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminTextFieldCard
            label="Final primary button"
            helper="Botao principal do ultimo bloco."
            liveValue={liveLocale.finalPrimaryLabel}
            value={localeDraft.finalPrimaryLabel}
            onChange={(value) => updateField("finalPrimaryLabel", value)}
          />
          <AdminTextFieldCard
            label="Final secondary button"
            helper="Botao secundario do ultimo bloco."
            liveValue={liveLocale.finalSecondaryLabel}
            value={localeDraft.finalSecondaryLabel}
            onChange={(value) => updateField("finalSecondaryLabel", value)}
          />
        </div>
      </AdminSectionCard>
    </div>
  )
}
