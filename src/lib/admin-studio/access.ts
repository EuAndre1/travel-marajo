import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { DEFAULT_LOCALE } from "@/config/i18n"
import { authOptions } from "@/lib/auth/options"
import { getLocalizedPath } from "@/i18n/routing"

const ADMIN_CALLBACK_PATH = "/admin"

export async function requireAdminSession() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(`${getLocalizedPath(DEFAULT_LOCALE, "login")}?callbackUrl=${encodeURIComponent(ADMIN_CALLBACK_PATH)}`)
  }

  if (!session.user.isAdmin) {
    redirect(getLocalizedPath(DEFAULT_LOCALE, "profile"))
  }

  return session
}
