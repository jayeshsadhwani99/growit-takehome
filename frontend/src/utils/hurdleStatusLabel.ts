import type { HurdleStatus } from "@/types";

export function hurdleStatusLabel(status: HurdleStatus): string {
  if (status === "filled") return "Filled";
  if (status === "partial") return "Partly filled";
  return "Not reached";
}
