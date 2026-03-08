import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Travel Marajó - Descubra a Amazônia Autêntica',
  description: 'Sua porta de entrada para o arquipélago do Marajó. Voos, hotéis e pacotes para uma experiência inesquecível na Amazônia.',
  keywords: ['Marajó', 'Amazônia', 'Turismo', 'Viagens', 'Brasil', 'África', 'Europa', 'América Latina'],
  openGraph: {
    title: 'Travel Marajó',
    description: 'Descubra a Amazônia Autêntica',
    url: 'https://www.travelmarajo.com',
    siteName: 'Travel Marajó',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Marajó',
    description: 'Descubra a Amazônia Autêntica',
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
