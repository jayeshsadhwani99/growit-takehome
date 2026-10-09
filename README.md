# GrowIt distributions

A small investor-distribution app: a cap table, one waterfall, and a history of
distribution runs. Built for the GrowIt take-home. The screens and the
distribution engine are both in place.

`CLAUDE.md` is the entry point for an AI agent. `docs/explorer.md` is the map
of the rest of the docs.

## Run it

```bash
cd frontend
pnpm install
pnpm dev
```

Open http://localhost:5173.

```bash
pnpm test
pnpm typecheck
```

## Assumptions and tradeoffs

- Money is stored as integer cents. Interest is rounded half-up once per owed amount.
- Preferred return is simple interest on each investor's unreturned capital,
  actual days / 365, starting on that investor's own investment date.
- Cash walks the hurdles in order. Whatever is left after the last hurdle is
  shown as undistributed.
- Runs must be dated on or after the latest run (same day is fine). Runs are
  stored with their payouts and never recomputed.
- Hurdles lock once a run exists. An investor who has received a payout can't
  be edited or deleted. "Reset runs" unlocks both.
- Frontend only. State is persisted to localStorage.

## Layout

```
frontend/     Vite + React + TypeScript app
docs/         Why the product behaves the way it does
CLAUDE.md     Rules for working in this repo
```
