# Backend Service Rules

## Responsibility
- Controllers handle HTTP shape (routes, DTOs, status codes)
- Services hold all business logic — no business rules in controllers
- Repositories (TypeORM) handle persistence — no raw SQL in services unless absolutely necessary

## Dependency injection
- Inject repositories via `@InjectRepository(Entity)` in the constructor
- Inject other services via constructor with `private readonly`
- Do not use service locator / manual `new` — always go through Nest DI

## Structure
- One service per feature module (e.g. `GroupService`, `ExpenseService`)
- If a service grows past ~300 lines, split by sub-concern (e.g. `ExpenseSplitService` under the same module)
- Cross-module calls go through imported modules + exposed providers — never reach into another module's internals

## Transactions
- For multi-step writes that must be atomic, use a TypeORM `QueryRunner` or `EntityManager.transaction(...)`
- Never rely on sequential saves to preserve consistency

## Async
- All repository and service methods are `async` and return `Promise<T>`
- Do not mix callbacks or event emitters with promises

## Business rule examples
- Split calculation lives in `SplitModule` services — do not duplicate the math in `ExpenseService`
- Settlement math lives in `SettleUpService` — other services call it, not reimplement it