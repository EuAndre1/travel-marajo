const atividades = [
  { titulo: 'Observacao de Botos', duracao: '3 horas', preco: 120, imagem: '/atividade-boto.jpg', avaliacao: 4.9, categoria: 'Natureza' },
  { titulo: 'Trilha Ecologica', duracao: '4 horas', preco: 89, imagem: '/atividade-trilha.jpg', avaliacao: 4.8, categoria: 'Aventura' },
  { titulo: 'Passeio de Canoa', duracao: '2 horas', preco: 75, imagem: '/atividade-canoa.jpg', avaliacao: 4.7, categoria: 'Tradicional' },
  { titulo: 'Visita a Comunidades', duracao: '6 horas', preco: 150, imagem: '/atividade-comunidade.jpg', avaliacao: 4.9, categoria: 'Cultural' },
  { titulo: 'Pesca Esportiva', duracao: '8 horas', preco: 280, imagem: '/atividade-pesca.jpg', avaliacao: 5.0, categoria: 'Aventura' },
  { titulo: 'Cavalgada na Praia', duracao: '2 horas', preco: 95, imagem: '/atividade-cavalgada.jpg', avaliacao: 4.8, categoria: 'Romantico' },
  { titulo: 'Culinaria Local', duracao: '3 horas', preco: 110, imagem: '/atividade-culinaria.jpg', avaliacao: 4.9, categoria: 'Gastronomia' },
  { titulo: 'Artesanato Marajoara', duracao: '2 horas', preco: 65, imagem: '/atividade-artesanato.jpg', avaliacao: 4.7, categoria: 'Cultural' },
]

export default function AtividadesLanding() {
  return (
    <section id="atividades" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Atividades e <span className="text-[#FF6600]">Experiencias</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Viva Marajo de todas as formas.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {atividades.map((atividade) => (
            <article key={atividade.titulo} className="group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-44 overflow-hidden">
                <img src={atividade.imagem} alt={atividade.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 text-[#003366] text-xs px-2 py-1 rounded">{atividade.categoria}</span>
                <span className="absolute top-3 right-3 bg-white/90 text-xs px-2 py-1 rounded">{atividade.avaliacao}</span>
                <div className="absolute bottom-3 left-3 text-white text-sm">{atividade.duracao}</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#003366] text-base mb-2 group-hover:text-[#FF6600] transition-colors line-clamp-1">{atividade.titulo}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">A partir de</p>
                    <p className="text-[#003366] text-xl font-bold">R$ {atividade.preco}</p>
                  </div>
                  <button className="bg-[#FF6600] hover:bg-[#e55a00] text-white text-sm px-3 py-2 rounded-lg">Reservar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
