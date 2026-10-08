import type { ComponentProps } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils";
import { keepInside } from "./keepInside";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

const keepMenuOpen = keepInside("[role='listbox']");

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
