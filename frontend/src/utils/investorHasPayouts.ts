import type { Run } from "@/types";

/** A paid investor is part of history. Their cap-table row stays fixed. */
export function investorHasPayouts(runs: Run[], investorId: string): boolean {
  return runs.some((run) =>
    run.payouts.some((payout) => payout.investorId === investorId),
  );
}
