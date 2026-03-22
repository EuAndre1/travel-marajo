import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import { requireAdminSession } from "@/lib/admin-studio/access"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,28,44,0.07),_transparent_32%),linear-gradient(180deg,#f7f4ee_0%,#f7f6f2_34%,#fcfcfb_100%)]">
      <div className="mx-auto max-w-[1560px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid items-start gap-5 xl:grid-cols-[280px,minmax(0,1fr)]">
          <AdminSidebar
            userName={session.user.name ?? "Admin"}
            userEmail={session.user.email ?? "Sem email"}
          />
          <div className="relative z-10 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
