import Link from "next/link"
import { services } from "@/data/services"
import { buildServiceMetadata, buildServiceStructuredData, type JsonLdNode } from "@/lib/metadata-schema"

export const metadata = buildServiceMetadata({
  title: "Travel Services for Marajo: Visa Consulting, Planning and Concierge",
  description:
    "Explore premium travel services from Travel Marajo including Brazil visa consulting, custom travel planning, and concierge assistance.",
  path: "/services",
  keywords: ["brazil visa consulting", "marajo travel planning", "travel concierge brazil"],
})

const serviceLinks: Record<string, string> = {
  "brazil-visa-consulting": "/services/brazil-visa-consulting",
  "custom-travel-planning": "/planejar-viagem",
  "concierge-assistance": "/planejar-viagem",
}

export default function ServicesPage() {
  const jsonLd = buildServiceStructuredData({
    title: "Travel Marajo Services",
    description:
      "Premium travel support services for Brazil trip preparation, Marajo planning, and concierge guidance.",
    path: "/services",
    serviceType: "Travel support services",
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`services-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
          <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-6xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Premium travel services</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Services that reduce friction before the Marajo trip begins
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-white/85">
                Use this hub when the traveler still needs support before choosing a package,
                a curated experience, or a concierge planning path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/planejar-viagem"
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                >
                  Plan with concierge
                </Link>
                <Link
                  href="/services/brazil-visa-consulting"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Visa consulting
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F7F8] py-16">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={serviceLinks[service.slug] ?? "/planejar-viagem"}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{service.priceModel}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#0B1C2C]">{service.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
                    <div className="mt-6 text-sm font-semibold text-[#003366]">See service details</div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 rounded-3xl bg-[#FFF1E8] p-8">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">
                  Use services when the trip still needs one more layer of clarity
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
                  Visa questions, custom planning, and concierge support are not separate from the
                  Marajo conversion journey. They help visitors move from uncertainty into a cleaner
                  commercial next step.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
