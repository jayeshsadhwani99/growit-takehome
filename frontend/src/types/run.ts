import type { HurdleShare } from "./hurdleShare";
import type { Payout } from "./payout";

/**
 * A saved distribution. Payouts are stored as they were calculated and are
 * never recomputed, so later edits to the cap table cannot rewrite history.
 */
export interface Run {
  id: string;
  /** YYYY-MM-DD. */
  date: string;
  /** Cents available for this distribution. */
  amount: number;
  payouts: Payout[];
  /**
   * Owed and paid per investor per hurdle. Missing on runs saved before this
   * was stored; those still infer status from payouts alone.
   */
  shares?: HurdleShare[];
  /** Cents left after the last hurdle. */
  leftover: number;
}
