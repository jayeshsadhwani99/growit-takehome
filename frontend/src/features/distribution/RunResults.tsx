import { Money } from "@/components";
import type { Hurdle, Investor, Run } from "@/types";
import { describeHurdles, formatDate } from "@/utils";
import { sharesForRun } from "./sharesForRun";
import { HurdleResultCard } from "./HurdleResultCard";
import { InvestorPayoutTable } from "./InvestorPayoutTable";
import { LeftoverCash } from "./LeftoverCash";

export function RunResults({
  run,
  investors,
  hurdles,
  previousRuns,
}: {
  run: Run;
  investors: Investor[];
  hurdles: Hurdle[];
  previousRuns: Run[];
}) {
  const views = describeHurdles({ ...run, shares: sharesForRun(run, investors, hurdles, previousRuns) }, hurdles);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
        <h2 className="text-sm font-medium">{formatDate(run.date)}</h2>
        <p className="min-w-0 text-xs text-wrap text-muted">
          Distributed <Money value={run.amount} />
        </p>
      </div>
      {views.map((view, index) => {
        const hurdle = hurdles.find((item) => item.id === view.hurdleId);
        if (!hurdle) return null;
        return <HurdleResultCard key={view.hurdleId} hurdle={hurdle} view={view} index={index} investors={investors} />;
      })}
      <InvestorPayoutTable run={run} investors={investors} hurdles={hurdles} />
      <LeftoverCash amount={run.leftover} />
    </div>
  );
}
