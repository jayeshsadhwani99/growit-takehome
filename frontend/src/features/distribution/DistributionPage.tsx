import { EmptyState, PageHeader, ResetRunsButton } from "@/components";
import { selectHurdles } from "@/store/features/hurdles";
import { selectInvestors } from "@/store/features/investors";
import { selectRuns, selectSelectedRun } from "@/store/features/runs";
import { useAppSelector } from "@/store/hooks";
import { RunForm } from "./RunForm";
import { RunHistory } from "./RunHistory";
import { RunResults } from "./RunResults";

export function DistributionPage() {
  const runs = useAppSelector(selectRuns);
  const selected = useAppSelector(selectSelectedRun);
  const investors = useAppSelector(selectInvestors);
  const hurdles = useAppSelector(selectHurdles);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      <PageHeader
        title="Run distribution"
        description="Each run is saved with its payouts and is never recomputed."
        actions={<ResetRunsButton />}
      />
      <RunForm />
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <RunHistory runs={runs} selectedId={selected?.id ?? null} />
        {selected ? (
          <RunResults run={selected} investors={investors} hurdles={hurdles} />
        ) : (
          <EmptyState
            title="No runs yet"
            description="Choose a date and amount to distribute cash through the waterfall."
          />
        )}
      </div>
    </main>
  );
}
