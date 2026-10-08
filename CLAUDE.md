# CLAUDE.md — AI agent entry point

You are working on a GrowIt take-home: a small app for distributing cash to
investors through a waterfall. The UI is the product right now. The distribution
engine is a stub.

**Read this file first. Then read `docs/explorer.md`.**

## What this is

- One deal. A cap table of investors, one ordered waterfall, and a history of
  distribution runs.
- Tech lives in `frontend/`: Vite, React, TypeScript, Tailwind, Redux Toolkit,
  redux-persist, React Router. UI primitives follow the shadcn pattern
  (native controls, Tailwind, `components/ui`).
- Money is a plain dollar `number`. Dates are `YYYY-MM-DD` strings.
- A run stores its payouts. Nothing recomputes a past run.

## Non-negotiable rules

1. **One thing per file.** One function, component, selector, or action. Max 100
   lines. Folders have an `index.ts` barrel. Import through barrels from outside
   the folder; import siblings by file so barrels do not cycle.
2. **Comment the why.** Business rules and tradeoffs only, not a narration of
   the code.
3. **Do not invent distribution math.** `yearFraction` is implemented.
   `runDistribution` throws `"not implemented"` until someone asks to build it.
   The skipped test in `frontend/src/engine/runDistribution.test.ts` is the
   contract.
4. **Preferred-return `rate` is a percent.** `8` means 8% a year, not `0.08`.
5. **Runs are append-only.** Reset is the only way to delete them, and it is
   what unlocks hurdle edits and paid investors.
6. **Docs move with behavior.** Update `docs/features/<feature>/` in the same
   change.

## Where things are

| What | Where |
| --- | --- |
| Doc index | `docs/explorer.md` |
| Cap table, waterfall, runs | `frontend/src/features/` |
| Redux slices | `frontend/src/store/features/` |
| Domain types | `frontend/src/types/` |
| Pure helpers | `frontend/src/utils/` |
| Engine | `frontend/src/engine/` |
| Assumptions | `docs/architecture/assumptions.md` |

## Commands

```bash
cd frontend
pnpm install
pnpm dev             # http://localhost:5173
pnpm test
pnpm typecheck
```

## Design

White cards on a light grey page. One teal accent (`#0f766e`). Money is
monospace and right-aligned in tables via `Money` + `formatMoney`. Real
`label`, `button`, and `table` elements. Inputs and buttons are at least 44px
tall. Sidebar from the `md` breakpoint up; a bottom tab bar on a phone.
