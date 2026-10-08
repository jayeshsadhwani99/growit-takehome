import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/utils/cn";
import { BrandMark } from "./BrandMark";

/** Desktop navigation. Hidden once the layout drops below the md breakpoint. */
export function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface md:flex">
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
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium",
                  isActive ? "bg-accent-soft text-accent" : "text-muted hover:bg-stone-50 hover:text-ink",
                )
              }
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
