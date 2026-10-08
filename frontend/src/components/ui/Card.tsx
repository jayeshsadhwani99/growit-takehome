import type { ReactNode } from "react";
import { cn } from "@/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-lg border border-border bg-surface p-3", className)}>
      {children}
    </section>
  );
}
