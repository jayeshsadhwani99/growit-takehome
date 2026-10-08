import { Money } from "@/components";
import { runSelected } from "@/store/features/runs";
import { useAppDispatch } from "@/store/hooks";
import type { Run } from "@/types";
import { cn, formatDate, formatMoney } from "@/utils";

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
                  "flex h-9 w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md px-2 text-left text-sm",
                  run.id === selectedId ? "bg-accent-soft text-accent" : "hover:bg-wash",
                )}
              >
                <span className="shrink-0 whitespace-nowrap">{formatDate(run.date)}</span>
                <span className="min-w-0 truncate" title={formatMoney(run.amount)}>
                  <Money value={run.amount} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
