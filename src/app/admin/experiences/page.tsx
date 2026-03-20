import AdminSectionPlaceholder from "@/components/admin/AdminSectionPlaceholder"

export default function AdminExperiencesPage() {
  return (
    <AdminSectionPlaceholder
      eyebrow="Experiências"
      title="Camada administrativa das experiências"
      description="Rota protegida para o futuro editor de experiências, mantendo slugs, páginas públicas e checkout intactos."
      routeLabel="/admin/experiences"
    />
  )
}
