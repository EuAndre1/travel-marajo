import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Travel MarajÃ³ - Descubra a AmazÃ´nia AutÃªntica',
  description: 'Sua porta de entrada para o arquipÃ©lago do MarajÃ³. Voos, hotÃ©is e pacotes para uma experiÃªncia inesquecÃ­vel na AmazÃ´nia.',
  keywords: ['MarajÃ³', 'AmazÃ´nia', 'Turismo', 'Viagens', 'Brasil', 'Ãfrica', 'Europa', 'AmÃ©rica Latina'],
  openGraph: {
    title: 'Travel MarajÃ³',
    description: 'Descubra a AmazÃ´nia AutÃªntica',
    url: 'https://www.travelmarajo.com',
    siteName: 'Travel MarajÃ³',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel MarajÃ³',
    description: 'Descubra a AmazÃ´nia AutÃªntica',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
