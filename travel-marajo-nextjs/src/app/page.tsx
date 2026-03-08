import Hero from '@/components/Hero'
import SearchForm from '@/components/SearchForm'
import FlightCard from '@/components/FlightCard'
import PackageCard from '@/components/PackageCard'
import DestinationCard from '@/components/DestinationCard'

// Dados de exemplo para demonstração
const featuredFlights = [
  {
    id: 'f1',
    airline: 'TAAG Angola Airlines',
    flightNumber: 'DT746',
    departureAirport: 'LAD',
    arrivalAirport: 'BEL',
    departureTime: '2026-03-15T08:00:00Z',
    arrivalTime: '2026-03-15T18:00:00Z',
    price: 850,
    currency: 'USD',
    stops: 1,
    duration: '10h00m',
  },
  {
    id: 'f2',
    airline: 'TAP Air Portugal',
    flightNumber: 'TP201',
    departureAirport: 'LIS',
    arrivalAirport: 'BEL',
    departureTime: '2026-03-20T10:00:00Z',
    arrivalTime: '2026-03-20T20:00:00Z',
    price: 720,
    currency: 'EUR',
    stops: 0,
    duration: '9h00m',
  },
  {
    id: 'f3',
    airline: 'LATAM Airlines',
    flightNumber: 'LA3456',
    departureAirport: 'GRU',
    arrivalAirport: 'BEL',
    departureTime: '2026-03-22T14:00:00Z',
    arrivalTime: '2026-03-22T17:30:00Z',
    price: 1200,
    currency: 'BRL',
    stops: 0,
    duration: '3h30m',
  },
]

const featuredPackages = [
  {
    id: 'p1',
    name: 'Aventura Marajoara 5 Dias',
    description: 'Explore búfalos, praias e a cultura local em uma experiência única.',
    price: 1500,
    currency: 'BRL',
    durationDays: 5,
    includes: ['Hospedagem', 'Passeios', 'Refeições', 'Transfer'],
    destinations: ['Soure', 'Salvaterra'],
    images: ['/images/package-1.jpg'],
  },
  {
    id: 'p2',
    name: 'Expedição Ecológica Marajó',
    description: 'Imersão na natureza e vida selvagem do maior arquipélago fluviomarinho.',
    price: 2200,
    currency: 'BRL',
    durationDays: 7,
    includes: ['Hospedagem', 'Guias', 'Equipamento', 'Refeições'],
    destinations: ['Soure', 'Cachoeira do Arari'],
    images: ['/images/package-2.jpg'],
  },
  {
    id: 'p3',
    name: 'Fim de Semana Romântico',
    description: 'Praias paradisíacas e pôr do sol inesquecível para casais.',
    price: 800,
    currency: 'BRL',
    durationDays: 3,
    includes: ['Hospedagem', 'Jantar Romântico', 'Passeio de Barco'],
    destinations: ['Praia do Pesqueiro'],
    images: ['/images/package-3.jpg'],
  },
]

const destinations = [
  {
    id: 'd1',
    name: 'Soure',
    description: 'Conhecida por suas praias de água doce, fazendas de búfalos e cultura local vibrante.',
    images: ['/images/soure.jpg'],
    country: 'Brasil',
    state: 'Pará',
  },
  {
    id: 'd2',
    name: 'Salvaterra',
    description: 'Praias tranquilas, paisagens naturais deslumbrantes e história colonial.',
    images: ['/images/salvaterra.jpg'],
    country: 'Brasil',
    state: 'Pará',
  },
  {
    id: 'd3',
    name: 'Cachoeira do Arari',
    description: 'Natureza exuberante, cachoeiras e trilhas ecológicas imperdíveis.',
    images: ['/images/cachoeira.jpg'],
    country: 'Brasil',
    state: 'Pará',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Destinos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-dark mb-4">
              Explore o Marajó
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              O maior arquipélago fluviomarinho do mundo espera por você com sua cultura única, 
              praias paradisíacas e natureza exuberante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Flights Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary-dark mb-4">
              Voos em Destaque
            </h2>
            <p className="text-neutral-600">
              As melhores conexões para chegar ao Marajó
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featuredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary-dark mb-4">
              Pacotes em Destaque
            </h2>
            <p className="text-neutral-600">
              Experiências completas para aproveitar ao máximo sua viagem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Receba as Melhores Ofertas
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Cadastre-se e receba promoções exclusivas para sua viagem à Marajó 
            diretamente no seu e-mail.
          </p>
          
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-neutral-900 font-semibold rounded-lg transition-colors"
            >
              Cadastrar
            </button>
          </form>
          
          <div className="mt-6 flex justify-center gap-8 text-white/70 text-sm">
            <span>✓ +50.000 viajantes</span>
            <span>✓ Promoções semanais</span>
            <span>✓ Cancele quando quiser</span>
          </div>
        </div>
      </section>
    </>
  )
}
