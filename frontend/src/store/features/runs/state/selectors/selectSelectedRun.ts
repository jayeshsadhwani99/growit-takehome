import type { Run } from "@/types";
import type { RootState } from "@/store";

/** Fall back to the newest run so the results panel is never blank once history exists. */
export function selectSelectedRun(state: RootState): Run | null {
  const { items, selectedId } = state.runs;
  return items.find((run) => run.id === selectedId) ?? items.at(-1) ?? null;
}
