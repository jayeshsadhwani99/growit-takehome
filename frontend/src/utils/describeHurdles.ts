import type { Hurdle, HurdleView, Run } from "@/types";
import { hurdleFill } from "./hurdleFill";
import { inferHurdleViews } from "./inferHurdleViews";

/** Stored shares carry the real owed amount. Older runs still infer status from payouts. */
export function describeHurdles(run: Run, hurdles: Hurdle[]): HurdleView[] {
  if (!run.shares) return inferHurdleViews(run, hurdles);

  return hurdles.map((hurdle) => {
    const shares = run.shares?.filter((share) => share.hurdleId === hurdle.id) ?? [];
    const paid = shares.reduce((sum, share) => sum + share.paid, 0);
    const owed = shares.reduce((sum, share) => sum + share.owed, 0);
    return { hurdleId: hurdle.id, paid, owed, shares, ...hurdleFill(paid, owed) };
  });
}
