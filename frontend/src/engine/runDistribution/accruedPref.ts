import { daysBetween } from "../daysBetween";
import { DAYS_IN_YEAR } from "../daysInYear";
import { roundDiv } from "../roundDiv";

export interface CapitalReturn {
  date: string;
  amount: number;
}

const RATE_SCALE = 100n;
const CENT_SCALE = 100n;

/**
 * Simple interest, in cents, on the capital that was actually out during each stretch.
 * A later return does not rewrite the interest already earned on a larger balance.
 */
export function accruedPref(
  contributed: number,
  investedOn: string,
  returns: CapitalReturn[],
  rate: number,
  asOf: string,
): number {
  if (asOf < investedOn) return 0;
  const rateUnits = BigInt(Math.round(rate * 100));
  const events = returns
    .filter((item) => item.date >= investedOn && item.date < asOf)
    .sort((a, b) => a.date.localeCompare(b.date));
  let balance = Math.max(0, contributed);
  let cursor = investedOn;
  let numerator = 0n;
  for (const event of events) {
    if (event.date > cursor && balance > 0) {
      numerator += BigInt(balance) * rateUnits * BigInt(daysBetween(cursor, event.date));
      cursor = event.date;
    }
    balance = Math.max(0, balance - event.amount);
  }
  if (asOf > cursor && balance > 0) {
    numerator += BigInt(balance) * rateUnits * BigInt(daysBetween(cursor, asOf));
  }
  return roundDiv(numerator, RATE_SCALE * CENT_SCALE * BigInt(DAYS_IN_YEAR));
}
