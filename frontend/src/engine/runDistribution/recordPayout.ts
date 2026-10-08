import type { Hurdle } from "@/types";
import type { InvestorAccount } from "./investorAccount";

/** Later return-of-capital hurdles see a smaller balance. Preferred return keeps interest already earned up to today. */
export function recordPayout(accounts: InvestorAccount[], hurdle: Hurdle, investorId: string, amount: number): void {
  const account = accounts.find((item) => item.investorId === investorId);
  if (!account) return;
  account.paidByHurdle[hurdle.id] = (account.paidByHurdle[hurdle.id] ?? 0) + amount;
  if (hurdle.type === "roc") account.capitalReturned += amount;
}
