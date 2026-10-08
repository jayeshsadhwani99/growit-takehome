import { runDistribution } from "@/engine";
import type { Hurdle, HurdleShare, Investor, Run } from "@/types";

/** Older runs have no shares. Replay the same inputs so the screen can still show owed. */
export function sharesForRun(run: Run, investors: Investor[], hurdles: Hurdle[], previousRuns: Run[]): HurdleShare[] {
  if (run.shares) return run.shares;
  return runDistribution(investors, hurdles, previousRuns, run.date, run.amount).shares ?? [];
}
