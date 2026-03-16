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
  languageLabel: string
  signInLabel: string
  signOutLabel: string
  profileLabel: string
  planTripLabel: string
  mainNav: ChromeLink[]
  footerDescription: string
  footerColumns: FooterColumn[]
  footerContactTitle: string
  footerLegalLabel: string
}

export const siteChrome: Record<AppLocale, SiteChromeContent> = {
  pt: {
    brandName: "Travel Marajo",
    brandTagline: "Plataforma de destino",
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
    footerDescription:
      "Plataforma de destino para a Ilha de Marajo, com curadoria premium de experiencias, roteiros e parceiros locais.",
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
    brandTagline: "Destination platform",
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
    footerDescription:
      "Destination platform for Marajo Island with premium curation across experiences, itineraries, and local partners.",
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
    brandTagline: "Plataforma de destino",
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
    footerDescription:
      "Plataforma de destino para la Isla de Marajo con curaduria premium de experiencias, itinerarios y aliados locales.",
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
    brandTagline: "Plateforme destination",
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
    footerDescription:
      "Plateforme destination pour Marajo avec curation premium d'experiences, d'itineraires et de partenaires locaux.",
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
