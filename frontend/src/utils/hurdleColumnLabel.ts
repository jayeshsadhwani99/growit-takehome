import type { Hurdle } from "@/types";

/** Short header so several hurdles still fit across the payout table. */
export function hurdleColumnLabel(hurdle: Hurdle, index: number): string {
  if (hurdle.type === "roc") return `${index + 1}. ROC`;
  return `${index + 1}. Pref ${hurdle.rate}%`;
}
