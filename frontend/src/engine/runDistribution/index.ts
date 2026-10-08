import type { Hurdle, Investor, Payout, Run } from "@/types";
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
  let cash = amount;

  for (const hurdle of hurdles) {
    if (cash <= 0) break;
    const split = splitHurdle(
      cash,
      accounts.map((account) => ({
        investorId: account.investorId,
        owed: owedOnHurdle(account, hurdle, date),
      })),
    );
    cash -= split.spent;
    for (const payout of split.payouts) {
      payouts.push({ investorId: payout.investorId, hurdleId: hurdle.id, amount: payout.amount });
      recordPayout(accounts, hurdle, payout.investorId, payout.amount);
    }
  }

  return { id: createId(), date, amount, payouts, leftover: cash };
}
