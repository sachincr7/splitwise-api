# Frontend Routing Rules

## App Router structure
- All routes live under `apps/app/app/`
- Use **route groups** (parenthesized folder names) to share layouts without affecting URLs:
  - `(auth)` — public login/register pages
  - `(dashboard)` — protected dashboard routes
- URL is derived from the folder path — do not manually set `pathname` anywhere

## Auth guard
- The `AuthGuard` component wraps `(dashboard)` — it redirects unauthenticated users to login
- Public paths: `/`, `/auth/callback` — do not add other public paths without updating the guard
- Do not reimplement auth checks in individual pages; rely on the layout-level guard

## Layouts
- Each route group has its own `layout.tsx` providing shared chrome (navbar, sidebar, auth guard)
- The root layout (`app/layout.tsx`) provides `ThemeProvider`, `UserInitializer`, global fonts, and the `<Toaster />` — leave these in place

## Dynamic routes
- Use `[param]` folders for dynamic segments (e.g. `groups/[id]`)
- Type the `params` prop: `{ params: Promise<{ id: string }> }` in Next.js 16
- `await params` before reading (Next.js 16 requires it)

## Navigation
- Client-side navigation: `useRouter().push(...)` from `next/navigation`
- Links: `<Link href="...">` from `next/link` — never use a plain `<a>` for internal routes
- For OAuth flows, redirect to the backend's callback URL, then let `/auth/callback` handle the token