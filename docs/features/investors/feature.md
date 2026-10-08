# Investors — why

The cap table is the input to every distribution. Each row needs a name, the
dollars they put in, and the day those dollars start counting.

## Rules

- Name is required. Amount must be greater than 0. Date is required.
- Share of total is this investment divided by capital raised. An empty table
  is 0%.
- The footer is the sum of investments, labeled "Total raised".
- Adding is always allowed, including after runs exist. Someone who invests
  later is owed from their own date, not from the start of the deal. The next
  run is where they catch up. The engine does that math; this screen only
  records the row.
- Edit and delete are refused once any run paid this investor. The buttons
  disable and the row says why. A newer investor with no payouts stays editable.
- Delete asks first. Cancel leaves the row. Confirm removes it.
- The add form lives in a dialog. An empty table shows "No investors" and the
  button that opens it. Once someone is on the table, that button moves to the
  page header.
- A successful add closes the dialog. Validation errors leave it open. Close
  dismisses it without adding anyone.
