import { PrismaAdapter } from "@auth/prisma-adapter"
import { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { DEFAULT_LOCALE } from "@/config/i18n"
import { db } from "@/database/client"
import { getSafeAuthSecret, normalizeLocalizedAppPath } from "@/lib/env"
import { getLocalizedPath } from "@/i18n/routing"
import { validateUserCredentials } from "@/services/user.service"

const providers: AuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null
      }

      const user = await validateUserCredentials(credentials.email, credentials.password)

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      }
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/pt/entrar",
    error: "/pt/entrar",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${normalizeLocalizedAppPath(url, DEFAULT_LOCALE)}`
      }

      try {
        const targetUrl = new URL(url)
        const base = new URL(baseUrl)

        if (targetUrl.origin === base.origin) {
          return `${baseUrl}${normalizeLocalizedAppPath(`${targetUrl.pathname}${targetUrl.search}`, DEFAULT_LOCALE)}`
        }
      } catch {
        return `${baseUrl}${getLocalizedPath(DEFAULT_LOCALE, "home")}`
      }

      return baseUrl
    },
  },
  secret: getSafeAuthSecret(),
}
