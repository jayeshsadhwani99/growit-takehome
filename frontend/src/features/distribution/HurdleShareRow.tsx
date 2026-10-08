import { Money } from "@/components";
import { hurdleFill } from "@/utils";
import { HurdleProgress } from "./HurdleProgress";

export function HurdleShareRow({ name, owed, paid }: { name: string; owed: number; paid: number }) {
  const fill = hurdleFill(paid, owed);

  return (
    <li>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{name}</span>
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
