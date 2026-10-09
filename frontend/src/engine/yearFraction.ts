import { daysBetween } from "./daysBetween";
import { DAYS_IN_YEAR } from "./daysInYear";

export function yearFraction(from: string, to: string): number {
  return daysBetween(from, to) / DAYS_IN_YEAR;
}
