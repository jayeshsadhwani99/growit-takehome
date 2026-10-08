import type { Hurdle } from "@/types";
import type { InvestorAccount } from "./investorAccount";

/** A return of capital paid now shrinks the base for every later hurdle in this run. */
export function recordPayout(accounts: InvestorAccount[], hurdle: Hurdle, investorId: string, amount: number): void {
  const account = accounts.find((item) => item.investorId === investorId);
  if (!account) return;
  account.paidByHurdle[hurdle.id] = (account.paidByHurdle[hurdle.id] ?? 0) + amount;
  if (hurdle.type === "roc") account.capitalReturned += amount;
}
