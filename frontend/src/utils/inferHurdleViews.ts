import type { Hurdle, HurdleView, Run } from "@/types";
import { sumPayouts } from "./sumPayouts";

/** Runs saved before shares existed. The hurdle where cash stopped has no owed amount. */
export function inferHurdleViews(run: Run, hurdles: Hurdle[]): HurdleView[] {
  const paid = hurdles.map((hurdle) => sumPayouts(run.payouts, (payout) => payout.hurdleId === hurdle.id));
  const lastPaid = paid.findLastIndex((amount) => amount > 0);

  return hurdles.map((hurdle, index) => {
    const amount = paid[index] ?? 0;
    const cleared = run.leftover > 0 || (lastPaid >= 0 && index < lastPaid);
    if (cleared) {
      return { hurdleId: hurdle.id, paid: amount, owed: amount, status: "filled", progress: amount > 0 ? 100 : 0, shares: [] };
    }
    if (index === lastPaid) {
      return { hurdleId: hurdle.id, paid: amount, owed: null, status: "partial", progress: null, shares: [] };
    }
    return { hurdleId: hurdle.id, paid: amount, owed: null, status: "not-reached", progress: 0, shares: [] };
  });
}
