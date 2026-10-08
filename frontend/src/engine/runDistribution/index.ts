import type { Hurdle, HurdleShare, Investor, Payout, Run } from "@/types";
import { createId } from "@/utils";
import { buildAccounts } from "./buildAccounts";
import { owedOnHurdle } from "./owedOnHurdle";
import { recordPayout } from "./recordPayout";
import { splitHurdle } from "./splitHurdle";

/**
 * One pass over the waterfall. Cash that a hurdle does not use is the next
 * hurdle's input. Whatever remains after the last hurdle is leftover.
 * Previous runs are an argument so this does not read the store.
 */
export function runDistribution(
  investors: Investor[],
  hurdles: Hurdle[],
  previousRuns: Run[],
  date: string,
  amount: number,
): Run {
  const accounts = buildAccounts(investors, hurdles, previousRuns);
  const payouts: Payout[] = [];
  const shares: HurdleShare[] = [];
  let cash = amount;

  for (const hurdle of hurdles) {
    const owed = accounts.map((account) => ({
      investorId: account.investorId,
      owed: owedOnHurdle(account, hurdle, date),
    }));
    const split = splitHurdle(cash, owed);
    cash -= split.spent;
    for (const share of owed) {
      const paid = split.payouts.find((payout) => payout.investorId === share.investorId)?.amount ?? 0;
      if (paid > 0) {
        payouts.push({ investorId: share.investorId, hurdleId: hurdle.id, amount: paid });
        recordPayout(accounts, hurdle, share.investorId, paid);
      }
      shares.push({ investorId: share.investorId, hurdleId: hurdle.id, owed: share.owed, paid });
    }
  }

  return { id: createId(), date, amount, payouts, shares, leftover: cash };
}
