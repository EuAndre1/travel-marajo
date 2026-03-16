# Travel Marajo Business Model

Last updated: 2026-03-13

## Positioning

Travel Marajo is positioned as a destination-commerce platform for Marajo Island, combining inspiration, curation, concierge support, and direct transaction flows for experiences and travel packages.

The product is not only a content site and not only a checkout layer. Its differentiator is curated destination trust plus human-assisted conversion.

## Core Value Proposition

- make Marajo easier to discover for Brazilian and international travelers
- reduce friction in choosing experiences and packages
- combine digital discovery with human concierge support
- convert interest into WhatsApp conversations and Stripe checkouts

## Primary Customer Segments

- Brazilian leisure travelers planning short to mid-length trips
- international travelers who need local guidance and reassurance
- couples seeking curated premium experiences
- families looking for safer, lower-friction itineraries
- travelers comparing destinations, experiences, and support quality before booking

## Main Revenue Paths

### 1. Experience sales

Direct monetization through curated individual experiences:

- checkout starts from experience detail pages
- Stripe payment for a selected experience
- concierge follow-up after payment

### 2. Package sales

Higher-ticket monetization through multi-day travel packages:

- package listing evaluation
- direct checkout or consultant-assisted conversion
- potential upsell through custom planning

### 3. Concierge-assisted conversion

WhatsApp and assistant-led flows support travelers who are not ready for immediate checkout:

- planning consultations
- premium traveler qualification
- itinerary clarification
- cross-sell from content to package or experience

### 4. Partner and affiliate opportunities

The broader product direction suggests monetization potential through:

- local operators
- pousadas and hotels
- transportation providers
- destination partners
- affiliate or referral relationships

## Conversion Funnel

1. Visitor lands on home, destination, guide, or experience page
2. Visitor explores experiences, packages, or planning content
3. Assistant engages based on route, language, time on page, and visitor profile
4. Visitor chooses either:
   - direct Stripe checkout
   - WhatsApp handoff
   - preference capture through assistant lead form
5. Concierge or post-checkout communication supports final conversion and logistics

## Product Assets That Support Revenue

- PT-first commercial route structure
- multilingual copy for broader audience reach
- route-aware assistant concierge
- Stripe checkout for monetizable products
- destination pages that connect discovery to purchase
- homepage editorial sections that frame trust and curation

## Operational Assumptions

- Travel inventory is currently maintained in code under `src/data`
- pricing is currently driven from local data files for checkout products
- human support remains part of the commercial model through WhatsApp and concierge messaging
- localized trust and premium positioning are central to conversion

## Strategic Strengths

- strong destination differentiation
- curated rather than generic inventory framing
- multilingual messaging
- human assistance embedded in the funnel
- direct path from discovery to payment

## Current Constraints

- some documentation reflects an older, broader platform architecture
- sitemap and route strategy need tighter alignment
- route naming is partly mixed between PT-first and legacy English surfaces
- some auth and database-oriented code paths appear more mature than the current storefront actually needs

## Business Priorities for Future Work

- strengthen organic acquisition around destination and itinerary intent
- improve conversion from destination discovery to package or experience evaluation
- keep assistant and WhatsApp handoff central for hesitant or international users
- maintain trust, clarity, and premium curation throughout the booking journey
- reduce inconsistencies between documentation, route strategy, and live product behavior
