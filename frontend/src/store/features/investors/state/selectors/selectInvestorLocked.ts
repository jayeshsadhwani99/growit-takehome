import type { RootState } from "@/store";
import { investorHasPayouts } from "@/utils/investorHasPayouts";

export function selectInvestorLocked(state: RootState, investorId: string): boolean {
  return investorHasPayouts(state.runs.items, investorId);
}
