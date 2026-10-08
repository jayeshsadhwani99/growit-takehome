import type { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import { controlClass } from "./controlClass";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface DropdownProps {
  id?: string;
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}

/** Same height and width as Input. The menu matches the trigger width. */
export function Dropdown({ id, label, value, options, onChange, disabled, invalid, describedBy }: DropdownProps) {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        id={id}
        aria-label={label}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={cn(controlClass, "cursor-pointer justify-between gap-2")}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-[70] max-h-60 overflow-y-auto rounded-md border border-border bg-surface shadow-md"
        >
          <Select.Viewport className="w-[var(--radix-select-trigger-width)] p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex h-9 cursor-pointer items-center rounded-sm pr-8 pl-2 text-sm outline-none data-[highlighted]:bg-accent-soft data-[highlighted]:text-accent"
              >
                <Select.ItemText>
                  <span className="inline-flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
