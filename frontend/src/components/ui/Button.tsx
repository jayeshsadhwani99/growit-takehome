import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:brightness-110 disabled:bg-accent/40",
  secondary: "border border-border bg-surface text-ink hover:bg-stone-50",
  danger: "border border-red-200 bg-surface text-red-700 hover:bg-red-50",
};

/** Matches Input height so a form row stays on one line. */
export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}
