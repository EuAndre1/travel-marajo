"use client"

import Image from "next/image"
import { getHomeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"

export default function HomeNewsletter() {
  const { lang } = useSiteLanguage()
  const { newsletter } = getHomeContent(lang)
  const content = siteContent[lang]

  return (
    <section id="newsletter" className="tm-section bg-[linear-gradient(180deg,#f7f7f8_0%,#f2ebe0_100%)]">
      <div className="tm-shell">
        <div className="overflow-hidden rounded-[2.4rem] bg-[#0B1C2C] text-white shadow-[0_34px_80px_rgba(11,28,44,0.24)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <p className="text-[11px] uppercase tracking-[0.24em] text-accent-light/80 sm:text-xs sm:tracking-[0.3em]">
                {content.home.newsletterEyebrow}
              </p>
              <h2 className="mt-3 text-[2rem] font-display leading-tight sm:text-4xl">
                {newsletter.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/78 sm:text-base sm:leading-8">
                {newsletter.subtitle}
              </p>
              <ul className="mt-5 grid gap-2.5 text-sm text-white/76">
                {newsletter.benefits.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row" aria-label={content.home.newsletterAriaLabel}>
                <label className="flex-1">
                  <span className="sr-only">{content.home.newsletterEmailLabel}</span>
                  <input
                    type="email"
                    required
                    placeholder={content.home.newsletterEmailPlaceholder}
                    className="h-12 w-full rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/45 focus:border-accent focus:ring-accent"
                  />
                </label>
                <button
                  type="submit"
                  className="h-12 rounded-full bg-[#E57A1F] px-6 text-sm font-semibold text-white transition hover:bg-[#c96815]"
                >
                  {newsletter.ctaLabel}
                </button>
              </form>
              <p className="mt-3 text-xs leading-5 text-white/55">{newsletter.privacyNote}</p>
            </div>

            <div className="relative min-h-[260px] sm:min-h-[320px]">
              <Image
                src={newsletter.image}
                alt={content.home.newsletterImageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,44,0.08),rgba(11,28,44,0.62))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
