import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/utils/cn";
import { dateToIso } from "@/utils/dateToIso";
import { formatDate } from "@/utils/formatDate";
import { isoToDate } from "@/utils/isoToDate";
import { controlClass } from "./controlClass";
import { DateCalendar } from "./DateCalendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface DateFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** Calendar stays on the page. A popover inside a dialog covers the buttons. */
  inline?: boolean;
}

/** Popover calendar. The stored value stays YYYY-MM-DD. */
export function DateField({ id, value, onChange, disabled, invalid, describedBy, inline }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = isoToDate(value);

  if (inline) {
    return (
      <div className={cn("rounded-md border bg-surface p-1", invalid ? "border-red-700" : "border-border")}>
        <input id={id} className="sr-only" value={value} readOnly aria-invalid={invalid} aria-describedby={describedBy} />
        <DateCalendar
          selected={selected}
          onSelect={(date) => {
            if (date) onChange(dateToIso(date));
          }}
        />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(controlClass, "justify-start gap-2 text-left", !value && "text-muted")}
        >
          <Calendar className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          {value ? formatDate(value) : "Select date"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1">
        <DateCalendar
          selected={selected}
          onSelect={(date) => {
            if (date) onChange(dateToIso(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
