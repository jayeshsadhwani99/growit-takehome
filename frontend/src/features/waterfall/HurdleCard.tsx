import { Button } from "@/components";
import { moveHurdle, removeHurdle } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { Hurdle } from "@/types";
import { hurdleDescription, hurdleTitle } from "@/utils";
import { PrefRateField } from "./PrefRateField";

interface HurdleCardProps {
  hurdle: Hurdle;
  index: number;
  count: number;
  locked: boolean;
}

export function HurdleCard({ hurdle, index, count, locked }: HurdleCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
            {index + 1}
          </span>
          <div>
            <h2 className="font-medium">{hurdleTitle(hurdle)}</h2>
            <p className="mt-1 text-sm text-muted">{hurdleDescription(hurdle)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            disabled={locked || index === 0}
            onClick={() => dispatch(moveHurdle(hurdle.id, "up"))}
          >
            Up
          </Button>
          <Button
            variant="secondary"
            disabled={locked || index === count - 1}
            onClick={() => dispatch(moveHurdle(hurdle.id, "down"))}
          >
            Down
          </Button>
          <Button variant="danger" disabled={locked} onClick={() => dispatch(removeHurdle(hurdle.id))}>
            Delete
          </Button>
        </div>
      </div>
      {hurdle.type === "pref" ? (
        <div className="mt-4 max-w-xs">
          <PrefRateField hurdle={hurdle} locked={locked} />
        </div>
      ) : null}
    </article>
  );
}
