# Backend Logging Rules

## Logger
- Use **Pino** via `nestjs-pino` — inject `Logger` from `@nestjs/common` or `PinoLogger` where structured logging is needed
- Never use `console.log` / `console.error` in backend code — Pino formats, correlates, and ships logs correctly

## Levels
- `logger.debug(...)` — verbose dev info (disabled in prod)
- `logger.log(...)` / `logger.info(...)` — lifecycle events, successful operations worth knowing
- `logger.warn(...)` — recoverable issues, deprecated path hits, retries
- `logger.error(...)` — failures that require attention; always include the error object

## Structured context
- Pass a context object, not interpolated strings: `logger.log({ userId, groupId }, 'group created')`
- Pino will serialize the object into JSON fields — this is what makes logs queryable

## Don't log secrets
- Never log: passwords, JWT tokens, session IDs, full request bodies for auth endpoints, OAuth codes
- Redaction is configured in Pino setup — if you add a sensitive field type, extend the redaction list

## Request logging
- `nestjs-pino` auto-logs every HTTP request with method, URL, status, and duration — do not add a second request logger
- For custom per-request context, use the request-scoped logger