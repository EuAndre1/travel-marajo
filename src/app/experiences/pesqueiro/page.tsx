import type { Metadata } from "next"
import ExperienceClient from "@/components/experiences/ExperienceClient"

export const metadata: Metadata = {
  title: "Praia do Pesqueiro | Travel Marajó",
  description: "Experiência premium na Praia do Pesqueiro, em Soure, Ilha de Marajó.",
}

export default function PesqueiroExperiencePage() {
  return <ExperienceClient slug="pesqueiro" />
}
