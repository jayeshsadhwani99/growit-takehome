import { yearFraction } from "../yearFraction";

export interface CapitalReturn {
  date: string;
  amount: number;
}

/**
 * Simple interest on the capital that was actually out during each stretch.
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
  const events = returns
    .filter((item) => item.date >= investedOn && item.date < asOf)
    .sort((a, b) => a.date.localeCompare(b.date));
  let balance = Math.max(0, contributed);
  let cursor = investedOn;
  let interest = 0;
  for (const event of events) {
    if (event.date > cursor && balance > 0) {
      interest += balance * (rate / 100) * yearFraction(cursor, event.date);
      cursor = event.date;
    }
    balance = Math.max(0, balance - event.amount);
  }
  if (asOf > cursor && balance > 0) interest += balance * (rate / 100) * yearFraction(cursor, asOf);
  return interest;
}
