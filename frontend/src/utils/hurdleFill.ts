import type { HurdleStatus } from "@/types";

/** Paid and owed are integer cents, so a hurdle is filled only when the cents match. */
export function hurdleFill(paid: number, owed: number): { status: HurdleStatus; progress: number } {
  if (owed <= 0) return { status: "filled", progress: 100 };
  if (paid <= 0) return { status: "not-reached", progress: 0 };
  if (paid >= owed) return { status: "filled", progress: 100 };
  return { status: "partial", progress: Math.min(100, (paid / owed) * 100) };
}
