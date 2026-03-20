import ExperiencesStudioEditor from "@/components/admin/ExperiencesStudioEditor"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"

export default async function AdminExperiencesPage() {
  const contentState = await loadPersistedContentStudioState()
  return <ExperiencesStudioEditor initialDraft={contentState.experiences} />
}
