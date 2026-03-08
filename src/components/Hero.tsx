'use client'

import SearchForm from './SearchForm'

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center min-h-[600px] flex items-center justify-center text-white"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80)' 
      }}
    >
      <div className="relative z-10 text-center px-4 py-16 w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-4 animate-fadeIn">
          Descubra o Marajó
        </h1>
        <p className="text-xl md:text-2xl font-sans mb-2">
          A Amazônia Autêntica
        </p>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Sua aventura começa aqui. Voos, hotéis e pacotes para uma experiência inesquecível.
        </p>
        <div className="max-w-4xl mx-auto">
          <SearchForm />
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-white/70 text-sm">Hotéis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-white/70 text-sm">Destinos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">100k+</div>
            <div className="text-white/70 text-sm">Viajantes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-white/70 text-sm">Avaliação</div>
          </div>
        </div>
      </div>
    </section>
  )
}
