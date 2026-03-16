"use client"

import Image from "next/image"
import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function HomeNewsletter() {
  const { newsletter } = homeContent
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="newsletter" className="py-20 bg-[#F7F7F8]">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
              {content.home.newsletterEyebrow}
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display text-[#0B1C2C]">
              {newsletter.title}
            </h2>
            <p className="mt-4 text-base text-slate-600">
              {newsletter.subtitle}
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-600">
              {newsletter.benefits.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <form className="mt-6 flex flex-col sm:flex-row gap-3" aria-label={content.home.newsletterAriaLabel}>
              <label className="flex-1">
                <span className="sr-only">{content.home.newsletterEmailLabel}</span>
                <input
                  type="email"
                  required
                  placeholder={content.home.newsletterEmailPlaceholder}
                  className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm focus:border-primary focus:ring-primary"
                />
              </label>
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-primary text-white text-sm font-semibold transition hover:bg-primary-dark"
              >
                {newsletter.ctaLabel}
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">{newsletter.privacyNote}</p>
          </div>

          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={newsletter.image}
              alt={content.home.newsletterImageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}