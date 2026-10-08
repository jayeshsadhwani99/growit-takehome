import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/utils";

/** Phone tab bar. The same three destinations as the sidebar, with a 44px target. */
export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex min-h-11 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center text-xs font-medium leading-tight",
                    isActive ? "text-accent" : "text-muted",
                  )
                }
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
