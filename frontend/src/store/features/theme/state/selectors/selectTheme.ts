import type { RootState } from "@/store";
import type { ThemeMode } from "../themeSlice";

export function selectTheme(state: RootState): ThemeMode {
  return state.theme;
}
