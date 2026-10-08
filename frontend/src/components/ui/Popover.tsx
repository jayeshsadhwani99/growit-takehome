import type { ComponentProps } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

function keepMenuOpen(event: { target: EventTarget | null; preventDefault: () => void }): void {
  if (event.target instanceof Element && event.target.closest("[role='listbox']")) {
    event.preventDefault();
  }
}

export function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[60] rounded-md border border-border bg-surface text-ink shadow-md outline-none",
          className,
        )}
        {...props}
        onInteractOutside={keepMenuOpen}
        onPointerDownOutside={keepMenuOpen}
        onFocusOutside={keepMenuOpen}
      />
    </PopoverPrimitive.Portal>
  );
}
