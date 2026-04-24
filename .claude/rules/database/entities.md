# Database Entity Rules

## Location
- All entities live under `apps/api/src/entities/`
- One entity per file, named `<name>.entity.ts`
- Export the class with `@Entity('<table_name>')` — table names are `snake_case` and plural

## Required columns
Every entity must have:
- A primary key — UUID preferred (`@PrimaryGeneratedColumn('uuid')`), integer acceptable for legacy
- `@CreateDateColumn() created_at: Date`
- `@UpdateDateColumn() updated_at: Date`

## Column conventions
- Column names: `snake_case` in the DB, mapped via `@Column({ name: 'user_id' })` when the TS property is `camelCase`
- Nullability: explicit — `@Column({ nullable: true })` if optional, never rely on defaults
- Strings: use `@Column({ type: 'varchar', length: <n> })` with a sensible length, not unbounded `text`

## Money
- Amount columns: `@Column({ type: 'decimal', precision: 10, scale: 2 })`
- Never use `float`, `double`, or `real` for money
- Read and write as strings (the TypeORM type is `string` for decimal columns)

## Enums
- Use PostgreSQL enum columns: `@Column({ type: 'enum', enum: MyEnum })`
- Define the enum in a shared location (e.g. `entities/enums/` or next to the entity if single-use)

## Relations
- Always specify `onDelete` behavior explicitly: `'CASCADE'`, `'SET NULL'`, `'RESTRICT'`
- Eager loading: avoid `eager: true` — load relations explicitly via `relations: [...]` in queries
- Many-to-many: use `@JoinTable()` on the owning side, and name the join table explicitly

## Indexes
- Add `@Index()` on any column used in a `WHERE`, `ORDER BY`, or foreign-key lookup on large tables
- Composite indexes for multi-column filters go on the entity class, not individual columns