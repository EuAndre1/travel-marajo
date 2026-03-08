'use client'

import Link from 'next/link'

const quickLinks = [
  { label: 'Sobre Nos', href: '#' },
  { label: 'Destinos', href: '/#destinos' },
  { label: 'Hoteis', href: '/hotels' },
  { label: 'Voos', href: '/flights' },
  { label: 'Pacotes', href: '/packages' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#003366]">
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,32 C200,60 400,10 600,32 C800,60 1000,10 1200,32 L1200,0 L0,0 Z" fill="#F5F5F5" />
        </svg>
      </div>

      <div className="pt-24 pb-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-white">Travel <span className="text-[#FF6600]">Marajo</span></span>
                </Link>
                <p className="text-white/70 text-sm">Sua porta de entrada para o paraiso da Ilha de Marajo.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Links Rapidos</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-white/70 text-sm hover:text-[#FF6600] transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Atendimento</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>Central de Ajuda</li>
                  <li>Perguntas Frequentes</li>
                  <li>Politica de Cancelamento</li>
                  <li>Termos de Uso</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Contato</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>contato@travelmarajo.com</li>
                  <li>0800 123 4567</li>
                  <li>Soure, Ilha de Marajo - PA</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/60 text-sm">� {new Date().getFullYear()} Travel Marajo. Todos os direitos reservados.</p>
                <div className="flex items-center gap-4 text-white/60 text-xs">
                  <span>CNPJ: 00.000.000/0001-00</span>
                  <span>Cadastur: 26.012747.10.0001-6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
