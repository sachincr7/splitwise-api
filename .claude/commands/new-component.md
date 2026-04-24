# New Frontend Component

Scaffold a new React component for **Gronic** following the conventions in `apps/app/components/`.

## What to create

Given a component name and optional domain `$ARGUMENTS` (e.g. `ExpenseCard groups`):

1. Create a `.tsx` file in the appropriate domain folder under `apps/app/components/<domain>/`
2. Use shadcn/ui primitives from `components/ui/` where appropriate
3. Apply Tailwind CSS for styling — no inline styles, no CSS modules
4. If the component needs server data, accept it as typed props; use client-side Zustand store only for auth state
5. If it has user interaction, mark it `'use client'`

## Rules
See `.claude/rules/frontend/components.md` and `.claude/rules/frontend/design.md`.