# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack expense-splitting app (Splitwise clone) built as a pnpm monorepo with two apps:
- `apps/api` — NestJS backend (TypeScript, PostgreSQL, Redis)
- `apps/app` — Next.js 16 frontend (React 19, Tailwind CSS, shadcn/ui)

## Commands

### Root (runs both apps concurrently)
```bash
pnpm dev          # Start both API and frontend in dev mode
pnpm dev:api      # Start only the backend
pnpm dev:app      # Start only the frontend
```

### Backend (`apps/api`)
```bash
pnpm start:dev    # NestJS watch mode
pnpm build        # Compile via nest build
pnpm test         # Jest unit tests
pnpm test:watch   # Jest in watch mode
pnpm test:cov     # Jest with coverage
pnpm test:e2e     # E2E tests (jest --config ./test/jest-e2e.json)
pnpm lint         # ESLint with auto-fix
pnpm format       # Prettier write

# TypeORM migrations
pnpm migration:generate [NAME]
pnpm migration:run
pnpm migration:revert
pnpm migration:show

pnpm seed:users   # Seed the database with test users
```

### Frontend (`apps/app`)
```bash
pnpm dev          # Next.js with Turbopack
pnpm build        # next build
pnpm typecheck    # tsc --noEmit
pnpm lint         # ESLint
pnpm format       # Prettier write
```

## Architecture

### Backend (NestJS)

Feature modules under `apps/api/src/`:
- `auth/` — Local strategy, Google OAuth 2.0, JWT, session management
- `users/` — User search and profiles
- `group/` — Expense group CRUD, member management
- `expense/` — Expense creation and tracking
- `split/` — Splitting strategies (equal, itemwise, etc.)
- `settle-up/` — Settlement calculation (who owes whom)
- `config/` — Config loaders for DB, Redis, JWT, Google OAuth

All endpoints are versioned under `/v1`. Authentication uses JWT + Passport with sessions stored in Redis. Passwords are hashed with argon2/bcrypt.

**Database:** TypeORM with PostgreSQL. Entities: `UserEntity`, `ExpenseGroupEntity`, `ExpenseEntity`, `SplitEntity`. Run migrations before starting in a fresh environment.

### Frontend (Next.js App Router)

Route groups under `apps/app/src/app/`:
- `/(auth)` — Public login/register pages
- `/(dashboard)` — Protected routes requiring authentication
- `/auth/callback` — Google OAuth callback handler

**State:** Zustand store (`auth.store.ts`) holds token and user, persisted to localStorage. A `UserInitializer` component handles SSR hydration.

**Auth guard:** The `AuthGuard` component protects dashboard routes and redirects unauthenticated users. Public paths: `/`, `/auth/callback`.

**UI:** shadcn/ui components live in `components/ui/`. Feature components are colocated by domain (group, expense, auth).

## Environment Setup

Copy `apps/api/.env.example` to `apps/api/.env` and fill in:
- PostgreSQL connection (`DATABASE_*`)
- Redis connection (`REDIS_*`)
- `JWT_SECRET`, `JWT_EXPIRE_IN`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `FRONTEND_URL=http://localhost:3000`
- `SESSION_SECRET`

The API runs on port 4000 by default; the frontend on port 3000.
