'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = ['Voos', 'Hoteis', 'Pacotes', 'Atividades', 'Onibus', 'Carros']

export default function HeroLanding() {
  const [activeTab, setActiveTab] = useState('Voos')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-ken-burns">
          <img src="/hero-bg.jpg" alt="Praia tropical de Marajo" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/80" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              <span className="block">Descubra o Paraiso</span>
              <span className="block">
                da <span className="text-[#FF6600]">Ilha de Marajo</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Aonde quer que voce va, nos te levamos. Encontre as melhores ofertas para sua proxima aventura.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto animate-float" style={{ animationDuration: '6s' }}>
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 relative ${
                    activeTab === tab ? 'text-[#003366] bg-blue-50' : 'text-gray-600 hover:text-[#003366] hover:bg-gray-50'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6600]" />}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input placeholder="Origem" className="h-12 border-gray-200 rounded-lg" />
                <input placeholder="Destino" className="h-12 border-gray-200 rounded-lg" />
                <input placeholder="Datas" className="h-12 border-gray-200 rounded-lg" />
                <input placeholder="Passageiros" className="h-12 border-gray-200 rounded-lg" />
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/flights" className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-8 h-12 inline-flex items-center rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105">
                  Buscar
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8">
            <div className="text-center text-white"><div className="text-2xl font-bold">500+</div><div className="text-sm text-white/80">Hoteis</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">50+</div><div className="text-sm text-white/80">Destinos</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">100k+</div><div className="text-sm text-white/80">Viajantes</div></div>
            <div className="text-center text-white"><div className="text-2xl font-bold">4.9</div><div className="text-sm text-white/80">Avaliacao</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
