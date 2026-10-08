import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Hurdle } from "@/types";
import { initialHurdlesState } from "./initialState";

export const hurdlesSlice = createSlice({
  name: "hurdles",
  initialState: initialHurdlesState,
  reducers: {
    hurdleAdded: (state, action: PayloadAction<Hurdle>) => {
      state.push(action.payload);
    },
    hurdleRemoved: (state, action: PayloadAction<string>) =>
      state.filter((item) => item.id !== action.payload),
    prefRateSet: (state, action: PayloadAction<{ id: string; rate: number }>) => {
      const hurdle = state.find((item) => item.id === action.payload.id);
      if (hurdle?.type === "pref" && action.payload.rate >= 0) {
        hurdle.rate = action.payload.rate;
      }
    },
    hurdleMoved: (
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>,
    ) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      const next = index + (action.payload.direction === "up" ? -1 : 1);
      if (index < 0 || next < 0 || next >= state.length) return;
      const [hurdle] = state.splice(index, 1);
      if (hurdle) state.splice(next, 0, hurdle);
    },
  },
});

export const { hurdleAdded, hurdleRemoved, prefRateSet, hurdleMoved } = hurdlesSlice.actions;
export const hurdlesReducer = hurdlesSlice.reducer;
