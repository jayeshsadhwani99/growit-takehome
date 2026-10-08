import type { RootState } from "@/store";

/** Runs are appended in date order, so the last item is the latest. */
export function selectLatestRunDate(state: RootState): string | null {
  return state.runs.items.at(-1)?.date ?? null;
}
