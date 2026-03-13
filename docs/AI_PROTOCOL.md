# Travel Marajo AI Protocol

Last updated: 2026-03-13

## Purpose

This document defines how AI-assisted work should be performed in the Travel Marajo codebase so future changes remain aligned with the current product, architecture, and commercial priorities.

## Mandatory Memory Reload Before Any Change

Before modifying code or documentation, reload and treat as authoritative:

- `PROJECT_ARCHITECTURE.md`
- `AI_OPERATING_PROTOCOL.md` when present
- `README.md`

If `AI_OPERATING_PROTOCOL.md` is missing, explicitly note that it is unavailable and continue using `PROJECT_ARCHITECTURE.md`, `README.md`, and live code inspection as the working source of truth.

## Source-of-Truth Order

When sources disagree, follow this priority:

1. Live implementation in `src/app`, `src/components`, `src/data`, `src/config`, `src/lib`, and `src/types`
2. `PROJECT_ARCHITECTURE.md`
3. This document
4. `README.md`

Reason:

- The README currently reflects a broader and partly older platform picture.
- The current storefront is more file-driven and PT-first than the README suggests.

## Core Product Principles

- Treat Travel Marajo as a destination-commerce platform, not only a generic booking shell.
- Protect the PT-first public route structure unless a route migration is explicitly requested.
- Preserve the concierge assistant as a strategic conversion layer.
- Preserve Stripe checkout flows for experiences and packages.
- Prefer content consistency across homepage, experiences, packages, concierge, checkout, and SEO.

## Content and Copy Rules

- New UI text should come from `src/config/site-content.ts` when it belongs to main site copy.
- Assistant text should come from `src/data/assistant-copy.ts`.
- Avoid hardcoding new public-facing copy directly in components unless the existing file already follows that pattern and extracting would add unnecessary churn.
- Keep language support aligned across `pt`, `en`, `es`, and `fr`.

## Routing Rules

- Prefer existing Portuguese-first routes such as `/experiencias`, `/pacotes`, and `/planejar-viagem`.
- Be careful with legacy English routes like `/experiences` and `/packages`; do not remove or repurpose them casually.
- When adding links, verify whether the product surface should use PT-first routing for consistency with the active implementation.

## Assistant Rules

- Keep the assistant route-aware.
- Preserve `sessionStorage`-based assistant state unless a deliberate persistence migration is requested.
- Preserve WhatsApp handoff capability and contextual message generation.
- Any assistant update should respect:
  - quick replies
  - proactive prompts
  - international visitor handling
  - lead capture flow

## Checkout Rules

- Treat experience and package checkout endpoints as production-critical.
- Do not break slug-based lookups from `src/data/experiencias.ts` or `src/data/pacotes.ts`.
- Keep success and cancel flows coherent with concierge follow-up.
- Any pricing or checkout UI change should stay consistent with the current local-data model unless a backend catalog migration is explicitly requested.

## SEO Rules

- Preserve metadata, canonical handling, JSON-LD, sitemap, and robots coverage.
- If adding or changing routes, consider whether `sitemap.ts`, `robots.ts`, and page metadata also need updates.
- Watch for mismatches between active PT-first routes and older sitemap entries.

## Safety and Change Discipline

- Read relevant files before editing.
- Make the smallest coherent change that solves the task.
- Do not overwrite existing docs or architecture decisions blindly.
- If an existing file appears outdated, update it only when that improves alignment with the live implementation.
- Do not remove legacy surfaces unless the task explicitly includes cleanup or migration.

## Documentation Rules

- When creating docs, describe the current system as implemented, not the idealized future system unless clearly labeled as a proposal.
- Call out known mismatches between README-era architecture and the live code when they matter.
- Prefer practical guidance that helps future contributors avoid regressions.

## Definition of Consistent Work

A task is considered consistent with the current system when it:

- respects PT-first routing
- preserves multilingual behavior
- keeps assistant flows intact
- keeps Stripe checkout intact
- does not silently widen the gap between docs and implementation

## If Context Is Unclear

- inspect the live code first
- verify whether the route or copy belongs to the PT-first surface
- check whether there is multilingual impact
- check whether assistant, checkout, or SEO implications exist
- then implement
