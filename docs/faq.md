# FAQ

This FAQ covers the most likely questions about the current `chatbot` app in this repository.
It is written for someone trying the app, deploying it, or adapting the template.

## 1. What is this app?
It is a Next.js chatbot template built on the AI SDK.
Out of the box it includes authentication, saved chat history, model switching, and editable artifacts for generated content.
It is meant to be a working starting point rather than a minimal demo.

## 2. Do I need to create an account to try it?
No. The app supports guest sessions as well as regular email-and-password accounts.
Guest users are shown as `Guest` in the sidebar and can use the chat without creating a full account first.
Regular accounts are still available when you want persistent user identity beyond a guest session.

## 3. Which AI models are available right now?
The default chat model is `moonshotai/kimi-k2-0905`.
The curated model list currently includes DeepSeek V3.2, Codestral, Mistral Small, Kimi K2 0905, Kimi K2.5, GPT OSS 20B, GPT OSS 120B, and Grok 4.1 Fast.
The UI also fetches capability metadata so the selector can show which models support tools, vision, or reasoning.

## 4. What can the app do besides plain chat replies?
The app can create and update artifacts for text, code, and sheet-style documents.
It also supports tool-driven responses such as weather lookups, plus model capability badges for tool use, vision, and reasoning when available.
That makes the app useful for workflows where the answer should stay editable instead of living only in the chat transcript.

## 5. Can I upload files or images?
Yes, but uploads require an authenticated session, including guest mode.
The current upload route accepts `image/jpeg` and `image/png` only, with a maximum file size of 5 MB per file.
If you need PDFs or larger files, that would require a code change rather than a configuration toggle.

## 6. Are my chats private?
Chats default to `private`.
You can switch a chat to `public`, which makes it accessible to anyone who has the link.
The visibility control lives in the chat header, so privacy is a per-chat setting instead of a global account setting.

## 7. Where is chat data stored?
User, chat, message, document, suggestion, and stream records are stored in Postgres.
Uploaded files are stored in Vercel Blob, and Redis is used for production IP-based rate limiting.
That split keeps structured app data in the database while binary uploads live in blob storage.

## 8. What do I need to run it locally?
At minimum, set `AUTH_SECRET`, `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`, and `REDIS_URL`.
For non-Vercel deployments you also need `AI_GATEWAY_API_KEY`; on Vercel, AI Gateway auth is handled automatically.
Then run `pnpm install`, `pnpm db:migrate`, and `pnpm dev`.
If you are using Vercel locally, the existing README flow with `vercel env pull` is still the expected setup path.
