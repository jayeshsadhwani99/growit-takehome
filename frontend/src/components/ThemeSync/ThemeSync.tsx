import { useEffect } from "react";
import { useResolvedTheme } from "./useResolvedTheme";

/** The class has to live on <html> so portaled dialogs and the calendar inherit it. */
export function ThemeSync() {
  const resolved = useResolvedTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  return null;
}
