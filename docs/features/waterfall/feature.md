# Waterfall — why

A distribution does not split cash by ownership in one step. It fills hurdles
in order. A hurdle is done for the whole deal before overflow continues.
There is one waterfall, shared by every investor.

## Hurdles

- **Preferred return.** Simple interest, at an annual rate the user can edit,
  on capital that has not yet been returned. New cards start at 8%.
- **Return of capital.** Pay back each investor's original contribution.
- The same type can appear more than once. A second preferred return is a
  separate hurdle with its own rate.
- Order is the card order. Up and Down swap with the neighbor. The first card
  cannot move up, and the last cannot move down.
- Between cards, a short arrow says overflow goes to the next hurdle.
- The list always ends in a dashed "Undistributed cash" box. Money still left
  after the last hurdle is not forced into a split.

## Lock

Once any run exists, the waterfall is frozen: add, delete, reorder, and the
rate field. A saved run's payouts point at these hurdle ids. Changing the
list would make that history unreadable. Reset runs unlocks it.
