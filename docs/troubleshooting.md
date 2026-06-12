# Troubleshooting

These are the five setup and runtime problems most likely to block this app locally.

## 1. `pnpm db:migrate` says `POSTGRES_URL not defined, skipping migrations`

The migration script loads `.env.local`, not just `.env`.

Fix:
- Put your local secrets in `.env.local`, or run `vercel env pull .env.local`.
- Make sure `POSTGRES_URL` is set before running `pnpm db:migrate`.
- Rerun `pnpm db:migrate` and look for `Running migrations...` instead of `skipping migrations`.

## 2. The app redirects in circles or auth sessions do not stick

Auth middleware and guest login depend on `AUTH_SECRET`.

Fix:
- Add `AUTH_SECRET` to `.env.local`.
- If you already had one, do not rotate it between local restarts unless you expect old sessions to break.
- Clear old cookies after changing the secret, then restart `pnpm dev`.

## 3. Sending a chat message fails or you see `Activate AI Gateway`

This app routes models through Vercel AI Gateway by default.

Fix:
- On non-Vercel deployments, set `AI_GATEWAY_API_KEY` in `.env.local`.
- If the UI asks you to activate the gateway, add a payment method in Vercel so the gateway can serve requests.
- Restart the dev server after updating env vars.

## 4. File upload returns `Upload failed` or a validation error

Uploads go through Vercel Blob and only accept small JPEG or PNG files.

Fix:
- Set `BLOB_READ_WRITE_TOKEN` in `.env.local`.
- Keep uploads at 5 MB or less.
- Use `image/jpeg` or `image/png`; other file types are rejected by the API route.

## 5. `pnpm test` fails because Playwright cannot find a browser

The test script runs Playwright directly and expects Chromium to be installed.

Fix:
- Run `pnpm exec playwright install --with-deps chromium`.
- Then rerun `pnpm test`.
- If `pnpm dev` is already running on port 3000, Playwright will reuse it; otherwise it starts its own web server.

## Notes

- `REDIS_URL` is helpful for resumable streams and production rate limiting, but the app can still run locally without it.
- If you changed any env var, restart `pnpm dev` before re-testing.
