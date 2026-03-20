import AdminSectionPlaceholder from "@/components/admin/AdminSectionPlaceholder"

export default function AdminPackagesPage() {
  return (
    <AdminSectionPlaceholder
      eyebrow="Pacotes"
      title="Camada administrativa dos pacotes"
      description="Entrada preparada para o editor de pacotes e jornadas, sem tocar na listagem pública nem no fluxo atual de checkout."
      routeLabel="/admin/packages"
    />
  )
}
