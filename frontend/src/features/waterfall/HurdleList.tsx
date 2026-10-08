import { EmptyState } from "@/components";
import type { Hurdle } from "@/types";
import { HurdleCard } from "./HurdleCard";
import { OverflowArrow } from "./OverflowArrow";
import { UndistributedBox } from "./UndistributedBox";

export function HurdleList({ hurdles, locked }: { hurdles: Hurdle[]; locked: boolean }) {
  if (hurdles.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <EmptyState
          title="No hurdles yet"
          description="Add a preferred return or a return of capital. You can add the same kind more than once."
        />
        <UndistributedBox />
      </div>
    );
  }

  return (
    <div>
      {hurdles.map((hurdle, index) => (
        <div key={hurdle.id}>
          <HurdleCard hurdle={hurdle} index={index} count={hurdles.length} locked={locked} />
          {index < hurdles.length - 1 ? <OverflowArrow /> : null}
        </div>
      ))}
      <UndistributedBox />
    </div>
  );
}
