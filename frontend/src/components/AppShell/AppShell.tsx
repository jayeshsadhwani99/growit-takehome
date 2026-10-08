import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { SideNav } from "@/components/SideNav";

/** Sidebar on a laptop, bottom tabs on a phone. Content clears the tab bar. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background text-ink">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 pb-24 md:pb-8">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
