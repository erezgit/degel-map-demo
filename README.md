# Degel Map — Click-Through Demo

A 6-screen Hebrew RTL prototype for **El HaDegel** (אל הדגל), an Israeli political movement. Demonstrates the "Degel Map" supporter commitment aggregator — every supporter who joins drops a flag on the map.

**Live:** [degel-map-demo.pages.dev](https://degel-map-demo.pages.dev)

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (with `@theme` brand tokens)
- shadcn/ui-style components (hand-rolled following the shadcn pattern)
- React Router (HashRouter — SPA-safe on Cloudflare Pages)
- Heebo (Google Fonts) for Hebrew typography
- Lucide icons
- Hand-rolled SVG logo + stylized Israel map

## The 6 screens

1. `/` — Hero homepage with single CTA "כניסה"
2. `/login` — Google login screen
3. `/welcome` — Welcome video frame (step 1/4)
4. `/signup` — Sign-up questionnaire (step 2/4)
5. `/share` — Unique invite link + share CTA (step 3/4)
6. `/status` — Counter + supporter map (step 4/4)

No backend, no real data — buttons just navigate forward. Last screen loops back to `/`.

## Develop

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name degel-map-demo
```

## Brand

- Navy: `#1B2D52`
- Light navy: `#3B82C8`
- Background: `#FFFFFF`
- Light grey: `#F4F5F7`
- Font: Heebo (400/500/600/700/800)
