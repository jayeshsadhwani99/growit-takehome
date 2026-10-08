import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { calendarYearRange } from "./calendarYearRange";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DatePickerHeader({
  date,
  changeMonth,
  changeYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  const year = date.getFullYear();

  return (
    <div className="flex items-center gap-1 px-1 pb-1">
      <button
        type="button"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink disabled:opacity-40"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <select
        className="h-7 min-w-0 flex-1 rounded-md border border-border bg-surface px-1 text-xs text-ink"
        value={date.getMonth()}
        aria-label="Month"
        onChange={(event) => changeMonth(Number(event.target.value))}
      >
        {MONTHS.map((name, index) => (
          <option key={name} value={index}>
            {name}
          </option>
        ))}
      </select>
      <select
        className="h-7 w-20 rounded-md border border-border bg-surface px-1 text-xs text-ink"
        value={year}
        aria-label="Year"
        onChange={(event) => changeYear(Number(event.target.value))}
      >
        {calendarYearRange(date).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink disabled:opacity-40"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
