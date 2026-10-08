import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn, dateToIso, formatDate, isoToDate } from "@/utils";
import { controlClass } from "./controlClass";
import { DateCalendar } from "./DateCalendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface DateFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  /** Earliest YYYY-MM-DD that can be picked. That day stays available. */
  min?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}

/** Closed until the field is clicked. The stored value stays YYYY-MM-DD. */
export function DateField({ id, value, onChange, min, disabled, invalid, describedBy }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = isoToDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(controlClass, "cursor-pointer justify-start gap-2 text-left", !value && "text-muted")}
        >
          <Calendar className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          {value ? formatDate(value) : "Select date"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1">
        <DateCalendar
          selected={selected}
          minDate={min ? isoToDate(min) : null}
          onSelect={(date) => {
            if (date) onChange(dateToIso(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
