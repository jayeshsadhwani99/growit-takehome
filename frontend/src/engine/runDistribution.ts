import type { Hurdle, Investor, Run } from "@/types";

/**
 * Pure distribution. No React. The body is intentionally unimplemented —
 * the UI stores whatever Run this returns and never recomputes it.
 */
export function runDistribution(
  investors: Investor[],
  hurdles: Hurdle[],
  previousRuns: Run[],
  date: string,
  amount: number,
): Run {
  // TODO: owed per investor per hurdle as of `date`, minus already paid in
  // previous runs (pref = simple interest on unreturned capital).
  // TODO: split cash across investors in proportion to owed.
  // TODO: pass leftover cash to the next hurdle; whatever remains after the
  // last hurdle is undistributed.
  void investors;
  void hurdles;
  void previousRuns;
  void date;
  void amount;
  throw new Error("not implemented");
}
