import type { Hurdle } from "@/types";
import type { RootState } from "@/store";

export function selectHurdles(state: RootState): Hurdle[] {
  return state.hurdles;
}
