# 🚀 GUIA DE DEPLOY - TRAVEL MARAJÓ

## ⚡ MÉTODO RÁPIDO (15 minutos)

### ETAPA 1: Criar Contas (5 min)

#### 1.1 GitHub (gratuito)
1. Acesse: **github.com**
2. Clique em **"Sign up"**
3. Preencha email, senha e nome de usuário
4. Confirme seu email

#### 1.2 Railway (gratuito - Banco de Dados)
1. Acesse: **railway.app**
2. Clique em **"Login"** → **"Continue with GitHub"**
3. Autorize o acesso

#### 1.3 Vercel (gratuito - Hospedagem)
1. Acesse: **vercel.com**
2. Clique em **"Sign Up"** → **"Continue with GitHub"**
3. Autorize o acesso

---

### ETAPA 2: Criar Banco de Dados (5 min)

1. Acesse: **railway.app/dashboard**
2. Clique em **"New Project"**
3. Clique em **"Provision PostgreSQL"**
4. Clique no banco criado (ex: "Postgres")
5. Clique na aba **"Connect"**
6. Copie a URL que começa com `postgresql://`
7. **Guarde essa URL!**

---

### ETAPA 3: Publicar na Vercel (5 min)

1. Acesse: **vercel.com/dashboard**
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Escolha **"Upload"** e selecione esta pasta
5. Configure:
   - **Project Name**: `travel-marajo`
   - **Framework Preset**: Next.js
6. Clique em **"Environment Variables"**
7. Adicione estas variáveis:

```
DATABASE_URL=postgresql://... (cole do Railway)
NEXTAUTH_SECRET=qualquer-texto-secreto-longo-aqui
NEXTAUTH_URL=https://travel-marajo.vercel.app
```

8. Clique em **"Deploy"**

**Pronto! Aguarde 2-3 minutos e seu site estará online!** 🎉

---

## 🔧 CONFIGURAÇÕES OPCIONAIS

### Login com Google

1. Acesse: **console.cloud.google.com**
2. Crie um projeto
3. Vá em **"APIs & Services"** → **"Credentials"**
4. Clique **"Create Credentials"** → **"OAuth client ID"**
5. Configure a tela de consentimento
6. Adicione URI: `https://seu-site.vercel.app/api/auth/callback/google`
7. Copie **Client ID** e **Client Secret**
8. Na Vercel, adicione:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

### Pagamentos (Stripe)

1. Acesse: **dashboard.stripe.com**
2. Crie conta
3. Vá em **"Developers"** → **"API Keys"**
4. Copie as chaves
5. Na Vercel, adicione:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## ❓ PROBLEMAS COMUNS

### Erro: "DATABASE_URL is required"
- Verifique se copiou a URL completa do Railway
- Certifique-se de que não há espaços no início ou fim

### Erro: "Build failed"
- Verifique se todas as dependências estão instaladas
- Tente rodar `npm install` localmente antes de fazer o deploy

### Site não carrega
- Verifique se as variáveis de ambiente estão configuradas
- Veja os logs na Vercel (tab "Deployments" → "View Logs")

---

## 📞 SUPORTE

Se precisar de ajuda:
1. Documentação Next.js: **nextjs.org/docs**
2. Documentação Prisma: **prisma.io/docs**
3. Documentação Vercel: **vercel.com/docs**

---

**Boa sorte com seu projeto! 🌴✈️**
## Variaveis obrigatorias recomendadas

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SITE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

- A aplicacao publica deve responder com rotas canonicas localizadas em `/pt`, `/en`, `/es` e `/fr`.
- `NEXT_PUBLIC_SITE_URL` precisa apontar para o dominio final para que canonical, hreflang, sitemap e robots gerem URLs corretas.
- Rotas antigas sem locale devem ser tratadas como compatibilidade e redirecionadas.

## Manual QA final

### Redirects and locale normalization

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Root redirect | Open `/` in a clean browser tab | Single redirect to a canonical locale path such as `/pt` or `/en` | High |
| EN legacy route | Open `/experiences` | Single redirect to `/en/experiences` | High |
| PT legacy route | Open `/experiencias` | Single redirect to `/pt/experiencias` | High |
| No redirect loop | Refresh any canonical localized public page | Page stays on the same localized URL with no loop | High |

### Public navigation

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Guide to experience | Open a guide page and click a related experience | Opens canonical localized experience detail directly | High |
| Destination to experience | Open a destination page and click a related experience | Opens canonical localized experience detail directly | High |
| Experience CTAs | Open an experience detail page and click trip-planning and related guide CTAs | All links stay in the same locale family | Medium |

### Language switching

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Switch locale on public page | Switch language on home, guide, destination, and experience pages | Equivalent route and slug are preserved | High |
| Query preservation | Switch locale on a page with query params when applicable | Query string remains present after switch | Medium |

### Auth flows

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Login return path | Try to access a protected page while logged out, then login | Returns to the same localized callback URL | High |
| Logout return path | Logout from a localized page | Returns to localized home | Medium |
| Google auth | Trigger Google sign-in if configured | Callback returns to a canonical localized path | High |

### Protected routes

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Profile while logged out | Open localized profile while logged out | Redirects once to localized login with `callbackUrl` | High |
| Booking confirmation while logged out | Open localized booking confirmation while logged out | Redirects once to localized login with `callbackUrl` | High |
| Profile while logged in | Open localized profile with a valid session | Page renders normally | High |

### Stripe checkout flows

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Experience checkout | Open an experience detail page and click checkout | API returns 201, Stripe opens, success/cancel return stays localized | Critical |
| Package checkout | Open a package page and click checkout | API returns 201, Stripe opens, success/cancel return stays localized | Critical |
| Checkout cancellation | Cancel checkout from Stripe | Lands on localized cancel page with no indexable transaction leak | High |

### Booking confirmation flows

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Authenticated booking confirmation | Open booking confirmation with a valid session and `session_id` | Page renders and keeps the localized context | High |
| Unauthenticated booking confirmation | Open booking confirmation without session | Redirects to localized login preserving callback | High |

### Metadata, canonical, hreflang

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Public canonical | Inspect home, guides, guide detail, experiences, experience detail | Canonical points to canonical localized URL | High |
| Hreflang alternates | Inspect the same public pages | Alternates exist for `pt`, `en`, `es`, `fr` only when route is real and resolvable | High |

### Robots and indexing

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Robots output | Open `/robots.txt` | Disallows auth, profile, checkout, booking confirmation, and API paths | High |
| Transaction page indexing | Inspect localized login, register, profile, checkout success, checkout cancel, booking confirmation | These routes are intentionally non-indexable | High |
| Sitemap output | Open `/sitemap.xml` | Only canonical public localized URLs appear | High |

### Regression hotspots

| Scenario | Steps | Expected result | Severity |
|---------|------|-----------------|----------|
| Experience detail flow | Open multiple experience detail pages and click core CTAs | No locale drift, no missing content, no broken checkout CTA | High |
| Guide internal links | Open multiple guide pages and click related experience/package/service links | All links resolve and stay localized | High |
| Destination detail links | Open destination detail pages and click related experiences/guides | All links resolve with canonical localized URLs | High |

## Staging / go-live checklist

### Required environment variables

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Hard blockers

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Recommended environment variables

- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Recommended but not blocking

- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Environment validation rules

1. `NEXT_PUBLIC_SITE_URL` must match the final public domain.
2. `NEXTAUTH_URL` should match the same canonical staging/production base URL.
3. `NEXTAUTH_SECRET` must be present in production.
4. Stripe webhook secret must be generated from the correct Stripe environment.
5. Database connection must be reachable from the deploy runtime.

### Pre-deploy checks

1. Run `cmd.exe /c npx tsc --noEmit`.
2. Run the internal preflight review:
   - `src/lib/env.ts` -> `getEnvReadinessReport()`
   - `src/lib/platform-health.ts` -> `getPlatformPreflightReport()`
3. Treat these as blockers:
   - `env.critical.missing.length > 0`
   - `launchSignals.hasCriticalEnvGaps === true`
   - unexpected missing references in live content relationships
4. Confirm staging domain is the value used by `NEXT_PUBLIC_SITE_URL`.
5. Confirm Stripe success and cancel URLs resolve under locale-prefixed routes.

### Deployment order

1. Configure all hard-blocker env vars in staging.
2. Configure recommended env vars if Google auth will be tested.
3. Deploy the current branch/build to staging.
4. Run the preflight review against the staging env configuration.
5. Execute the smoke test order below without skipping auth or checkout.

### Post-deploy smoke tests

For each failure, classify it immediately as one of:
- `ENV_BLOCKER`
- `AUTH_BLOCKER`
- `CHECKOUT_BLOCKER`
- `INDEXING_BLOCKER`
- `CONTENT_LINK_BLOCKER`

1. Homepage localized response
   - Route: `/`
   - Expected: single redirect to a canonical localized route
2. Robots
   - Route: `/robots.txt`
   - Expected: auth, profile, checkout, booking confirmation, and API paths are blocked
3. Sitemap
   - Route: `/sitemap.xml`
   - Expected: only canonical localized public URLs
4. Localized guide page
   - Route: one real `/<locale>/guides/<slug>` or localized equivalent
   - Expected: page renders and guide internal links stay localized
5. Localized experience page
   - Route: one real `/<locale>/experiences/<slug>` or localized equivalent
   - Expected: page renders and checkout CTA is visible
6. Localized destination page
   - Route: one real `/<locale>/destinations/<slug>` or localized equivalent
   - Expected: related guide/experience links resolve in the same locale
7. Protected route redirect
   - Route: localized profile
   - Expected: redirect to localized login with `callbackUrl`
8. Login roundtrip
   - Route: localized login returning to profile
   - Expected: successful return to localized protected route
9. Experience checkout
   - Route: one localized experience detail page
   - Expected: checkout session opens and returns correctly
10. Package checkout
   - Route: one localized package page
   - Expected: checkout session opens and returns correctly
11. Success/cancel localized landing
   - Route: localized checkout success and cancel pages
   - Expected: localized landing, no locale drift
12. Booking confirmation
   - Route: localized booking confirmation
   - Expected: unauthenticated redirect to login; authenticated render works
13. Canonical/hreflang verification
   - Route: rendered HTML of public localized pages
   - Expected: canonical and alternates match the locale-first route model

### Webhook verification

1. Confirm Stripe webhook endpoint is configured for the deployed environment.
2. Confirm webhook secret matches the deployed environment.
3. Trigger a test event from Stripe.
4. Confirm the webhook path is not intercepted by locale middleware.

### Search and indexing readiness

1. Verify canonical tags on public pages.
2. Verify hreflang tags on public pages.
3. Verify `robots.txt` blocks auth and transactional paths.
4. Submit `sitemap.xml` to Search Console only after staging smoke tests pass.

### Internal preflight helper

- Internal tooling references:
  - `src/lib/env.ts` -> `getEnvReadinessReport()`
  - `src/lib/platform-health.ts` -> `getPlatformHealthReport()` and `getPlatformPreflightReport()`
- Use these helpers before staging/manual QA to summarize env gaps, cross-domain missing references, runtime hotspots, and adapter debt that is still launch-adjacent.

### Passing vs failing preflight

- Passing signal:
  - no missing critical env vars
  - no unexpected live-content reference mismatches
  - runtime hotspot list is known and unchanged
- Failing signal:
  - any missing critical env var
  - broken live guide/experience/partner/itinerary references
  - unexpected planning/live mismatch that would surface in public routes

### GO / NO-GO

#### GO

- localized public pages render
- redirects are correct
- auth roundtrip works
- at least one experience checkout and one package checkout complete correctly
- success/cancel return localized correctly
- `robots.txt`, `sitemap.xml`, canonical, and hreflang are correct

#### NO-GO

- auth breaks protected-route flow
- experience or package checkout breaks
- success/cancel returns lose locale or fail
- canonical/indexing output is materially wrong
- Stripe webhook cannot be validated when required for the chosen flow

## Troubleshooting local runtime (`spawn EPERM`)

### Observed symptom

- `cmd.exe /c npm run dev` -> `Error: spawn EPERM`
- `cmd.exe /c npm run build` -> `Error: spawn EPERM`
- direct Node child-process test -> `Error: spawn EPERM`
- `cmd.exe /c npx tsc --noEmit` -> passes

### Most practical recovery order

1. Confirm Node and npm versions:
   - `cmd.exe /c node -v`
   - `cmd.exe /c npm -v`
2. Clear only transient Next output:
   - delete `.next`
3. Try direct command paths:
   - `cmd.exe /c npx next dev`
   - `cmd.exe /c npx next build`
4. If `spawn EPERM` still happens in a direct Node child-process test, treat it as machine-level:
   - check Windows Defender / Controlled Folder Access
   - check third-party antivirus ransomware protection
   - temporarily move the project to a shorter simple path such as `C:\dev\travel-marajo`
   - reinstall Node with an LTS version supported by the project
5. Only if needed, retry from an elevated terminal after the steps above.

### Staging-first fallback

- If local runtime remains blocked, continue with staging instead of forcing risky local cleanup.
- Minimum path:
  1. verify env readiness
  2. deploy to staging
  3. run the manual QA checklist in staging
  4. validate auth, Stripe, webhook, robots, sitemap, canonical, and hreflang there

## Prisma execution outside this Windows host

### Current decision

- Do not retry Prisma schema execution locally on this Windows machine.
- The local Prisma schema engine is blocked here by `spawn EPERM`.
- Apply the current schema from another machine or from CI/staging only.

### Authoritative Railway URL format

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/railway?sslmode=require&connect_timeout=15"
```

### Option 1: another machine

1. Use another machine with Node `20.x` LTS.
2. Set the Railway `DATABASE_URL` in the shell or `.env`.
3. Run:

```bash
npx prisma db push
```

### Option 2: CI or staging runner

1. Inject the Railway `DATABASE_URL` in the runner environment.
2. Use Node `20.x` LTS.
3. Run:

```bash
npx prisma db push
```

### Option 3: one-off GitHub Action

1. Create the GitHub secret:
   - `DATABASE_URL`
2. Use the Railway external PostgreSQL format:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/railway?sslmode=require&connect_timeout=15"
```

3. Open GitHub:
   - `Actions` -> `Prisma DB Push` -> `Run workflow`
4. Expected success signal:
   - `Validate Prisma schema` passes
   - `Push current Prisma schema` passes
   - workflow finishes with a green check

### Verification after `db push`

1. Run:

```bash
npx prisma validate
```

2. Confirm the current schema objects exist in PostgreSQL for the existing models only:
   - `User`
   - `Account`
   - `Session`
   - `VerificationToken`
   - `Booking`
   - `BookingItem`
   - `Payment`
   - `Destination`
   - `Package`
   - `PackageItem`
   - `Activity`
   - `Lead`
   - `CommercialEvent`
   - `EventProcessingLock`
   - `Flight`
   - `FlightBooking`
   - `Accommodation`
   - `HotelBooking`
   - `PackageBooking`
   - `Review`
   - `Promotion`

3. Only after `db push` succeeds, proceed with staging smoke tests.
