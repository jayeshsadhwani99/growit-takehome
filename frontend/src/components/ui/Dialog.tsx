import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

function keepPopoverOpen(event: { target: EventTarget | null; preventDefault: () => void }): void {
  if (event.target instanceof Element && event.target.closest("[data-radix-popper-content-wrapper]")) {
    event.preventDefault();
  }
}

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-3 shadow-md outline-none",
          className,
        )}
        {...props}
        onInteractOutside={keepPopoverOpen}
        onPointerDownOutside={keepPopoverOpen}
        onFocusOutside={keepPopoverOpen}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
