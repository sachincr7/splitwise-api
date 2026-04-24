# Workflow Rules

## Git
- Default branch: `main`
- Never force-push to `main`
- Commit messages follow the existing style (see `git log`) — short, imperative, lowercase
- Never commit `.env` files or anything containing secrets

## Dev loop
1. Start both servers: `pnpm dev` from repo root
2. Backend auto-reloads via `nest start --watch`
3. Frontend auto-reloads via Next.js Turbopack

## Before committing
- Backend: `cd apps/api && pnpm lint && pnpm test`
- Frontend: `cd apps/app && pnpm lint && pnpm typecheck`

## Testing
- Backend has Jest for unit and e2e (`test/` for e2e)
- Frontend has no runtime test suite yet — typecheck is the gate
- Do not mark a task done until the relevant checks pass

## Database changes
- Any entity change requires a migration — never set `synchronize: true`
- See [database/migrations.md](database/migrations.md) for the full lifecycle