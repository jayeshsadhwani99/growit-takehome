import { useState } from "react";
import { Button, EmptyState, Page, ResetRunsButton } from "@/components";
import { selectHurdles } from "@/store/features/hurdles";
import { selectInvestors } from "@/store/features/investors";
import { selectRuns, selectSelectedRun } from "@/store/features/runs";
import { useAppSelector } from "@/store/hooks";
import { AddRunDialog } from "./AddRunDialog";
import { RunHistory } from "./RunHistory";
import { RunResults } from "./RunResults";

export function DistributionPage() {
  const runs = useAppSelector(selectRuns);
  const selected = useAppSelector(selectSelectedRun);
  const investors = useAppSelector(selectInvestors);
  const hurdles = useAppSelector(selectHurdles);
  const [running, setRunning] = useState(false);

  return (
    <Page
      title="Run distribution"
      description="Each run is saved with its payouts and is never recomputed."
      actions={
        <div className="flex flex-wrap justify-end gap-1.5">
          {runs.length > 0 ? (
            <Button onClick={() => setRunning(true)}>Run distribution</Button>
          ) : null}
          <ResetRunsButton />
        </div>
      }
    >
      {runs.length === 0 ? (
        <EmptyState
          title="No runs"
          description="Choose a date and amount to distribute cash through the waterfall."
          action={<Button onClick={() => setRunning(true)}>Run distribution</Button>}
        />
      ) : (
        <div className="grid gap-3 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <RunHistory runs={runs} selectedId={selected?.id ?? null} />
          {selected ? (
            <RunResults
              run={selected}
              investors={investors}
              hurdles={hurdles}
              previousRuns={runs.slice(0, Math.max(0, runs.findIndex((item) => item.id === selected.id)))}
            />
          ) : (
            <EmptyState title="No runs" description="Pick a run from the history to see its payouts." />
          )}
        </div>
      )}
      <AddRunDialog open={running} onOpenChange={setRunning} />
    </Page>
  );
}
