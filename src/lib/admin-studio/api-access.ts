import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth/options"

export async function requireAdminApiSession() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return {
      session: null,
      response: NextResponse.json({ error: "AUTH_REQUIRED" }, { status: 401 }),
    }
  }

  if (!session.user.isAdmin) {
    return {
      session: null,
      response: NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 }),
    }
  }

  return {
    session,
    response: null,
  }
}
