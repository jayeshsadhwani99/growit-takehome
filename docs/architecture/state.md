# State

One Redux store, persisted to `localStorage` under `persist:growit`.

```ts
investors: Investor[]
hurdles: Hurdle[]
runs: { items: Run[]; selectedId: string | null }
theme: "system" | "light" | "dark"
```

Types live in `frontend/src/types/`. A run is `{ id, date, amount, payouts, leftover }`.
A payout is `{ investorId, hurdleId, amount }`.

## Why it is stored this way

- Investors and hurdles are lists because order matters for hurdles and the
  cap table shows insertion order.
- `selectedId` is UI state. If it points at a missing run, the selector falls
  back to the newest run.
- Runs are appended. A new run's date must be on or after the last run's date,
  so array order is chronological order.
- redux-persist writes the whole deal through `browserStorage`. A reload
  keeps the cap table, the waterfall, history, and the theme.

## Edit locks

Enforced in thunks, and the buttons are disabled so the refusal is visible.

- Adding an investor is always allowed. A new investor is owed from their own
  investment date and catches up on the next run. That catch-up is engine
  work; the UI only has to allow the add.
- Edit and delete call `saveInvestor` / `deleteInvestor`. Both no-op when any
  run paid that investor. The row explains why.
- Hurdle add, remove, reorder, and rate edits no-op once `runs.items` is not
  empty. The waterfall screen says so.
- `runsReset` deletes every run and clears the selection. That is the only
  unlock.

The reducer itself does not know about other slices. The thunk reads both.
