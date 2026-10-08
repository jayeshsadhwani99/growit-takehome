import { Monitor, Moon, Sun } from "lucide-react";
import { Dropdown } from "@/components/ui";
import { selectTheme, themeSet, type ThemeMode } from "@/store/features/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const iconClass = "h-4 w-4 shrink-0";

const options = [
  { value: "system", label: "System", icon: <Monitor className={iconClass} aria-hidden /> },
  { value: "light", label: "Light", icon: <Sun className={iconClass} aria-hidden /> },
  { value: "dark", label: "Dark", icon: <Moon className={iconClass} aria-hidden /> },
];

/** Sidebar gets the full width. The phone bar keeps it narrow. */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectTheme);

  return (
    <div className={compact ? "w-32" : "w-full"}>
      <Dropdown
        label="Theme"
        value={mode}
        options={options}
        onChange={(value) => {
          if (value === "system" || value === "light" || value === "dark") {
            dispatch(themeSet(value satisfies ThemeMode));
          }
        }}
      />
    </div>
  );
}
