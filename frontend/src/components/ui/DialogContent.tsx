import { useContext, useEffect, useRef, useState, type ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils";
import { DialogOpenContext } from "./dialogOpenContext";
import { keepInside } from "./keepInside";

const keepPopoverOpen = keepInside("[data-radix-popper-content-wrapper]");

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  const open = useContext(DialogOpenContext);
  const openRef = useRef(open);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  if (open && !mounted) setMounted(true);
  if (!mounted) return null;

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence onExitComplete={() => { if (!openRef.current) setMounted(false); }}>
        {open ? (
          <motion.div
            key="dialog"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.16, ease: "easeOut" }}
          >
            <DialogPrimitive.Overlay className="absolute inset-0 bg-black/40" />
            <DialogPrimitive.Content
              {...props}
              onInteractOutside={keepPopoverOpen}
              onPointerDownOutside={keepPopoverOpen}
              onFocusOutside={keepPopoverOpen}
              asChild
            >
              <motion.div
                className={cn(
                  "absolute top-1/2 left-1/2 w-[calc(100%-1.5rem)] max-w-sm rounded-lg border border-border bg-surface p-3 shadow-md outline-none",
                  className,
                )}
                initial={reduce ? { x: "-50%", y: "-50%" } : { x: "-50%", y: "calc(-50% + 8px)", scale: 0.98 }}
                animate={{ x: "-50%", y: "-50%", scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
}
