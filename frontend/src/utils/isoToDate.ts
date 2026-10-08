/** Parse YYYY-MM-DD as a local calendar day so the picker doesn't shift the date. */
export function isoToDate(iso: string): Date | null {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}
