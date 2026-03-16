# Travel Marajo — Project Architecture

Last updated: 2026-03-13

## Project structure
- Next.js App Router under `src/app` with public routes, API routes, and SEO files.
- Feature-oriented components under `src/components` (home, landing, assistant, checkout, experiences, hotels, flights).
- Data sources under `src/data` (experiences, destinos, pacotes, homepage, assistant copy).
- Shared libraries under `src/lib` (language, stripe, assistant intelligence, WhatsApp, money utils, auth).
- Types under `src/types` for commercial/assistant/auth domains.

## Multilingual system
- Canonical locale architecture is path-based under `src/app/[locale]/[[...segments]]/page.tsx`.
- Middleware redirects legacy semantic routes into canonical locale-prefixed routes.
- Route source-of-truth lives in `src/i18n/routing.ts`.
- Locale source-of-truth lives in `src/config/i18n.ts`.
- UI copy source-of-truth remains `src/config/site-content.ts` plus domain data translations such as `src/data/experiencias.ts`.
- `src/lib/use-site-language.ts` now derives active language from the URL and navigates between canonical localized routes.
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
- Canonical and alternate locale URLs are generated from `src/i18n/routing.ts`.
- SEO files:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- Structured metadata helpers in `src/lib/metadata-schema.ts`.
- Page-level metadata and JSON-LD are used where applicable, while the localized catch-all route normalizes canonical metadata for public pages.

## Deploy hardening
- Env helpers live in `src/lib/env.ts`.
- Site URL resolution uses `NEXT_PUBLIC_SITE_URL` first, then `NEXTAUTH_URL`.
- Auth secret now fails explicitly in production when missing.
- Stripe secret access is centralized through `getRequiredEnv`.
- Internal preflight helpers now live in:
  - `src/lib/env.ts` -> `getEnvReadinessReport()`
  - `src/lib/platform-health.ts` -> `getPlatformHealthReport()` and `getPlatformPreflightReport()`
- These helpers are tooling-only and support manual QA, staging readiness, and cross-domain integrity checks without creating new public functionality.

## Media proof readiness
- Shared media/testimonial typing lives in `src/types/media.ts`.
- Empty production-safe proof registry lives in `src/data/proof-assets.ts` and is ready for real assets without fake content.
