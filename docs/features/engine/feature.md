# Engine — why

Who gets paid is a pure function so it can be tested without React or the store.

## `yearFraction(from, to)`

Actual days between the two `YYYY-MM-DD` dates, divided by 365. `daysBetween`
parses them as UTC and rejects a calendar day that does not exist, so
2025-02-29 cannot roll forward to 1 March. Preferred return uses that day
count. A leap day inside the span is one extra day in the numerator. The
denominator stays 365.

## `runDistribution`

Inputs: investors, hurdles in order, previous runs, the new date, the cash.
Output: one `Run`, with an id assigned here. The steps are:

1. For this date, compute what each investor is still owed on each hurdle,
   then subtract what previous runs already paid them on that hurdle.
   Preferred return accrues on the capital that was outstanding during each
   stretch between returns of capital. A later year still earns the rate on
   whatever is still out. Return of capital is their investment minus capital
   already returned.
2. Walk hurdles in order. Split this hurdle's cash in proportion to what each
   investor is still owed. An investor owed nothing gets nothing.
3. Cash left after a hurdle is the input to the next one. Cash left after the
   last hurdle is `leftover`. Each investor's owed and paid amount is stored on
   the run as `shares`, including hurdles the cash never reached.

Capital returned earlier in this same run was outstanding until today, so a
later preferred hurdle still owes the interest earned up to this distribution
date. Across runs, a return of capital is a dated event: interest already
earned on the larger balance is kept, and later time accrues on what is left.
Payments on a hurdle are subtracted so that stretch is not paid twice.

An investor is owed from their own investment date. If this run is dated
before that day, they are owed nothing yet. Someone added after earlier runs
catches up here, because step 1 looks at their date and at what they have
already been paid (nothing).

## The acceptance case

Alice invested $100,000 on 2025-01-01. Bob invested $50,000 on 2025-07-01.
Waterfall: preferred return at 8%, then return of capital. Run on 2026-01-01
with $6,000.

With no prior runs, Alice's preferred return is a full year: $8,000.00. Bob's
is 184/365 of a year: $2,016.44. $6,000 is less than the $10,016.44 owed, so
it splits in that proportion — Alice $4,792.12, Bob $1,207.88 — and return of
capital receives nothing.
