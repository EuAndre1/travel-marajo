import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { requireAdminSession } from "@/lib/admin-studio/access"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession()

  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(11,28,44,0.08),_transparent_35%),linear-gradient(180deg,#f7f4ee_0%,#f8f7f3_38%,#ffffff_100%)]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[310px,minmax(0,1fr)]">
          <AdminSidebar
            userName={session.user.name ?? "Admin"}
            userEmail={session.user.email ?? "Sem email"}
          />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
