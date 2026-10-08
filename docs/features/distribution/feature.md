# Run distribution — why

A deal distributes cash more than once. Each run has a date and an amount.
Later runs have to see what earlier runs already paid, so history is stored
and never recomputed.

## Form

- The form lives in a dialog. An empty page shows "No runs" and the button
  that opens it. Once a run exists, that button moves to the page header,
  next to Reset runs.
- Date and amount, then "Run distribution". A saved run closes the dialog so
  the payouts are visible. An error leaves the dialog open.
- The button is disabled when the amount is not greater than 0, there are no
  investors, or there are no hurdles. The form says which of those is wrong.
- The date starts on the latest saved run, or today when there are no runs.
  Earlier days are grayed out and cannot be picked. The same day is allowed.
  A date before the latest run is still rejected under the field.
- The click calls `runDistribution`. The returned `Run` is stored as-is and
  selected. A thrown error stays in the dialog.

## Results

- History lists runs, newest first. Click one to view it. The date stays on one line. A very long amount ellipsizes.
- Each hurdle is an accordion, closed until opened. The header shows paid versus owed, a progress
  bar, and a chip: Filled, Partly filled, or Not reached. Opening it lists
  each investor on that hurdle, with their own paid-versus-owed bar.
- Owed is the share saved on the run. Runs saved before that replay the same
  inputs so the bars still have a denominator. See
  `docs/architecture/assumptions.md`.
- The investor table has one column per hurdle, a total paid column, and a
  totals row. Investors added after a run show $0 for that run.
- Leftover cash is the run's `leftover`, separate from the table.

## Reset

"Reset runs" asks for a second click, then deletes every run. That unlocks
hurdle edits and any investor who was only locked because of those payouts.
