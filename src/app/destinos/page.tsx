"use client"

import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { useResolvedDestinationCards } from "@/components/content/ContentOverridesProvider"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function DestinationsPage() {
  const { lang } = useSiteLanguage()
  const destinationCards = useResolvedDestinationCards().filter(
    (item) => item.visible && item.imageUrl && item.title.trim() && (item.linkedSlug || item.ctaTarget),
  )

  const resolveDestinationHref = (linkedSlug: string, ctaTarget: string) => {
    if (ctaTarget && !ctaTarget.startsWith("/destinos/")) {
      return ctaTarget
    }

    return linkedSlug
      ? getLocalizedPath(lang, "destinationDetail", { slug: linkedSlug })
      : ctaTarget
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F7F8] py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Destinos"
              title="Bases estrategicas para explorar o Marajo"
              subtitle="Escolha sua base e conecte experiencias, hospedagens e logistica com curadoria local."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {destinationCards.map((destination) => (
                <article
                  key={destination.id}
                  className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="relative h-56 sm:h-64">
                    <Image
                      src={destination.imageUrl}
                      alt={destination.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/70 via-transparent" />
                    <span className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {destination.eyebrow}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0B1C2C]">{destination.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{destination.description}</p>
                    <Link
                      href={resolveDestinationHref(destination.linkedSlug, destination.ctaTarget)}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-primary"
                    >
                      {destination.ctaLabel}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
