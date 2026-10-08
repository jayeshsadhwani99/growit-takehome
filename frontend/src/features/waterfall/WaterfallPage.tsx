import { PageHeader, ResetRunsButton } from "@/components";
import { selectHurdles, selectHurdlesLocked } from "@/store/features/hurdles";
import { useAppSelector } from "@/store/hooks";
import { AddHurdleForm } from "./AddHurdleForm";
import { HurdleList } from "./HurdleList";

export function WaterfallPage() {
  const hurdles = useAppSelector(selectHurdles);
  const locked = useAppSelector(selectHurdlesLocked);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <PageHeader
        title="Waterfall"
        description="One waterfall for the whole deal. Cash fills each hurdle before the next."
        actions={<ResetRunsButton />}
      />
      {locked ? (
        <p className="rounded-lg bg-accent-soft px-3 py-2 text-sm">
          Hurdles are locked because a distribution has been run. Reset runs to edit them.
        </p>
      ) : null}
      <AddHurdleForm locked={locked} />
      <HurdleList hurdles={hurdles} locked={locked} />
    </main>
  );
}
