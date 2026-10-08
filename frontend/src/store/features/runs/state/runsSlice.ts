import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Run } from "@/types";
import { initialRunsState } from "./initialState";

export const runsSlice = createSlice({
  name: "runs",
  initialState: initialRunsState,
  reducers: {
    runAdded: (state, action: PayloadAction<Run>) => {
      state.items.push(action.payload);
      state.selectedId = action.payload.id;
    },
    runSelected: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    /** Clearing runs is what unlocks investor edits and the waterfall. */
    runsReset: () => ({ items: [], selectedId: null }),
  },
});

export const { runAdded, runSelected, runsReset } = runsSlice.actions;
export const runsReducer = runsSlice.reducer;
