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

## Layout

```
frontend/     Vite + React + TypeScript app
docs/         Why the product behaves the way it does
CLAUDE.md     Rules for working in this repo
```
