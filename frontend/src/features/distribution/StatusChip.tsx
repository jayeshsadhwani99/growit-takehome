import type { HurdleStatus } from "@/types";
import { cn, hurdleStatusLabel } from "@/utils";

const tone: Record<HurdleStatus, string> = {
  filled: "bg-accent-soft text-accent",
  partial: "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200",
  "not-reached": "bg-wash text-muted",
};

export function StatusChip({ status }: { status: HurdleStatus }) {
  return (
    <span className={cn("inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-medium", tone[status])}>
      {hurdleStatusLabel(status)}
    </span>
  );
}
