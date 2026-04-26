<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EXITour Project Rules

## Scope

- Do not create a new project.
- Work only inside the existing Next.js App Router project in this repository.
- Do not implement the full product specification in one pass.
- Implement only the Phase explicitly requested by the user.
- Prefer small, buildable increments.

## Content

- Write customer-facing content in Korean.
- Do not use lorem ipsum.
- Do not leave empty pages.
- Do not leave TODO-only implementations.
- Keep the tone suitable for a premium travel agency serving Korean customers.

## Commands

- Use `npm.cmd` instead of `npm` on this Windows workspace.
- Use `npm.cmd run build` for build verification.
- Use `npm.cmd run lint` for lint verification when needed.

## Product And Pricing Safety

- Do not expose the Supabase service role key to the client.
- Do not automatically apply real price changes without an approval flow.
- Treat price, quote, and customer contact data conservatively.
- Keep public UI and admin-only data clearly separated.

## Phase Discipline

- Phase 1 static MVP is complete.
- Do not add Supabase, API routes, database schema, admin pages, or OpenClaw integration unless the current user request explicitly asks for that Phase.
- Documentation-only requests should avoid changing existing UI code and pages.
