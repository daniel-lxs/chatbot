# Testing

This project currently runs end-to-end tests with Playwright.

## Prerequisites

- Install dependencies with `pnpm install`.
- Create `.env.local` from the values in `.env.example`.
- Run `pnpm db:migrate` if your change depends on the latest schema.
- Install Playwright's Chromium browser once with `pnpm exec playwright install --with-deps chromium`.

## Running the suite

Use the project test script:

```bash
pnpm test
```

That script sets `PLAYWRIGHT=True` and runs `pnpm exec playwright test`.

The Playwright config:

- loads environment variables from `.env.local`
- uses `http://localhost:3000` as the base URL
- starts `pnpm dev` automatically when no reusable server is already running
- waits for `/ping` before the suite begins
- writes an HTML report for failures and local inspection

## Running a smaller target

Run a single file:

```bash
pnpm exec playwright test tests/e2e/chat.test.ts
```

Filter by test name:

```bash
pnpm exec playwright test --grep "Authentication Pages"
```

## Where tests live

- `tests/e2e/*.test.ts` contains the Playwright specs that `pnpm test` runs.
- `tests/pages/` holds page objects such as `ChatPage`.
- `tests/fixtures.ts` defines shared Playwright fixtures.
- `tests/helpers.ts` holds reusable helpers for generated users and messages.

## Writing tests

- Add new browser coverage under `tests/e2e/` with the `*.test.ts` suffix.
- Prefer stable selectors such as `getByTestId`, `getByRole`, and `getByLabel`.
- Reuse fixtures and page objects before adding one-off setup in each spec.
- Stub network behavior with `page.route(...)` when you need deterministic error or edge-case coverage.
- Keep assertions focused on visible behavior, navigation, and persisted user flows.

## Current scope

`pnpm test` is currently wired to the Playwright e2e suite only. If you add another test type later, update this document and the npm scripts so contributors have one clear entry point.
