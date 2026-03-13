'use client'

import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const quickLinks = [
  { href: '/', label: 'InÃ­cio' },
  { href: '/flights', label: 'Voos' },
  { href: '/hotels', label: 'HotÃ©is' },
  { href: '/packages', label: 'Pacotes' },
  { href: '/about', label: 'Sobre NÃ³s' },
]

const supportLinks = [
  { href: '/contact', label: 'Fale Conosco' },
  { href: '/faq', label: 'Perguntas Frequentes' },
  { href: '/terms', label: 'Termos de Uso' },
  { href: '/privacy', label: 'PolÃ­tica de Privacidade' },
]

const socialLinks = [
  { href: '#', label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { href: '#', label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z' },
  { href: '#', label: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e DescriÃ§Ã£o */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Travel <span className="text-primary">MarajÃ³</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm mb-4">
              Sua porta de entrada para o arquipÃ©lago do MarajÃ³. 
              Descubra a AmazÃ´nia autÃªntica com a gente.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-primary hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links RÃ¡pidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links RÃ¡pidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-neutral-400">
                <MapPinIcon className="w-5 h-5 text-primary" />
                <span>Soure, Ilha de MarajÃ³ - PA, Brasil</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <PhoneIcon className="w-5 h-5 text-primary" />
                <span>+55 (91) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <EnvelopeIcon className="w-5 h-5 text-primary" />
                <span>contato@travelmarajo.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              Â© {new Date().getFullYear()} Travel MarajÃ³. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-neutral-500 text-xs">
              <span>CNPJ: 00.000.000/0001-00</span>
              <span>|</span>
              <span>Cadastur: 26.012747.10.0001-6</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
