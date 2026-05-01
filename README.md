# Plankraft

AI woodworking plan generator. Describe a project in plain language, pin a few references, set the bones — and Plankraft drafts a complete build plan with cut list, exploded isometric view, build sequence, lumber yield, and bill of materials.

Editorial workshop aesthetic — kraft paper, walnut ink, hand-drawn dimensions. Sister site to [briankennett.com](https://briankennett.com).

Built from a Claude Design handoff. The full source design (HTML/JSX prototypes + screenshots) lives in `design-handoff/` (gitignored) and is reproduced in production code under `app/` and `components/`.

## Stack

- **Next.js 16** App Router · React 19 · TypeScript · pnpm
- **next/font** — Fraunces / Newsreader / JetBrains Mono / Instrument Sans
- **Vercel AI SDK 6** + `@ai-sdk/anthropic` (Claude Sonnet) for streamed plan generation
- **@vercel/blob** for inspiration image uploads
- **lz-string** URL-encoded plan persistence
- **window.print()** + print stylesheet for PDF export (matches on-screen pixel-for-pixel)

## Develop

```bash
pnpm install
cp .env.example .env.local   # then fill in keys
pnpm dev                      # localhost:3000 (turbopack)
pnpm next build && pnpm next start
```

> **Linux dev gotcha:** if `pnpm dev` dies with `OS file watch limit reached`, raise the inotify ceiling: `sudo sysctl -w fs.inotify.max_user_instances=1024`. Default 128 is exhausted on machines with editor + agent processes.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/brief` | Describe project (Screen 1) |
| `/inspiration` | Reference board with image uploads + tag editor (Screen 2) |
| `/measurements` | Dimensions + materials with live isometric schematic (Screen 3) |
| `/drafting` | Streaming AI generation with reasoning steps (Screen 4) |
| `/plan` | Generated plan hero — sample shown by default; `?d=…` decodes a generated plan (Screen 5) |
| `/api/plan` | `streamObject` endpoint (POST) |
| `/api/inspiration/upload` | Vercel Blob client-upload token endpoint (POST) |

## Deploy to Vercel

```bash
# from project root
vercel link              # link to a new or existing project
vercel env add ANTHROPIC_API_KEY production       # paste your key
vercel env add BLOB_READ_WRITE_TOKEN production   # auto-provisioned via `vercel blob create` UI
vercel --prod
```

Both env vars are also read from `.env.local` in development.

## Architecture notes

- **State** lives in `lib/state.tsx` (`PlankraftStateProvider` + localStorage hydration). All four input screens share the same context; the Drafting screen submits it to `/api/plan` on mount.
- **Archetypes** are a registry pattern in `lib/archetypes/registry.tsx`. The exploded-view SVG renderer is shared (`GenericExplodedView`); each archetype contributes only a sketch annotation. Currently wired: `nightstand`, `bookshelf`, `table`, `bench`, `box`. `frame` slot is reserved.
- **Plan schema** is single-source in `lib/plan/schema.ts` (Zod). Both the AI route and the React `useObject` hook consume it.
- **URL encoding** in `lib/plan/encode.ts` uses lz-string; a typical plan compresses ~5KB → ~1.5KB. `/plan?d=<encoded>` round-trips.
- **PDF export** is `window.print()` against a print stylesheet — no separate PDF document tree to maintain. The on-screen design *is* the print artifact.

## Source design

The original Claude Design handoff bundle (`Woodworking Design.zip`) ships under `design-handoff/` — gitignored. Reference it for the original HTML/JSX prototypes, screen-level CSS, and pixel-perfect screenshots that the production code recreates.
