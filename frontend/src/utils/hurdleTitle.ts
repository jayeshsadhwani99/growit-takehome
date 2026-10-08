import type { Hurdle } from "@/types";

export function hurdleTitle(hurdle: Hurdle): string {
  if (hurdle.type === "roc") return "Return of capital";
  return "Preferred return";
}
