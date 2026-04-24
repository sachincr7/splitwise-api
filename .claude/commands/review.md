# Code Review

Review the current branch changes against `main` for the **Gronic** codebase.

## What to check

1. **Correctness** — logic errors, off-by-one, wrong TypeORM relations
2. **Security** — unguarded endpoints (missing `@UseGuards(JwtAuthGuard)`), missing `@Roles()` decorator, user input reaching raw SQL, exposed sensitive fields in response DTOs
3. **Type safety** — `any` types, missing DTO validation decorators, untyped API responses on the frontend
4. **Consistency** — does the code follow patterns in the existing modules? (versioned controllers, `ClassSerializerInterceptor`, Zustand for auth state only)
5. **Migrations** — if entities changed, is a migration included?

## Output format

- List issues grouped by severity: **Critical**, **Warning**, **Suggestion**
- For each issue: file path + line, what the problem is, and the fix