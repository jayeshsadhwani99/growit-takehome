import { Money } from "@/components";
import { runSelected } from "@/store/features/runs";
import { useAppDispatch } from "@/store/hooks";
import type { Run } from "@/types";
import { cn, formatDate } from "@/utils";

export function RunHistory({ runs, selectedId }: { runs: Run[]; selectedId: string | null }) {
  const dispatch = useAppDispatch();
  const newestFirst = [...runs].reverse();

  return (
    <section className="rounded-lg border border-border bg-surface p-2">
      <h2 className="px-2 py-1.5 text-sm font-medium">Run history</h2>
      {newestFirst.length === 0 ? (
        <p className="px-2 py-2 text-xs text-muted">No runs yet.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {newestFirst.map((run) => (
            <li key={run.id}>
              <button
                type="button"
                onClick={() => dispatch(runSelected(run.id))}
                className={cn(
                  "flex h-9 w-full items-center justify-between gap-2 rounded-md px-2 text-left text-sm",
                  run.id === selectedId ? "bg-accent-soft text-accent" : "hover:bg-stone-50",
                )}
              >
                <span>{formatDate(run.date)}</span>
                <Money value={run.amount} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
