import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TravelAssistantWidget from "@/components/assistant/TravelAssistantWidget"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "https://www.travelmarajo.com"),
  title: {
    default: "Travel MarajÃ³",
    template: "%s | Travel MarajÃ³",
  },
  description: "Plataforma internacional de turismo para o arquipÃ©lago do MarajÃ³.",
  keywords: ["visit Marajo Brazil", "travel Marajo island", "Amazon tourism Brazil"],
  alternates: {
    canonical: "/",
    languages: {
      pt: "/pt",
      en: "/en",
      fr: "/fr",
      es: "/es",
    },
  },
  openGraph: {
    title: "Travel MarajÃ³",
    description: "Descubra experiÃªncias autÃªnticas na AmazÃ´nia.",
    url: "https://www.travelmarajo.com",
    siteName: "Travel MarajÃ³",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <TravelAssistantWidget />
        </Providers>
      </body>
    </html>
  )
}