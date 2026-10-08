import { BrandMark } from "@/components/SideNav";
import { ThemeToggle } from "@/components/ThemeToggle";

/** Phone only. The sidebar already carries the theme control from md up. */
export function PhoneBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface md:hidden">
      <BrandMark />
      <div className="pr-1">
        <ThemeToggle compact />
      </div>
    </header>
  );
}
