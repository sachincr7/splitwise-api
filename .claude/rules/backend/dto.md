# Backend DTO Rules

## Request DTOs (input)
- Every `@Body()` and complex `@Query()` must be a class-based DTO — no inline types
- Decorate with `class-validator`: `@IsString()`, `@IsEmail()`, `@IsUUID()`, `@IsInt()`, `@Min()`, `@Max()`, `@IsOptional()`, etc.
- For nested objects: `@ValidateNested()` + `@Type(() => NestedDto)`
- DTOs live next to their controller: `<feature>/dto/create-<feature>.dto.ts`

## Response DTOs (output)
- Never return raw TypeORM entities from controllers — always map to a response DTO
- Use `ClassSerializerInterceptor` (already global) with `class-transformer` decorators
- Hide sensitive fields with `@Exclude()` — password hashes, internal IDs, session data must never leak

## Validation behavior
- `ValidationPipe` is global with `whitelist: true` and `forbidNonWhitelisted: true` — extra fields in requests are rejected
- Do not disable whitelist on a per-endpoint basis without a strong reason
- Use `transform: true` so DTOs receive typed values (numbers as numbers, not strings)

## Naming
- `CreateXDto`, `UpdateXDto`, `XResponseDto` — stay consistent across modules
- Partial update DTOs: extend via `PartialType(CreateXDto)` from `@nestjs/mapped-types`

## Money
- Amount fields are strings in DTOs to preserve precision (`@IsNumberString()` or `@IsDecimal()`)
- Never use JS `number` for money — floating-point drift will bite you