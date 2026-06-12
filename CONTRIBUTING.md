# Contributing

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the required auth, AI Gateway, Blob, Postgres, and Redis values.
4. Run `pnpm db:migrate`.
5. Start the app with `pnpm dev`.

The app runs on `http://localhost:3000` by default. If you use Vercel-managed
resources, `vercel env pull` can populate `.env.local` for you.

## Running tests

Install the Playwright browser once on a fresh machine:

```bash
pnpm exec playwright install --with-deps chromium
```

Run the end-to-end suite with:

```bash
pnpm test
```

The Playwright config starts `pnpm dev` automatically when needed and targets
`http://localhost:3000`.

Run the repository check step before opening a pull request:

```bash
pnpm check
```

Use `pnpm fix` to apply safe Ultracite and Biome auto-fixes.

## Code style

- Use `pnpm` for package management and scripts.
- Follow the existing Next.js App Router and TypeScript patterns in the repo.
- Keep changes focused and avoid unrelated refactors in the same pull request.
- Format code with the repository Biome configuration through `pnpm check` or
  `pnpm fix`.
- Prefer clear names over new abstractions unless they remove real duplication.
- Do not commit `.env.local`, generated secrets, or other local-only files.

## Pull request conventions

- Branch from `main` with a short, descriptive branch name.
- Keep each pull request scoped to one change or tightly related work.
- Summarize the problem, the approach, and any follow-up work.
- Link related issues, tasks, or discussion threads when they exist.
- Call out new environment variables, migrations, or operational steps in the
  pull request description.
- Add screenshots or recordings when the change affects visible UI behavior.
- Before requesting review, make sure `pnpm test` and `pnpm check` pass, or
  explain clearly why a check was skipped.
