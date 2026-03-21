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
    hasUnsavedChanges,
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

  const { isPersisting, persistMessage, persistState, saveAndPersist } = useAdminPersistedSave({
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
        hasUnsavedChanges={hasUnsavedChanges}
        persistState={persistState}
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
