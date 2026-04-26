This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Database Setup

Phase 3 adds Supabase/Postgres schema and seed files only. The current frontend still uses static data from `lib/data.ts`; quote form submission, admin pages, and OpenClaw integration are not connected yet.

### 1. Create a Supabase project

Create a Supabase project from the Supabase dashboard and copy the project URL, anon key, and service role key into local environment variables.

Use `.env.example` as the reference:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OPENCLAW_WEBHOOK_SECRET=
ADMIN_EMAILS=
KAKAO_CHANNEL_URL=
NAVER_TALK_URL=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code or any `NEXT_PUBLIC_*` variable.

### 2. Apply migration

Run the SQL in:

```bash
supabase/migrations/001_initial_schema.sql
```

You can apply it through the Supabase SQL editor or a Supabase CLI workflow once the project is configured.

### 3. Run seed data

After the schema is applied, run:

```bash
supabase/seed.sql
```

The seed contains sample destinations, products, hotels, rooms, and 2026 Q2 sample rates. Rate notes clearly mark them as sample prices that must be verified before real operation.

### Current integration status

- Frontend pages are not reading from Supabase yet.
- `/quote` does not submit to the database yet.
- Admin pages are not implemented yet.
- OpenClaw API is not implemented yet.
