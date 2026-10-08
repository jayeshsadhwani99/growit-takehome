import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import type { DraggableAttributes, DraggableSyntheticListeners } from "@dnd-kit/core";
import { moveHurdle, removeHurdle } from "@/store/features/hurdles";
import { useAppDispatch } from "@/store/hooks";
import type { Hurdle } from "@/types";
import { hurdleDescription, hurdleTitle } from "@/utils";
import { PrefRateField } from "./PrefRateField";

const iconButton =
  "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-ink hover:bg-wash disabled:cursor-not-allowed disabled:opacity-40";

interface HurdleCardProps {
  hurdle: Hurdle;
  index: number;
  count: number;
  locked: boolean;
  dragAttributes: DraggableAttributes;
  dragListeners: DraggableSyntheticListeners;
}

export function HurdleCard({ hurdle, index, count, locked, dragAttributes, dragListeners }: HurdleCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="flex gap-2 rounded-lg border border-border bg-surface p-3">
      <button
        type="button"
        className="inline-flex h-8 w-6 shrink-0 cursor-grab touch-none items-center justify-center text-muted active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Drag to reorder"
        disabled={locked}
        {...dragAttributes}
        {...dragListeners}
      >
        <GripVertical className="h-4 w-4" aria-hidden />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
              {index + 1}
            </span>
            <div>
              <h2 className="text-sm font-medium">{hurdleTitle(hurdle)}</h2>
              <p className="mt-0.5 text-xs text-muted">{hurdleDescription(hurdle)}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              className={iconButton}
              aria-label="Move up"
              disabled={locked || index === 0}
              onClick={() => dispatch(moveHurdle(hurdle.id, "up"))}
            >
              <ChevronUp className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label="Move down"
              disabled={locked || index === count - 1}
              onClick={() => dispatch(moveHurdle(hurdle.id, "down"))}
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className={`${iconButton} text-red-700 dark:text-red-300`}
              aria-label="Delete"
              disabled={locked}
              onClick={() => dispatch(removeHurdle(hurdle.id))}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        {hurdle.type === "pref" ? (
          <div className="mt-2 max-w-xs">
            <PrefRateField hurdle={hurdle} locked={locked} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
