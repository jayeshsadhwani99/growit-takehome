const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Actual/365. This denominator is the only day-count knob.
 * Dates are parsed as UTC so a local timezone cannot shift the calendar day.
 */
const DAYS_IN_YEAR = 365;

export function yearFraction(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00.000Z`);
  const end = Date.parse(`${to}T00:00:00.000Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error("Dates must be YYYY-MM-DD.");
  }
  const days = Math.round((end - start) / DAY_MS);
  return days / DAYS_IN_YEAR;
}
