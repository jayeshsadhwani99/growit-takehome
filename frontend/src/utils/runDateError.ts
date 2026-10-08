/**
 * Later runs read earlier payouts, so a new run cannot be dated before one
 * that already exists. The same calendar day is allowed.
 */
export function runDateError(date: string, latestRunDate: string | null): string | null {
  if (date.trim() === "") return "Date is required.";
  if (latestRunDate !== null && date < latestRunDate) {
    return "Date is before the latest run.";
  }
  return null;
}
