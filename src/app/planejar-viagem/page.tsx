"use client"

import SectionHeader from "@/components/home/SectionHeader"
import { useSiteLanguage } from "@/lib/use-site-language"
import { siteContent } from "@/config/site-content"

function buildWhatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  const normalized = number.replace(/\D/g, "")
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export default function PlanTripPage() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const message = content.pages.planTrip.whatsappMessage
  const whatsappLink = buildWhatsappLink(message)

  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-[#F7F7F8]">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow={content.pages.planTrip.eyebrow}
              title={content.pages.planTrip.title}
              subtitle={content.pages.planTrip.subtitle}
            />

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{content.pages.planTrip.deliverTitle}</p>
                    <ul className="mt-2 text-sm text-slate-600 space-y-2">
                      {content.pages.planTrip.deliverItems.map((item) => (
                        <li key={item}>â€¢ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{content.pages.planTrip.responseTitle}</p>
                    <p className="text-sm text-slate-600">{content.pages.planTrip.responseText}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FFF1E8] p-5">
                  <p className="text-sm text-slate-600">{content.pages.planTrip.nextStepLabel}</p>
                  <p className="text-xl font-semibold text-[#003366] mt-2">
                    {content.pages.planTrip.nextStepTitle}
                  </p>
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content.pages.planTrip.whatsappCta}
                    </a>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">
                      {content.pages.planTrip.whatsappFallback}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}