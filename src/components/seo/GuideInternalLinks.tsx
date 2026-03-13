import Link from "next/link"
import { getGuideBySlug, type GuideContentItem } from "@/data/guides"
import { getExperienceBySlug } from "@/data/experiencias"
import { getPackageBySlug } from "@/data/pacotes"

interface GuideInternalLinksProps {
  guide: GuideContentItem
}

export default function GuideInternalLinks({ guide }: GuideInternalLinksProps) {
  const relatedGuides = guide.relatedGuides
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean)

  const relatedExperiences = guide.relatedExperiences
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean)

  const relatedPackages = guide.relatedPackages
    .map((slug) => getPackageBySlug(slug))
    .filter(Boolean)

  return (
    <section className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Internal SEO Graph</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#0B1C2C]">Continue exploring Marajo</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Move from discovery into curated experiences, package options, and concierge planning
            without leaving the active commercial route structure.
          </p>
        </div>

        {relatedGuides.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#003366]">Related guides</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide!.slug}
                  href={`/guides/${relatedGuide!.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 transition hover:border-[#003366] hover:shadow-sm"
                >
                  <span className="font-semibold text-[#0B1C2C]">{relatedGuide!.title}</span>
                  <span className="mt-2 block text-slate-500">{relatedGuide!.seoDescription}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/experiencias"
            className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm transition hover:shadow-md"
          >
            <span className="font-semibold text-[#0B1C2C]">Explore experiences</span>
            <span className="mt-2 block text-slate-500">
              Browse curated activities tied to beaches, culture, and nature.
            </span>
            {relatedExperiences.length > 0 ? (
              <span className="mt-3 block text-xs text-[#003366]">
                Featured: {relatedExperiences.map((item) => item!.title).join(" • ")}
              </span>
            ) : null}
          </Link>

          <Link
            href="/pacotes"
            className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm transition hover:shadow-md"
          >
            <span className="font-semibold text-[#0B1C2C]">See travel packages</span>
            <span className="mt-2 block text-slate-500">
              Move from inspiration to itinerary with planning-ready package options.
            </span>
            {relatedPackages.length > 0 ? (
              <span className="mt-3 block text-xs text-[#003366]">
                Recommended: {relatedPackages.map((item) => item!.title).join(" • ")}
              </span>
            ) : null}
          </Link>

          <Link
            href="/planejar-viagem"
            className="rounded-2xl bg-[#FFF1E8] p-4 text-sm text-slate-700 shadow-sm transition hover:shadow-md"
          >
            <span className="font-semibold text-[#0B1C2C]">Plan with concierge</span>
            <span className="mt-2 block text-slate-500">
              Use the planning route when seasonality, logistics, and itinerary design need support.
            </span>
            <span className="mt-3 block text-xs text-[#FF6600]">Guide to concierge to booking</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
