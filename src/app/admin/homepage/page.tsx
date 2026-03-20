import AdminSectionPlaceholder from "@/components/admin/AdminSectionPlaceholder"

export default function AdminHomepagePage() {
  return (
    <AdminSectionPlaceholder
      eyebrow="Homepage"
      title="Camada administrativa da homepage"
      description="Esta rota já está protegida e pronta para receber o editor da homepage no próximo pass, sem reabrir autenticação nem mexer nas rotas públicas."
      routeLabel="/admin/homepage"
    />
  )
}
