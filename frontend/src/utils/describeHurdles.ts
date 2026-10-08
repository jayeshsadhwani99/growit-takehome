import type { Hurdle, HurdleView, Run } from "@/types";
import { sumPayouts } from "./sumPayouts";

/**
 * Status is inferred from stored payouts only. Owed is not on the Run, and
 * runs are never recomputed, so the hurdle where cash ran out is "partial"
 * even if it was filled to the exact dollar.
 */
export function describeHurdles(run: Run, hurdles: Hurdle[]): HurdleView[] {
  const paid = hurdles.map((hurdle) =>
    sumPayouts(run.payouts, (payout) => payout.hurdleId === hurdle.id),
  );
  const lastPaid = paid.findLastIndex((amount) => amount > 0);

  return hurdles.map((hurdle, index) => {
    const amount = paid[index] ?? 0;
    const cleared = run.leftover > 0 || (lastPaid >= 0 && index < lastPaid);
    if (cleared) {
      return { hurdleId: hurdle.id, paid: amount, owed: amount, status: "filled", progress: 100 };
    }
    if (index === lastPaid) {
      return { hurdleId: hurdle.id, paid: amount, owed: null, status: "partial", progress: null };
    }
    return { hurdleId: hurdle.id, paid: amount, owed: null, status: "not-reached", progress: 0 };
  });
}
