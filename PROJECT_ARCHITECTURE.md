# Travel Marajo — Project Architecture

Last updated: 2026-03-13

## Project structure
- Next.js App Router under `src/app` with public routes, API routes, and SEO files.
- Feature-oriented components under `src/components` (home, landing, assistant, checkout, experiences, hotels, flights).
- Data sources under `src/data` (experiences, destinos, pacotes, homepage, assistant copy).
- Shared libraries under `src/lib` (language, stripe, assistant intelligence, WhatsApp, money utils, auth).
- Types under `src/types` for commercial/assistant/auth domains.

## Multilingual system
- Language state is managed by `src/lib/use-site-language.ts` with persistence (localStorage).
- Content dictionary lives in `src/config/site-content.ts` and is consumed as `siteContent[lang]`.
- Key pages and home/landing components use `useSiteLanguage()` and `siteContent` to render text.
- Supported languages: PT, EN, ES, FR.

## Assistant system
- UI components in `src/components/assistant`:
  - `TravelAssistantWidget.tsx` (floating launcher + panel)
  - `AssistantLauncher.tsx` (button/entry point)
  - `AssistantPanel.tsx` (conversation UI)
- Copy in `src/data/assistant-copy.ts`.
- Intelligence layer in `src/lib`:
  - `assistant-events.ts` (event logging abstraction)
  - `assistant-session.ts` (session persistence)
  - `assistant-decision-engine.ts` (recommendation rules)
  - `assistant-whatsapp-handoff.ts` (contextual WhatsApp message)
  - `assistant-rules.ts` (message/behavior defaults)
- Visitor profile typing in `src/types/assistant-profile.ts`.

## Checkout system (Stripe)
- Experience checkout API: `src/app/api/stripe/experience-checkout/route.ts`.
- Package checkout API: `src/app/api/stripe/package-checkout/route.ts`.
- Success and cancel pages:
  - `src/app/checkout/success/page.tsx`
  - `src/app/checkout/success/SuccessClient.tsx`
  - `src/app/checkout/cancel/page.tsx`
- Buttons:
  - `src/components/checkout/ExperienceCheckoutButton.tsx`
  - `src/components/checkout/PackageCheckoutButton.tsx`
- Stripe utilities in `src/lib/stripe.ts`.
- Env dependencies: `NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Experience pages
- Main list and detail (PT routes):
  - `src/app/experiencias/page.tsx`
  - `src/app/experiencias/[slug]/page.tsx`
  - Detail UI: `src/components/experiences/ExperienceDetailContent.tsx`
- Data source: `src/data/experiencias.ts`.
- Price rendering uses locale-aware formatting and currency utilities.
- Legacy/alternate route exists under `src/app/experiences` (EN naming).

## Packages pages
- Main list: `src/app/pacotes/page.tsx` (PT route) and `src/app/packages/page.tsx` (EN naming).
- Data source: `src/data/pacotes.ts`.
- Checkout triggers via `PackageCheckoutButton`.

## SEO components
- Global metadata in `src/app/layout.tsx`.
- SEO files:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- Structured metadata helpers in `src/lib/metadata-schema.ts`.
- Page-level metadata and JSON-LD are used where applicable (e.g., `src/app/page.tsx`).
