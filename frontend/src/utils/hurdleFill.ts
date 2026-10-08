import type { HurdleStatus } from "@/types";

/** Half a cent. Float dust should not turn a filled hurdle into a partial one. */
const CENT = 0.005;

export function hurdleFill(paid: number, owed: number): { status: HurdleStatus; progress: number } {
  if (owed <= CENT) return { status: "filled", progress: 100 };
  if (paid <= CENT) return { status: "not-reached", progress: 0 };
  if (paid >= owed - CENT) return { status: "filled", progress: 100 };
  return { status: "partial", progress: Math.min(100, (paid / owed) * 100) };
}
