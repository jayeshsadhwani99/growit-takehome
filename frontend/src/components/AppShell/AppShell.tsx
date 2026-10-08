import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PhoneBar } from "@/components/PhoneBar";
import { SideNav } from "@/components/SideNav";
import { ThemeSync } from "@/components/ThemeSync";

/** Sidebar on a laptop, bottom tabs on a phone. Content clears the tab bar. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background text-ink">
      <ThemeSync />
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <PhoneBar />
        <div className="min-w-0 flex-1 pb-16 md:pb-4">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
