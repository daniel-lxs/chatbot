# Deployment

This app is a Next.js chatbot with Auth.js, Postgres-backed chat persistence,
Vercel Blob uploads, and AI Gateway model access. Use this guide when you want
to deploy the repo outside the local development flow in the README.

## What the app needs

- Node.js 20+ and `pnpm`
- A Postgres database for auth, chats, votes, and documents
- Vercel Blob storage for image uploads
- AI Gateway access for model calls
- An `AUTH_SECRET` for session signing
- Optional Redis for production rate limiting and resumable streams

The production build runs `pnpm build`, which executes
`tsx lib/db/migrate && next build`, so database migrations are applied as part
of the build step when `POSTGRES_URL` is present.

## Environment variables

Copy `.env.example` into your platform's secret manager and set these values:

| Variable | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | Yes | Signs auth sessions and guest access tokens |
| `AI_GATEWAY_API_KEY` | Non-Vercel only | Auth for Vercel AI Gateway outside Vercel |
| `BLOB_READ_WRITE_TOKEN` | Yes | Uploads attachments through Vercel Blob |
| `POSTGRES_URL` | Yes | Connects Drizzle and the migration script to Postgres |
| `REDIS_URL` | No | Enables rate limiting and resumable stream support |

On Vercel, AI Gateway auth is handled automatically through OIDC. On other
platforms, set `AI_GATEWAY_API_KEY` yourself.

## Deploying to Vercel

1. Create a Postgres database and Blob store, then add their env vars.
2. Import the repository into Vercel.
3. Add `AUTH_SECRET` and any missing env vars from the table above.
4. Deploy normally. Vercel will run `pnpm build`, which applies migrations.
5. Verify that you can sign in, start a chat, and upload an image.

The README's one-click button is the fastest route if you want Vercel to host
the app and manage the standard build/start pipeline for you.

## Deploying to another platform

1. Install dependencies with `pnpm install`.
2. Provide the environment variables listed above.
3. Run `pnpm build`.
4. Start the app with `pnpm start`.

If your platform separates release tasks from builds, run `pnpm db:migrate`
before switching traffic so the schema is current.

For containers, expose the port expected by Next.js and route traffic to the
`pnpm start` process.

## Post-deploy checks

- Open the app and confirm auth works.
- Send a test prompt and confirm model responses succeed.
- Upload a PNG or JPEG to verify Blob storage.
- Check that chats persist after a refresh.
- If Redis is configured, confirm rate limiting and stream resume still work.
