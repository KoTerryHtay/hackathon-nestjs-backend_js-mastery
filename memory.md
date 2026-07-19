# Memory - Arcjet NestJS Setup

Last updated: 2026-07-19 10:58 Asia/Rangoon

## What was built

Created a new Arcjet site named `jsm-hackathon`. Installed `@arcjet/nest` and `@nestjs/config`. Added `src/lib/arcjet/arcjet.module.ts` and imported `ArcjetSecurityModule` in `src/app.module.ts`.

## Decisions made

Arcjet is configured as a NestJS infrastructure module under `src/lib/arcjet/`, marked global and imported once in `AppModule`. The module uses `ConfigModule` to load `.env`, `ArcjetModule.forRootAsync()` for dependency-injected configuration, and `APP_GUARD` with Arcjet's built-in `ArcjetGuard` to protect routes globally.

## Problems solved

PowerShell blocked `npm.ps1`, so dependencies were installed with `npm.cmd`. The first sandboxed install timed out, then the approved escalated install succeeded. Build and Jest both pass after setup.

## Current state

`.env` contains the real Arcjet key for `jsm-hackathon` and `ARCJET_MODE=DRY_RUN`; the key is intentionally not stored here. Shield and token bucket rate limiting are configured globally through local SDK rules. The Arcjet site's remote rules list is still empty, which is expected because rules were configured in application code.

## Next session starts with

Run the app and send a few requests to confirm Arcjet decisions appear in the Arcjet console. Consider switching `ARCJET_MODE` from `DRY_RUN` to `LIVE` only after behavior is verified.

## Open questions

Should the rate limit stay at 20 requests capacity with 10 tokens refilled per minute, or should it be tuned per endpoint/user once auth exists?
