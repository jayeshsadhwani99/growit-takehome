import { Page } from "@/components";
import { selectHurdles, selectHurdlesLocked } from "@/store/features/hurdles";
import { useAppSelector } from "@/store/hooks";
import { AddHurdleForm } from "./AddHurdleForm";
import { HurdleList } from "./HurdleList";

export function WaterfallPage() {
  const hurdles = useAppSelector(selectHurdles);
  const locked = useAppSelector(selectHurdlesLocked);

  return (
    <Page
      title="Waterfall"
      description="One waterfall for the whole deal. Cash fills each hurdle before the next."
    >
      {locked ? (
        <p className="rounded-md bg-accent-soft px-2.5 py-1.5 text-xs">
          Hurdles are locked because a distribution has been run. Reset runs on Run distribution to edit them.
        </p>
      ) : null}
      <AddHurdleForm locked={locked} />
      <HurdleList hurdles={hurdles} locked={locked} />
    </Page>
  );
}
