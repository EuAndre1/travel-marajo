# API Layer

This folder is reserved for shared API adapters and clients used by `src/services`.

Current external integrations are implemented directly in services:
- Amadeus flight search
- Booking.com hotel search
- Stripe checkout

As integrations grow, move HTTP clients here to reuse retry, auth and tracing logic.
