import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-xl border border-border bg-surface p-4", className)}>
      {children}
    </section>
  );
}
