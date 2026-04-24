# Code Style Rules

Applies to both `apps/api` and `apps/app`.

## TypeScript
- No `any` — use proper types, generics, or `unknown` with narrowing
- No non-null assertions (`!`) unless the alternative is truly unreachable
- Prefer `type` for unions and simple shapes, `interface` for extendable object contracts

## Comments
- Default to no comments. Only add one when the *why* is non-obvious (hidden constraint, workaround, surprising invariant)
- Never comment what the code does — well-named identifiers should already say that
- Never leave `// TODO` without a linked issue or owner

## Exports
- Prefer **named exports** for components, services, utils
- Default exports are reserved for Next.js pages/layouts (required by the framework)

## Logging
- Backend: use the Pino logger injected via `nestjs-pino` — never `console.log`
- Frontend: `console.error` is acceptable for genuine error paths; avoid `console.log` in committed code

## Formatting
- Prettier is the source of truth — do not hand-format
- Run `pnpm format` in the affected workspace before committing if unsure