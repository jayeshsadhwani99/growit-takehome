import type { HurdleStatus } from "@/types";
import { cn, hurdleStatusLabel } from "@/utils";

const tone: Record<HurdleStatus, string> = {
  filled: "bg-accent-soft text-accent",
  partial: "bg-amber-100 text-amber-950",
  "not-reached": "bg-stone-100 text-stone-600",
};

export function StatusChip({ status }: { status: HurdleStatus }) {
  return (
    <span className={cn("inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-medium", tone[status])}>
      {hurdleStatusLabel(status)}
    </span>
  );
}
