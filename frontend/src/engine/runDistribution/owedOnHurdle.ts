import type { Hurdle } from "@/types";
import { yearFraction } from "../yearFraction";
import type { InvestorAccount } from "./investorAccount";

/**
 * Preferred return is simple interest on capital still out, from the investment
 * date. `rate` is a percent. Return of capital is whatever contribution is left.
 * Before the investment date nothing is owed yet.
 */
export function owedOnHurdle(account: InvestorAccount, hurdle: Hurdle, asOf: string): number {
  if (asOf < account.investedOn) return 0;
  const unreturned = Math.max(0, account.contributed - account.capitalReturned);
  if (hurdle.type === "roc") return unreturned;
  const gross = unreturned * (hurdle.rate / 100) * yearFraction(account.investedOn, asOf);
  return Math.max(0, gross - (account.paidByHurdle[hurdle.id] ?? 0));
}
