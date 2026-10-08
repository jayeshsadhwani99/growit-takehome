import type { ReactNode } from "react";
import { cn } from "@/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label, control, and the inline error. The error id is always `${id}-error`. */
export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn("mb-1 block text-xs font-medium", error ? "text-red-700 dark:text-red-300" : "text-muted")}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
