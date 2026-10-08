import type { ThemeMode } from "./themeSlice";

/** System follows the OS. Light and dark ignore it. */
export function resolveTheme(mode: ThemeMode, systemDark: boolean): "light" | "dark" {
  if (mode === "system") return systemDark ? "dark" : "light";
  return mode;
}
