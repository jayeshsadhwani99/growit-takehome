# Engine — why

The UI can record a deal. It cannot yet decide who gets paid. That decision is
a pure function so it can be tested without React or the store.

## `yearFraction(from, to)`

Actual days between the two `YYYY-MM-DD` dates, divided by 365. Parsed as UTC.
This is the only day-count helper. Preferred return uses it.

## `runDistribution`

Inputs: investors, hurdles in order, previous runs, the new date, the cash.
Output: one `Run`. The body throws `"not implemented"`.

When it is built, the steps are:

1. For this date, compute what each investor is still owed on each hurdle,
   then subtract what previous runs already paid them on that hurdle.
   Preferred return is simple interest on unreturned capital. Return of
   capital is their investment minus capital already returned.
2. Walk hurdles in order. Split this hurdle's cash in proportion to what each
   investor is still owed. An investor owed nothing gets nothing.
3. Cash left after a hurdle is the input to the next one. Cash left after the
   last hurdle is `leftover`.

Unreturned capital changes when return of capital is paid, including in an
earlier hurdle of this same run. Interest for a later preferred return uses
the capital still outstanding, and a previous run's payments have to be
subtracted or the same interest would be paid twice.

An investor is owed from their own investment date. If this run is dated
before that day, they are owed nothing yet. Someone added after earlier runs
catches up here, because step 1 looks at their date and at what they have
already been paid (nothing).

## The skipped case

Alice invested $100,000 on 2025-01-01. Bob invested $50,000 on 2025-07-01.
Waterfall: preferred return at 8%, then return of capital. Run on 2026-01-01
with $6,000.

With no prior runs, Alice's preferred return is a full year: $8,000. Bob's
is 184/365 of a year: about $2,016. $6,000 is less than the $10,016 owed, so
it splits in that proportion — Alice about $4,792, Bob about $1,208, both
within $1 — and return of capital receives nothing.
