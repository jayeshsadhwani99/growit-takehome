import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useResolvedTheme } from "@/components/ThemeSync";

/** A short fade when the resolved theme changes. Colors themselves ease in CSS. */
export function ThemeTransition({ children }: { children: ReactNode }) {
  const resolved = useResolvedTheme();
  const reduce = useReducedMotion();
  const controls = useAnimation();
  const seen = useRef(false);

  useEffect(() => {
    if (!seen.current) {
      seen.current = true;
      return;
    }
    if (reduce) return;
    void controls.start({ opacity: [0.92, 1] }, { duration: 0.22, ease: "easeOut" });
  }, [controls, reduce, resolved]);

  return (
    <motion.div initial={false} animate={controls} className="flex min-h-dvh w-full bg-background text-ink">
      {children}
    </motion.div>
  );
}
