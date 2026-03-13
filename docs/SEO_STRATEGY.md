# Travel Marajo SEO Strategy

Last updated: 2026-03-13

## Objective

Position Travel Marajo as a high-intent destination authority for Marajo Island travel while converting organic visitors into concierge conversations, experience discovery, package evaluation, and Stripe-assisted reservations.

## Current SEO Foundation

The codebase already includes:

- global metadata in `src/app/layout.tsx`
- home page JSON-LD in `src/app/page.tsx`
- generated `robots.txt` in `src/app/robots.ts`
- generated `sitemap.xml` in `src/app/sitemap.ts`
- route-level content hubs for experiences, packages, destinations, guide, offers, hotels, and flights

## Strategic SEO Pillars

### 1. Destination authority

Build topical authority around Marajo Island as a travel destination:

- how to visit Marajo
- where to stay in Marajo
- best experiences in Marajo
- Soure and Salvaterra travel planning
- logistics from Belem to Marajo

### 2. Transactional commerce pages

Use conversion-oriented landing pages for:

- experiences
- packages
- curated destination itineraries
- concierge-led planning

### 3. Mid-funnel editorial support

Use guide-style content to capture informational intent and route users toward:

- relevant destination pages
- related experiences
- WhatsApp concierge handoff
- packages for planning-heavy searches

## Priority Page Clusters

### Core commercial cluster

- `/`
- `/experiencias`
- `/experiencias/[slug]`
- `/pacotes`
- `/planejar-viagem`
- `/destinos`
- `/destinos/[slug]`

### Support and discovery cluster

- `/guia`
- `/ofertas`
- `/hotels`
- `/flights`
- `/activities`

## Keyword Direction

### High-intent destination terms

- marajo island travel
- ilha de marajo
- viagem marajo
- what to do in marajo
- marajo experiences
- marajo travel packages
- soure para travel
- salvaterra travel guide

### Experience intent

- praia do pesqueiro
- marajo sunset tour
- buffalo experience marajo
- marajo cultural tour
- marajo mangrove tour

### Planning intent

- how to get to marajo
- best time to visit marajo
- where to stay in marajo
- marajo itinerary
- marajo concierge travel

## On-Page Strategy

### Homepage

- Position as the canonical destination gateway.
- Reinforce destination narrative, trust, curated inventory, and concierge support.
- Keep JSON-LD aligned with destination-travel intent.

### Experiences pages

- Each experience page should target a unique primary intent.
- Include clear destination context, differentiators, highlights, and booking CTA.
- Internally link to packages, destinations, and concierge planning.

### Packages pages

- Focus on itinerary-led intent and traveler profile matching.
- Emphasize duration, inclusions, local support, and checkout readiness.

### Destination pages

- Use destination pages as SEO hubs.
- Link to related experiences and nearby planning content.

### Planning page

- Capture high-consideration intent for custom trips, premium travel, and travelers who need reassurance.

## Technical SEO Priorities

### Immediate improvements

- reconcile `src/app/sitemap.ts` with active PT-first routes
- include `/experiencias`, `/pacotes`, `/planejar-viagem`, `/destinos`, and detail pages in the sitemap
- review metadata alternates so they match the actual language and route behavior
- ensure canonical URLs reflect the primary public route structure

### Ongoing requirements

- preserve crawlability of route hubs
- maintain clean internal links
- avoid duplicate PT and EN surfaces competing without a clear canonical strategy
- keep JSON-LD valid and aligned with visible page content

## Internal Linking Strategy

- home -> experiences, packages, destinations, guide, concierge
- destination pages -> related experiences
- experience pages -> packages and planning
- package pages -> planning and relevant experiences
- checkout success -> further discovery and concierge continuation

The assistant and WhatsApp CTA should support conversion, but core SEO value should remain accessible in crawlable HTML content and standard links.

## Content Governance

- use `src/config/site-content.ts` and `src/data/*` as the basis for commercial page alignment
- avoid creating SEO copy that contradicts the curated catalog in `src/data/experiencias.ts`, `src/data/pacotes.ts`, or `src/data/destinos.ts`
- keep multilingual messaging semantically aligned even if route-level i18n is not fully segmented

## Measurement Focus

Track progress through:

- impressions and clicks for destination and package queries
- organic landings on `/experiencias`, `/pacotes`, and destination pages
- assistant opens from organic sessions
- WhatsApp handoff from organic sessions
- checkout starts and completions from organic traffic

## Practical SEO Rule for Future Tasks

Whenever a route, slug, title, or destination page changes, review:

- page metadata
- structured data
- sitemap coverage
- internal links
- conversion CTA placement
