import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandMark } from "./BrandMark";

/** Desktop navigation. Hidden once the layout drops below the md breakpoint. */
export function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-52 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <BrandMark />
      <nav aria-label="Main" className="flex flex-1 flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex h-9 items-center gap-2 rounded-md px-2.5 text-sm font-medium",
                  isActive ? "bg-accent-soft text-accent" : "text-muted hover:bg-wash hover:text-ink",
                )
              }
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-border p-2">
        <ThemeToggle />
      </div>
    </aside>
  );
}
