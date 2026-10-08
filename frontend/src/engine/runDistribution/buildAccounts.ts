import type { Hurdle, Investor, Run } from "@/types";
import type { InvestorAccount } from "./investorAccount";

/** Past return-of-capital payouts are already out, so later hurdles see a smaller base. */
export function buildAccounts(investors: Investor[], hurdles: Hurdle[], previousRuns: Run[]): InvestorAccount[] {
  const rocIds = new Set(hurdles.filter((hurdle) => hurdle.type === "roc").map((hurdle) => hurdle.id));

  return investors.map((investor) => {
    const account: InvestorAccount = {
      investorId: investor.id,
      contributed: investor.amount,
      investedOn: investor.date,
      capitalReturned: 0,
      paidByHurdle: {},
    };
    for (const run of previousRuns) {
      for (const payout of run.payouts) {
        if (payout.investorId !== investor.id) continue;
        account.paidByHurdle[payout.hurdleId] = (account.paidByHurdle[payout.hurdleId] ?? 0) + payout.amount;
        if (rocIds.has(payout.hurdleId)) account.capitalReturned += payout.amount;
      }
    }
    return account;
  });
}
