# Frontend Forms Rules

## Libraries
- Forms use **React Hook Form** with **Zod** resolvers (`@hookform/resolvers/zod`)
- Do not introduce Formik, Final Form, or a second validation library

## Patterns
- Define a Zod schema next to the form component (or colocated in a `schema.ts`)
- Infer the TS type: `type FormValues = z.infer<typeof schema>`
- Wire with `useForm<FormValues>({ resolver: zodResolver(schema) })`
- Use shadcn's `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` primitives — don't hand-render error messages

## Validation
- Validation rules live in the Zod schema — never re-implement rules with manual `if` checks in the submit handler
- Match server-side `class-validator` rules as closely as possible (email format, min/max lengths, numeric bounds)

## Submission
- Submit handlers are async and `await` the API call
- On error: set a field error via `setError` or show a toast via `sonner` — do not alert()
- On success: navigate with `router.push(...)` or show a toast

## Controlled vs uncontrolled
- RHF is uncontrolled by default — prefer `register` over `Controller` unless the input is a custom/compound component (e.g. a date picker or shadcn `Select`)