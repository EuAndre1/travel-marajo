import Link from "next/link"
import GuideCard from "@/components/seo/GuideCard"
import { guides } from "@/data/guides"
import { destinations } from "@/data/destinos"
import { experiences } from "@/data/experiencias"
import { buildGuideMetadata, buildGuideStructuredData, type JsonLdNode } from "@/lib/metadata-schema"

export const metadata = buildGuideMetadata({
  title: "Marajo Travel Guides: Planning, Culture, Wildlife and Experiences",
  description:
    "Explore Marajo travel guides covering things to do, logistics, seasonality, buffalo culture, wildlife, and booking-ready itinerary planning.",
  path: "/guides",
  keywords: [
    "marajo travel guides",
    "marajo island guide",
    "things to do in marajo",
    "how to visit marajo island",
  ],
})

export default function GuidesIndexPage() {
  const jsonLd = buildGuideStructuredData({
    title: "Marajo Travel Guides",
    description:
      "A crawlable SEO hub for Marajo Island travel guides covering attractions, logistics, seasonality, culture, and itinerary planning.",
    path: "/guides",
    keywords: ["marajo travel guides", "marajo island planning", "marajo destination authority"],
  })

  const guideClusters = [
    {
      title: "Start with planning",
      description: "Best for first-time visitors comparing logistics, trip length, and itinerary structure.",
      guides: ["how-to-visit-marajo-island", "how-many-days-in-marajo", "marajo-itinerary-guide", "is-marajo-worth-visiting"],
    },
    {
      title: "Explore nature and landscapes",
      description: "Use these to connect beaches, mangroves, wildlife, and scenic discovery.",
      guides: ["marajo-beaches-guide", "marajo-mangroves-and-rivers", "marajo-wildlife-guide", "marajo-birdwatching-guide"],
    },
    {
      title: "Understand culture and identity",
      description: "These guides support higher-intent travelers looking for food, buffalo culture, and regional identity.",
      guides: ["marajo-buffalo-culture", "marajo-buffalo-farm-experience", "marajo-food-guide", "marajo-local-culture"],
    },
  ]

  const featuredDestinations = destinations.filter((destination) =>
    ["soure", "salvaterra", "pesqueiro"].includes(destination.slug),
  )
  const flagshipExperiences = experiences.filter((experience) =>
    ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"].includes(experience.slug),
  )

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`guides-index-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
          <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-6xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Global SEO Hub</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Marajo travel guides for discovery and trip planning
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-white/85">
                This guide hub connects destination authority, experience discovery, cultural context,
                seasonality, and booking-ready planning for travelers exploring Marajo Island from Brazil,
                Latin America, the USA, and Europe.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/experiencias"
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                >
                  Explore experiences
                </Link>
                <Link
                  href="/pacotes"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See packages
                </Link>
                <Link
                  href="/planejar-viagem"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Plan with concierge
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F7F8] py-16">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Crawlable Guide Index</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">
                    One hub for logistics, culture, seasonality, wildlife, and booking intent
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                    Use these guides to move from broad destination discovery into high-intent planning.
                    The structure is designed to strengthen internal linking, route topical authority,
                    and support conversion toward experiences, packages, and concierge planning.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">Commercial Paths</p>
                  <div className="mt-4 grid gap-3">
                    <Link href="/experiencias" className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100">
                      <span className="font-semibold text-[#0B1C2C]">Experiences</span>
                      <span className="mt-1 block text-slate-500">Move from content into curated activities.</span>
                    </Link>
                    <Link href="/pacotes" className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100">
                      <span className="font-semibold text-[#0B1C2C]">Packages</span>
                      <span className="mt-1 block text-slate-500">Reduce planning friction with ready-made itineraries.</span>
                    </Link>
                    <Link href="/planejar-viagem" className="rounded-2xl bg-[#FFF1E8] p-4 text-sm text-slate-700 transition hover:bg-[#ffe5d6]">
                      <span className="font-semibold text-[#0B1C2C]">Plan Trip</span>
                      <span className="mt-1 block text-slate-500">Get human help with timing, logistics, and conversion.</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {guides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>

              <div className="mt-16 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Guide Clusters</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#0B1C2C]">
                    Follow clearer topical paths instead of browsing at random
                  </h2>
                  <div className="mt-8 grid gap-5">
                    {guideClusters.map((cluster) => (
                      <section key={cluster.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-[#0B1C2C]">{cluster.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{cluster.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {cluster.guides.map((slug) => {
                            const guide = guides.find((item) => item.slug === slug)

                            if (!guide) {
                              return null
                            }

                            return (
                              <Link
                                key={guide.slug}
                                href={`/guides/${guide.slug}`}
                                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#003366] transition hover:border-[#003366] hover:bg-white"
                              >
                                {guide.title}
                              </Link>
                            )
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">Top destinations</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">Move from guides into destination pages</h3>
                    <div className="mt-5 grid gap-3">
                      {featuredDestinations.map((destination) => (
                        <Link
                          key={destination.slug}
                          href={`/destinos/${destination.slug}`}
                          className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100"
                        >
                          <span className="font-semibold text-[#0B1C2C]">{destination.name}</span>
                          <span className="mt-1 block text-slate-500">{destination.tagline}</span>
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#003366]">Flagship experiences</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">Jump into the strongest conversion routes</h3>
                    <div className="mt-5 grid gap-3">
                      {flagshipExperiences.map((experience) => (
                        <Link
                          key={experience.slug}
                          href={`/experiencias/${experience.slug}`}
                          className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100"
                        >
                          <span className="font-semibold text-[#0B1C2C]">{experience.title}</span>
                          <span className="mt-1 block text-slate-500">{experience.shortDescription}</span>
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-3xl bg-[#FFF1E8] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9A3412]">Need a custom route?</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">Turn guide research into a real trip plan</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      The planning page is the best next step for travelers comparing timing, logistics, destinations, and commercial options.
                    </p>
                    <Link
                      href="/planejar-viagem"
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                    >
                      Go to trip planning
                    </Link>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
