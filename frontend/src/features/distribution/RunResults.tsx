import { Money } from "@/components";
import type { Hurdle, Investor, Run } from "@/types";
import { describeHurdles, formatDate } from "@/utils";
import { HurdleResultCard } from "./HurdleResultCard";
import { InvestorPayoutTable } from "./InvestorPayoutTable";
import { LeftoverCash } from "./LeftoverCash";

export function RunResults({
  run,
  investors,
  hurdles,
}: {
  run: Run;
  investors: Investor[];
  hurdles: Hurdle[];
}) {
  const views = describeHurdles(run, hurdles);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-medium">{formatDate(run.date)}</h2>
        <p className="text-xs text-muted">
          Distributed <Money value={run.amount} />
        </p>
      </div>
      {views.map((view, index) => {
        const hurdle = hurdles.find((item) => item.id === view.hurdleId);
        if (!hurdle) return null;
        return <HurdleResultCard key={view.hurdleId} hurdle={hurdle} view={view} index={index} />;
      })}
      <InvestorPayoutTable run={run} investors={investors} hurdles={hurdles} />
      <LeftoverCash amount={run.leftover} />
    </div>
  );
}
