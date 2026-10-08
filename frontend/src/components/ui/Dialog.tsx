import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogOpenContext } from "./dialogOpenContext";

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function Dialog({ open, children, ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogOpenContext.Provider value={open === true}>
      <DialogPrimitive.Root open={open} {...props}>
        {children}
      </DialogPrimitive.Root>
    </DialogOpenContext.Provider>
  );
}
