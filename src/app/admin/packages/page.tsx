import PackagesStudioEditor from "@/components/admin/PackagesStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminPackagesPage() {
  const contentState = await loadPersistedContentStudioState()
  return <PackagesStudioEditor initialDraft={contentState.packages} />
}
