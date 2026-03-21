import CardCollectionStudioEditor from "@/components/admin/CardCollectionStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminHotelsPage() {
  const contentState = await loadPersistedContentStudioState()

  return (
    <CardCollectionStudioEditor
      surface="hotelCards"
      storageKey="travel-marajo-admin-hotel-cards-draft"
      initialDraft={contentState.hotelCards}
      copy={{
        eyebrow: "Partner Hotels",
        title: "Cards de hoteis parceiros",
        description:
          "Monte a vitrine de hospedagens parceiras com imagem, descricao, faixa de preco e CTA claros.",
        scopeNote:
          "Os cards desta colecao sao persistidos no banco. Quando voce salvar, a homepage e outras vitrines que usam esta colecao leem o novo conteudo.",
        addButtonLabel: "Add new card",
        listTitle: "Colecao de hoteis",
        listDescription:
          "Use esta area para destacar hospedagens parceiras, esconder cards e ajustar a ordem.",
        imageLabel: "Imagem do hotel",
        imageHelper:
          "Escolha uma imagem persistente da biblioteca para representar a hospedagem.",
        sharedInfoTitle: "Visibilidade e ordem",
        sharedInfoDescription:
          "Controle se o card aparece na vitrine publica e em qual posicao.",
        fieldCopy: {
          title: {
            label: "Nome do hotel",
            helper: "Nome principal do parceiro ou da hospedagem.",
          },
          eyebrow: {
            label: "Localizacao",
            helper: "Cidade, praia ou base do hotel.",
          },
          description: {
            label: "Descricao curta do hotel",
            helper: "Explique rapidamente o perfil da hospedagem.",
            multiline: true,
          },
          metaPrimary: {
            label: "Faixa de preco",
            helper: "Ex.: A partir de R$ 260/noite. Campo opcional.",
          },
          metaSecondary: {
            label: "Informacao extra",
            helper: "Campo opcional para observacao curta.",
          },
          ctaLabel: {
            label: "Texto do botao",
            helper: "Ex.: Ver hospedagens, Falar no WhatsApp ou Consultar disponibilidade.",
          },
          ctaTarget: {
            label: "Destino do botao",
            helper: "Link interno, link externo ou URL do WhatsApp.",
          },
        },
      }}
    />
  )
}
