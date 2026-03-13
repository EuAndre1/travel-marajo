"use client"

import Link from "next/link"
import { footerContent } from "@/data/site"

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1C2C]">
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,32 C200,60 400,10 600,32 C800,60 1000,10 1200,32 L1200,0 L0,0 Z" fill="#F7F7F8" />
        </svg>
      </div>

      <div className="pt-24 pb-10">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
              <div>
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <span className="text-xl font-display text-white">Travel MarajÃ³</span>
                </Link>
                <p className="text-white/70 text-sm max-w-xs">
                  {footerContent.brand.description}
                </p>
              </div>

              {footerContent.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-white/70 text-sm hover:text-accent transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-white font-semibold mb-4">{footerContent.contact.title}</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  {footerContent.contact.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/60 text-sm">Â© {new Date().getFullYear()} Travel MarajÃ³. Todos os direitos reservados.</p>
                <div className="flex items-center gap-4 text-white/60 text-xs">
                  <span>CNPJ: {footerContent.legal.cnpj}</span>
                  <span>Cadastur: {footerContent.legal.cadastur}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
