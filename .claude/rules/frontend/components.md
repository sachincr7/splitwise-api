# Frontend Component Rules

## Where components live
- UI primitives: `apps/app/components/ui/` (shadcn-generated — do not hand-edit unless patching a bug)
- Feature components: `apps/app/components/<domain>/` (e.g. `groups/`, `expenses/`)
- Page-scoped components that aren't reused go next to the page in `apps/app/app/...`

## shadcn/ui
- Before building a UI primitive, check `components/ui/` — button, input, dialog, card, dropdown, etc. already exist
- To add a new shadcn component: use the CLI (`npx shadcn@latest add <name>`), don't hand-write it
- Wrap shadcn primitives in feature components rather than composing them inline on pages

## Client vs server components
- Default to **server components** — no `'use client'` directive
- Add `'use client'` only when the component uses: `useState`, `useEffect`, `useRef`, event handlers, browser APIs, or third-party client-only libs (Zustand, RHF)
- Keep the `'use client'` boundary as low in the tree as possible — don't mark a whole page client unless every child needs it

## Props
- Use TypeScript `type` aliases for props, named `<ComponentName>Props`
- Accept server-fetched data as typed props — do not fetch inside a client component unless the data is user-triggered

## Exports
- Named exports only: `export function ExpenseCard(...)` — not `export default`
- Pages and layouts (`page.tsx`, `layout.tsx`) are the only files using default exports (Next.js requirement)