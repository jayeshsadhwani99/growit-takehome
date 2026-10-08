import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerHeader } from "./DatePickerHeader";

interface DateCalendarProps {
  selected: Date | null;
  minDate?: Date | null;
  onSelect: (date: Date | null) => void;
}

export function DateCalendar({ selected, minDate, onSelect }: DateCalendarProps) {
  return (
    <DatePicker
      selected={selected}
      minDate={minDate ?? undefined}
      onChange={onSelect}
      inline
      calendarClassName="growit-calendar"
      renderCustomHeader={(props) => <DatePickerHeader {...props} />}
    />
  );
}
