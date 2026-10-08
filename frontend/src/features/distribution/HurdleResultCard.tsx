import { Money } from "@/components";
import type { Hurdle, HurdleView } from "@/types";
import { hurdleTitle } from "@/utils";
import { HurdleProgress } from "./HurdleProgress";
import { StatusChip } from "./StatusChip";

export function HurdleResultCard({
  hurdle,
  view,
  index,
}: {
  hurdle: Hurdle;
  view: HurdleView;
  index: number;
}) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium">
          {index + 1}. {hurdleTitle(hurdle)}
        </h3>
        <StatusChip status={view.status} />
      </div>
      <p className="mt-1.5 text-sm">
        <span className="text-muted">Paid </span>
        <Money value={view.paid} />
        <span className="text-muted"> of </span>
        {view.owed === null ? <span className="font-mono">—</span> : <Money value={view.owed} />}
        <span className="text-muted"> owed</span>
      </p>
      <div className="mt-2">
        <HurdleProgress progress={view.progress} />
      </div>
      {view.progress === null ? (
        <p className="mt-2 text-xs text-muted">Owed isn't stored on a run, so this bar isn't a percentage.</p>
      ) : null}
    </article>
  );
}
