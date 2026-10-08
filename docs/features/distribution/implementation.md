# Run distribution — how

Screen: `frontend/src/features/distribution/`. Route: `/distribution`.

| Piece | File |
| --- | --- |
| Page | `DistributionPage.tsx` |
| Form | `RunForm.tsx`, opened by `AddRunDialog.tsx` |
| History | `RunHistory.tsx` |
| Results | `RunResults.tsx`, `HurdleResultCard.tsx`, `InvestorPayoutTable.tsx` |
| Status | `src/utils/describeHurdles.ts`, `hurdleStatusLabel.ts` |
| Gates | `src/utils/runDateError.ts`, `runSubmitBlock.ts` |
| Engine error copy | `src/utils/runErrorMessage.ts` |
| Slice | `src/store/features/runs/state/runsSlice.ts` |

`RunForm` passes the current investors, hurdles, and previous runs into
`runDistribution`. It does not build payouts itself. `runAdded` appends the
returned run and selects it.

`describeHurdles` is display-only. It must not be reused as the engine.

Column headers come from `hurdleColumnLabel` (`1. Pref 8%`, `2. ROC`) so the
table stays narrow.
