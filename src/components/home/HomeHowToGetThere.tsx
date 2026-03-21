"use client"

import Link from "next/link"
import { useSiteLanguage } from "@/lib/use-site-language"
import { getLocalizedPath } from "@/i18n/routing"

const copy = {
  pt: {
    eyebrow: "Como chegar",
    title: "Chegar a Marajó é mais simples do que parece",
    subtitle: "Voo até Belém, travessia de ferry e transfer até sua base na ilha.",
    cta: "Planejar com ajuda local",
    steps: [
      { title: "1. Voe até Belém", body: "A entrada mais prática para começar a viagem." },
      { title: "2. Ferry para a ilha", body: "A travessia conecta o continente às bases de chegada." },
      { title: "3. Transfer até sua base", body: "Soure e Salvaterra são os pontos mais usados para começar." },
    ],
  },
  en: {
    eyebrow: "Getting there",
    title: "Reaching Marajo is simpler than it looks",
    subtitle: "Fly to Belem, cross by ferry, then continue with a transfer to your island base.",
    cta: "Plan with local help",
    steps: [
      { title: "1. Fly to Belem", body: "The clearest gateway for starting the trip." },
      { title: "2. Ferry to the island", body: "The crossing connects the mainland to arrival bases." },
      { title: "3. Transfer to your base", body: "Soure and Salvaterra are the most common starting points." },
    ],
  },
  es: {
    eyebrow: "Como llegar",
    title: "Llegar a Marajo es mas simple de lo que parece",
    subtitle: "Vuela a Belem, cruza en ferry y sigue con un transfer hasta tu base en la isla.",
    cta: "Planificar con ayuda local",
    steps: [
      { title: "1. Vuela a Belem", body: "La puerta de entrada mas clara para iniciar el viaje." },
      { title: "2. Ferry a la isla", body: "La travesia conecta el continente con las bases de llegada." },
      { title: "3. Transfer hasta tu base", body: "Soure y Salvaterra son los puntos mas usados para empezar." },
    ],
  },
  fr: {
    eyebrow: "Acces",
    title: "Arriver a Marajo est plus simple qu'il n'y parait",
    subtitle: "Vol jusqu'a Belem, traversee en ferry puis transfert vers votre base sur l'ile.",
    cta: "Planifier avec aide locale",
    steps: [
      { title: "1. Vol vers Belem", body: "La porte d'entree la plus simple pour commencer." },
      { title: "2. Ferry vers l'ile", body: "La traversee relie le continent aux points d'arrivee." },
      { title: "3. Transfert jusqu'a votre base", body: "Soure et Salvaterra sont les bases les plus courantes." },
    ],
  },
} as const

export default function HomeHowToGetThere() {
  const { lang } = useSiteLanguage()
  const content = copy[lang]

  return (
    <section id="como-chegar" className="border-b border-slate-200/70 bg-[#f7f2ea]">
      <div className="tm-shell py-10 sm:py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-[11px] sm:tracking-[0.32em]">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.8rem] font-display leading-tight text-[#0B1C2C] sm:text-[2.2rem]">
              {content.title}
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-slate-600">{content.subtitle}</p>
          </div>

          <Link
            href={getLocalizedPath(lang, "planTrip")}
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            {content.cta}
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {content.steps.map((step) => (
            <article key={step.title} className="rounded-[1.4rem] border border-slate-200/80 bg-white px-4 py-4">
              <h3 className="text-sm font-semibold text-[#0B1C2C]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
