import type { RootState } from "@/store";

/** Any saved run freezes the waterfall. Reset runs to edit it again. */
export function selectHurdlesLocked(state: RootState): boolean {
  return state.runs.items.length > 0;
}
