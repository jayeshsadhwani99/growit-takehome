import { Banknote, Layers, Users, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Same three destinations in the sidebar and the phone tab bar. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Investors", icon: Users },
  { href: "/waterfall", label: "Waterfall", icon: Layers },
  { href: "/distribution", label: "Run distribution", icon: Banknote },
];
