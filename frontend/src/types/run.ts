import type { Payout } from "./payout";

/**
 * A saved distribution. Payouts are stored as they were calculated and are
 * never recomputed, so later edits to the cap table cannot rewrite history.
 */
export interface Run {
  id: string;
  /** YYYY-MM-DD. */
  date: string;
  /** Dollars available for this distribution. */
  amount: number;
  payouts: Payout[];
  /** Dollars left after the last hurdle. */
  leftover: number;
}
