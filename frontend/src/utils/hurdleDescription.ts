import type { Hurdle } from "@/types";

export function hurdleDescription(hurdle: Hurdle): string {
  if (hurdle.type === "roc") {
    return "Pay investors back their original contribution.";
  }
  return "Simple interest on capital that has not been returned yet.";
}
