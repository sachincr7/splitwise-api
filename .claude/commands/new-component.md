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
- Match the existing component style in `apps/app/components/groups/` or `apps/app/components/expenses/`
- Use `next-themes` compatible classes (avoid hardcoded dark/light color values — use CSS variables via shadcn)
- No default exports that conflict with Next.js page conventions — named exports preferred for non-page components
- Do not create new UI primitives that already exist in `components/ui/`