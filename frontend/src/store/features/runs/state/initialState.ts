import type { Run } from "@/types";

export interface RunsState {
  items: Run[];
  selectedId: string | null;
}

export const initialRunsState: RunsState = {
  items: [],
  selectedId: null,
};
