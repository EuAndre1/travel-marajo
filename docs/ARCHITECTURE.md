# Architecture Refactor - Travel Marajo

## Goals
- Scale from MVP to production with clear boundaries.
- Keep Next.js App Router as the delivery layer.
- Isolate external integrations (Amadeus, Booking, Stripe) in service modules.
- Keep database access centralized with Prisma.

## Folder Structure
- `src/app/`
  - App Router pages and route handlers only.
  - No heavy business logic; handlers call services.
- `src/components/`
  - UI modules split by domain (`flights`, `hotels`) plus shared UI.
- `src/lib/`
  - Cross-cutting utilities (`env`, auth config, money formatting, Stripe client).
- `src/api/`
  - Reserved for API clients/adapters shared by services.
- `src/services/`
  - Business and integration logic (Amadeus, Booking.com, user auth, Stripe checkout).
- `src/database/`
  - Prisma client singleton and DB wiring.
- `src/types/`
  - Domain interfaces and payload contracts.

## Why This Structure
1. App layer stays thin: easy to test and reason about route behavior.
2. Service layer encapsulates external APIs and business rules.
3. Database layer prevents Prisma client duplication and connection leaks.
4. Strong typing keeps contracts stable between route -> service -> UI.
5. Auth and payments are isolated to avoid cross-cutting coupling.

## Backend Modules Added
- `auth`
  - Credentials + Google providers.
  - Register endpoint with password hashing.
  - Middleware for protected routes.
- `flights`
  - Amadeus integration with token cache and pagination.
- `hotels`
  - Booking.com integration with destination search and filters.
- `stripe`
  - Checkout session creation and webhook confirmation.

## SEO/International Enhancements
- Global metadata with canonical and language alternates.
- JSON-LD structured data for travel entity.
- `sitemap.xml` and `robots.txt` generation.

## Production Notes
- Requires environment variables for Amadeus, Booking.com and Stripe.
- Run Prisma migration for `hashedPassword` in `User` model.
- Configure Stripe webhook endpoint: `/api/stripe/webhook`.
