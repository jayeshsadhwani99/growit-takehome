# Assumptions

## Money is a decimal dollar amount

The assessment types use `number`, and the sample distribution is $6,000, so
amounts are dollars rather than integer cents. `Intl.NumberFormat` rounds the
display to cents. Float dust is acceptable because the sample only requires
accuracy within $1. Integer cents would be the production choice.

## Dates are calendar days

`YYYY-MM-DD` everywhere. `yearFraction` parses them as UTC midnight so a
browser in another timezone cannot move the day. The day count is actual/365.
The `365` denominator in `yearFraction.ts` is the only place to change that.

## Preferred return rate is a percent

The field is "Annual rate (%)". Storing `8` for 8% keeps the input and the
state the same number. The engine must divide by 100. The skipped test uses
`rate: 8`.

## Owed is not on a saved run

The run type has payouts and leftover, not the amount that was owed. The
results screen infers status from those:

- Leftover cash means every hurdle was filled (including a hurdle that was
  owed nothing).
- If leftover is zero, hurdles before the last one that received cash are
  filled, that last one is partly filled, and the rest were not reached.

A hurdle filled to the exact dollar with nothing left over looks "partly
filled". The bar stays indeterminate there instead of inventing a percent.
Snapshotting owed onto the run would remove that ambiguity. It would also
widen the type the engine returns, so it is not done yet.

## Same-day runs are allowed

"Before the latest run" means an earlier calendar day. Two runs can share a
date. The later one in the list is the latest for the next check.

## One waterfall for the deal

Hurdles are not per investor. Several hurdles may share a type. Order is the
list order, renumbered when someone moves a card.
