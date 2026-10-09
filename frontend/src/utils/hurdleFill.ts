import type { HurdleStatus } from "@/types";

/**
 * Paid and owed are integer cents, so a hurdle is filled only when the cents match.
 * Nothing owed is not a full bar: $0 of $0 would paint the whole track teal.
 */
export function hurdleFill(paid: number, owed: number): { status: HurdleStatus; progress: number } {
  if (owed <= 0) return { status: "filled", progress: 0 };
  if (paid <= 0) return { status: "not-reached", progress: 0 };
  if (paid >= owed) return { status: "filled", progress: 100 };
  return { status: "partial", progress: Math.min(100, (paid / owed) * 100) };
}
