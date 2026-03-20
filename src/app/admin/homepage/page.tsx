import HomepageStudioEditor from "@/components/admin/HomepageStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminHomepagePage() {
  const contentState = await loadPersistedContentStudioState()
  return <HomepageStudioEditor initialDraft={contentState.homepage} />
}
