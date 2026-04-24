# New NestJS Module

Create a complete NestJS feature module for **Gronic** following the existing patterns in `apps/api/src/modules/`.

## What to scaffold

Given a module name `$ARGUMENTS`, generate:

1. **Module file** — `<name>.module.ts` wiring together controller, service, and TypeORM entity
2. **Controller** — `<name>.controller.ts` with versioned routes (`@Controller({ path: '<name>', version: '1' })`), JWT auth guard, and standard CRUD endpoints
3. **Service** — `<name>.service.ts` with constructor-injected repository
4. **Entity** — `<name>.entity.ts` under `apps/api/src/entities/`, following the existing pattern (timestamps, decimal for money, relations)
5. **DTOs** — create, update, and response DTOs using `class-validator` decorators
6. **Barrel export** — add the module to `app.module.ts` imports

## Rules
See `.claude/rules/backend/api.md`, `.claude/rules/backend/services.md`, and `.claude/rules/backend/dto.md`.