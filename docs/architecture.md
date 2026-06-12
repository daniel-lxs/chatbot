# Architecture

## Overview

This app is a Next.js 16 App Router chatbot template with three main layers:

1. Route groups in `app/` for page composition and HTTP endpoints.
2. Client components and hooks in `components/` and `hooks/` for chat UX.
3. Shared server logic in `lib/` for models, persistence, prompts, and tools.

## High-level structure

- `app/layout.tsx` wires global providers: theme, tooltips, and `SessionProvider`.
- `app/(chat)/layout.tsx` builds the main authenticated shell with sidebar, toaster,
  `DataStreamProvider`, `ActiveChatProvider`, and `ChatShell`.
- `app/(auth)/*` contains login/register pages and auth-specific layout.
- `app/(chat)/api/*` holds route handlers for chat, messages, history, votes,
  models, documents, suggestions, and file uploads.
- `components/chat/*` contains the chat workspace: header, messages, composer,
  artifact panel, sidebar, and supporting UI.
- `hooks/use-active-chat.tsx` is the main client state coordinator for the active
  conversation and AI SDK transport.
- `lib/ai/*` defines model catalogs, provider selection, prompts, and tool
  implementations exposed to the model.
- `lib/db/*` contains the Drizzle schema, migrations, and query helpers for
  users, chats, messages, votes, documents, suggestions, and resumable streams.

## Main components

- `ChatShell` is the primary page shell. It renders the chat header, transcript,
  composer, artifact pane, and the streaming side effects handler.
- `ActiveChatProvider` wraps `useChat` from the AI SDK and owns message state,
  current model selection, visibility, retry/stop actions, and vote fetching.
- `DataStreamProvider` and `DataStreamHandler` carry transient stream events from
  the server to the client so the artifact pane can react while a response is
  still streaming.
- `AppSidebar` and related sidebar components show chat history and session-aware
  navigation.
- Auth is handled by `app/(auth)/auth.ts` with NextAuth credential providers for
  regular users and guest users.

## Request and data flow

1. The user types in `MultimodalInput`, which sends a message through
   `ActiveChatProvider`.
2. `useChat` posts to `app/(chat)/api/chat/route.ts` using `DefaultChatTransport`.
3. The route validates the request, checks BotID/auth, enforces rate limits,
   loads or creates the chat row, and pulls prior messages from Postgres.
4. The route resolves the selected model from `lib/ai/models.ts`, builds the
   system prompt, and starts `streamText(...)`.
5. Tool-capable models can call server tools such as weather lookup or document
   create/edit/update flows from `lib/ai/tools/*`.
6. The API streams UI message parts back to the browser and optionally registers
   a resumable stream when Redis is configured.
7. `DataStreamHandler` consumes transient stream parts like artifact IDs, titles,
   and completion events to keep the artifact panel synchronized.
8. When streaming finishes, the API persists assistant messages and any chat title
   update through `lib/db/queries.ts`.

## Persistence model

- `User` stores registered and guest identities.
- `Chat` stores per-conversation metadata and visibility.
- `Message_v2` stores the normalized message history and attachments payloads.
- `Vote_v2` stores message feedback.
- `Document` and `Suggestion` back the artifact editing workflows.
- `Stream` stores resumable stream identifiers for reconnect support.

## Notes for contributors

- Most user-visible behavior starts in `components/chat/*`, but the contract for
  what can be streamed or persisted is defined in `app/(chat)/api/chat/route.ts`
  and `lib/db/*`.
- If you add a new model capability or tool, update both the server registration
  in `app/(chat)/api/chat/route.ts` and the supporting implementation in `lib/ai/*`.
