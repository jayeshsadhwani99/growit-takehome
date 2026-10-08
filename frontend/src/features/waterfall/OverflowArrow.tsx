import { ArrowDown } from "lucide-react";

export function OverflowArrow() {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted">
      <ArrowDown className="h-4 w-4" aria-hidden />
      <span>overflow goes to next hurdle</span>
    </div>
  );
}
