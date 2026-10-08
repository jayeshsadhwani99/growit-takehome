import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Investor } from "@/types";
import { initialInvestorsState } from "./initialState";

export const investorsSlice = createSlice({
  name: "investors",
  initialState: initialInvestorsState,
  reducers: {
    investorAdded: (state, action: PayloadAction<Investor>) => {
      state.push(action.payload);
    },
    investorUpdated: (state, action: PayloadAction<Investor>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state[index] = action.payload;
    },
    investorRemoved: (state, action: PayloadAction<string>) =>
      state.filter((item) => item.id !== action.payload),
  },
});

export const { investorAdded, investorUpdated, investorRemoved } = investorsSlice.actions;
export const investorsReducer = investorsSlice.reducer;
