import type { Run } from "@/types";
import type { RootState } from "@/store";

export function selectRuns(state: RootState): Run[] {
  return state.runs.items;
}
