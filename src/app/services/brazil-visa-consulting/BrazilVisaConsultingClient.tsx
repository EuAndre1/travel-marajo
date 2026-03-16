"use client"

import Link from "next/link"
import { siteContent } from "@/config/site-content"
import type { ServiceItem } from "@/data/services"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

interface BrazilVisaConsultingClientProps {
  service: ServiceItem
  whatsappLink: string | null
}

export default function BrazilVisaConsultingClient({
  service,
  whatsappLink,
}: BrazilVisaConsultingClientProps) {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang].pages.serviceBrazilVisa

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0B1C2C] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_30%)]" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">{content.heroEyebrow}</p>
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
                  {content.primaryCta}
                </a>
              ) : null}
              <Link
                href={getLocalizedPath(lang, "services")}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {content.backCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F8] py-16">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto grid max-w-5xl gap-8">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.whoNeedsTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.whoNeedsBody}</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.howWorksTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{content.howWorksBody}</p>
              <p className="mt-4 text-sm font-semibold text-[#003366]">{service.priceModel}</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.stepsTitle}</h2>
              <div className="mt-6 grid gap-4">
                {service.processSteps.map((step, index) => (
                  <div key={step} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
                    <span className="font-semibold text-[#003366]">{index + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl bg-[#FFF1E8] p-8">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.whatsappTitle}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">{content.whatsappBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
                  >
                    {content.whatsappCta}
                  </a>
                ) : null}
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 text-sm font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                >
                  {content.continuePlanningCta}
                </Link>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#0B1C2C]">{content.faqTitle}</h2>
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
  )
}
