const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * UTC midnight for a real calendar day. `Date.parse` turns 2025-02-29 into
 * 1 Mar, which would silently add a day of interest.
 */
export function parseIsoDate(iso: string): number {
  const match = ISO_DATE.exec(iso);
  if (!match) throw new Error("Dates must be YYYY-MM-DD.");
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  const check = new Date(utc);
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    throw new Error("Dates must be YYYY-MM-DD.");
  }
  return utc;
}
