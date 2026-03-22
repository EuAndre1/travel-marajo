import type { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TravelAssistantWidget from "@/components/assistant/TravelAssistantWidget"
import { DEFAULT_LOCALE, LOCALE_TO_BCP47 } from "@/config/i18n"
import { getSiteUrl } from "@/lib/env"
import { loadPersistedContentStudioState } from "@/lib/content-studio/persistence"
import { getLocalizedAlternates, getLocalizedPath } from "@/i18n/routing"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Travel Marajó",
    template: "%s | Travel Marajó",
  },
  description: "Premium destination platform for Maraj? Island with multilingual discovery, planning, and checkout-ready routes.",
  keywords: ["marajo island travel", "amazon island experiences", "travel marajo"],
  alternates: {
    canonical: getLocalizedPath(DEFAULT_LOCALE, "home"),
    languages: getLocalizedAlternates("home"),
  },
  openGraph: {
    title: "Travel Marajó",
    description: "Discover Maraj? Island through experiences, destinations, guides, and international-ready travel planning.",
    url: getSiteUrl(),
    siteName: "Travel Marajó",
    locale: LOCALE_TO_BCP47[DEFAULT_LOCALE].replace("-", "_"),
    type: "website",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const locale = headersList.get("x-site-locale") ?? DEFAULT_LOCALE
  const isAdminStudio = headersList.get("x-app-surface") === "admin"
  const initialContentState = await loadPersistedContentStudioState()

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers initialContentState={initialContentState}>
          {isAdminStudio ? (
            <div className="min-h-screen bg-[#f6f3ee]">
              <main>{children}</main>
            </div>
          ) : (
            <>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <TravelAssistantWidget />
            </>
          )}
        </Providers>
      </body>
    </html>
  )
}
