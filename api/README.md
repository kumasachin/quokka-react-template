This folder contains serverless API handlers intended to run on Vercel (or locally).

Overview

- The `api/policies.js` handler supports either an in-memory mock or a Postgres database via `DATABASE_URL`.

Deploying to Vercel with a real database

1. Create a Postgres database (for example using Supabase, Neon, or Heroku Postgres).
2. Add the resulting connection string as the `DATABASE_URL` environment variable in your Vercel project settings.
3. Run the SQL in `db/schema.sql` on your database to create the `policies` table. Optionally run `db/seed.sql` to insert demo data.

Local development

- If `DATABASE_URL` is not present, the handler will use an in-memory mock and behave the same as before.

Notes

- When using many hosted Postgres providers with automatic TLS, the handler sets `ssl.rejectUnauthorized = false` in production to avoid handshake failures. Adjust if your provider requires a stricter SSL config.
- The API returns JSON in the form { success: boolean, data: ... }
