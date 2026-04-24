# Code Review

Review the current branch changes against `main` for the **Gronic** codebase.

## What to check

Walk through the diff and verify it conforms to the rules under `.claude/rules/` (backend, frontend, database, code-style). Additionally:
1. **Correctness** — logic errors, off-by-one, wrong TypeORM relations
2. **Security** — unguarded write endpoints, user input reaching raw SQL, sensitive fields leaking in responses
3. **Migrations** — if entities changed, is a migration included?

## Output format

- List issues grouped by severity: **Critical**, **Warning**, **Suggestion**
- For each issue: file path + line, what the problem is, and the fix