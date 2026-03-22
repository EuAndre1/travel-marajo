import HotelsStudioEditor from "@/components/admin/HotelsStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminHotelsPage() {
  const contentState = await loadPersistedContentStudioState()

  return <HotelsStudioEditor initialDraft={contentState.hotelCards} />
}
