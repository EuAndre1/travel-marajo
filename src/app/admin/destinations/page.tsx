import CardCollectionStudioEditor from "@/components/admin/CardCollectionStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminDestinationsPage() {
  const contentState = await loadPersistedContentStudioState()

  return (
    <CardCollectionStudioEditor
      surface="destinationCards"
      storageKey="travel-marajo-admin-destination-cards-draft"
      initialDraft={contentState.destinationCards}
      copy={{
        eyebrow: "Destinos",
        title: "Cards de destinos do site",
        description:
          "Gerencie os cards de destinos que aparecem nas vitrines do site sem mexer em rota ou slug.",
        scopeNote:
          "Os cards desta colecao sao persistidos no banco. O site usa os dados salvos aqui, com fallback seguro para o conteudo em arquivo quando necessario.",
        addButtonLabel: "Add new card",
        listTitle: "Colecao de destinos",
        listDescription:
          "Crie, edite, esconda, remova e reordene os destinos mostrados ao visitante.",
        imageLabel: "Imagem do destino",
        imageHelper:
          "Selecione uma imagem persistente da biblioteca para este card de destino.",
        sharedInfoTitle: "Visibilidade e ordem",
        sharedInfoDescription:
          "Controle se o card aparece no site e em que ordem ele entra na secao.",
        fieldCopy: {
          title: {
            label: "Nome principal do destino",
            helper: "Titulo que aparece no card publico.",
          },
          eyebrow: {
            label: "Etiqueta ou subtitulo do destino",
            helper: "Frase curta acima do titulo, como base, estilo ou posicionamento.",
          },
          description: {
            label: "Descricao curta do destino",
            helper: "Resumo rapido para ajudar o visitante a entender o lugar.",
            multiline: true,
          },
          metaPrimary: {
            label: "Informacao extra 1",
            helper: "Campo opcional. Use apenas se fizer sentido para este card.",
          },
          metaSecondary: {
            label: "Informacao extra 2",
            helper: "Campo opcional. Pode ficar vazio.",
          },
          ctaLabel: {
            label: "Texto do botao",
            helper: "Ex.: Ver destino, Explorar base ou Conhecer melhor.",
          },
          ctaTarget: {
            label: "Destino do botao",
            helper: "Link interno ou URL que o card deve abrir.",
          },
        },
      }}
    />
  )
}
