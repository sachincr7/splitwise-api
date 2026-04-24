# Database Migration Rules

## Golden rules
- `synchronize: true` is **never** used in this project — all schema changes go through migrations
- Never edit a migration that has already been run on a shared environment (staging or prod) — write a new one instead
- Never delete a migration file once it has been applied anywhere

## Lifecycle
1. Change the entity in `apps/api/src/entities/`
2. From `apps/api/`, run: `pnpm migration:generate <MigrationName>`
3. Open the generated file in `apps/api/src/migrations/` and **read it before running**
4. If the SQL looks wrong (e.g. drops a column you meant to rename), fix or discard it
5. Apply: `pnpm migration:run`
6. Verify: `pnpm migration:show`

## Writing migrations
- Migration file names: `<timestamp>-<DescriptiveName>.ts` (auto-generated)
- Always implement both `up()` and `down()` — `down()` must actually reverse the change
- Prefer many small migrations over one large one — easier to review, revert, and deploy incrementally

## Rename / refactor migrations
- TypeORM's diff generator cannot distinguish "rename column" from "drop + add" — when renaming, edit the generated migration to use `renameColumn(...)` to avoid data loss

## Data migrations
- For migrations that transform existing rows (not just schema), write the SQL explicitly inside `up()`
- Split data migrations from schema migrations when practical — a failed data migration shouldn't block a schema rollout

## Reverting
- `pnpm migration:revert` rolls back the single most recent migration
- There is no bulk revert — to go back multiple steps, run it repeatedly
