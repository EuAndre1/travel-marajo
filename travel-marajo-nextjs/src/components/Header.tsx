'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/flights', label: 'Voos' },
  { href: '/hotels', label: 'Hotéis' },
  { href: '/packages', label: 'Pacotes' },
]

export default function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="text-xl font-bold text-neutral-800">
            Travel <span className="text-primary">Marajó</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-neutral-700 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {session ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={session.user?.image || '/images/default-avatar.png'}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{session.user?.name}</span>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border">
                <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  Meu Perfil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Entrar
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link 
                  href="/profile" 
                  className="text-neutral-700 hover:text-primary font-medium text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                  className="text-red-600 hover:text-red-800 font-medium text-lg"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
