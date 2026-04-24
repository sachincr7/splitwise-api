# Gronic — Rules Index

Project-wide conventions, broken down by concern. Read the file relevant to the task at hand.

## General
- [project.md](project.md) — Monorepo layout, Gronic branding, environment setup
- [workflow.md](workflow.md) — Git, pnpm workflow, testing commands
- [code-style.md](code-style.md) — Language-agnostic code style

## Frontend (`apps/app`)
- [frontend/design.md](frontend/design.md) — Tailwind, theming, spacing, colors
- [frontend/components.md](frontend/components.md) — shadcn usage, `'use client'`, exports
- [frontend/state.md](frontend/state.md) — Zustand store rules
- [frontend/forms.md](frontend/forms.md) — React Hook Form + Zod patterns
- [frontend/routing.md](frontend/routing.md) — Next.js App Router, route groups, auth guard

## Backend (`apps/api`)
- [backend/api.md](backend/api.md) — Controllers, versioning, guards
- [backend/services.md](backend/services.md) — Service layer, dependency injection
- [backend/dto.md](backend/dto.md) — DTOs, validation, response serialization
- [backend/logging.md](backend/logging.md) — Pino logger conventions

## Database
- [database/entities.md](database/entities.md) — TypeORM entity conventions
- [database/migrations.md](database/migrations.md) — Migration lifecycle and rules