import type { RootState } from "@/store";

export function selectTotalRaised(state: RootState): number {
  return state.investors.reduce((sum, investor) => sum + investor.amount, 0);
}
