import { Money } from "@/components";
import { cn, hurdleFill } from "@/utils";
import { HurdleProgress } from "./HurdleProgress";

export function HurdleShareRow({ name, owed, paid }: { name: string; owed: number; paid: number }) {
  const fill = hurdleFill(paid, owed);

  return (
    <li>
      <div className="flex items-baseline justify-between gap-2">
        <span className={cn("text-sm", fill.progress <= 0 ? "text-muted" : "font-medium")}>{name}</span>
        <p className="text-xs text-muted">
          <Money value={paid} /> of <Money value={owed} />
        </p>
      </div>
      <div className="mt-1">
        <HurdleProgress progress={fill.progress} />
      </div>
    </li>
  );
}
