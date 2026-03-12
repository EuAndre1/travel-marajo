'use client'

import { siteContent } from '@/config/site-content'
import { useSiteLanguage } from '@/lib/use-site-language'

const experiences = [
  {
    title: 'Passeio de Búfalo na Praia',
    category: 'Experiência exclusiva',
    duration: '2 horas',
    price: 'R$ 180',
    rating: '4.9',
    image: '/soure-bufalo.png',
    cta: '/activities',
  },
  {
    title: 'Praia do Pesqueiro ao Pôr do Sol',
    category: 'Natureza',
    duration: 'Meio dia',
    price: 'R$ 150',
    rating: '4.8',
    image: '/pesqueiro-1.png',
    cta: '/activities',
  },
  {
    title: 'Vivência Cultural em Soure',
    category: 'Cultura local',
    duration: '3 horas',
    price: 'R$ 120',
    rating: '4.9',
    image: '/pesqueiro-3.png',
    cta: '/packages',
  },
]

export default function PremiumExperiencesLanding() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="premium-experiences" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-[#FFF1E8] px-3 py-1 text-sm font-medium text-[#FF6600] mb-4">
              {content.expBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#003366] mb-4">
              {content.expTitle1} <span className="text-[#FF6600]">{content.expTitle2}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {content.expSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {experiences.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#003366]">{item.category}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-[#FF6600] px-3 py-1 text-xs font-semibold text-white">★ {item.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm text-white/80 mb-1">{item.duration}</p>
                    <h3 className="text-2xl font-bold leading-tight">{item.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <p className="text-sm text-gray-500">A partir de</p>
                      <p className="text-2xl font-bold text-[#003366]">{item.price}</p>
                    </div>
                    <p className="text-sm text-gray-500">por pessoa</p>
                  </div>

                  <a href={item.cta} className="inline-flex w-full items-center justify-center rounded-lg bg-[#FF6600] px-5 py-3 text-white font-semibold hover:bg-[#e55a00] transition-colors">
                    {content.reserveNow}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
