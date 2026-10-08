# Investors — how

Screen: `frontend/src/features/investors/`. Route: `/`.

| Piece | File |
| --- | --- |
| Page | `InvestorsPage.tsx` |
| Add form | `InvestorForm.tsx` |
| Table, row, edit row | `InvestorTable.tsx`, `InvestorRow.tsx`, `InvestorEditRow.tsx` |
| Validation | `src/utils/validateInvestorForm.ts` |
| Share | `src/utils/formatShare.ts` |
| Slice | `src/store/features/investors/state/investorsSlice.ts` |
| Locks | `actions/saveInvestor.ts`, `actions/deleteInvestor.ts` |

`selectInvestorLocked` is true when any payout in any run uses that id.
The thunks read runs and refuse. The row reads the same selector to disable
Edit and Delete.

Ids come from `crypto.randomUUID()` in the form, not in the reducer, so the
reducer stays a plain list update.
