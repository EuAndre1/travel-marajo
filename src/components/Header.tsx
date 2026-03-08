'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navItems = [
  { label: 'Voos', href: '/flights' },
  { label: 'Hoteis', href: '/hotels' },
  { label: 'Pacotes', href: '/packages' },
  { label: 'Atividades', href: '/#atividades' },
  { label: 'Ofertas', href: '/#ofertas' },
]

export default function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glassmorphism shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-[#003366]' : 'bg-white/20 backdrop-blur-sm'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-[#003366]' : 'text-white'}`}>
              Travel <span className="text-[#FF6600]">Marajo</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#003366] hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/profile" className={`${isScrolled ? 'text-gray-700 hover:text-[#003366]' : 'text-white/90 hover:text-white'} text-sm font-medium transition-colors`}>
                  Meu Perfil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Entrar
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className={isScrolled ? 'text-[#003366]' : 'text-white'}>
              {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-gray-700 hover:text-[#003366]" onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/profile" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Meu Perfil
                </Link>
                <button onClick={() => { signOut(); setIsMobileMenuOpen(false) }} className="text-red-600">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-[#FF6600] text-white px-4 py-2 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
