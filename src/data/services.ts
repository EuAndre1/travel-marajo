export interface ServiceFaqItem {
  question: string
  answer: string
}

export interface ServiceItem {
  slug: string
  title: string
  description: string
  priceModel: string
  processSteps: string[]
  faq: ServiceFaqItem[]
}

export const services: ServiceItem[] = [
  {
    slug: "brazil-visa-consulting",
    title: "Brazil visa consulting",
    description:
      "Premium support for travelers who need help understanding Brazil visa requirements, documentation flow, and the right next step before planning Marajo.",
    priceModel: "Consultation-based service with custom scope depending on nationality, documentation complexity, and trip timing.",
    processSteps: [
      "Review traveler nationality and Brazil entry requirements",
      "Clarify whether a visa may be required for the planned trip",
      "Explain documentation flow, timing, and next operational steps",
      "Guide the traveler toward the correct official application path",
    ],
    faq: [
      {
        question: "Does Travel Marajo issue visas directly?",
        answer:
          "No. The service is consultative and helps travelers understand requirements, process timing, and preparation before using the official visa path.",
      },
      {
        question: "Who benefits most from visa consulting?",
        answer:
          "International travelers who are still unsure about Brazil entry rules, documentation readiness, or the timing of their trip benefit most from this support.",
      },
    ],
  },
  {
    slug: "custom-travel-planning",
    title: "Custom travel planning",
    description:
      "A consultative planning service for travelers who need help comparing destinations, timing, experiences, and packages before booking Marajo.",
    priceModel: "Scope-based planning support depending on itinerary complexity and traveler profile.",
    processSteps: [
      "Understand travel profile and desired trip style",
      "Compare experiences, destinations, and package formats",
      "Align trip pacing, timing, and logistics",
      "Recommend the best booking-ready path",
    ],
    faq: [
      {
        question: "Is custom travel planning the same as booking a package?",
        answer:
          "Not exactly. Packages reduce friction with a ready structure, while planning support helps decide which overall route and format fits best first.",
      },
    ],
  },
  {
    slug: "concierge-assistance",
    title: "Concierge assistance",
    description:
      "Human support for travelers who need reassurance, local clarity, and a more premium decision process before choosing services in Marajo.",
    priceModel: "Lead-to-service support with scope shaped by the traveler's stage and support needs.",
    processSteps: [
      "Answer high-consideration travel questions",
      "Reduce friction around destination and service choice",
      "Support WhatsApp follow-up and route planning",
      "Connect travelers to the clearest next commercial step",
    ],
    faq: [
      {
        question: "When should I use concierge assistance?",
        answer:
          "Concierge assistance is strongest when you are still deciding between planning support, experiences, packages, and the right route for your trip.",
      },
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}
