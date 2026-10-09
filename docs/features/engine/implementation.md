# Engine — how

```
frontend/src/engine/index.ts                         public barrel
frontend/src/engine/parseIsoDate.ts
frontend/src/engine/daysBetween.ts
frontend/src/engine/daysInYear.ts
frontend/src/engine/roundDiv.ts
frontend/src/engine/yearFraction.ts
frontend/src/engine/runDistribution/index.ts         the walk
frontend/src/engine/runDistribution/investorAccount.ts
frontend/src/engine/runDistribution/buildAccounts.ts
frontend/src/engine/runDistribution/owedOnHurdle.ts
frontend/src/engine/runDistribution/accruedPref.ts
frontend/src/engine/runDistribution/splitHurdle.ts
frontend/src/engine/runDistribution/recordPayout.ts
frontend/src/engine/runDistribution/runDistribution.test.ts
```

No React imports. The UI calls `runDistribution` from `RunForm` and stores
the `Run` it returns. The acceptance case is Alice, Bob, 8% then return of
capital, $6,000 on 2026-01-01.

`rate` on a preferred hurdle is the percent the user typed (`8`, not `0.08`).
Day count is actual/365. `daysBetween` is the calendar count, including a
leap day when the span contains one. `DAYS_IN_YEAR` is the shared
denominator. `yearFraction` divides by it. `accruedPref` multiplies cents by
the day count and divides by `BigInt(DAYS_IN_YEAR)`, then rounds half-up to
the cent.

The function should assign the run id (the form does not). It should not read
the store. Previous runs are an argument so the same inputs always produce
the same payouts. The returned run also stores `shares`, one row per investor
per hurdle, so owed amounts are part of the snapshot.
