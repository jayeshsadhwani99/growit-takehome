import { daysBetween } from "./daysBetween";

/** Actual/365. This denominator is the only day-count knob. */
const DAYS_IN_YEAR = 365;

export function yearFraction(from: string, to: string): number {
  return daysBetween(from, to) / DAYS_IN_YEAR;
}
