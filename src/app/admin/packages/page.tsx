import CardCollectionStudioEditor from "@/components/admin/CardCollectionStudioEditor"
import PackagesStudioEditor from "@/components/admin/PackagesStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminPackagesPage() {
  const contentState = await loadPersistedContentStudioState()

  return (
    <div className="space-y-8">
      <CardCollectionStudioEditor
        surface="routeCards"
        storageKey="travel-marajo-admin-route-cards-draft"
        initialDraft={contentState.routeCards}
        copy={{
          eyebrow: "Packages / Routes",
          title: "Cards de pacotes e roteiros",
          description:
            "Controle a vitrine principal de pacotes e roteiros com imagem, duracao, destaque e CTA.",
          scopeNote:
            "Os cards desta colecao sao persistidos no banco e podem aparecer na homepage e em vitrines ligadas a pacotes.",
          addButtonLabel: "Add new card",
          listTitle: "Colecao de pacotes e roteiros",
          listDescription:
            "Crie cards novos, troque a ordem, esconda o que nao deve aparecer e mantenha a vitrine comercial sempre atualizada.",
          imageLabel: "Imagem do pacote ou roteiro",
          imageHelper:
            "Escolha uma imagem persistente da biblioteca para este card.",
          sharedInfoTitle: "Visibilidade e ordem",
          sharedInfoDescription:
            "Controle se o card aparece e em que ordem ele entra na vitrine do site.",
          fieldCopy: {
            title: {
              label: "Titulo do pacote ou roteiro",
              helper: "Nome principal do card.",
            },
            eyebrow: {
              label: "Duracao ou chamada curta",
              helper: "Ex.: 4 dias / 3 noites.",
            },
            description: {
              label: "Descricao curta",
              helper: "Resumo rapido que ajuda o visitante a entender o roteiro.",
              multiline: true,
            },
            metaPrimary: {
              label: "Linha curta de inclusoes",
              helper: "Ex.: Hospedagem boutique • Traslado interno.",
            },
            metaSecondary: {
              label: "Preco exibido",
              helper: "Ex.: A partir de R$ 1.590.",
            },
            ctaLabel: {
              label: "Texto do botao",
              helper: "Ex.: Ver pacote ou Reservar agora.",
            },
            ctaTarget: {
              label: "Destino do botao",
              helper: "Link interno, slug ou destino comercial desta oferta.",
            },
          },
        }}
      />

      <div className="h-px bg-slate-200" />

      <PackagesStudioEditor initialDraft={contentState.packages} />
    </div>
  )
}
