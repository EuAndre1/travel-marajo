"use client"

import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeWhyMarajo() {
  const { lang } = useSiteLanguage()
  const { whyMarajo } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="por-que" className="bg-white py-20">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.whyEyebrow}
            title={whyMarajo.title}
            subtitle={whyMarajo.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyMarajo.items.map((item) => (
              <div
                key={item.title}
                className="border border-slate-100 rounded-2xl p-6 bg-slate-50/60 hover:border-primary/30 transition"
              >
                <h3 className="text-lg font-semibold text-[#0B1C2C]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
