const display = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Format YYYY-MM-DD without letting the local timezone shift the calendar day. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return display.format(new Date(Date.UTC(year, month - 1, day)));
}
