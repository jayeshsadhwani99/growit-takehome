import { ArrowDown } from "lucide-react";

export function OverflowArrow() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-1 text-xs text-muted">
      <ArrowDown className="h-4 w-4" aria-hidden />
      <span>overflow goes to next hurdle</span>
    </div>
  );
}
