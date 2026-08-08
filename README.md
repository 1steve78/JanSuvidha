# Welfare & Civic Platform — Frontend

Next.js (App Router) + TypeScript + Tailwind + Recharts scaffold.

## Structure
- `src/app/` — routes (Home, Match, Match Results, Report, Track, Dashboard, Admin)
- `src/components/` — UI grouped by page/section, plus shared primitives in `ui/`
- `src/lib/` — constants (category colors), api helpers, validators
- `src/types/` — shared TS types (Scheme, Report)
- `src/hooks/` — form-step, geolocation, count-up animation hooks

## Getting started
```
npm install
npm run dev
```

Each page/component file currently contains a comment describing its role and a
`// TODO` stub — fill these in following the design plan (bold hero, colorful
pillar cards per category, pastel gradient section breaks, stats band, FAQ
accordion, etc.).
