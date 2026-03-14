"use client"

import Image from "next/image"
import Link from "next/link"
import { experiences } from "@/data/experiences"
import { siteContent } from "@/config/site-content"
import { getLocalizedPath } from "@/i18n/routing"
import { useSiteLanguage } from "@/lib/use-site-language"

type Props = {
  slug: keyof typeof experiences
}

export default function ExperienceClient({ slug }: Props) {
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]
  const experience = experiences[slug]

  return (
    <main className="bg-white min-h-screen">
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={experience.heroImage}
            alt={experience.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/70 via-[#003366]/50 to-[#003366]/85" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white mb-4 backdrop-blur-sm">
              {content.experienceBadge}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {experience.title}
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              {experience.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-8">
              <span className="rounded-full bg-white/10 px-4 py-2">{experience.location}</span>
              <span className="rounded-full bg-[#FF6600] px-4 py-2 text-white">{experience.price}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`${getLocalizedPath(lang, "checkout")}?experience=${experience.slug}`}
                className="inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
              >
                {content.bookNow}
              </Link>

              <Link
                href={getLocalizedPath(lang, "packages")}
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-[#003366] transition"
              >
                {content.backToPackages}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                  {content.experienceSectionTitle}
                </h2>

                <p className="text-gray-600 text-lg leading-8 mb-8">
                  {experience.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {experience.highlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-gray-200 px-5 py-4 text-[#003366] font-medium">
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-[#003366] mb-4">
                  {content.experienceGalleryTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {experience.images.map((img, index) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                      <Image
                        src={img}
                        alt={`${experience.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl border border-gray-200 shadow-xl p-6 bg-white">
                  <p className="text-sm text-gray-500 mb-2">{content.experienceBadge}</p>
                  <h3 className="text-2xl font-bold text-[#003366] mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{experience.location}</p>

                  <div className="rounded-2xl bg-[#FFF1E8] p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">{content.investmentLabel}</p>
                    <p className="text-xl font-bold text-[#FF6600]">{experience.price}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#003366] mb-3">{content.includedLabel}</p>
                    <ul className="space-y-2">
                      {experience.included.map((item) => (
                        <li key={item} className="text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${getLocalizedPath(lang, "checkout")}?experience=${experience.slug}`}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-[#e55a00] transition"
                  >
                    {content.continueBooking}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
