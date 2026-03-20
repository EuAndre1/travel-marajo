import ContentStudioEditor from "@/components/admin/ContentStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminContentPage() {
  const contentState = await loadPersistedContentStudioState()
  return <ContentStudioEditor initialDraft={contentState.content} />
}
