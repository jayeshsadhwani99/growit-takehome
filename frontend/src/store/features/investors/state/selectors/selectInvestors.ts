import type { Investor } from "@/types";
import type { RootState } from "@/store";

export function selectInvestors(state: RootState): Investor[] {
  return state.investors;
}
