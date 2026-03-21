import CardCollectionStudioEditor from "@/components/admin/CardCollectionStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminServicesPage() {
  const contentState = await loadPersistedContentStudioState()

  return (
    <CardCollectionStudioEditor
      surface="serviceCards"
      storageKey="travel-marajo-admin-service-cards-draft"
      initialDraft={contentState.serviceCards}
      copy={{
        eyebrow: "Services",
        title: "Cards de servicos",
        description:
          "Gerencie os cards de servicos mostrados no site com imagem, descricao curta, preco e CTA.",
        scopeNote:
          "Os cards desta colecao sao persistidos no banco. O site le o conteudo salvo aqui e mantem fallback seguro quando necessario.",
        addButtonLabel: "Add new card",
        listTitle: "Colecao de servicos",
        listDescription:
          "Crie novas entradas, altere a ordem, esconda cards e atualize o texto sem tocar no codigo.",
        imageLabel: "Imagem do servico",
        imageHelper:
          "Escolha uma imagem persistente da biblioteca para representar este servico.",
        sharedInfoTitle: "Visibilidade e ordem",
        sharedInfoDescription:
          "Controle se o card aparece na vitrine publica e em que ordem ele entra.",
        fieldCopy: {
          title: {
            label: "Nome do servico",
            helper: "Nome principal que aparece no card.",
          },
          eyebrow: {
            label: "Preco ou tipo de contratacao",
            helper: "Ex.: Sob consulta, Consultoria premium ou Faixa de valor.",
          },
          description: {
            label: "Descricao curta do servico",
            helper: "Resumo rapido do valor do servico para o visitante.",
            multiline: true,
          },
          metaPrimary: {
            label: "Informacao extra 1",
            helper: "Campo opcional para observacao curta.",
          },
          metaSecondary: {
            label: "Informacao extra 2",
            helper: "Campo opcional. Pode ficar vazio.",
          },
          ctaLabel: {
            label: "Texto do botao",
            helper: "Ex.: Entender servico, Falar com especialista ou Solicitar ajuda.",
          },
          ctaTarget: {
            label: "Destino do botao",
            helper: "Link interno, externo ou WhatsApp.",
          },
        },
      }}
    />
  )
}
