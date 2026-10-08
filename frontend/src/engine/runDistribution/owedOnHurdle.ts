import type { Hurdle } from "@/types";
import { yearFraction } from "../yearFraction";
import { accruedPref } from "./accruedPref";
import type { InvestorAccount } from "./investorAccount";

/**
 * Preferred return accrues on the capital outstanding in each stretch, then
 * drops what this hurdle already paid. Return of capital earlier in this same
 * run cuts the base of every later hurdle for the whole holding period.
 */
export function owedOnHurdle(account: InvestorAccount, hurdle: Hurdle, asOf: string): number {
  if (asOf < account.investedOn) return 0;
  const unreturned = Math.max(0, account.contributed - account.capitalReturned);
  if (hurdle.type === "roc") return unreturned;

  const returnedEarlier = account.capitalEvents.reduce((sum, event) => sum + event.amount, 0);
  const returnedThisRun = account.capitalReturned - returnedEarlier;
  const gross =
    returnedThisRun > 0
      ? unreturned * (hurdle.rate / 100) * yearFraction(account.investedOn, asOf)
      : accruedPref(account.contributed, account.investedOn, account.capitalEvents, hurdle.rate, asOf);
  return Math.max(0, gross - (account.paidByHurdle[hurdle.id] ?? 0));
}
