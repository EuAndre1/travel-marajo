"use client"

import Link from "next/link"
import SectionHeader from "@/components/home/SectionHeader"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function CheckoutCancelPage() {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F7F8] py-20">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow={content.checkoutCancelEyebrow}
              title={content.checkoutCancelTitle}
              subtitle={content.checkoutCancelSubtitle}
            />

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(lang, "experiences")}
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-5 py-3 font-semibold text-white transition hover:bg-[#e55a00]"
                >
                  {content.checkoutCancelBack}
                </Link>
                <Link
                  href={getLocalizedPath(lang, "planTrip")}
                  className="inline-flex items-center justify-center rounded-xl border border-[#003366] px-5 py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                >
                  {content.checkoutCancelConcierge}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
