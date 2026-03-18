import type { AppLocale } from "@/config/i18n"
import type { StaticRouteKey } from "@/i18n/routing"

type ChromeLink = {
  label: string
  route: StaticRouteKey
}

type FooterColumn = {
  title: string
  links: ChromeLink[]
}

type SiteChromeContent = {
  brandName: string
  brandTagline: string
  authorityLabel: string
  languageLabel: string
  signInLabel: string
  signOutLabel: string
  profileLabel: string
  planTripLabel: string
  mainNav: ChromeLink[]
  footerHeadline: string
  footerDescription: string
  footerHighlights: string[]
  footerColumns: FooterColumn[]
  footerContactTitle: string
  footerLegalLabel: string
}

export const siteChrome: Record<AppLocale, SiteChromeContent> = {
  pt: {
    brandName: "Travel Marajo",
    brandTagline: "Gateway global de Marajo",
    authorityLabel: "Autoridade editorial, descoberta premium e reserva com suporte local",
    languageLabel: "Idioma",
    signInLabel: "Entrar",
    signOutLabel: "Sair",
    profileLabel: "Meu perfil",
    planTripLabel: "Planejar viagem",
    mainNav: [
      { label: "Experiencias", route: "experiences" },
      { label: "Destinos", route: "destinations" },
      { label: "Pacotes", route: "packages" },
      { label: "Ofertas", route: "offers" },
      { label: "Guia", route: "guides" },
      { label: "Parceiros", route: "partners" },
    ],
    footerHeadline: "Travel Marajo apresenta Marajo ao mundo com confianca editorial e prontidao para reserva.",
    footerDescription:
      "A plataforma que apresenta Marajo ao mundo com curadoria premium, contexto editorial e confianca para planejar, reservar ou pedir suporte humano.",
    footerHighlights: [
      "Descoberta de destino com contexto real",
      "Curadoria local com confianca internacional",
      "Planejamento, reserva e concierge no mesmo fluxo",
    ],
    footerColumns: [
      {
        title: "Explorar",
        links: [
          { label: "Experiencias", route: "experiences" },
          { label: "Destinos", route: "destinations" },
          { label: "Pacotes", route: "packages" },
          { label: "Ofertas", route: "offers" },
          { label: "Guia de viagem", route: "guides" },
        ],
      },
      {
        title: "Planejamento",
        links: [
          { label: "Planejar viagem", route: "planTrip" },
          { label: "Servicos", route: "services" },
          { label: "Hoteis", route: "hotels" },
          { label: "Voos", route: "flights" },
        ],
      },
      {
        title: "Conta",
        links: [
          { label: "Entrar", route: "login" },
          { label: "Cadastro", route: "register" },
          { label: "Perfil", route: "profile" },
          { label: "Checkout", route: "checkout" },
        ],
      },
    ],
    footerContactTitle: "Contato",
    footerLegalLabel: "Todos os direitos reservados.",
  },
  en: {
    brandName: "Travel Marajo",
    brandTagline: "Global gateway to Marajo",
    authorityLabel: "Editorial authority, premium discovery, and booking confidence with local support",
    languageLabel: "Language",
    signInLabel: "Login",
    signOutLabel: "Sign out",
    profileLabel: "My profile",
    planTripLabel: "Plan trip",
    mainNav: [
      { label: "Experiences", route: "experiences" },
      { label: "Destinations", route: "destinations" },
      { label: "Packages", route: "packages" },
      { label: "Offers", route: "offers" },
      { label: "Guides", route: "guides" },
      { label: "Partners", route: "partners" },
    ],
    footerHeadline: "Travel Marajo introduces Marajo to the world with editorial confidence and booking readiness.",
    footerDescription:
      "The platform introducing Marajo to the world through premium curation, destination intelligence, and direct booking confidence.",
    footerHighlights: [
      "Destination discovery with real context",
      "Local curation with international confidence",
      "Planning, booking, and concierge in one flow",
    ],
    footerColumns: [
      {
        title: "Explore",
        links: [
          { label: "Experiences", route: "experiences" },
          { label: "Destinations", route: "destinations" },
          { label: "Packages", route: "packages" },
          { label: "Offers", route: "offers" },
          { label: "Travel guides", route: "guides" },
        ],
      },
      {
        title: "Planning",
        links: [
          { label: "Plan trip", route: "planTrip" },
          { label: "Services", route: "services" },
          { label: "Hotels", route: "hotels" },
          { label: "Flights", route: "flights" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Login", route: "login" },
          { label: "Register", route: "register" },
          { label: "Profile", route: "profile" },
          { label: "Checkout", route: "checkout" },
        ],
      },
    ],
    footerContactTitle: "Contact",
    footerLegalLabel: "All rights reserved.",
  },
  es: {
    brandName: "Travel Marajo",
    brandTagline: "Puerta global a Marajo",
    authorityLabel: "Autoridad editorial, descubrimiento premium y reserva con soporte local",
    languageLabel: "Idioma",
    signInLabel: "Acceso",
    signOutLabel: "Salir",
    profileLabel: "Mi perfil",
    planTripLabel: "Planificar viaje",
    mainNav: [
      { label: "Experiencias", route: "experiences" },
      { label: "Destinos", route: "destinations" },
      { label: "Paquetes", route: "packages" },
      { label: "Ofertas", route: "offers" },
      { label: "Guias", route: "guides" },
      { label: "Socios", route: "partners" },
    ],
    footerHeadline: "Travel Marajo presenta Marajo al mundo con autoridad editorial y confianza para reservar.",
    footerDescription:
      "La plataforma que presenta Marajo al mundo con curaduria premium, contexto editorial y confianza para planificar o reservar.",
    footerHighlights: [
      "Descubrimiento del destino con contexto real",
      "Curaduria local con confianza internacional",
      "Planificacion, reserva y concierge en un mismo flujo",
    ],
    footerColumns: [
      {
        title: "Explorar",
        links: [
          { label: "Experiencias", route: "experiences" },
          { label: "Destinos", route: "destinations" },
          { label: "Paquetes", route: "packages" },
          { label: "Ofertas", route: "offers" },
          { label: "Guias", route: "guides" },
        ],
      },
      {
        title: "Planificacion",
        links: [
          { label: "Planificar viaje", route: "planTrip" },
          { label: "Servicios", route: "services" },
          { label: "Hoteles", route: "hotels" },
          { label: "Vuelos", route: "flights" },
        ],
      },
      {
        title: "Cuenta",
        links: [
          { label: "Acceso", route: "login" },
          { label: "Registro", route: "register" },
          { label: "Perfil", route: "profile" },
          { label: "Checkout", route: "checkout" },
        ],
      },
    ],
    footerContactTitle: "Contacto",
    footerLegalLabel: "Todos los derechos reservados.",
  },
  fr: {
    brandName: "Travel Marajo",
    brandTagline: "Portail mondial vers Marajo",
    authorityLabel: "Autorite editoriale, decouverte premium et reservation avec support local",
    languageLabel: "Langue",
    signInLabel: "Connexion",
    signOutLabel: "Deconnexion",
    profileLabel: "Mon profil",
    planTripLabel: "Planifier voyage",
    mainNav: [
      { label: "Experiences", route: "experiences" },
      { label: "Destinations", route: "destinations" },
      { label: "Forfaits", route: "packages" },
      { label: "Offres", route: "offers" },
      { label: "Guides", route: "guides" },
      { label: "Partenaires", route: "partners" },
    ],
    footerHeadline: "Travel Marajo presente Marajo au monde avec autorite editoriale et confiance pour reserver.",
    footerDescription:
      "La plateforme qui presente Marajo au monde grace a une curation premium, une vraie autorite destination et une reservation plus rassurante.",
    footerHighlights: [
      "Decouverte destination avec vrai contexte",
      "Curation locale avec confiance internationale",
      "Planification, reservation et concierge dans un meme flux",
    ],
    footerColumns: [
      {
        title: "Explorer",
        links: [
          { label: "Experiences", route: "experiences" },
          { label: "Destinations", route: "destinations" },
          { label: "Forfaits", route: "packages" },
          { label: "Offres", route: "offers" },
          { label: "Guides", route: "guides" },
        ],
      },
      {
        title: "Planification",
        links: [
          { label: "Planifier voyage", route: "planTrip" },
          { label: "Services", route: "services" },
          { label: "Hotels", route: "hotels" },
          { label: "Vols", route: "flights" },
        ],
      },
      {
        title: "Compte",
        links: [
          { label: "Connexion", route: "login" },
          { label: "Inscription", route: "register" },
          { label: "Profil", route: "profile" },
          { label: "Checkout", route: "checkout" },
        ],
      },
    ],
    footerContactTitle: "Contact",
    footerLegalLabel: "Tous droits reserves.",
  },
}

export const footerContact = {
  items: [
    "contato@travelmarajo.com",
    "+55 91 99999-0000",
    "Soure, Ilha de Marajo - PA",
  ],
  legal: {
    cnpj: "00.000.000/0001-00",
    cadastur: "26.012747.10.0001-6",
  },
}
