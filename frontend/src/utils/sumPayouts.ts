import type { Payout } from "@/types";

export function sumPayouts(payouts: Payout[], match: (payout: Payout) => boolean): number {
  return payouts.filter(match).reduce((sum, payout) => sum + payout.amount, 0);
}
