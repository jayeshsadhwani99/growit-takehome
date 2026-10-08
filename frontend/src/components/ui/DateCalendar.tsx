import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerHeader } from "./DatePickerHeader";

interface DateCalendarProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export function DateCalendar({ selected, onSelect }: DateCalendarProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onSelect}
      inline
      calendarClassName="growit-calendar"
      renderCustomHeader={(props) => <DatePickerHeader {...props} />}
    />
  );
}
