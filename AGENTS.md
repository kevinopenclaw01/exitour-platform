<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

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

## Working Location And Design System (2026-10-20)

- The only working copy is `C:\Users\kevin\Desktop\바탕화면\AI\semi ochestra\웹사이트\EXITour 홈페이지\site`. The old copy under `.openclaw\workspace-codex\exitour-platform` is retired.
- Codex and Claude Code share this folder. Before editing, check `..\작업중.md`; commit after each change so the other agent continues from git history.
- Visual rules live in `DESIGN.md` (this folder). Use the tokens in `app/globals.css` (`ink`, `navy`, `signal`, `paper`, `line`, `muted`, classes `display`, `code`, `num`, `tag`, `tag-hole`, `tag-perf`). Do not add new hex colors in components. The owner rejected the cobalt blue fields (2026-10-20); keep backgrounds white/light.
- No eyebrow/kicker labels above headings, no English section labels, no internal notes (mock, CTA, TODO, 템플릿) in customer-facing copy.
- The primary action is a yellow `bg-signal text-ink` button. Use it once per section.
