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
state the same number. The engine must divide by 100. The acceptance test uses
`rate: 8`.

## Owed is stored on the run

A new run stores `shares`: what each investor was owed on each hurdle, and
what this run paid. The bar is paid divided by owed. A preferred return after
return of capital is still a gate. If cash ran out earlier, that gate's paid
amount is $0 and its owed amount is the interest on capital still outstanding.

Runs saved before `shares` existed have only payouts and leftover. The screen
replays the engine with the runs that came before them so those bars still
have a denominator. The stored payouts are not rewritten.

## Same-day runs are allowed

"Before the latest run" means an earlier calendar day. Two runs can share a
date. The later one in the list is the latest for the next check.

## One waterfall for the deal

Hurdles are not per investor. Several hurdles may share a type. Order is the
list order, renumbered when someone moves a card.
