import { useEffect, useState } from "react";
import { resolveTheme, selectTheme } from "@/store/features/theme";
import { useAppSelector } from "@/store/hooks";

/** System follows the OS. Light and dark stay on the stored choice. */
export function useResolvedTheme(): "light" | "dark" {
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

  return resolveTheme(mode, systemDark);
}
