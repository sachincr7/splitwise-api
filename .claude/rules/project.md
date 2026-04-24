# Project Rules

## Branding
- The app is called **Gronic**. Use this name for any user-facing copy, marketing, or documentation.
- The repo directory is `splitwise-api` for historical reasons — don't rename files to match.

## Monorepo
- Structure: pnpm workspace with two apps under `apps/` (`api` and `app`)
- Always run `pnpm install` from the repo root — never from inside a workspace
- Root-level dev commands: `pnpm dev`, `pnpm dev:api`, `pnpm dev:app`
- Per-workspace commands must be run from inside that workspace (e.g. `cd apps/api && pnpm test`)

## Ports
- Backend (NestJS): **4000**
- Frontend (Next.js): **3000**
- Postgres and Redis connections are configured via `apps/api/.env`

## Shared types
- There is no shared types package yet. If you need to share a type between frontend and backend, duplicate it cautiously or propose a `packages/shared` workspace first.