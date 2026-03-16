const ofertas = [
  { titulo: 'Pacote Completo Marajo', desconto: 40, preco: 899, original: 1499, imagem: '/oferta-pacote.jpg', tag: 'Mais Popular' },
  { titulo: 'Hotel Pousada dos Guaras', desconto: 30, preco: 199, original: 285, imagem: '/oferta-hotel.jpg', tag: 'Oferta do Dia' },
  { titulo: 'Passeio de Barco pelos Rios', desconto: 25, preco: 149, original: 199, imagem: '/oferta-passeio.jpg', tag: 'Experiencia Unica' },
]

export default function OfertasLanding() {
  return (
    <section id="ofertas" className="py-16 md:py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Ofertas <span className="text-[#FF6600]">Imperdiveis</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Promocoes selecionadas para sua viagem ao Marajo</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ofertas.map((oferta) => (
            <article key={oferta.titulo} className="overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="relative h-52">
                <img src={oferta.imagem} alt={oferta.titulo} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#FF6600] text-white text-xs px-2 py-1 rounded">{oferta.tag}</span>
                <span className="absolute top-3 right-3 bg-[#003366] text-white text-sm font-bold px-2 py-1 rounded">-{oferta.desconto}%</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#003366] text-lg mb-2">{oferta.titulo}</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#003366]">R$ {oferta.preco}</span>
                  <span className="text-sm text-gray-400 line-through">R$ {oferta.original}</span>
                </div>
                <button className="w-full bg-[#FF6600] hover:bg-[#e55a00] text-white font-semibold py-2 rounded-lg transition-colors">Reservar</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
