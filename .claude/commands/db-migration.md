# Generate & Run DB Migration

Generate a TypeORM migration for **Gronic**'s PostgreSQL database.

## Steps

Given a migration description `$ARGUMENTS`:

1. Ensure all relevant entity changes are saved
2. Run from `apps/api/`:
   ```bash
   pnpm migration:generate $ARGUMENTS
   ```
3. Review the generated migration file in `apps/api/src/migrations/` — confirm it matches the intended schema change
4. Run the migration:
   ```bash
   pnpm migration:run
   ```
5. Verify with:
   ```bash
   pnpm migration:show
   ```

## Rules
- Never edit a migration file that has already been run in production
- Decimal columns for money must use `precision: 10, scale: 2`
- All entities must include `created_at` and `updated_at` timestamp columns
- If reverting: `pnpm migration:revert` rolls back only the latest migration