import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "system" | "light" | "dark";

export const themeSlice = createSlice({
  name: "theme",
  initialState: "system" as ThemeMode,
  reducers: {
    themeSet: (_state, action: PayloadAction<ThemeMode>) => action.payload,
  },
});

export const { themeSet } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
