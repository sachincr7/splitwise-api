# Run Tests

Run the test suite for **Gronic**.

## Commands

```bash
# All unit tests
cd apps/api && pnpm test

# Watch mode (during development)
cd apps/api && pnpm test:watch

# Single file or pattern
cd apps/api && pnpm test -- <pattern>

# With coverage
cd apps/api && pnpm test:cov

# E2E tests
cd apps/api && pnpm test:e2e

# Frontend type check (no runtime test suite yet)
cd apps/app && pnpm typecheck
```

## What to do with failures

1. Read the full error — Jest prints the expected vs received diff
2. Check if the failure is in a unit test: look at `apps/api/src/**/*.spec.ts`
3. Check if it's an e2e failure: look at `apps/api/test/`
4. Fix the source, not the test, unless the test assertion is genuinely wrong