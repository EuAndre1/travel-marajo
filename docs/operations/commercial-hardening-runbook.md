# Commercial Operations Runbook

## 1) Replay de webhook Stripe
1. No Stripe Dashboard, abra o evento `checkout.session.completed`.
2. Clique em `Replay` para o endpoint `/api/stripe/webhook`.
3. Verifique resposta HTTP 200.
4. Confirme no banco:
   - `Payment.status = COMPLETED`
   - `Booking.status = CONFIRMED`
   - eventos `PAYMENT_COMPLETED` e `BOOKING_CONFIRMED` em `CommercialEvent`.

## 2) Falha de confirmacao local
Sintoma: pagamento concluido no Stripe e booking ainda pendente.

Acoes:
1. Reprocessar webhook (Replay).
2. Validar lock em `EventProcessingLock`:
   - evento em `FAILED` ou `PROCESSING` antigo pode ser reprocessado.
3. Conferir logs por `stripeEventId` e `bookingId`.

## 3) Inconsistencia Payment x Booking
Casos:
- `Payment.COMPLETED` + `Booking.PENDING`
- `Booking.CONFIRMED` + `Payment != COMPLETED`

Acoes:
1. Consultar `/api/ops/commercial` (GET) com header `x-ops-token`.
2. Reprocessar webhook original no Stripe.
3. Persistindo inconsistencia, corrigir manualmente em transacao SQL sob janela de manutencao.

## 4) Cleanup de pendencias expiradas
Endpoint interno:
- `POST /api/ops/commercial`
- header: `x-ops-token: <OPS_RUNBOOK_TOKEN>`
- body exemplo: `{ "olderThanHours": 24, "limit": 500 }`

Resultado esperado:
- bookings pendentes antigos -> `CANCELLED`
- payments pendentes antigos -> `FAILED` com `rawStatus=expired_cleanup`.

## 5) Reconciliacao manual (base)
1. Chame `GET /api/ops/commercial` com `x-ops-token`.
2. Analise:
   - `stalePendingBookings`
   - `completedPaymentWithoutConfirmedBooking`
   - `confirmedBookingWithoutCompletedPayment`
3. Para cada item, rastreie `bookingId` e `paymentIntentId` no Stripe.
4. Reprocesse webhook quando aplicavel.

## 6) Seguranca operacional minima
- Rotacione `STRIPE_WEBHOOK_SECRET` e `OPS_RUNBOOK_TOKEN` periodicamente.
- Restrinja endpoint ops por rede (WAF/IP allowlist) quando possivel.
- Mantenha alertas para picos de 429, 400 no webhook e inconsistencias de reconciliacao.
