import { useEffect, useState } from "react";
import { resolveTheme, selectTheme } from "@/store/features/theme";
import { useAppSelector } from "@/store/hooks";

/** The class has to live on <html> so portaled dialogs and the calendar inherit it. */
export function ThemeSync() {
  const mode = useAppSelector(selectTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolveTheme(mode, systemDark) === "dark");
  }, [mode, systemDark]);

  return null;
}
