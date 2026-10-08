# Engine — how

```
frontend/src/engine/yearFraction.ts
frontend/src/engine/yearFraction.test.ts
frontend/src/engine/runDistribution.ts
frontend/src/engine/runDistribution.test.ts
```

No React imports. The UI calls `runDistribution` from `RunForm` and renders
the `Run` it returns. The skipped test is the acceptance case: Alice, Bob,
8% then return of capital, $6,000 on 2026-01-01.

`rate` on a preferred hurdle is the percent the user typed (`8`, not `0.08`).
Day count is actual/365 via `yearFraction`. Do not duplicate that division
inside `runDistribution`.

The function should assign the run id (the form does not). It should not read
the store. Previous runs are an argument so the same inputs always produce
the same run.
