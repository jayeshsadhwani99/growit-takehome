import { parseIsoDate } from "./parseIsoDate";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Actual calendar days. Leap day counts when it falls strictly inside the span. */
export function daysBetween(from: string, to: string): number {
  return Math.round((parseIsoDate(to) - parseIsoDate(from)) / DAY_MS);
}
