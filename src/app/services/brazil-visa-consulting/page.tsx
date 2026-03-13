import Link from "next/link"
import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/data/services"
import { buildServiceMetadata, buildServiceStructuredData, type JsonLdNode } from "@/lib/metadata-schema"
import { buildWhatsAppUrl } from "@/lib/whatsapp-message"

const slug = "brazil-visa-consulting"

export function generateMetadata() {
  const service = getServiceBySlug(slug)

  if (!service) {
    return {}
  }

  return buildServiceMetadata({
    title: "Brazil Visa Consulting for Marajo Travelers",
    description:
      "Understand who may need a Brazil visa, how visa consulting works, and the typical preparation steps before booking a Marajo trip.",
    path: `/services/${slug}`,
    keywords: ["brazil visa help", "brazil visa consulting", "brazil travel visa support"],
  })
}

export default function BrazilVisaConsultingPage() {
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappLink = phone
    ? buildWhatsAppUrl(
        phone,
        "Hello! I want help understanding Brazil visa requirements before planning a Marajo trip.",
      )
    : null

  const jsonLd = buildServiceStructuredData({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    serviceType: "Brazil visa consulting",
    faq: service.faq,
  })

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${service.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema as JsonLdNode) }}
        />
      ))}

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
          <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Travel service</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{service.title}</h1>
              <p className="mt-6 max-w-3xl text-lg text-white/85">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    Start visa consultation
                  </a>
                ) : null}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F7F8] py-16">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-5xl grid gap-8">
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">Who may need a visa</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Visa requirements for Brazil depend on nationality, purpose of travel, and timing.
                  This consulting service is designed for international travelers who want a clearer
                  answer before committing to flights, packages, or Marajo itinerary planning.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">How the consulting works</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The service helps travelers understand whether a visa may be relevant, what type of
                  documentation questions matter first, and how to approach the official process with
                  fewer mistakes and less uncertainty.
                </p>
                <p className="mt-4 text-sm font-semibold text-[#003366]">{service.priceModel}</p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">Typical processing steps</h2>
                <div className="mt-6 grid gap-4">
                  {service.processSteps.map((step, index) => (
                    <div key={step} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
                      <span className="font-semibold text-[#003366]">{index + 1}.</span> {step}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl bg-[#FFF1E8] p-8">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">WhatsApp consultation CTA</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                  If the traveler is still unsure about entry requirements, the fastest next step is a
                  WhatsApp conversation before moving into package comparison or trip planning.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                    >
                      Talk on WhatsApp
                    </a>
                  ) : null}
                  <Link
                    href="/planejar-viagem"
                    className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    Continue to travel planning
                  </Link>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#0B1C2C]">Frequently asked questions</h2>
                <div className="mt-6 grid gap-4">
                  {service.faq.map((item) => (
                    <div key={item.question} className="rounded-2xl bg-slate-50 px-5 py-4">
                      <h3 className="text-base font-semibold text-[#0B1C2C]">{item.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
