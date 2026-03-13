"use client"

import Image from "next/image"
import Link from "next/link"
import { homeContent } from "@/data/homepage"
import { siteContent } from "@/config/site-content"
import { useSiteLanguage } from "@/lib/use-site-language"
import SectionHeader from "./SectionHeader"

export default function HomeRoutesPackages() {
  const { routes } = homeContent
  const { lang } = useSiteLanguage()
  const content = siteContent[lang]

  return (
    <section id="roteiros" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={content.home.routesEyebrow}
            title={routes.title}
            subtitle={routes.subtitle}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {routes.items.map((route) => (
              <article
                key={route.title}
                className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition"
              >
                <div className="relative h-44">
                  <Image src={route.image} alt={route.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{route.days}</span>
                    <span className="font-semibold text-primary">{route.price}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B1C2C]">{route.title}</h3>
                  <p className="text-sm text-slate-600">{route.description}</p>
                  <ul className="text-xs text-slate-500 grid gap-2">
                    {route.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={route.href}
                    className="text-sm font-semibold text-primary inline-flex items-center gap-2"
                  >
                    {content.home.routesViewPackage}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}