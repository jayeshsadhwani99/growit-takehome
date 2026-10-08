const YEAR_LOOKBACK = 120;
const YEAR_LOOKAHEAD = 5;

/** Newest year first. Always includes the year currently on screen. */
export function calendarYearRange(view: Date): number[] {
  const viewYear = view.getFullYear();
  const start = viewYear - YEAR_LOOKBACK;
  const end = viewYear + YEAR_LOOKAHEAD;
  const years: number[] = [];
  for (let year = end; year >= start; year -= 1) years.push(year);
  return years;
}
