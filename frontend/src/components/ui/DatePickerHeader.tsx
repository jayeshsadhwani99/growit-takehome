import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { calendarYearRange } from "./calendarYearRange";
import { Dropdown } from "./Dropdown";

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
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-ink disabled:cursor-not-allowed disabled:opacity-40"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <div className="min-w-0 flex-1">
        <Dropdown
          label="Month"
          value={String(date.getMonth())}
          options={MONTHS.map((name, index) => ({ value: String(index), label: name }))}
          onChange={(value) => changeMonth(Number(value))}
        />
      </div>
      <div className="w-24 shrink-0">
        <Dropdown
          label="Year"
          value={String(year)}
          options={calendarYearRange(date).map((option) => ({ value: String(option), label: String(option) }))}
          onChange={(value) => changeYear(Number(value))}
        />
      </div>
      <button
        type="button"
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-ink disabled:cursor-not-allowed disabled:opacity-40"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
