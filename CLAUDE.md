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
3. **Do not invent distribution math.** Preferred return is simple interest
   on unreturned capital. Return of capital is contribution still out. Cash
   walks the hurdles in order. The test in
   `frontend/src/engine/runDistribution/runDistribution.test.ts` is the contract.
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

Every screen is a `Page`. It fills the main column. Do not add a max-width or
center the page. The only inset is `px-3 py-3` (`md:px-4`). Stack sections
with `gap-3`. Cards are `rounded-lg p-3`.

Type scale. Do not introduce other sizes:

- Page title: `text-lg font-semibold`
- Section title: `text-sm font-medium`
- Body, inputs, table cells: `text-sm`
- Labels, hints, table headers: `text-xs`
- Money: `text-sm font-mono tabular-nums`, right-aligned in tables

Controls share `controlClass` (`h-9`, `text-sm`, `rounded-md`). A label sits
above its control. In a row, align the control bottoms, not the labels.

- Amounts: `Input type="number"`. Spinners are hidden in `index.css`.
- Dates: `DateField`. The calendar has month and year menus. It stores
  `YYYY-MM-DD`. Do not use `<input type="date">`.
- Choices: `Dropdown`. The menu is the trigger's width. Do not use `<select>`.
- Phone tab targets stay 44px. Form controls stay `h-9`.

Cards use `bg-surface`, the page uses `bg-background`, hovers use `bg-wash`.
One teal accent. The `dark` class on `html` flips those tokens. Real `label`,
`button`, and `table` elements. Sidebar from `md` up, with the theme control
at the bottom. On a phone the theme control is on the top bar and tabs stay
at the bottom.
