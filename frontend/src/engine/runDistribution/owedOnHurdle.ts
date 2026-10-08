import type { Hurdle } from "@/types";
import { accruedPref } from "./accruedPref";
import type { InvestorAccount } from "./investorAccount";

/**
 * Preferred return is the interest earned up to this distribution date.
 * Capital returned earlier in this same run was outstanding until today, so
 * it does not erase that interest. Return of capital is contribution still out.
 */
export function owedOnHurdle(account: InvestorAccount, hurdle: Hurdle, asOf: string): number {
  if (asOf < account.investedOn) return 0;
  if (hurdle.type === "roc") return Math.max(0, account.contributed - account.capitalReturned);
  const gross = accruedPref(account.contributed, account.investedOn, account.capitalEvents, hurdle.rate, asOf);
  return Math.max(0, gross - (account.paidByHurdle[hurdle.id] ?? 0));
}
