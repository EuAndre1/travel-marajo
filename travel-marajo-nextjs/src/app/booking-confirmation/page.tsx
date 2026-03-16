'use client'

import Link from 'next/link'

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            Reserva Confirmada!
          </h1>
          <p className="text-neutral-600 mb-6">
            Sua reserva foi realizada com sucesso. Enviamos os detalhes para o seu email.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-neutral-500 mb-1">NÃºmero da reserva</p>
            <p className="text-lg font-mono font-bold text-neutral-800">
              TMJ-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/profile"
              className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Ver Minhas Reservas
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-200 text-neutral-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voltar para InÃ­cio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
