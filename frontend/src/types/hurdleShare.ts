/** What one investor was owed on one hurdle, and what this run paid. Snapshot, not recomputed. */
export interface HurdleShare {
  investorId: string;
  hurdleId: string;
  /** Cents owed on this hurdle as of the run date. */
  owed: number;
  /** Cents this run paid toward that owed amount. */
  paid: number;
}
