# Travel Marajo Architecture

Last updated: 2026-03-13

## Overview

Travel Marajo is a Next.js App Router application focused on destination marketing, curated experiences, package sales, concierge-style assistance, and Stripe checkout for tourism products related to Marajo Island.

The live architecture is currently more file-driven than service-driven. Core commercial content is stored in `src/data`, multilingual copy is centralized in `src/config` and `src/data`, and user-facing flows are assembled through page-level React components under `src/app` and feature components under `src/components`.

## Top-Level Structure

- `src/app`
  - App Router pages, route handlers, SEO files, checkout flows, auth entry points.
- `src/components`
  - Feature-oriented UI modules for home, landing pages, assistant, checkout, flights, hotels, and experiences.
- `src/data`
  - In-repo data sources for experiences, packages, destinations, homepage content, testimonials, and assistant copy.
- `src/config`
  - Centralized configuration for locale content, locale metadata, and currency configuration.
- `src/lib`
  - Shared utilities for language state, Stripe, assistant logic, WhatsApp handoff, money formatting, auth, metadata validation, and request security.
- `src/types`
  - Shared domain types for assistant state, bookings, commercial entities, auth, leads, flights, and hotels.

## Routing Model

The application uses a PT-first route structure with a mix of Portuguese and legacy English route names.

### Primary public routes

- `/`
  - Destination landing page composed from `src/components/home/*`.
- `/experiencias`
  - Experience listing page backed by `src/data/experiencias.ts`.
- `/experiencias/[slug]`
  - Experience detail pages.
- `/pacotes`
  - Package listing page backed by `src/data/pacotes.ts`.
- `/planejar-viagem`
  - Concierge planning page with WhatsApp CTA.
- `/destinos`
  - Destination listing page.
- `/destinos/[slug]`
  - Destination detail page with related experiences.
- `/checkout/success`
  - Post-payment confirmation and next steps.
- `/checkout/cancel`
  - Checkout cancellation page.

### Secondary or legacy routes

- `/experiences`
- `/packages`
- `/activities`
- `/flights`
- `/hotels`
- `/ofertas`
- `/guia`
- `/parceiros`
- `/login`
- `/register`
- `/profile`

These routes should be treated carefully because some represent current product surfaces while others appear to be legacy or alternate naming paths retained for compatibility or ongoing migration.

## Layout and Rendering

- Global layout lives in `src/app/layout.tsx`.
- `Header` and `Footer` are mounted at the layout level.
- `TravelAssistantWidget` is mounted globally so the assistant is available across the site.
- `Providers` currently wraps the tree in `next-auth`'s `SessionProvider`.

## Multilingual System

The multilingual system is client-driven and dictionary-based.

- Language state is managed by `src/lib/use-site-language.ts`.
- Supported languages are `pt`, `en`, `es`, and `fr`.
- The selected language is persisted in `localStorage` using the `site-language` key.
- Components react to language changes through a custom `site-language-changed` event.
- Main localized UI copy lives in `src/config/site-content.ts`.
- Assistant-specific localized copy lives in `src/data/assistant-copy.ts`.
- Locale metadata helpers live in `src/config/i18n.ts`.

Important implication:

- Most translated rendering is client-side rather than route-segment-based i18n.
- The current metadata alternates declare language URLs, but the visible routing model does not yet fully mirror route-level localized segments.

## Data Model Strategy

The current product catalog is code-defined and loaded directly in the app rather than coming from a CMS or database for the main travel inventory.

### Main file-based sources

- `src/data/experiencias.ts`
  - Experience catalog and lookup by slug.
- `src/data/pacotes.ts`
  - Package catalog and lookup by slug.
- `src/data/destinos.ts`
  - Destination catalog and experience relationships.
- `src/data/homepage.ts`
  - Editorial and commercial homepage content blocks.
- `src/data/site.ts`
  - Header and footer content.
- `src/data/assistant-copy.ts`
  - Assistant localized copy, quick replies, proactive prompts, and WhatsApp templates.

## Assistant Architecture

The assistant is a route-aware concierge widget with lightweight session persistence and WhatsApp escalation.

### UI layer

- `src/components/assistant/TravelAssistantWidget.tsx`
- `src/components/assistant/AssistantLauncher.tsx`
- `src/components/assistant/AssistantPanel.tsx`

### Logic layer

- `src/lib/assistant-rules.ts`
  - Intent definitions, route context resolution, quick replies, and response templates.
- `src/lib/assistant-decision-engine.ts`
  - Proactive behavior rules based on route, time on page, language, currency, and prior opens.
- `src/lib/assistant-session.ts`
  - Session persistence in `sessionStorage`.
- `src/lib/assistant-whatsapp-handoff.ts`
  - Builds context-aware WhatsApp handoff messages.
- `src/lib/assistant-events.ts`
  - Event tracking abstraction.

### Behavior summary

- Auto-opens after a short delay on first session.
- Tracks route context such as experiences, packages, and checkout.
- Captures optional lead details and preference data.
- Adapts behavior for international visitors based on language and currency.
- Offers WhatsApp handoff with route and profile context.

## Checkout Architecture

Checkout is Stripe-based and currently tied directly to local data files.

### Experience checkout

- API endpoint: `src/app/api/stripe/experience-checkout/route.ts`
- Data source: `src/data/experiencias.ts`
- CTA: `src/components/checkout/ExperienceCheckoutButton.tsx`

### Package checkout

- API endpoint: `src/app/api/stripe/package-checkout/route.ts`
- Data source: `src/data/pacotes.ts`
- CTA: `src/components/checkout/PackageCheckoutButton.tsx`

### Shared checkout support

- Stripe client: `src/lib/stripe.ts`
- Success UI: `src/app/checkout/success/page.tsx` and `src/app/checkout/success/SuccessClient.tsx`
- Cancel UI: `src/app/checkout/cancel/page.tsx`

### Environment dependencies

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## SEO Architecture

SEO is handled through a combination of global metadata, page metadata, JSON-LD, and generated crawl files.

- Global metadata lives in `src/app/layout.tsx`.
- Homepage JSON-LD is injected in `src/app/page.tsx`.
- `src/app/robots.ts` generates `robots.txt`.
- `src/app/sitemap.ts` generates `sitemap.xml`.
- `src/lib/metadata-schema.ts` provides a small metadata validation schema.

Important note:

- Current sitemap coverage is narrower than the full PT-first route surface and appears to reflect an older route set. Future SEO changes should reconcile the sitemap with active commercial routes.

## Utility Layer

Key shared utilities include:

- `src/lib/use-site-language.ts`
- `src/lib/money.ts`
- `src/lib/stripe.ts`
- `src/lib/env.ts`
- `src/lib/whatsapp-message.ts`
- `src/lib/request-security.ts`
- `src/lib/rate-limit.ts`
- `src/lib/auth.ts`
- `src/lib/auth/options.ts`

## Auth and Integration Caveat

There is an architectural split between the active travel storefront and some older auth/database-oriented code paths.

- The current travel inventory and checkout flows are file-driven.
- Auth still references Prisma-oriented infrastructure and service modules not reflected in the simpler storefront architecture.
- The README also describes older or broader platform ambitions that do not perfectly match the live implementation.

When changing the system, prefer the live code in `src/app`, `src/components`, `src/data`, `src/config`, and `src/lib` over older high-level descriptions.

## Working Conventions

- Preserve the PT-first route model unless a migration is explicitly requested.
- Reuse `siteContent[lang]` and `assistantCopy[lang]` for text additions.
- Keep assistant behavior route-aware and session-backed.
- Keep Stripe checkout slugs aligned with local catalog data.
- Treat README statements as partially historical if they conflict with the live codebase.
