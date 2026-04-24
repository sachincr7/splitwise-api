# Backend API Rules

## Controllers
- All controllers must be **versioned**: `@Controller({ path: 'groups', version: '1' })`
- One resource per controller — don't merge unrelated endpoints
- Controller methods must return DTOs or plain objects — never raw entities (see [dto.md](dto.md))

## Route conventions
- `GET /v1/<resource>` — list
- `GET /v1/<resource>/:id` — read one
- `POST /v1/<resource>` — create
- `PATCH /v1/<resource>/:id` — update
- `DELETE /v1/<resource>/:id` — delete
- Sub-resources nest: `POST /v1/groups/:id/members`

## Guards
- Protected endpoints: `@UseGuards(JwtAuthGuard)`
- Role-restricted endpoints: `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles(Role.ADMIN)`
- Never leave a write endpoint unguarded — if it's genuinely public, add a comment explaining why

## Request shape
- Use `@Body()` with a typed DTO — never `@Body() body: any`
- Use `@Param('id', ParseIntPipe)` or `ParseUUIDPipe` to coerce path params
- Use `@Query()` with a typed DTO for query parameters

## Errors
- Throw NestJS HTTP exceptions: `NotFoundException`, `BadRequestException`, `ForbiddenException`, `ConflictException`
- Never return `{ error: '...' }` manually — let the framework serialize the exception
- The exception message is user-facing — keep it clear, no stack traces or internal field names