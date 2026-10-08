# Run distribution — why

A deal distributes cash more than once. Each run has a date and an amount.
Later runs have to see what earlier runs already paid, so history is stored
and never recomputed.

## Form

- Date and amount, then "Run distribution".
- The button is disabled when the amount is not greater than 0, there are no
  investors, or there are no hurdles. The form says which of those is wrong.
- A date before the latest saved run is rejected under the date field. The
  same day is allowed. The button stays enabled so that error can appear.
- The click calls `runDistribution`. Today that throws, and the form shows
  "The distribution engine is not implemented yet." When it returns a `Run`,
  that object is stored as-is and selected.

## Results

- History lists runs, newest first. Click one to view it.
- Each hurdle shows paid versus owed, a progress bar, and a chip: Filled,
  Partly filled, or Not reached. How owed is inferred is in
  `docs/architecture/assumptions.md`.
- The investor table has one column per hurdle, a total paid column, and a
  totals row. Investors added after a run show $0 for that run.
- Leftover cash is the run's `leftover`, separate from the table.

## Reset

"Reset runs" asks for a second click, then deletes every run. That unlocks
hurdle edits and any investor who was only locked because of those payouts.
