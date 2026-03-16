"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import SectionHeader from "@/components/home/SectionHeader"
import { siteContent } from "@/config/site-content"
import { getPackageBySlug } from "@/data/pacotes"
import { getLocalizedPath } from "@/i18n/routing"
import { getExperienceBySlug } from "@/lib/experiences"
import { useSiteLanguage } from "@/lib/use-site-language"

function buildWhatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  const normalized = number.replace(/\D/g, "")
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export default function CheckoutSuccessClient() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const params = useSearchParams()
  const slug = params.get("item")
  const type = params.get("type")

  const experience = slug ? getExperienceBySlug(slug) : null
  const packageItem = slug ? getPackageBySlug(slug) : null
  const itemName = type === "pacote" ? packageItem?.title : experience?.title
  const message = itemName
    ? content.checkoutSuccessWhatsappMessage.replace("{itemName}", itemName)
    : content.checkoutSuccessWhatsappFallback

  const whatsappLink = buildWhatsappLink(message)

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F7F8] py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow={content.checkoutSuccessEyebrow}
              title={content.checkoutSuccessTitle}
              subtitle={content.checkoutSuccessSubtitle}
            />

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-600">
                {itemName ? `${content.checkoutSuccessItemLabel}: ${itemName}` : content.checkoutSuccessDefault}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 font-semibold text-white transition hover:bg-[#e55a00]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.checkoutSuccessWhatsapp}
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">{content.pages.planTrip.whatsappFallback}</span>
                )}
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                >
                  {content.checkoutSuccessMore}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
