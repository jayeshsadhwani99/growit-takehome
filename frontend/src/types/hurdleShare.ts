/** What one investor was owed on one hurdle, and what this run paid. Snapshot, not recomputed. */
export interface HurdleShare {
  investorId: string;
  hurdleId: string;
  owed: number;
  paid: number;
}
