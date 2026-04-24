# Frontend State Rules

## Zustand
- There is **one** global store: `stores/auth.store.ts` — it holds `token` and `user`
- Do **not** add unrelated slices to the auth store (groups, expenses, UI flags, etc.)
- If a new domain genuinely needs global client state, create a new store file: `stores/<domain>.store.ts`
- Each store should be small and single-purpose — prefer server-fetched data + React state over global stores

## Persistence
- The auth store uses Zustand's `persist` middleware backed by `localStorage`
- Only persist what is safe and necessary — never persist tokens with long lifetimes if not needed
- Hydration is handled by the `UserInitializer` component — do not read persisted state during SSR

## Server state
- Server data (groups, expenses, users) is fetched per-route — it does not live in Zustand
- There is no global server-state library (no React Query / SWR) yet. If you need one, propose it before adding
- For mutations, call the API and re-navigate or re-fetch on the next render — do not mirror server state into Zustand

## React local state
- Use `useState` / `useReducer` for component-local state
- Lift state only when two siblings need it — don't hoist to a store just because it feels tidy