# Plankraft

AI woodworking plan generator. Describe a project in plain language, pin a few references, set the bones — and Plankraft drafts a complete build plan with cut list, exploded isometric view, build sequence, lumber yield, and bill of materials.

Editorial workshop aesthetic — kraft paper, walnut ink, hand-drawn dimensions.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- `next/font/google` — Fraunces, Newsreader, JetBrains Mono, Instrument Sans
- Vercel AI SDK + Anthropic (Claude Sonnet) — Phase 4
- Vercel Blob — Phase 5 (inspiration uploads)
- `@react-pdf/renderer` — Phase 7 (export)

## Develop

```bash
pnpm install
pnpm dev          # localhost:3000 (turbopack)
pnpm next build   # production build
pnpm next start   # serve build at localhost:3000
```

> **Linux dev-mode note:** if `pnpm dev` dies with `OS file watch limit reached`, raise the inotify ceiling once: `sudo sysctl -w fs.inotify.max_user_instances=1024`. Default 128 is exhausted by editor + agent processes.

## Routes

| Route | Screen | Status |
|-------|--------|--------|
| `/` | Landing | ✓ |
| `/brief` | Describe project (Screen 1) | ✓ |
| `/inspiration` | Reference board (Screen 2) | ✓ |
| `/measurements` | Dimensions + materials (Screen 3) | ✓ |
| `/drafting` | AI generation state (Screen 4) | stub |
| `/plan` | Generated plan hero (Screen 5) | stub |

## Source design

Built from a Claude Design handoff (`Woodworking Design.zip`) — see `design-handoff/` (gitignored) for the reference HTML/JSX prototypes and pixel-level screenshots that the production code recreates faithfully.
