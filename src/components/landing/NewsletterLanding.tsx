'use client'

import { FormEvent, useState } from 'react'

export default function NewsletterLanding() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      setMessage('Informe um e-mail válido.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'HOME_NEWSLETTER',
          intentType: 'NEWSLETTER',
          email,
          metadata: {
            section: 'home_newsletter',
          },
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Falha ao registrar interesse.')
        return
      }

      setStatus('success')
      setMessage('Cadastro recebido. Enviaremos novidades em breve.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Falha ao registrar interesse.')
    }
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003366 0%, #0066CC 50%, #003366 100%)', backgroundSize: '200% 200%' }} />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Receba as Melhores <span className="text-[#FF6600]">Ofertas</span></h2>
              <p className="text-white/80 text-lg mb-6">Cadastre-se e receba promoções exclusivas para sua viagem a Marajó.</p>
              <form className="mb-6" onSubmit={onSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Digite seu e-mail"
                    className="flex-1 h-14 px-4 rounded-lg text-gray-800"
                    required
                  />
                  <button type="submit" disabled={status === 'loading'} className="h-14 px-8 bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-70">
                    {status === 'loading' ? 'Enviando...' : 'Quero Receber'}
                  </button>
                </div>
              </form>
              {message ? (
                <p className={`mb-4 text-sm ${status === 'success' ? 'text-green-200' : 'text-red-200'}`}>{message}</p>
              ) : null}
              <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                <span>+50.000 viajantes</span>
                <span>Promoções toda semana</span>
                <span>Cancele quando quiser</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img src="/newsletter-traveler.jpg" alt="Viajante feliz" className="rounded-2xl shadow-2xl w-full max-w-md ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
