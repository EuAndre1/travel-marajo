const destinos = [
  { nome: 'Praia do Pesqueiro', tipo: 'Praia', preco: 'R$ 299', imagem: '/destino-pesqueiro.jpg', descricao: 'Uma das praias mais bonitas da ilha' },
  { nome: 'Salvaterra', tipo: 'Cultura', preco: 'R$ 199', imagem: '/destino-salvaterra.jpg', descricao: 'Centro histórico com arquitetura colonial' },
  { nome: 'Soure', tipo: 'Natureza', preco: 'R$ 249', imagem: '/destino-soure.jpg', descricao: 'Vida selvagem e paisagens naturais' },
  { nome: 'Praia de Barra Velha', tipo: 'Praia', preco: 'R$ 279', imagem: '/destino-barra-velha.jpg', descricao: 'Pôr do sol inesquecível' },
  { nome: 'Manguezais', tipo: 'Aventura', preco: 'R$ 189', imagem: '/destino-manguezais.jpg', descricao: 'Ecossistema único da Amazônia' },
]

export default function DestinosLanding() {
  return (
    <section id="destinos" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Destinos Populares em <span className="text-[#FF6600]">Marajó</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore os lugares mais incríveis da ilha e viva experiências inesquecíveis</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {destinos.map((destino) => (
            <article key={destino.nome} className="group overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img src={destino.imagem} alt={destino.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#FF6600] text-white text-xs px-2 py-1 rounded">{destino.tipo}</span>
                <div className="absolute bottom-3 left-3 right-3"><p className="text-white/80 text-xs">A partir de</p><p className="text-white font-bold text-lg">{destino.preco}</p></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#003366] text-lg mb-1 group-hover:text-[#FF6600] transition-colors">{destino.nome}</h3>
                <p className="text-gray-500 text-sm mb-3">{destino.descricao}</p>
                <button className="text-[#0066CC] text-sm font-medium">Explorar</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
