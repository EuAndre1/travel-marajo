import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://www.travelmarajo.com'),
  title: {
    default: 'Travel Marajo',
    template: '%s | Travel Marajo',
  },
  description: 'Plataforma internacional de turismo para o arquipelago do Marajo.',
  keywords: ['visit Marajo Brazil', 'travel Marajo island', 'Amazon tourism Brazil'],
  alternates: {
    canonical: '/',
    languages: {
      pt: '/pt',
      en: '/en',
      fr: '/fr',
      es: '/es',
    },
  },
  openGraph: {
    title: 'Travel Marajo',
    description: 'Descubra experiencias autenticas na Amazonia.',
    url: 'https://www.travelmarajo.com',
    siteName: 'Travel Marajo',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
