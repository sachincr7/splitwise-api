# Frontend Design Rules

## Styling system
- **Tailwind CSS 4** is the only styling system — no CSS modules, no styled-components, no inline `style={...}` except for genuinely dynamic values (e.g. computed widths)
- Global styles live in `apps/app/app/globals.css` — keep this file minimal

## Theming
- Dark/light mode is powered by `next-themes` via a `ThemeProvider` that sets a class on `<html>`
- Use shadcn's CSS variable tokens (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, etc.) — they resolve per-theme automatically
- **Never** hardcode colors like `text-white`, `bg-gray-900`, or `text-slate-500` for theme-sensitive UI
- When reading the active theme client-side, guard against SSR: check `resolvedTheme` only after `mounted === true`, or use `suppressHydrationWarning` on the affected element

## Typography
- Fonts: **Geist Sans** (body) and **Geist Mono** (code) loaded via `next/font/google`
- Use `font-sans` (default) and `font-mono` utilities — do not import other Google Fonts

## Spacing & layout
- Use Tailwind's spacing scale (`p-4`, `gap-6`) — no arbitrary pixel values unless matching a design spec
- Prefer `flex` and `grid` utilities over margin-based layouts

## Icons
- Use `lucide-react` (already a shadcn dependency) — do not add other icon libraries