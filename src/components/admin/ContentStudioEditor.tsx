"use client"

import { useState } from "react"
import type { AppLocale } from "@/config/i18n"
import AdminDraftToolbar from "@/components/admin/AdminDraftToolbar"
import AdminLocaleTabs from "@/components/admin/AdminLocaleTabs"
import AdminPageIntro from "@/components/admin/AdminPageIntro"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import { useAdminDraft } from "@/components/admin/use-admin-draft"
import { useAdminPersistedSave } from "@/components/admin/use-admin-persisted-save"
import {
  adminContentInitialDraft,
  type AdminContentDraft,
  type AdminContentLocaleDraft,
} from "@/lib/admin-studio/defaults"

const STORAGE_KEY = "travel-marajo-admin-content-draft"

function cloneDraft<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export default function ContentStudioEditor({
  initialDraft = adminContentInitialDraft,
}: {
  initialDraft?: AdminContentDraft
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

  const { isPersisting, persistMessage, persistState, saveAndPersist } = useAdminPersistedSave({
    surface: "content",
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
        eyebrow="Site Content"
        title="Editor do conteudo geral do site"
        description="Aqui ficam as frases que aparecem em varias areas do projeto: marca, navegacao, rodape, sinais de confianca e linguagem de suporte."
        actions={<AdminLocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />}
      />

      <AdminDraftToolbar
        saveLabel={isPersisting ? "Salvando e aplicando..." : "Salvar e aplicar"}
        savedAtLabel={savedAtLabel}
        statusMessage={persistMessage || statusMessage}
        hasUnsavedChanges={hasUnsavedChanges}
        persistState={persistState}
        scopeNote="Salvar cria ou atualiza a camada persistida que o site usa para este conteudo estrutural. Resetar remove apenas o rascunho local deste navegador."
        onSave={saveAndPersist}
        onExport={() => exportDraft(`travel-marajo-content-${activeLocale}.json`)}
        onReset={resetDraft}
      />

      <AdminSectionCard
        eyebrow="Marca"
        title="Identidade principal do site"
        description="Campos usados perto do logo e nas areas institucionais para explicar o posicionamento da Travel Marajo."
      >
        <AdminTextFieldCard
          label="Frase curta da marca"
          helper="Complemento da marca usado perto do logo e em pontos institucionais."
          liveValue={liveLocale.brandTagline}
          value={localeDraft.brandTagline}
          onChange={(value) => updateField("brandTagline", value)}
        />
        <AdminTextFieldCard
          label="Mensagem principal de autoridade"
          helper="Texto institucional que apresenta a Travel Marajo como referencia de destino e planejamento."
          liveValue={liveLocale.authorityStatement}
          value={localeDraft.authorityStatement}
          onChange={(value) => updateField("authorityStatement", value)}
          multiline
        />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Rodape"
        title="Suporte institucional e sinais finais"
        description="Edite o fechamento do site com uma linguagem clara para o visitante."
      >
        <AdminTextFieldCard
          label="Titulo principal do rodape"
          helper="Mensagem principal de fechamento no rodape."
          liveValue={liveLocale.footerHeadline}
          value={localeDraft.footerHeadline}
          onChange={(value) => updateField("footerHeadline", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto de apoio do rodape"
          helper="Paragrafo institucional que aparece no rodape."
          liveValue={liveLocale.footerSupportCopy}
          value={localeDraft.footerSupportCopy}
          onChange={(value) => updateField("footerSupportCopy", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Pontos de destaque do rodape"
          helper="Escreva um destaque por linha para resumir os pontos fortes da marca."
          liveValue={liveLocale.footerHighlights}
          value={localeDraft.footerHighlights}
          onChange={(value) => updateField("footerHighlights", value)}
          multiline
        />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Confianca"
        title="Mensagem de seguranca e credibilidade"
        description="Use estes campos para reforcar curadoria local, suporte e confianca sem exagerar a linguagem."
      >
        <AdminTextFieldCard
          label="Titulo da secao de confianca"
          helper="Titulo do bloco que reforca seguranca, curadoria e credibilidade."
          liveValue={liveLocale.trustHeadline}
          value={localeDraft.trustHeadline}
          onChange={(value) => updateField("trustHeadline", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto de apoio da secao de confianca"
          helper="Explique em poucas linhas por que reservar com a marca transmite seguranca."
          liveValue={liveLocale.trustBody}
          value={localeDraft.trustBody}
          onChange={(value) => updateField("trustBody", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Destaques de confianca"
          helper="Escreva um destaque por linha. Eles aparecem como sinais curtos de prova e apoio."
          liveValue={liveLocale.trustHighlights}
          value={localeDraft.trustHighlights}
          onChange={(value) => updateField("trustHighlights", value)}
          multiline
        />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Concierge e rotulos"
        title="Textos compartilhados do suporte e dos botoes"
        description="Esses campos afetam a experiencia geral do visitante em varias areas do site."
      >
        <AdminTextFieldCard
          label="Titulo do concierge"
          helper="Nome usado para apresentar o suporte humano."
          liveValue={liveLocale.conciergeTitle}
          value={localeDraft.conciergeTitle}
          onChange={(value) => updateField("conciergeTitle", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto de apoio do concierge"
          helper="Explique a ajuda oferecida antes, durante e depois da viagem."
          liveValue={liveLocale.conciergeBody}
          value={localeDraft.conciergeBody}
          onChange={(value) => updateField("conciergeBody", value)}
          multiline
        />
        <AdminTextFieldCard
          label="Texto sobre tempo de resposta"
          helper="Mensagem curta sobre disponibilidade e resposta da equipe."
          liveValue={liveLocale.conciergeResponseText}
          value={localeDraft.conciergeResponseText}
          onChange={(value) => updateField("conciergeResponseText", value)}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminTextFieldCard
            label="Texto do botao Entrar"
            helper="Rotulo usado no botao de acesso."
            liveValue={liveLocale.signInLabel}
            value={localeDraft.signInLabel}
            onChange={(value) => updateField("signInLabel", value)}
          />
          <AdminTextFieldCard
            label="Texto do perfil do viajante"
            helper="Rotulo que aparece quando a pessoa ja esta logada."
            liveValue={liveLocale.profileLabel}
            value={localeDraft.profileLabel}
            onChange={(value) => updateField("profileLabel", value)}
          />
          <AdminTextFieldCard
            label="Texto do botao Planejar viagem"
            helper="Rotulo do botao principal ligado ao planejamento com suporte."
            liveValue={liveLocale.planTripLabel}
            value={localeDraft.planTripLabel}
            onChange={(value) => updateField("planTripLabel", value)}
          />
          <AdminTextFieldCard
            label="Texto do botao Reservar direto"
            helper="Rotulo curto do CTA de reserva direta."
            liveValue={liveLocale.bookDirectLabel}
            value={localeDraft.bookDirectLabel}
            onChange={(value) => updateField("bookDirectLabel", value)}
          />
        </div>
      </AdminSectionCard>
    </div>
  )
}
