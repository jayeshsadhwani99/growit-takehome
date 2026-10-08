# Waterfall — how

Screen: `frontend/src/features/waterfall/`. Route: `/waterfall`.

| Piece | File |
| --- | --- |
| Page | `WaterfallPage.tsx` |
| Add form | `AddHurdleForm.tsx` |
| Card, rate, list | `HurdleCard.tsx`, `PrefRateField.tsx`, `HurdleList.tsx` |
| Drag | `HurdleSortable.tsx`, `restrictHurdleDrag.ts`, `verticalKeyboardCoordinates.ts` |
| Arrow and end box | `OverflowArrow.tsx`, `UndistributedBox.tsx` |
| Copy | `src/utils/hurdleTitle.ts`, `hurdleDescription.ts` |
| Slice | `src/store/features/hurdles/state/hurdlesSlice.ts` |
| Lock | `selectHurdlesLocked.ts` and the thunks in `state/actions/` |

The rate field keeps a draft string and writes on blur. An empty or negative
draft is thrown away so the stored rate never becomes `NaN`.

`DEFAULT_PREF_RATE` is `8`, in percent, not `0.08`.
