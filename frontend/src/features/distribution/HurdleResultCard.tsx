import { ChevronDown } from "lucide-react";
import { Money } from "@/components";
import type { Hurdle, HurdleView, Investor } from "@/types";
import { hurdleTitle } from "@/utils";
import { HurdleProgress } from "./HurdleProgress";
import { HurdleShareRow } from "./HurdleShareRow";
import { StatusChip } from "./StatusChip";

export function HurdleResultCard({
  hurdle,
  view,
  index,
  investors,
}: {
  hurdle: Hurdle;
  view: HurdleView;
  index: number;
  investors: Investor[];
}) {
  return (
    <details className="group rounded-lg border border-border bg-surface p-3">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium">
            {index + 1}. {hurdleTitle(hurdle)}
          </h3>
          <span className="inline-flex items-center gap-2">
            <StatusChip status={view.status} />
            <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" aria-hidden />
          </span>
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
      </summary>
      {view.shares.length === 0 ? (
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted">
          Owed isn't stored on this run, so each investor's share isn't a percentage.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5 border-t border-border pt-3">
          {view.shares.map((share) => (
            <HurdleShareRow
              key={share.investorId}
              name={investors.find((investor) => investor.id === share.investorId)?.name ?? "Removed investor"}
              owed={share.owed}
              paid={share.paid}
            />
          ))}
        </ul>
      )}
    </details>
  );
}
